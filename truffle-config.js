
module.exports = {
    contracts_directory: './contracts/',
    contracts_build_directory: './build/contracts/',
    networks: {
        moonbaseAlpha: {
            host: "127.0.0.1",
            port: 7545,
            network_id: 1287,
            gas: 12000000,
            gasPrice: 1000000000,
        }
    },
    compilers: {
        solc: {
            version: "0.8.4", // Use a specific version of Solidity

            optimizer: {
                enabled: true,
                runs: 200
            }
        }
    }
};
