/* eslint-disable no-undef */
require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.19",
  paths: {
    artifacts: './src/artifacts',
  },
  networks: {
    matic: {
      url: "https://polygon-mumbai.g.alchemy.com/v2/FDC2B9J-8HsSw3GU65WRk6AjDnPynVWS",
      accounts: ["df57089febbacf7ba0bc227dafbffa9fc08a93fdc68e1e42411a14efcf23656e"]
    }
  }
};
