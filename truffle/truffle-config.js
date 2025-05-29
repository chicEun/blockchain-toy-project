require("dotenv").config();
const HDWalletProvider = require("@truffle/hdwallet-provider");

module.exports = {
    networks: {
        kairos: {
            provider: () =>
                new HDWalletProvider(
                    [process.env.PRIVATE_KEY],
                    process.env.RPC_URL
                ),
            network_id: 1001,
        },
    },
    compilers: {
        solc: {
            version: "0.8.20"
        }
    },
};