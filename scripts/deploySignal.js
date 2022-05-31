const hre = require("hardhat");

async function main() {

  // We get the contract to deploy
  const Signal = await hre.ethers.getContractFactory("Signal");
  const signal = await Signal.deploy();

  await signal.deployed();

  console.log("Signal deployed to:", signal.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
