const {
  time,
  loadFixture,
} = require("@nomicfoundation/hardhat-network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");
const { ethers, upgrades } = require("hardhat");

describe("Passport", function () {
  // We define a initializer to reuse the same setup in every test.
  // We use initializer to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function initialize() {
    const rate_MEMBER_LEVEL1 = ethers.utils.parseEther('0.1');
    const rate_MEMBER_LEVEL2 = ethers.utils.parseEther('0.2');
    const rate_MEMBER_LEVEL3 = ethers.utils.parseEther('0.3');
    const rate_ARTIST_LEVEL1 = ethers.utils.parseEther('0.1');
    const rate_ARTIST_LEVEL2 = ethers.utils.parseEther('0.2');
    const rate_ARTIST_LEVEL3 = ethers.utils.parseEther('0.3');
    const rate_PRODUCER_LEVEL1 = ethers.utils.parseEther('0.1');
    const rate_PRODUCER_LEVEL2 = ethers.utils.parseEther('0.2');
    const rate_PRODUCER_LEVEL3 = ethers.utils.parseEther('0.3');

    const inicialize_params = [
      0, // ids of MVerse Tokens
      [1, 2, 3, 4, 5, 6, 7, 8, 9], // ids of Passports
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
    ]

    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await ethers.getSigners();

    const Passport = await ethers.getContractFactory("Passport");
    const passport = await upgrades.deployProxy(Passport, inicialize_params);

    return { passport, MVERSE_TOKEN, PASSPORT_MEMBER_LEVEL_1, PASSPORT_MEMBER_LEVEL_2,
      PASSPORT_MEMBER_LEVEL_3, PASSPORT_ARTIST_LEVEL_1, PASSPORT_ARTIST_LEVEL_2,
      PASSPORT_ARTIST_LEVEL_3, PASSPORT_PRODUCER_LEVEL_1, PASSPORT_PRODUCER_LEVEL_2,
      PASSPORT_PRODUCER_LEVEL_3, SAFE_MVERSE, owner, otherAccount };
  }

  describe("Inicialization", function () {
    it("Passport supply should be greater than reserved ones", async function () {
      const rate_PASSPORT = ethers.utils.parseEther('0.1');

      const inicialize_params = [
        0, // ids of MVerse Tokens
        [1, 2, 3, 4, 5, 6, 7, 8, 9], // ids of Passports
        [100, 50, 25, 100, 50, 25, 100, 50, 25], // max_supply of Passports
        
        // reserved Passport Member_Level_1 is equal to max supply
        [100, 10, 5, 20, 10, 5, 20, 10, 5], // reserved Passports (must be greater than max supply of Passports)
        [rate_PASSPORT, rate_PASSPORT, rate_PASSPORT, rate_PASSPORT, rate_PASSPORT, rate_PASSPORT, rate_PASSPORT, rate_PASSPORT, rate_PASSPORT],
        '0xC3c8f1DB927411aCd3C580DEe615bbbBB567834A'
      ];

      // Contracts are deployed using the first signer/account by default
      const [owner, otherAccount] = await ethers.getSigners();

      const Passport = await ethers.getContractFactory("Passport");
      const passport = await upgrades.deployProxy(Passport, inicialize_params);
    
      expect(await upgrades.deployProxy(Passport, inicialize_params)).to.be.revertedWith("Supply of passports must be greater or equal than reserved");
    });
  });

  /*describe("Deployment", function () {

  });*/

  describe("Mint", function () {
    describe("mintTokens", function () {
      it("Should mint tokens", async function () {
        
      });
    });
  });
});