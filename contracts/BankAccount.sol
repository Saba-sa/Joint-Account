// SPDX-License-Identifier: MIT

pragma solidity >=0.8.0;

contract BankAccount {
    event Deposit(
        address indexed user,
        uint indexed accountId,
        uint value,
        uint timestamp
    );
    event WithdrawRequested(
        address indexed user,
        uint indexed accountId,
        uint indexed withdrawId,
        uint ammount,
        uint timestamp
    );
    event Withdraw(uint indexed withdrawId, uint timestamp);
    event AccountCreated(address[] owners, uint indexed id, uint timestmap);

    struct WithdrawRequest {
        address user;
        uint amount;
        uint approvals;
        mapping(address => bool) ownersApproved;
        bool approved;
    }

    struct Account {
        address[] owners;
        uint balance;
        mapping(uint => WithdrawRequest) withdrawRequests;
    }
    mapping(uint => Account) accounts;
    mapping(address => uint[]) userAccounts;

    uint nextAccountId;
    uint nextWithdrawId;
    modifier accountOwner(uint accountId) {
        bool isOwner;
        for (uint idx = 0; idx < accounts[accountId].owners.length; idx++) {
            if (accounts[accountId].owners[idx] == msg.sender) {
                isOwner = true;
                break;
            }
        }
        require(isOwner, "You are not the owner of the account");
        _;
    }
    modifier validOwner(address[] calldata owner) {
        require(owner.length + 1 <= 4, "maximun of four owners per account");
        for (uint i = 0; i < owner.length; i++) {
            if (owner[i] == msg.sender) {
                revert("no duplicate owners");
            }
            for (uint j = i + 1; j < owner.length; j++) {
                if (owner[i] == owner[j]) {
                    revert("no duplicate owners");
                }
            }
        }
        _;
    }

    modifier sufficentBalance(uint accountId, uint amount) {
        require(accounts[accountId].balance >= amount, "insufficient balance");
        _;
    }
    modifier canApprove(uint accountId, uint withdrawId) {
        require(
            !accounts[accountId].withdrawRequests[withdrawId].approved,
            "this request is already approved"
        );
        require(
            accounts[accountId].withdrawRequests[withdrawId].user != msg.sender,
            "You can not approve this request"
        );
        require(
            accounts[accountId].withdrawRequests[withdrawId].user != address(0),
            "this request does not exist"
        );
        require(
            !accounts[accountId].withdrawRequests[withdrawId].ownersApproved[
                msg.sender
            ],
            "you have already approved"
        );
        _;
    }

    modifier canWithdraw(uint accountId, uint withdrawId) {
        require(
            accounts[accountId].withdrawRequests[withdrawId].user == msg.sender,
            "you did not create this request"
        );
        require(
            accounts[accountId].withdrawRequests[withdrawId].approved,
            "this request is not approved"
        );
        require(
            accounts[accountId].withdrawRequests[withdrawId].approvals ==
                accounts[accountId].owners.length - 1,
            "this request doesn't have enought approvals"
        );
        _;
    }

    function deposit(uint accountId) external payable accountOwner(accountId) {
        accounts[accountId].balance += msg.value;
        emit Deposit(msg.sender, accountId, msg.value, block.timestamp);
    }

    function createAccount(address[] calldata otherOwners) external {
        // ) external validOwner(otherOwners) {
        address[] memory owners = new address[](otherOwners.length + 1);
        owners[otherOwners.length] = msg.sender;
        uint id = nextAccountId;
        for (uint idx = 0; idx < owners.length; idx++) {
            if (idx < owners.length - 1) {
                owners[idx] = otherOwners[idx];
            }
            if (userAccounts[owners[idx]].length > 2) {
                // revert("each user can have a max of 3 users");
            }
            userAccounts[owners[idx]].push(id);
        }
        accounts[id].owners = owners;
        nextAccountId++;
        emit AccountCreated(owners, id, block.timestamp);
    }

    function requestWithdrawal(
        uint accountId,
        uint amount
    ) external accountOwner(accountId) sufficentBalance(accountId, amount) {
        uint id = nextWithdrawId;
        WithdrawRequest storage request = accounts[accountId].withdrawRequests[
            id
        ];
        request.user = msg.sender;
        request.amount = amount;
        nextWithdrawId++;
        emit WithdrawRequested(
            msg.sender,
            accountId,
            id,
            amount,
            block.timestamp
        );
    }

    function approveWithdrawl(
        uint accountId,
        uint withdrawId
    ) external accountOwner(accountId) canApprove(accountId, withdrawId) {
        WithdrawRequest storage request = accounts[accountId].withdrawRequests[
            withdrawId
        ];
        request.approvals++;
        request.ownersApproved[msg.sender] = true;
        if (request.approvals == accounts[accountId].owners.length - 1) {
            request.approved = true;
        }
    }

    function withdraw(
        uint accountId,
        uint withdrawId
    ) external canWithdraw(accountId, withdrawId) {
        uint amount = accounts[accountId].withdrawRequests[withdrawId].amount;
        require(
            accounts[accountId].balance >= amount,
            "insufficient balance to withdraw"
        );
        accounts[accountId].balance -= amount;
        delete accounts[accountId].withdrawRequests[withdrawId];
        (bool sent, ) = payable(msg.sender).call{value: amount}("");
        require(sent);
        emit Withdraw(withdrawId, block.timestamp);
    }

    function getAccountDetails(
        uint accountId
    ) public view returns (address[] memory, uint) {
        Account storage account = accounts[accountId];
        return (account.owners, account.balance);
    }

    function seeWithDrawRequest(
        uint _accountId,
        uint _withdrawId
    )
        public
        view
        returns (
            address user,
            uint amount,
            uint approvals,
            bool approved,
            address[] memory approvingOwners
        )
    {
        WithdrawRequest storage request = accounts[_accountId].withdrawRequests[
            _withdrawId
        ];
        Account storage account = accounts[_accountId];

        uint approvingOwnersCount;
        for (uint i = 0; i < account.owners.length; i++) {
            if (request.ownersApproved[account.owners[i]]) {
                approvingOwnersCount++;
            }
        }

        address[] memory ownersWhoApproved = new address[](
            approvingOwnersCount
        );
        uint currentIndex;

        for (uint i = 0; i < account.owners.length; i++) {
            if (request.ownersApproved[account.owners[i]]) {
                ownersWhoApproved[currentIndex] = account.owners[i];
                currentIndex++;
            }
        }

        return (
            request.user,
            request.amount,
            request.approvals,
            request.approved,
            ownersWhoApproved
        );
    }

    function getBalance(uint accountId) public view returns (uint) {
        return accounts[accountId].balance;
    }

    function getOwners(uint accountId) public view returns (address[] memory) {
        return accounts[accountId].owners;
    }

    function getApprovals(
        uint accountId,
        uint withdrawId
    ) public view returns (uint) {
        return accounts[accountId].withdrawRequests[withdrawId].approvals;
    }

    function getAccounts() public view returns (uint256[] memory) {
        return userAccounts[msg.sender];
    }
}
