const BankAccount = artifacts.require("BankAccount");

module.exports = function (deployer) {
    deployer.deploy(BankAccount);
};
