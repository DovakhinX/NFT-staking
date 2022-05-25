require("@nomiclabs/hardhat-waffle");

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity:{
    compilers: [
      {
        version: "0.8.4",
      },
      {
        version: "0.8.0",
      },],
  } ,
  paths:{
    artifacts:'./src/artifacts'
},
networks:{
  hardhat:{
    chainId:1337
  },
 rinkeby:{
  url:"https://rinkeby.infura.io/v3/472739effd8947e79e60443a074a373c",
  accounts:["61eeecc4a203caf5fea429c51b14a479feca9ca67f27c447a34aa634cd14dff8"]
 },
}

};
