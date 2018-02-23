module.exports = {
    networks: {
        development: {
            gas: 4700000,
            gasPrice: 2000000,
            host: "localhost",
            port: 8545,
            network_id: "*" // Match any network id
        }
    }
};
