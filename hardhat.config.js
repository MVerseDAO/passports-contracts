require("@nomicfoundation/hardhat-toolbox");
require('@openzeppelin/hardhat-upgrades');
require('dotenv').config();
require('ethers');

/*
npx hardhat accounts --network localhost
return the list of accounts and their balances

0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266 (10000 ETH)
0x70997970C51812dc3A010C7d01b50e0d17dc79C8 (10000 ETH)
...
*/
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();
  const provider = hre.ethers.provider;

  for (const account of accounts) {
      console.log(
          "%s (%i ETH)",
          account.address,
          hre.ethers.utils.formatEther(
              // getBalance returns wei amount, format to ETH amount
              await provider.getBalance(account.address)
          )
      );
  }
});

const {  ALCHEMY_API_KEY, MUMBAI_PRIVATE_KEY, MUMBAI_PRIVATE_KEY_2, POLYGONSCAN_API_KEY } = process.env;
module.exports = {
  defaultNetwork: "mumbai",
  networks: {
    hardhat: {
    },
    mumbai: {
      url: `https://polygon-mumbai.g.alchemy.com/v2/${ALCHEMY_API_KEY}`,
      accounts: [`0x${MUMBAI_PRIVATE_KEY}`],
      //gasPrice: 8000000000, // default is 'auto' which breaks chains without the london hardfork
    }
  },
  solidity: {
    version: "0.8.9",
    settings: {
      optimizer: {
        enabled: true,
        runs: 5
      }
    }
  },
  etherscan: {
    apiKey: {
      polygonMumbai: POLYGONSCAN_API_KEY
    }
  },
}