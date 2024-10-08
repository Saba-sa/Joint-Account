// Import the contract
const BankAccount = artifacts.require("BankAccount");

// Export the migration function
module.exports = function (deployer) {
    // Deploy the contract
    deployer.deploy(BankAccount);
};
