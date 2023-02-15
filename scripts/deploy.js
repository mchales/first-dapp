const hre = require("hardhat");

async function main() {  
  // const Greeter = await hre.ethers.getContractFactory("Greeter");
  // const greeter = await Greeter.deploy("Hello World");
  // await greeter.deployed();

  const Bank = await hre.ethers.getContractFactory("Bank");
  const bank = await Bank.deploy();
  await bank.deployed();

  console.log(
    `contract successfully deployed Bank to ${bank.address}`
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
