const { ethers, upgrades } = require("hardhat");

async function main() {
  const Passport = await ethers.getContractFactory("Passport");

  const id_MVERSE_TOKEN = 0;
  const id_PASSPORT_MEMBER_LEVEL_1 = 1;
  const id_PASSPORT_MEMBER_LEVEL_2 = 2;
  const id_PASSPORT_MEMBER_LEVEL_3 = 3;
  const id_PASSPORT_ARTIST_LEVEL_1 = 4;
  const id_PASSPORT_ARTIST_LEVEL_2 = 5;
  const id_PASSPORT_ARTIST_LEVEL_3 = 6;
  const id_PASSPORT_PRODUCER_LEVEL_1 = 7;
  const id_PASSPORT_PRODUCER_LEVEL_2 = 8;
  const id_PASSPORT_PRODUCER_LEVEL_3 = 9;
  
  const max_supply_MVERSE_TOKEN = ethers.BigNumber.from('100000000000000000000000');
  const reserved_MVERSE_TOKEN = ethers.BigNumber.from('25000000000000000000000');
  
  const max_supply_PASSPORT_MEMBER_LEVEL_1 = 100;
  const max_supply_PASSPORT_MEMBER_LEVEL_2 = 50;
  const max_supply_PASSPORT_MEMBER_LEVEL_3 = 25;
  const max_supply_PASSPORT_ARTIST_LEVEL_1 = 100;
  const max_supply_PASSPORT_ARTIST_LEVEL_2 = 50;
  const max_supply_PASSPORT_ARTIST_LEVEL_3 = 25;
  const max_supply_PASSPORT_PRODUCER_LEVEL_1 = 100;
  const max_supply_PASSPORT_PRODUCER_LEVEL_2 = 50;
  const max_supply_PASSPORT_PRODUCER_LEVEL_3 = 25;

  const reserved_PASSPORT_MEMBER_LEVEL_1 = 20;
  const reserved_PASSPORT_MEMBER_LEVEL_2 = 10;
  const reserved_PASSPORT_MEMBER_LEVEL_3 = 5;
  const reserved_PASSPORT_ARTIST_LEVEL_1 = 20;
  const reserved_PASSPORT_ARTIST_LEVEL_2 = 10;
  const reserved_PASSPORT_ARTIST_LEVEL_3 = 5;
  const reserved_PASSPORT_PRODUCER_LEVEL_1 = 20;
  const reserved_PASSPORT_PRODUCER_LEVEL_2 = 10;
  const reserved_PASSPORT_PRODUCER_LEVEL_3 = 5;

  const rate_PASSPORT_MEMBER_LEVEL_1 = ethers.utils.parseEther('0.1');
  const rate_PASSPORT_MEMBER_LEVEL_2 = ethers.utils.parseEther('0.2');
  const rate_PASSPORT_MEMBER_LEVEL_3 = ethers.utils.parseEther('0.3');
  const rate_PASSPORT_ARTIST_LEVEL_1 = ethers.utils.parseEther('0.1');
  const rate_PASSPORT_ARTIST_LEVEL_2 = ethers.utils.parseEther('0.2');
  const rate_PASSPORT_ARTIST_LEVEL_3 = ethers.utils.parseEther('0.3');
  const rate_PASSPORT_PRODUCER_LEVEL_1 = ethers.utils.parseEther('0.1');
  const rate_PASSPORT_PRODUCER_LEVEL_2 = ethers.utils.parseEther('0.2');
  const rate_PASSPORT_PRODUCER_LEVEL_3 = ethers.utils.parseEther('0.3');

  const fixed_MVERSE_TOKEN_AMOUNT_PASSPORT_MEMBER_LEVEL_1 = 200;
  const fixed_MVERSE_TOKEN_AMOUNT_PASSPORT_MEMBER_LEVEL_2 = 100;
  const fixed_MVERSE_TOKEN_AMOUNT_PASSPORT_MEMBER_LEVEL_3 = 55;
  const fixed_MVERSE_TOKEN_AMOUNT_PASSPORT_ARTIST_LEVEL_1 = 200;
  const fixed_MVERSE_TOKEN_AMOUNT_PASSPORT_ARTIST_LEVEL_2 = 100;
  const fixed_MVERSE_TOKEN_AMOUNT_PASSPORT_ARTIST_LEVEL_3 = 50;
  const fixed_MVERSE_TOKEN_AMOUNT_PASSPORT_PRODUCER_LEVEL_1 = 200;
  const fixed_MVERSE_TOKEN_AMOUNT_PASSPORT_PRODUCER_LEVEL_2 = 100;
  const fixed_MVERSE_TOKEN_AMOUNT_PASSPORT_PRODUCER_LEVEL_3 = 50;

  const isFixed_MVERSE_TOKEN_AMOUNT_PASSPORTS = true;

  const SAFE_MVERSE = "0xC3c8f1DB927411aCd3C580DEe615bbbBB567834A";

  const inicialize_params = [
    id_MVERSE_TOKEN, // id of MVerse Tokens
    [id_PASSPORT_MEMBER_LEVEL_1,
      id_PASSPORT_MEMBER_LEVEL_2,
      id_PASSPORT_MEMBER_LEVEL_3,
      id_PASSPORT_ARTIST_LEVEL_1,
      id_PASSPORT_ARTIST_LEVEL_2,
      id_PASSPORT_ARTIST_LEVEL_3,
      id_PASSPORT_PRODUCER_LEVEL_1,
      id_PASSPORT_PRODUCER_LEVEL_2,
      id_PASSPORT_PRODUCER_LEVEL_3], // ids of Passports
    max_supply_MVERSE_TOKEN,
    reserved_MVERSE_TOKEN,
    [max_supply_PASSPORT_MEMBER_LEVEL_1,
      max_supply_PASSPORT_MEMBER_LEVEL_2,
      max_supply_PASSPORT_MEMBER_LEVEL_3,
      max_supply_PASSPORT_ARTIST_LEVEL_1,
      max_supply_PASSPORT_ARTIST_LEVEL_2,
      max_supply_PASSPORT_ARTIST_LEVEL_3,
      max_supply_PASSPORT_PRODUCER_LEVEL_1,
      max_supply_PASSPORT_PRODUCER_LEVEL_2,
      max_supply_PASSPORT_PRODUCER_LEVEL_3], // max_supply of Passports
    [reserved_PASSPORT_MEMBER_LEVEL_1,
      reserved_PASSPORT_MEMBER_LEVEL_2,
      reserved_PASSPORT_MEMBER_LEVEL_3,
      reserved_PASSPORT_ARTIST_LEVEL_1,
      reserved_PASSPORT_ARTIST_LEVEL_2,
      reserved_PASSPORT_ARTIST_LEVEL_3,
      reserved_PASSPORT_PRODUCER_LEVEL_1,
      reserved_PASSPORT_PRODUCER_LEVEL_2,
      reserved_PASSPORT_PRODUCER_LEVEL_3], // reserved Passports (must be greater than max supply of Passports)
    [rate_PASSPORT_MEMBER_LEVEL_1, // rate
      rate_PASSPORT_MEMBER_LEVEL_2,
      rate_PASSPORT_MEMBER_LEVEL_3,
      rate_PASSPORT_ARTIST_LEVEL_1,
      rate_PASSPORT_ARTIST_LEVEL_2,
      rate_PASSPORT_ARTIST_LEVEL_3,
      rate_PASSPORT_PRODUCER_LEVEL_1,
      rate_PASSPORT_PRODUCER_LEVEL_2,
      rate_PASSPORT_PRODUCER_LEVEL_3],
    [fixed_MVERSE_TOKEN_AMOUNT_PASSPORT_MEMBER_LEVEL_1, // fixed_MVERSE_TOKEN_AMOUNT
      fixed_MVERSE_TOKEN_AMOUNT_PASSPORT_MEMBER_LEVEL_2,
      fixed_MVERSE_TOKEN_AMOUNT_PASSPORT_MEMBER_LEVEL_3,
      fixed_MVERSE_TOKEN_AMOUNT_PASSPORT_ARTIST_LEVEL_1,
      fixed_MVERSE_TOKEN_AMOUNT_PASSPORT_ARTIST_LEVEL_2,
      fixed_MVERSE_TOKEN_AMOUNT_PASSPORT_ARTIST_LEVEL_3,
      fixed_MVERSE_TOKEN_AMOUNT_PASSPORT_PRODUCER_LEVEL_1,
      fixed_MVERSE_TOKEN_AMOUNT_PASSPORT_PRODUCER_LEVEL_2,
      fixed_MVERSE_TOKEN_AMOUNT_PASSPORT_PRODUCER_LEVEL_3],
    isFixed_MVERSE_TOKEN_AMOUNT_PASSPORTS,
    SAFE_MVERSE
  ];

  const passport = await upgrades.deployProxy(Passport, inicialize_params);
  await passport.deployed();
  console.log("Passport deployed to:", passport.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
});