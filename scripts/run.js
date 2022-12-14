// npx hardhat run scripts/run.js
const main = async () => {
  //hre is a global variable that is injected by Hardhat Runtime Environment
  const [owner, randomPerson] = await hre.ethers.getSigners();
  const waveContractFactory = await hre.ethers.getContractFactory("WavePortal");
  const waveContract = await waveContractFactory.deploy({
    value: hre.ethers.utils.parseEther("0.1"),
  });
  await waveContract.deployed();
  console.log("Contract deployed to:", waveContract.address);
  console.log("Contract deployed by:", owner.address);
  let waveCount;
  waveCount = await waveContract.getTotalWaves();
  //   owner waves
  let waveTxn = await waveContract.wave("Hello ji, kase ho?");
  await waveTxn.wait();
  waveCount = await waveContract.getTotalWaves();
  //   random person waves
  waveTxn = await waveContract.connect(randomPerson).wave("Bdhiya");
  await waveTxn.wait();
  //   random person waves, error must come for cooldown
  waveTxn = await waveContract.connect(randomPerson).wave("Bdhiya");
  await waveTxn.wait();
  waveCount = await waveContract.getTotalWaves();
  const allWaves = await waveContract.getAllWaves();
  console.log(allWaves);
};

const runMain = async () => {
  try {
    await main();
    process.exit(0); // exit Node process without error
  } catch (error) {
    console.log(error);
    process.exit(1); // exit Node process while indicating 'Uncaught Fatal Exception' error
  }
  // Read more about Node exit ('process.exit(num)') status codes here: https://stackoverflow.com/a/47163396/7974948
};

runMain();
