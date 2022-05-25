
const hre = require("hardhat");

async function main() {

  const NFT = await hre.ethers.getContractFactory("NFT");
  const NFTstakecoin = await hre.ethers.getContractFactory("NFTstakecoin");
  const nft = await NFT.deploy();
  const coin=await NFTstakecoin.deploy();
  const NFTstake = await hre.ethers.getContractFactory("NFTstake");
  const stake=await NFTstake.deploy(nft.address,coin.address);
  const Control=await coin.addController(stake.address);
  const Approve=await nft.setApprovalForAll(stake.address,true);
  

  

  console.log("NFT deployed to:", nft.address);
  console.log("NFTstakecoin deployed to:", coin.address);
  console.log("NFTstake deployed to:", stake.address);

}


main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
