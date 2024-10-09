const path = require('path');
const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');

module.exports = {
    contracts_directory: './contracts/',
    contracts_build_directory: './build/contracts/',
    networks: {
        development: {
            host: "127.0.0.1",
            port: 7545,
            network_id: "*" // Match any network id
        }
    },
    compilers: {
        solc: {
            version: "0.8.0", // Use a specific version of Solidity
        }
    }
};
