const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");
const { ethers, upgrades } = require("hardhat");

describe("Passport", function () {
  // initializing variables of rate, id, max_supply, reserved of PASSPORTS
  const rate_PASSPORT_MEMBER_LEVEL_1 = ethers.utils.parseEther('0.1');
  const rate_PASSPORT_MEMBER_LEVEL_2 = ethers.utils.parseEther('0.2');
  const rate_PASSPORT_MEMBER_LEVEL_3 = ethers.utils.parseEther('0.3');
  const rate_PASSPORT_ARTIST_LEVEL_1 = ethers.utils.parseEther('0.1');
  const rate_PASSPORT_ARTIST_LEVEL_2 = ethers.utils.parseEther('0.2');
  const rate_PASSPORT_ARTIST_LEVEL_3 = ethers.utils.parseEther('0.3');
  const rate_PASSPORT_PRODUCER_LEVEL_1 = ethers.utils.parseEther('0.1');
  const rate_PASSPORT_PRODUCER_LEVEL_2 = ethers.utils.parseEther('0.2');
  const rate_PASSPORT_PRODUCER_LEVEL_3 = ethers.utils.parseEther('0.3');
  const max_supply_MVERSE_TOKEN = ethers.BigNumber.from('100000000000000000000000');

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

  const fixed_MVERSE_TOKEN_AMOUNT_PASSPORT_MEMBER_LEVEL_1 = 200;
  const fixed_MVERSE_TOKEN_AMOUNT_PASSPORT_MEMBER_LEVEL_2 = 100;
  const fixed_MVERSE_TOKEN_AMOUNT_PASSPORT_MEMBER_LEVEL_3 = 55;
  const fixed_MVERSE_TOKEN_AMOUNT_PASSPORT_ARTIST_LEVEL_1 = 200;
  const fixed_MVERSE_TOKEN_AMOUNT_PASSPORT_ARTIST_LEVEL_2 = 100;
  const fixed_MVERSE_TOKEN_AMOUNT_PASSPORT_ARTIST_LEVEL_3 = 50;
  const fixed_MVERSE_TOKEN_AMOUNT_PASSPORT_PRODUCER_LEVEL_1 = 200;
  const fixed_MVERSE_TOKEN_AMOUNT_PASSPORT_PRODUCER_LEVEL_2 = 100;
  const fixed_MVERSE_TOKEN_AMOUNT_PASSPORT_PRODUCER_LEVEL_3 = 50;

  const SAFE_MVERSE = "0xC3c8f1DB927411aCd3C580DEe615bbbBB567834A";

  const isFixed_MVERSE_TOKEN_AMOUNT_PASSPORTS = true;

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
  
  // We define a initializer to reuse the same setup in every test.
  // We use initializer to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function initialize() {
    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await ethers.getSigners();

    const Passport = await ethers.getContractFactory("Passport");
    const passport = await upgrades.deployProxy(Passport, inicialize_params);

    return { passport, owner, otherAccount };
  }

  // We define a initializer_signer to reuse the same setup in every test.
  // We use initializer_signer to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function initialize_signer() {
    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await ethers.getSigners();

    const Passport = await ethers.getContractFactory("Passport");
    const passport = await upgrades.deployProxy(Passport, inicialize_params);

    const signer = await passport.provider.getSigners()[1];
    const passport_signer = await ethers.getContractAt("Passport", passport.address, signer);

    return { passport_signer, signer, owner, otherAccount };
  }

  describe("Inicialization", function () {
    it("Passport supply should be greater than reserved ones (1)", async function () {
      const rate_PASSPORT = ethers.utils.parseEther('0.1');

      const inicialize_params = [
        0, // id of MVerse Tokens
        [1, 2, 3, 4, 5, 6, 7, 8, 9], // ids of Passports
        max_supply_MVERSE_TOKEN,
        [100, 50, 25, 100, 50, 25, 100, 50, 25], // max_supply of Passports
        // reserved Passport Member_Level_1 is equal to max supply
        [101, 10, 5, 20, 10, 5, 20, 10, 5], // reserved Passports (must be greater than max supply of Passports)
        [rate_PASSPORT, rate_PASSPORT, rate_PASSPORT, rate_PASSPORT, rate_PASSPORT, rate_PASSPORT, rate_PASSPORT, rate_PASSPORT, rate_PASSPORT],
        [200, 100, 50, 200, 100, 50, 200, 100, 50],
        true,
        SAFE_MVERSE
      ];

        // Contracts are deployed using the first signer/account by default
      const Passport = await ethers.getContractFactory("Passport");

      await expect(upgrades.deployProxy(Passport, inicialize_params)).to.be.revertedWith("Supply of passports must be greater or equal than reserved");
    });

    it("Passport supply should be greater than reserved ones (2)", async function () {
      const rate_PASSPORT = ethers.utils.parseEther('0.1');

      const inicialize_params = [
        0, // id of MVerse Tokens
        [1, 2, 3, 4, 5, 6, 7, 8, 9], // ids of Passports
        max_supply_MVERSE_TOKEN,
        [100, 50, 25, 100, 50, 25, 100, 50, 25], // max_supply of Passports
        // reserved Passport Member_Level_1 is equal to max supply
        [20, 10, 5, 20, 10, 5, 20, 10, 50], // reserved Passports (must be greater than max supply of Passports)
        [rate_PASSPORT, rate_PASSPORT, rate_PASSPORT, rate_PASSPORT, rate_PASSPORT, rate_PASSPORT, rate_PASSPORT, rate_PASSPORT, rate_PASSPORT],
        [200, 100, 50, 200, 100, 50, 200, 100, 50],
        true,
        SAFE_MVERSE
      ];

      // Contracts are deployed using the first signer/account by default
      const Passport = await ethers.getContractFactory("Passport");

      await expect(upgrades.deployProxy(Passport, inicialize_params)).to.be.revertedWith("Supply of passports must be greater or equal than reserved");
    });

    it("Arrays must have the same length (1)", async function () {
      const rate_PASSPORT = ethers.utils.parseEther('0.1');

      const inicialize_params = [
        0, // id of MVerse Tokens
        /*->>>one length less<<<-*/[1, 2, 3, 4, 5, 6, 7, 8], // ids of Passports
        max_supply_MVERSE_TOKEN,
        [100, 50, 25, 100, 50, 25, 100, 50, 25], // max_supply of Passports
        // reserved Passport Member_Level_1 is equal to max supply
        [20, 10, 5, 20, 10, 5, 20, 10, 5], // reserved Passports (must be greater than max supply of Passports)
        [rate_PASSPORT, rate_PASSPORT, rate_PASSPORT, rate_PASSPORT, rate_PASSPORT, rate_PASSPORT, rate_PASSPORT, rate_PASSPORT, rate_PASSPORT],
        [200, 100, 50, 200, 100, 50, 200, 100, 50],
        true,
        SAFE_MVERSE
      ];

      // Contracts are deployed using the first signer/account by default
      const Passport = await ethers.getContractFactory("Passport");
    
      await expect(upgrades.deployProxy(Passport, inicialize_params)).to.be.revertedWith("Length of arrays _PASSPORTS, _supply_PASSPORTS, _rate_PASSPORTS, _reserved_PASSPORTS and _fixed_MVERSE_TOKEN_AMOUNT_PASSPORTS must be the same");
    });

    it("Arrays must have the same length (2)", async function () {
      const rate_PASSPORT = ethers.utils.parseEther('0.1');

      const inicialize_params = [
        0, // id of MVerse Tokens
        [1, 2, 3, 4, 5, 6, 7, 8, 9], // ids of Passports
        max_supply_MVERSE_TOKEN,
        /*->>>one length less<<<-*/[100, 50, 25, 100, 50, 25, 100, 50], // max_supply of Passports
        // reserved Passport Member_Level_1 is equal to max supply
        [20, 10, 5, 20, 10, 5, 20, 10, 5], // reserved Passports (must be greater than max supply of Passports)
        [rate_PASSPORT, rate_PASSPORT, rate_PASSPORT, rate_PASSPORT, rate_PASSPORT, rate_PASSPORT, rate_PASSPORT, rate_PASSPORT, rate_PASSPORT],
        [200, 100, 50, 200, 100, 50, 200, 100, 50],
        true,
        SAFE_MVERSE
      ];

      // Contracts are deployed using the first signer/account by default
      const Passport = await ethers.getContractFactory("Passport");

      await expect(upgrades.deployProxy(Passport, inicialize_params)).to.be.revertedWith("Length of arrays _PASSPORTS, _supply_PASSPORTS, _rate_PASSPORTS, _reserved_PASSPORTS and _fixed_MVERSE_TOKEN_AMOUNT_PASSPORTS must be the same");
    });

    it("Arrays must have the same length (3)", async function () {
      const rate_PASSPORT = ethers.utils.parseEther('0.1');

      const inicialize_params = [
        0, // id of MVerse Tokens
        [1, 2, 3, 4, 5, 6, 7, 8, 9], // ids of Passports
        max_supply_MVERSE_TOKEN,
        [100, 50, 25, 100, 50, 25, 100, 50, 25], // max_supply of Passports
        // reserved Passport Member_Level_1 is equal to max supply
        /*->>>one length less<<<-*/ [20, 10, 5, 20, 10, 5, 20, 10], // reserved Passports (must be greater than max supply of Passports)
        [rate_PASSPORT, rate_PASSPORT, rate_PASSPORT, rate_PASSPORT, rate_PASSPORT, rate_PASSPORT, rate_PASSPORT, rate_PASSPORT, rate_PASSPORT],
        [200, 100, 50, 200, 100, 50, 200, 100, 50],
        true,
        SAFE_MVERSE
      ];

      // Contracts are deployed using the first signer/account by default
      const Passport = await ethers.getContractFactory("Passport");
    
      await expect(upgrades.deployProxy(Passport, inicialize_params)).to.be.revertedWith("Length of arrays _PASSPORTS, _supply_PASSPORTS, _rate_PASSPORTS, _reserved_PASSPORTS and _fixed_MVERSE_TOKEN_AMOUNT_PASSPORTS must be the same");
    });

    it("Arrays must have the same length (4)", async function () {
      const rate_PASSPORT = ethers.utils.parseEther('0.1');

      const inicialize_params = [
        0, // id of MVerse Tokens
        [1, 2, 3, 4, 5, 6, 7, 8, 9], // ids of Passports
        max_supply_MVERSE_TOKEN,
        [100, 50, 25, 100, 50, 25, 100, 50, 25], // max_supply of Passports
        // reserved Passport Member_Level_1 is equal to max supply
        [20, 10, 5, 20, 10, 5, 20, 10, 5], // reserved Passports (must be greater than max supply of Passports)
        /*->>>one length less<<<-*/[rate_PASSPORT, rate_PASSPORT, rate_PASSPORT, rate_PASSPORT, rate_PASSPORT, rate_PASSPORT, rate_PASSPORT, rate_PASSPORT],
        [200, 100, 50, 200, 100, 50, 200, 100, 50],
        true,
        SAFE_MVERSE
      ];

      // Contracts are deployed using the first signer/account by default
      const Passport = await ethers.getContractFactory("Passport");
    
      await expect(upgrades.deployProxy(Passport, inicialize_params)).to.be.revertedWith("Length of arrays _PASSPORTS, _supply_PASSPORTS, _rate_PASSPORTS, _reserved_PASSPORTS and _fixed_MVERSE_TOKEN_AMOUNT_PASSPORTS must be the same");
    });

    it("Arrays must have the same length (5)", async function () {
      const rate_PASSPORT = ethers.utils.parseEther('0.1');

      const inicialize_params = [
        0, // id of MVerse Tokens
        [1, 2, 3, 4, 5, 6, 7, 8, 9], // ids of Passports
        max_supply_MVERSE_TOKEN,
        [100, 50, 25, 100, 50, 25, 100, 50, 25], // max_supply of Passports
        // reserved Passport Member_Level_1 is equal to max supply
        [20, 10, 5, 20, 10, 5, 20, 10, 5], // reserved Passports (must be greater than max supply of Passports)
        [rate_PASSPORT, rate_PASSPORT, rate_PASSPORT, rate_PASSPORT, rate_PASSPORT, rate_PASSPORT, rate_PASSPORT, rate_PASSPORT, rate_PASSPORT],
        /*->>>one length less<<<-*/[100, 50, 200, 100, 50, 200, 100, 50],
        true,
        SAFE_MVERSE
      ];

      // Contracts are deployed using the first signer/account by default
      const Passport = await ethers.getContractFactory("Passport");
    
      await expect(upgrades.deployProxy(Passport, inicialize_params)).to.be.revertedWith("Length of arrays _PASSPORTS, _supply_PASSPORTS, _rate_PASSPORTS, _reserved_PASSPORTS and _fixed_MVERSE_TOKEN_AMOUNT_PASSPORTS must be the same");
    });
  });
    

  describe("Deployment", function () {
    it("Should set right id_MVERSE_TOKEN", async function () {
      const { passport } = await loadFixture(initialize);

      expect(await passport.tokenExists(id_MVERSE_TOKEN, false)).to.equal(true);
    });

    it("Should not found id_MVERSE_TOKEN : testing function tokenExists", async function () {
      const { passport } = await loadFixture(initialize);

      expect(await passport.tokenExists(id_MVERSE_TOKEN, true)).to.equal(false);
    });
    
    it("Should set right id_PASSPORT_MEMBER_LEVEL_1", async function () {
      const { passport } = await loadFixture(initialize);

      expect(await passport.tokenExists(id_PASSPORT_MEMBER_LEVEL_1, true)).to.equal(true);
    });

    it("Should set right id_PASSPORT_MEMBER_LEVEL_2", async function () {
      const { passport } = await loadFixture(initialize);

      expect(await passport.tokenExists(id_PASSPORT_MEMBER_LEVEL_2, true)).to.equal(true);
    });

    it("Should set right id_PASSPORT_MEMBER_LEVEL_3", async function () {
      const { passport } = await loadFixture(initialize);

      expect(await passport.tokenExists(id_PASSPORT_MEMBER_LEVEL_3, true)).to.equal(true);
    });

    it("Should set right id_PASSPORT_ARTIST_LEVEL_1", async function () {
      const { passport } = await loadFixture(initialize);

      expect(await passport.tokenExists(id_PASSPORT_ARTIST_LEVEL_1, true)).to.equal(true);
    });

    it("Should set right id_PASSPORT_ARTIST_LEVEL_2", async function () {
      const { passport } = await loadFixture(initialize);

      expect(await passport.tokenExists(id_PASSPORT_ARTIST_LEVEL_2, true)).to.equal(true);
    });

    it("Should set right id_PASSPORT_ARTIST_LEVEL_3", async function () {
      const { passport } = await loadFixture(initialize);

      expect(await passport.tokenExists(id_PASSPORT_ARTIST_LEVEL_3, true)).to.equal(true);
    });

    it("Should set right id_PASSPORT_PRODUCER_LEVEL_1", async function () {
      const { passport } = await loadFixture(initialize);

      expect(await passport.tokenExists(id_PASSPORT_PRODUCER_LEVEL_1, true)).to.equal(true);
    });

    it("Should set right id_PASSPORT_PRODUCER_LEVEL_2", async function () {
      const { passport } = await loadFixture(initialize);

      expect(await passport.tokenExists(id_PASSPORT_PRODUCER_LEVEL_2, true)).to.equal(true);
    });

    it("Should set right id_PASSPORT_PRODUCER_LEVEL_3", async function () {
      const { passport } = await loadFixture(initialize);

      expect(await passport.tokenExists(id_PASSPORT_PRODUCER_LEVEL_3, true)).to.equal(true);
    });

    it("Should set right rate_PASSPORT_MEMBER_LEVEL_1", async function () {
      const { passport } = await loadFixture(initialize);

      expect(await passport.getRate(id_PASSPORT_MEMBER_LEVEL_1)).to.equal(rate_PASSPORT_MEMBER_LEVEL_1);
    });

    it("Should set right rate_PASSPORT_MEMBER_LEVEL_2", async function () {
      const { passport } = await loadFixture(initialize);

      expect(await passport.getRate(id_PASSPORT_MEMBER_LEVEL_2)).to.equal(rate_PASSPORT_MEMBER_LEVEL_2);
    });

    it("Should set right rate_PASSPORT_MEMBER_LEVEL_3", async function () {
      const { passport } = await loadFixture(initialize);

      expect(await passport.getRate(id_PASSPORT_MEMBER_LEVEL_3)).to.equal(rate_PASSPORT_MEMBER_LEVEL_3);
    });

    it("Should set right rate_PASSPORT_ARTIST_LEVEL_1", async function () {
      const { passport } = await loadFixture(initialize);

      expect(await passport.getRate(id_PASSPORT_ARTIST_LEVEL_1)).to.equal(rate_PASSPORT_ARTIST_LEVEL_1);
    });

    it("Should set right rate_PASSPORT_ARTIST_LEVEL_2", async function () {
      const { passport } = await loadFixture(initialize);

      expect(await passport.getRate(id_PASSPORT_ARTIST_LEVEL_2)).to.equal(rate_PASSPORT_ARTIST_LEVEL_2);
    });

    it("Should set right rate_PASSPORT_ARTIST_LEVEL_3", async function () {
      const { passport } = await loadFixture(initialize);

      expect(await passport.getRate(id_PASSPORT_ARTIST_LEVEL_3)).to.equal(rate_PASSPORT_ARTIST_LEVEL_3);
    });

    it("Should set right rate_PASSPORT_PRODUCER_LEVEL_1", async function () {
      const { passport } = await loadFixture(initialize);

      expect(await passport.getRate(id_PASSPORT_PRODUCER_LEVEL_1)).to.equal(rate_PASSPORT_PRODUCER_LEVEL_1);
    });

    it("Should set right rate_PASSPORT_PRODUCER_LEVEL_2", async function () {
      const { passport } = await loadFixture(initialize);

      expect(await passport.getRate(id_PASSPORT_PRODUCER_LEVEL_2)).to.equal(rate_PASSPORT_PRODUCER_LEVEL_2);
    });

    it("Should set right rate_PASSPORT_PRODUCER_LEVEL_3", async function () {
      const { passport } = await loadFixture(initialize);

      expect(await passport.getRate(id_PASSPORT_PRODUCER_LEVEL_3)).to.equal(rate_PASSPORT_PRODUCER_LEVEL_3);
    });
    
    it("Should set right reserved_PASSPORT_MEMBER_LEVEL_1", async function () {
      const { passport } = await loadFixture(initialize);

      expect(await passport.getReserved(id_PASSPORT_MEMBER_LEVEL_1)).to.equal(reserved_PASSPORT_MEMBER_LEVEL_1);
    });

    it("Should set right reserved_PASSPORT_MEMBER_LEVEL_2", async function () {
      const { passport } = await loadFixture(initialize);

      expect(await passport.getReserved(id_PASSPORT_MEMBER_LEVEL_2)).to.equal(reserved_PASSPORT_MEMBER_LEVEL_2);
    });

    it("Should set right reserved_PASSPORT_MEMBER_LEVEL_3", async function () {
      const { passport } = await loadFixture(initialize);

      expect(await passport.getReserved(id_PASSPORT_MEMBER_LEVEL_3)).to.equal(reserved_PASSPORT_MEMBER_LEVEL_3);
    });

    it("Should set right reserved_PASSPORT_ARTIST_LEVEL_1", async function () {
      const { passport } = await loadFixture(initialize);

      expect(await passport.getReserved(id_PASSPORT_ARTIST_LEVEL_1)).to.equal(reserved_PASSPORT_ARTIST_LEVEL_1);
    });

    it("Should set right reserved_PASSPORT_ARTIST_LEVEL_2", async function () {
      const { passport } = await loadFixture(initialize);

      expect(await passport.getReserved(id_PASSPORT_ARTIST_LEVEL_2)).to.equal(reserved_PASSPORT_ARTIST_LEVEL_2);
    });

    it("Should set right reserved_PASSPORT_ARTIST_LEVEL_3", async function () {
      const { passport } = await loadFixture(initialize);

      expect(await passport.getReserved(id_PASSPORT_ARTIST_LEVEL_3)).to.equal(reserved_PASSPORT_ARTIST_LEVEL_3);
    });

    it("Should set right reserved_PASSPORT_PRODUCER_LEVEL_1", async function () {
      const { passport } = await loadFixture(initialize);

      expect(await passport.getReserved(id_PASSPORT_PRODUCER_LEVEL_1)).to.equal(reserved_PASSPORT_PRODUCER_LEVEL_1);
    });

    it("Should set right reserved_PASSPORT_PRODUCER_LEVEL_2", async function () {
      const { passport } = await loadFixture(initialize);

      expect(await passport.getReserved(id_PASSPORT_PRODUCER_LEVEL_2)).to.equal(reserved_PASSPORT_PRODUCER_LEVEL_2);
    });

    it("Should set right reserved_PASSPORT_PRODUCER_LEVEL_3", async function () {
      const { passport } = await loadFixture(initialize);

      expect(await passport.getReserved(id_PASSPORT_PRODUCER_LEVEL_3)).to.equal(reserved_PASSPORT_PRODUCER_LEVEL_3);
    });

    it("Should set right max_supply_PASSPORT_MEMBER_LEVEL_1", async function () {
      const { passport } = await loadFixture(initialize);

      expect(await passport.getMaxSupply(id_PASSPORT_MEMBER_LEVEL_1)).to.equal(max_supply_PASSPORT_MEMBER_LEVEL_1);
    });

    it("Should set right max_supply_PASSPORT_MEMBER_LEVEL_2", async function () {
      const { passport } = await loadFixture(initialize);

      expect(await passport.getMaxSupply(id_PASSPORT_MEMBER_LEVEL_2)).to.equal(max_supply_PASSPORT_MEMBER_LEVEL_2);
    });

    it("Should set right max_supply_PASSPORT_MEMBER_LEVEL_3", async function () {
      const { passport } = await loadFixture(initialize);

      expect(await passport.getMaxSupply(id_PASSPORT_MEMBER_LEVEL_3)).to.equal(max_supply_PASSPORT_MEMBER_LEVEL_3);
    });

    it("Should set right max_supply_PASSPORT_ARTIST_LEVEL_1", async function () {
      const { passport } = await loadFixture(initialize);

      expect(await passport.getMaxSupply(id_PASSPORT_ARTIST_LEVEL_1)).to.equal(max_supply_PASSPORT_ARTIST_LEVEL_1);
    });

    it("Should set right max_supply_PASSPORT_ARTIST_LEVEL_2", async function () {
      const { passport } = await loadFixture(initialize);

      expect(await passport.getMaxSupply(id_PASSPORT_ARTIST_LEVEL_2)).to.equal(max_supply_PASSPORT_ARTIST_LEVEL_2);
    });

    it("Should set right max_supply_PASSPORT_ARTIST_LEVEL_3", async function () {
      const { passport } = await loadFixture(initialize);

      expect(await passport.getMaxSupply(id_PASSPORT_ARTIST_LEVEL_3)).to.equal(max_supply_PASSPORT_ARTIST_LEVEL_3);
    });

    it("Should set right max_supply_PASSPORT_PRODUCER_LEVEL_1", async function () {
      const { passport } = await loadFixture(initialize);

      expect(await passport.getMaxSupply(id_PASSPORT_PRODUCER_LEVEL_1)).to.equal(max_supply_PASSPORT_PRODUCER_LEVEL_1);
    });

    it("Should set right max_supply_PASSPORT_PRODUCER_LEVEL_2", async function () {
      const { passport } = await loadFixture(initialize);

      expect(await passport.getMaxSupply(id_PASSPORT_PRODUCER_LEVEL_2)).to.equal(max_supply_PASSPORT_PRODUCER_LEVEL_2);
    });

    it("Should set right max_supply_PASSPORT_PRODUCER_LEVEL_3", async function () {
      const { passport } = await loadFixture(initialize);

      expect(await passport.getMaxSupply(id_PASSPORT_PRODUCER_LEVEL_3)).to.equal(max_supply_PASSPORT_PRODUCER_LEVEL_3);
    });

    it("Should set right minted_MVERSE_TOKEN", async function () {
      const { passport } = await loadFixture(initialize);

      expect(await passport.getMinted(id_MVERSE_TOKEN)).to.equal(0);
    });

    it("Should set right minted_PASSPORT_MEMBER_LEVEL_1", async function () {
      const { passport } = await loadFixture(initialize);

      expect(await passport.getMinted(id_PASSPORT_MEMBER_LEVEL_1)).to.equal(0);
    });

    it("Should set right minted_PASSPORT_MEMBER_LEVEL_2", async function () {
      const { passport } = await loadFixture(initialize);

      expect(await passport.getMinted(id_PASSPORT_MEMBER_LEVEL_2)).to.equal(0);
    });

    it("Should set right minted_PASSPORT_MEMBER_LEVEL_3", async function () {
      const { passport } = await loadFixture(initialize);

      expect(await passport.getMinted(id_PASSPORT_MEMBER_LEVEL_3)).to.equal(0);
    });

    it("Should set right minted_PASSPORT_ARTIST_LEVEL_1", async function () {
      const { passport } = await loadFixture(initialize);

      expect(await passport.getMinted(id_PASSPORT_ARTIST_LEVEL_1)).to.equal(0);
    });

    it("Should set right minted_PASSPORT_ARTIST_LEVEL_2", async function () {
      const { passport } = await loadFixture(initialize);

      expect(await passport.getMinted(id_PASSPORT_ARTIST_LEVEL_2)).to.equal(0);
    });

    it("Should set right minted_PASSPORT_ARTIST_LEVEL_3", async function () {
      const { passport } = await loadFixture(initialize);

      expect(await passport.getMinted(id_PASSPORT_ARTIST_LEVEL_3)).to.equal(0);
    });

    it("Should set right minted_PASSPORT_PRODUCER_LEVEL_1", async function () {
      const { passport } = await loadFixture(initialize);

      expect(await passport.getMinted(id_PASSPORT_PRODUCER_LEVEL_1)).to.equal(0);
    });

    it("Should set right minted_PASSPORT_PRODUCER_LEVEL_2", async function () {
      const { passport } = await loadFixture(initialize);

      expect(await passport.getMinted(id_PASSPORT_PRODUCER_LEVEL_2)).to.equal(0);
    });

    it("Should set right minted_PASSPORT_PRODUCER_LEVEL_3", async function () {
      const { passport } = await loadFixture(initialize);

      expect(await passport.getMinted(id_PASSPORT_PRODUCER_LEVEL_3)).to.equal(0);
    });

    it("Should set right fixed_MVERSE_TOKEN_AMOUNT_PASSPORT_MEMBER_LEVEL_1", async function () {
      const { passport } = await loadFixture(initialize);

      expect(await passport.getFixedMVerseTokenAmount(id_PASSPORT_MEMBER_LEVEL_1)).to.equal(fixed_MVERSE_TOKEN_AMOUNT_PASSPORT_MEMBER_LEVEL_1);
    });

    it("Should set right fixed_MVERSE_TOKEN_AMOUNT_PASSPORT_MEMBER_LEVEL_2", async function () {
      const { passport } = await loadFixture(initialize);

      expect(await passport.getFixedMVerseTokenAmount(id_PASSPORT_MEMBER_LEVEL_2)).to.equal(fixed_MVERSE_TOKEN_AMOUNT_PASSPORT_MEMBER_LEVEL_2);
    });

    it("Should set right fixed_MVERSE_TOKEN_AMOUNT_PASSPORT_MEMBER_LEVEL_3", async function () {
      const { passport } = await loadFixture(initialize);

      expect(await passport.getFixedMVerseTokenAmount(id_PASSPORT_MEMBER_LEVEL_3)).to.equal(fixed_MVERSE_TOKEN_AMOUNT_PASSPORT_MEMBER_LEVEL_3);
    });

    it("Should set right fixed_MVERSE_TOKEN_AMOUNT_PASSPORT_ARTIST_LEVEL_1", async function () {
      const { passport } = await loadFixture(initialize);

      expect(await passport.getFixedMVerseTokenAmount(id_PASSPORT_ARTIST_LEVEL_1)).to.equal(fixed_MVERSE_TOKEN_AMOUNT_PASSPORT_ARTIST_LEVEL_1);
    });

    it("Should set right fixed_MVERSE_TOKEN_AMOUNT_PASSPORT_ARTIST_LEVEL_2", async function () {
      const { passport } = await loadFixture(initialize);

      expect(await passport.getFixedMVerseTokenAmount(id_PASSPORT_ARTIST_LEVEL_2)).to.equal(fixed_MVERSE_TOKEN_AMOUNT_PASSPORT_ARTIST_LEVEL_2);
    });

    it("Should set right fixed_MVERSE_TOKEN_AMOUNT_PASSPORT_ARTIST_LEVEL_3", async function () {
      const { passport } = await loadFixture(initialize);

      expect(await passport.getFixedMVerseTokenAmount(id_PASSPORT_ARTIST_LEVEL_3)).to.equal(fixed_MVERSE_TOKEN_AMOUNT_PASSPORT_ARTIST_LEVEL_3);
    });

    it("Should set right fixed_MVERSE_TOKEN_AMOUNT_PASSPORT_PRODUCER_LEVEL_1", async function () {
      const { passport } = await loadFixture(initialize);

      expect(await passport.getFixedMVerseTokenAmount(id_PASSPORT_PRODUCER_LEVEL_1)).to.equal(fixed_MVERSE_TOKEN_AMOUNT_PASSPORT_PRODUCER_LEVEL_1);
    });

    it("Should set right fixed_MVERSE_TOKEN_AMOUNT_PASSPORT_PRODUCER_LEVEL_2", async function () {
      const { passport } = await loadFixture(initialize);

      expect(await passport.getFixedMVerseTokenAmount(id_PASSPORT_PRODUCER_LEVEL_2)).to.equal(fixed_MVERSE_TOKEN_AMOUNT_PASSPORT_PRODUCER_LEVEL_2);
    });

    it("Should set right fixed_MVERSE_TOKEN_AMOUNT_PASSPORT_PRODUCER_LEVEL_3", async function () {
      const { passport } = await loadFixture(initialize);

      expect(await passport.getFixedMVerseTokenAmount(id_PASSPORT_PRODUCER_LEVEL_3)).to.equal(fixed_MVERSE_TOKEN_AMOUNT_PASSPORT_PRODUCER_LEVEL_3);
    });

    it("Should set right isFixed_MVERSE_TOKEN_AMOUNT_PASSPORTS", async function () {
      const { passport } = await loadFixture(initialize);

      expect(await passport.getIsFixedMVerseTokenAmount()).to.equal(true);
    });

    it("Should set right SAFE_MVERSE", async function () {
      const { passport } = await loadFixture(initialize);

      expect(await passport.SAFE_MVERSE()).to.equal(SAFE_MVERSE);
    });

    it("Should set the right owner", async function () {
      const { passport, owner } = await loadFixture(initialize);

      expect(await passport.owner()).to.equal(owner.address);
    });
  });

  /*describe("Mint", function () {
    describe("mintTokens", function () {
      it("Should mint tokens", async function () {
        
      });
    });
  });*/
});