
module.exports = {
    contracts_directory: './contracts/',
    contracts_build_directory: './build/contracts/',
    networks: {
        development: {
            host: "127.0.0.1",   // Localhost
            port: 7545,          // Port Ganache is listening on
            network_id: "*",     // Use '*' to match any network id
        },
    },
    compilers: {
        solc: {
            version: "0.8.0", // Use a specific version of Solidity
      
            optimizer: {
                enabled: true,
                runs: 200
            }
        }}
};
