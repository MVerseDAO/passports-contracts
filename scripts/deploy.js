const { ethers, upgrades } = require("hardhat");

async function main() {
  const Passport = await ethers.getContractFactory("Passport");
  const rate_MEMBER_LEVEL1 = ethers.utils.parseEther('0.1');
  const rate_MEMBER_LEVEL2 = ethers.utils.parseEther('0.2');
  const rate_MEMBER_LEVEL3 = ethers.utils.parseEther('0.3');
  const rate_ARTIST_LEVEL1 = ethers.utils.parseEther('0.1');
  const rate_ARTIST_LEVEL2 = ethers.utils.parseEther('0.2');
  const rate_ARTIST_LEVEL3 = ethers.utils.parseEther('0.3');
  const rate_PRODUCER_LEVEL1 = ethers.utils.parseEther('0.1');
  const rate_PRODUCER_LEVEL2 = ethers.utils.parseEther('0.2');
  const rate_PRODUCER_LEVEL3 = ethers.utils.parseEther('0.3');
  const mVerseTokens = ethers.BigNumber.from('100000000000000000000000');

  const passport = await upgrades.deployProxy(Passport, [
    0, // ids of MVerse Tokens
    [1, 2, 3, 4, 5, 6, 7, 8, 9], // ids of Passports
    mVerseTokens, // max_supply of $MVerse Tokens
    [100, 50, 25, 100, 50, 25, 100, 50, 25], // max_supply of Passports
    [20, 10, 5, 20, 10, 5, 20, 10, 5], // reserved Passports (must be greater than max supply of Passports)
    [rate_MEMBER_LEVEL1, // rate
      rate_MEMBER_LEVEL2,
      rate_MEMBER_LEVEL3,
      rate_ARTIST_LEVEL1,
      rate_ARTIST_LEVEL2,
      rate_ARTIST_LEVEL3,
      rate_PRODUCER_LEVEL1,
      rate_PRODUCER_LEVEL2,
      rate_PRODUCER_LEVEL3],
    '0xC3c8f1DB927411aCd3C580DEe615bbbBB567834A'
  ]);
  await passport.deployed();
  console.log("Passport deployed to:", passport.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
});