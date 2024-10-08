const { loadFixture } = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("BankAccount", function () {
  async function deployBankAccount() {
    const [addr0, addr1, addr2, addr3, addr4] = await ethers.getSigners();

    const BankAccount = await ethers.getContractFactory("BankAccount");
    const bankaccount = await BankAccount.deploy();

    return { bankaccount, addr0, addr1, addr2, addr3, addr4 };
  }

  async function deployBankAccountWithAccounts(owners = 1, deposit = 0, withdrawalAmount = []) {
    const { bankaccount, addr0, addr1, addr2, addr3, addr4 } = await loadFixture(deployBankAccount);
    let addresses = [];

    if (owners === 2) {
      addresses = [addr1.address];
    } else if (owners === 3) {
      addresses = [addr1.address, addr2.address];
    } else if (owners === 4) {
      addresses = [addr1.address, addr2.address, addr3.address];
    }

    await bankaccount.connect(addr0).createAccount(addresses);

    if (deposit > 0) {
      await bankaccount.connect(addr0).deposit(0, { value: ethers.utils.parseEther(deposit.toString()) });
    }

    for (const amount of withdrawalAmount) {
      await bankaccount.connect(addr0).requestWithdrawal(0, ethers.utils.parseEther(amount.toString()));
    }

    return { bankaccount, addr0, addr1, addr2, addr3, addr4 };
  }

  describe("Deployment", () => {
    it("Should deploy without error", async () => {
      await loadFixture(deployBankAccount);
    });
  });

  describe("Creating an account", () => {
    it("Should allow creating a single user account", async () => {
      const { bankaccount, addr0 } = await loadFixture(deployBankAccount);
      await bankaccount.connect(addr0).createAccount([]);
      const accounts = await bankaccount.connect(addr0).getAccounts();
      expect(accounts.length).to.equal(1);
    });

    it("Should allow creating a two-user account", async () => {
      const { bankaccount, addr0, addr1 } = await loadFixture(deployBankAccount);
      await bankaccount.connect(addr0).createAccount([addr1.address]);
      const accounts0 = await bankaccount.connect(addr0).getAccounts();
      const accounts1 = await bankaccount.connect(addr1).getAccounts();
      expect(accounts0.length).to.equal(1);
      expect(accounts1.length).to.equal(1);
    });
  });

  describe("Depositing", () => {
    it("should allow deposit from account owner", async () => {
      const { bankaccount, addr0 } = await deployBankAccountWithAccounts(1);
      const depositAmount = ethers.utils.parseEther("0.1"); // 0.1 ETH
      await expect(bankaccount.connect(addr0).deposit(0, { value: depositAmount }))
        .to.changeEtherBalance([addr0], [-depositAmount]);
    });

    it("should not allow deposit from non-account owner", async () => {
      const { bankaccount, addr1 } = await deployBankAccountWithAccounts(1);
      const depositAmount = ethers.utils.parseEther("0.1"); // 0.1 ETH
      await expect(bankaccount.connect(addr1).deposit(0, { value: depositAmount }))
        .to.be.revertedWith("You are not the owner of the account");
    });
  });

  describe("Withdrawals", () => {
    describe("Request a withdrawal", () => {
      it("Account owner can request withdrawal", async () => {
        const { bankaccount, addr0 } = await deployBankAccountWithAccounts(1, 0.1);
        await bankaccount.connect(addr0).requestWithdrawal(0, ethers.utils.parseEther("0.1"));
      });

      it("Account owner cannot request withdrawal with invalid amount", async () => {
        const { bankaccount, addr0 } = await deployBankAccountWithAccounts(1, 0.1);
        await expect(bankaccount.connect(addr0).requestWithdrawal(0, ethers.utils.parseEther("0.2")))
          .to.be.revertedWith("insufficient balance");
      });
    });

    describe("Approve a withdrawal", () => {
      it("should allow account owner to approve withdrawal", async () => {
        const { bankaccount, addr1 } = await deployBankAccountWithAccounts(2, 0.1, [0.1]);
        await bankaccount.connect(addr1).approveWithdrawal(0, 0);  // Correct function name
        expect(await bankaccount.getApprovals(0, 0)).to.equal(1);
      });

      it("should not allow non-account owner to approve withdrawal", async () => {
        const { bankaccount, addr2 } = await deployBankAccountWithAccounts(2, 0.1, [0.1]);
        await expect(bankaccount.connect(addr2).approveWithdrawal(0, 0))
          .to.be.revertedWith("You are not the owner of the account");
      });

      it("should not allow owner to approve withdrawal multiple times", async () => {
        const { bankaccount, addr1 } = await deployBankAccountWithAccounts(2, 0.1, [0.1]);
        await bankaccount.connect(addr1).approveWithdrawal(0, 0);  // First approval
        await expect(bankaccount.connect(addr1).approveWithdrawal(0, 0))
          .to.be.revertedWith("you have already approved");
      });

      it("should not allow creator of request to approve", async () => {
        const { bankaccount, addr0 } = await deployBankAccountWithAccounts(2, 0.1, [0.1]);
        await expect(bankaccount.connect(addr0).approveWithdrawal(0, 0))
          .to.be.revertedWith("You can not approve this request");
      });
    });

    describe("Make withdrawal", () => {
      it("should allow creator of request to withdraw approved request", async () => {
        const { bankaccount, addr0, addr1 } = await deployBankAccountWithAccounts(2, 0.1, [0.1]);
        await bankaccount.connect(addr1).approveWithdrawal(0, 0);
        await expect(bankaccount.connect(addr0).withdraw(0, 0))
          .to.changeEtherBalance([addr0], [ethers.utils.parseEther("0.1")]);
      });

      it("should not allow creator of request to withdraw twice", async () => {
        const { bankaccount, addr0, addr1 } = await deployBankAccountWithAccounts(2, 0.2, [0.1]);
        await bankaccount.connect(addr1).approveWithdrawal(0, 0);
        await expect(bankaccount.connect(addr0).withdraw(0, 0))
          .to.changeEtherBalance([addr0], [ethers.utils.parseEther("0.1")]);
        await expect(bankaccount.connect(addr0).withdraw(0, 0))
          .to.be.revertedWith("this request is not approved");
      });

      it("should not allow non-creator of request to withdraw", async () => {
        const { bankaccount, addr1 } = await deployBankAccountWithAccounts(2, 0.2, [0.1]);
        await bankaccount.connect(addr1).approveWithdrawal(0, 0);  // Approval by non-creator
        await expect(bankaccount.connect(addr1).withdraw(0, 0))  // Withdrawal by non-creator
          .to.be.revertedWith("you did not create this request");
      });
    });
  });
});
