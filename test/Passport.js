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
  const reserved_MVERSE_TOKEN = ethers.BigNumber.from('25000000000000000000000');

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

    const signer = await passport.provider.getSigner(otherAccount.address);
    const passport_signer = await ethers.getContractAt("Passport", passport.address, signer);

    return { passport, passport_signer, signer, owner, otherAccount };
  }
  
  describe("Inicialization", function () {
    it("Passports supply must be greater than zero", async function () {
      const rate_PASSPORT = ethers.utils.parseEther('0.1');

      const inicialize_params = [
        0, // id of MVerse Tokens
        [1, 2, 3, 4, 5, 6, 7, 8, 9], // ids of Passports
        max_supply_MVERSE_TOKEN,
        reserved_MVERSE_TOKEN,
        [0, 50, 25, 100, 50, 25, 100, 50, 25], // max_supply of Passports
        // reserved Passport Member_Level_1 is equal to max supply
        [101, 10, 5, 20, 10, 5, 20, 10, 5], // reserved Passports (must be greater than max supply of Passports)
        [rate_PASSPORT, rate_PASSPORT, rate_PASSPORT, rate_PASSPORT, rate_PASSPORT, rate_PASSPORT, rate_PASSPORT, rate_PASSPORT, rate_PASSPORT],
        [200, 100, 50, 200, 100, 50, 200, 100, 50],
        true,
        SAFE_MVERSE
      ];

        // Contracts are deployed using the first signer/account by default
      const Passport = await ethers.getContractFactory("Passport");

      await expect(upgrades.deployProxy(Passport, inicialize_params)).to.be.revertedWith("Max Supply of Passports must be greater than zero");
    });

    it("MVerse Token supply must be greater than zero", async function () {
      const rate_PASSPORT = ethers.utils.parseEther('0.1');

      const inicialize_params = [
        0, // id of MVerse Tokens
        [1, 2, 3, 4, 5, 6, 7, 8, 9], // ids of Passports
        0,
        reserved_MVERSE_TOKEN,
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

      await expect(upgrades.deployProxy(Passport, inicialize_params)).to.be.revertedWith("Max Supply of MVerse Token must be greater than zero");
    });

    it("MVerse Token supply must be greater than MVerse Token reserved", async function () {
      const rate_PASSPORT = ethers.utils.parseEther('0.1');

      const inicialize_params = [
        0, // id of MVerse Tokens
        [1, 2, 3, 4, 5, 6, 7, 8, 9], // ids of Passports
        1000,
        2000,
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

      await expect(upgrades.deployProxy(Passport, inicialize_params)).to.be.revertedWith("Max Supply of MVerse Token must be greater or equal than Reserved");
    });

    it("Passport supply must be greater than reserved ones (1)", async function () {
      const rate_PASSPORT = ethers.utils.parseEther('0.1');

      const inicialize_params = [
        0, // id of MVerse Tokens
        [1, 2, 3, 4, 5, 6, 7, 8, 9], // ids of Passports
        max_supply_MVERSE_TOKEN,
        reserved_MVERSE_TOKEN,
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

      await expect(upgrades.deployProxy(Passport, inicialize_params)).to.be.revertedWith("Max Supply of Passports must be greater or equal than Reserved");
    });

    it("Passport supply must be greater than reserved ones (2)", async function () {
      const rate_PASSPORT = ethers.utils.parseEther('0.1');

      const inicialize_params = [
        0, // id of MVerse Tokens
        [1, 2, 3, 4, 5, 6, 7, 8, 9], // ids of Passports
        max_supply_MVERSE_TOKEN,
        reserved_MVERSE_TOKEN,
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

      await expect(upgrades.deployProxy(Passport, inicialize_params)).to.be.revertedWith("Max Supply of Passports must be greater or equal than Reserved");
    });

    it("Arrays must have the same length (1)", async function () {
      const rate_PASSPORT = ethers.utils.parseEther('0.1');

      const inicialize_params = [
        0, // id of MVerse Tokens
        [1, 2, 3, 4, 5, 6, 7, 8], // ->>>one length less<<<- ids of Passports
        max_supply_MVERSE_TOKEN,
        reserved_MVERSE_TOKEN,
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
        reserved_MVERSE_TOKEN,
        [100, 50, 25, 100, 50, 25, 100, 50], // ->>>one length less<<<- max_supply of Passports
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
        reserved_MVERSE_TOKEN,
        [100, 50, 25, 100, 50, 25, 100, 50, 25], // max_supply of Passports
        // reserved Passport Member_Level_1 is equal to max supply
        [20, 10, 5, 20, 10, 5, 20, 10], // ->>>one length less<<<- reserved Passports (must be greater than max supply of Passports)
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
        reserved_MVERSE_TOKEN,
        [100, 50, 25, 100, 50, 25, 100, 50, 25], // max_supply of Passports
        // reserved Passport Member_Level_1 is equal to max supply
        [20, 10, 5, 20, 10, 5, 20, 10, 5], // reserved Passports (must be greater than max supply of Passports)
        [rate_PASSPORT, rate_PASSPORT, rate_PASSPORT, rate_PASSPORT, rate_PASSPORT, rate_PASSPORT, rate_PASSPORT, rate_PASSPORT], // ->>>one length less<<<- rate of Passports
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
        reserved_MVERSE_TOKEN,
        [100, 50, 25, 100, 50, 25, 100, 50, 25], // max_supply of Passports
        // reserved Passport Member_Level_1 is equal to max supply
        [20, 10, 5, 20, 10, 5, 20, 10, 5], // reserved Passports (must be greater than max supply of Passports)
        [rate_PASSPORT, rate_PASSPORT, rate_PASSPORT, rate_PASSPORT, rate_PASSPORT, rate_PASSPORT, rate_PASSPORT, rate_PASSPORT, rate_PASSPORT],
        [100, 50, 200, 100, 50, 200, 100, 50], // ->>>one length less<<<- amount of $MVerse Token per Passport
        true,
        SAFE_MVERSE
      ];

      // Contracts are deployed using the first signer/account by default
      const Passport = await ethers.getContractFactory("Passport");
    
      await expect(upgrades.deployProxy(Passport, inicialize_params)).to.be.revertedWith("Length of arrays _PASSPORTS, _supply_PASSPORTS, _rate_PASSPORTS, _reserved_PASSPORTS and _fixed_MVERSE_TOKEN_AMOUNT_PASSPORTS must be the same");
    });

    it("Tokens must have a unique Id", async function () {
      const rate_PASSPORT = ethers.utils.parseEther('0.1');

      const inicialize_params = [
        1, // id of MVerse Tokens
        [1, 2, 3, 4, 5, 6, 7, 8, 9], // ids of Passports // first Passport have the same Id than $MVerse Token
        max_supply_MVERSE_TOKEN,
        reserved_MVERSE_TOKEN,
        [100, 50, 25, 100, 50, 25, 100, 50, 25], // max_supply of Passports
        // reserved Passport Member_Level_1 is equal to max supply
        [20, 10, 5, 20, 10, 5, 20, 10, 5], // reserved Passports (must be greater than max supply of Passports)
        [rate_PASSPORT, rate_PASSPORT, rate_PASSPORT, rate_PASSPORT, rate_PASSPORT, rate_PASSPORT, rate_PASSPORT, rate_PASSPORT, rate_PASSPORT],
        [200, 100, 50, 200, 100, 50, 200, 100, 50], // amount of $MVerse Token per Passport
        true,
        SAFE_MVERSE
      ];

      // Contracts are deployed using the first signer/account by default
      const Passport = await ethers.getContractFactory("Passport");
    
      await expect(upgrades.deployProxy(Passport, inicialize_params)).to.be.revertedWith("Tokens must have a unique Id");
    });

    it("Passports must have a unique Id", async function () {
      const rate_PASSPORT = ethers.utils.parseEther('0.1');

      const inicialize_params = [
        0, // id of MVerse Tokens
        [1, 1, 3, 4, 5, 6, 7, 8, 9], // ids of Passports // first and second Passport have the same Ids
        max_supply_MVERSE_TOKEN,
        reserved_MVERSE_TOKEN,
        [100, 50, 25, 100, 50, 25, 100, 50, 25], // max_supply of Passports
        // reserved Passport Member_Level_1 is equal to max supply
        [20, 10, 5, 20, 10, 5, 20, 10, 5], // reserved Passports (must be greater than max supply of Passports)
        [rate_PASSPORT, rate_PASSPORT, rate_PASSPORT, rate_PASSPORT, rate_PASSPORT, rate_PASSPORT, rate_PASSPORT, rate_PASSPORT, rate_PASSPORT],
        [200, 100, 50, 200, 100, 50, 200, 100, 50], // amount of $MVerse Token per Passport
        true,
        SAFE_MVERSE
      ];

      // Contracts are deployed using the first signer/account by default
      const Passport = await ethers.getContractFactory("Passport");
    
      await expect(upgrades.deployProxy(Passport, inicialize_params)).to.be.revertedWith("Passports must have a unique Id");
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

    it("Should set right isMintActive", async function () {
      const { passport } = await loadFixture(initialize);

      expect(await passport.getIsMintActive()).to.equal(true);
    });

    it("Should set right isBurnActive", async function () {
      const { passport } = await loadFixture(initialize);

      expect(await passport.getIsBurnActive()).to.equal(true);
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
  
  describe("Functions Test", function () {
    it("Should set right rate_PASSPORT_MEMBER_LEVEL_1", async function () {
      const { passport } = await loadFixture(initialize);
    
      const newRate = ethers.utils.parseEther('0.999');
    
      await passport.setRate(id_PASSPORT_MEMBER_LEVEL_1, newRate);
      expect(await passport.getRate(id_PASSPORT_MEMBER_LEVEL_1)).to.equal(newRate);
    });
    
    it("Should set right rate_PASSPORT_MEMBER_LEVEL_2", async function () {
      const { passport } = await loadFixture(initialize);
    
      const newRate = ethers.utils.parseEther('0.999');
      await passport.setRate(id_PASSPORT_MEMBER_LEVEL_2, newRate);
      expect(await passport.getRate(id_PASSPORT_MEMBER_LEVEL_2)).to.equal(newRate);
    });
    
    it("Should set right rate_PASSPORT_MEMBER_LEVEL_3", async function () {
      const { passport } = await loadFixture(initialize);
    
      const newRate = ethers.utils.parseEther('0.999');
      await passport.setRate(id_PASSPORT_MEMBER_LEVEL_3, newRate);
      expect(await passport.getRate(id_PASSPORT_MEMBER_LEVEL_3)).to.equal(newRate);
    });
    
    it("Should set right rate_PASSPORT_ARTIST_LEVEL_1", async function () {
      const { passport } = await loadFixture(initialize);
    
      const newRate = ethers.utils.parseEther('0.999');
      await passport.setRate(id_PASSPORT_ARTIST_LEVEL_1, newRate);
      expect(await passport.getRate(id_PASSPORT_ARTIST_LEVEL_1)).to.equal(newRate);
    });
    
    it("Should set right rate_PASSPORT_ARTIST_LEVEL_2", async function () {
      const { passport } = await loadFixture(initialize);
    
      const newRate = ethers.utils.parseEther('0.999');
      await passport.setRate(id_PASSPORT_ARTIST_LEVEL_2, newRate);
      expect(await passport.getRate(id_PASSPORT_ARTIST_LEVEL_2)).to.equal(newRate);
    });
    
    it("Should set right rate_PASSPORT_ARTIST_LEVEL_3", async function () {
      const { passport } = await loadFixture(initialize);
    
      const newRate = ethers.utils.parseEther('0.999');
      await passport.setRate(id_PASSPORT_ARTIST_LEVEL_3, newRate);
      expect(await passport.getRate(id_PASSPORT_ARTIST_LEVEL_3)).to.equal(newRate);
    });
    
    it("Should set right rate_PASSPORT_PRODUCER_LEVEL_1", async function () {
      const { passport } = await loadFixture(initialize);
    
      const newRate = ethers.utils.parseEther('0.999');
      await passport.setRate(id_PASSPORT_PRODUCER_LEVEL_1, newRate);
      expect(await passport.getRate(id_PASSPORT_PRODUCER_LEVEL_1)).to.equal(newRate);
    });
    
    it("Should set right rate_PASSPORT_PRODUCER_LEVEL_2", async function () {
      const { passport } = await loadFixture(initialize);
    
      const newRate = ethers.utils.parseEther('0.999');
      await passport.setRate(id_PASSPORT_PRODUCER_LEVEL_2, newRate);
      expect(await passport.getRate(id_PASSPORT_PRODUCER_LEVEL_2)).to.equal(newRate);
    });
    
    it("Should set right rate_PASSPORT_PRODUCER_LEVEL_3", async function () {
      const { passport } = await loadFixture(initialize);
    
      const newRate = ethers.utils.parseEther('0.999');
      await passport.setRate(id_PASSPORT_PRODUCER_LEVEL_3, newRate);
      expect(await passport.getRate(id_PASSPORT_PRODUCER_LEVEL_3)).to.equal(newRate);
    });
    
    it("Should not let set reserved_PASSPORT_MEMBER_LEVEL_1 because Reserved > MaxSupply", async function () {
      const { passport } = await loadFixture(initialize);
    
      const newReserved = 999;
      const newMaxSupply = 998;

      await passport.setMaxSupply(id_PASSPORT_MEMBER_LEVEL_1, newMaxSupply);
      await expect(passport.setReserved(id_PASSPORT_MEMBER_LEVEL_1, newReserved)).to.be.revertedWith("Number of minted Passports plus the Reserved ones must be less than max supply");
    });
    
    it("Should not let set reserved_PASSPORT_MEMBER_LEVEL_2 because Reserved > MaxSupply", async function () {
      const { passport } = await loadFixture(initialize);
    
      const newReserved = 999;
      const newMaxSupply = 998;

      await passport.setMaxSupply(id_PASSPORT_MEMBER_LEVEL_1, newMaxSupply);
      await expect(passport.setReserved(id_PASSPORT_MEMBER_LEVEL_2, newReserved)).to.be.revertedWith("Number of minted Passports plus the Reserved ones must be less than max supply");
    });
    
    it("Should not let set reserved_PASSPORT_MEMBER_LEVEL_3 because Reserved > MaxSupply", async function () {
      const { passport } = await loadFixture(initialize);
    
      const newReserved = 999;
      const newMaxSupply = 998;

      await passport.setMaxSupply(id_PASSPORT_MEMBER_LEVEL_1, newMaxSupply);
      await expect(passport.setReserved(id_PASSPORT_MEMBER_LEVEL_3, newReserved)).to.be.revertedWith("Number of minted Passports plus the Reserved ones must be less than max supply");
    });
    
    it("Should not let set reserved_PASSPORT_ARTIST_LEVEL_1 because Reserved > MaxSupply", async function () {
      const { passport } = await loadFixture(initialize);
    
      const newReserved = 999;
      const newMaxSupply = 998;

      await passport.setMaxSupply(id_PASSPORT_MEMBER_LEVEL_1, newMaxSupply);
      await expect(passport.setReserved(id_PASSPORT_ARTIST_LEVEL_1, newReserved)).to.be.revertedWith("Number of minted Passports plus the Reserved ones must be less than max supply");
    });
    
    it("Should not let set reserved_PASSPORT_ARTIST_LEVEL_2 because Reserved > MaxSupply", async function () {
      const { passport } = await loadFixture(initialize);
    
      const newReserved = 999;
      const newMaxSupply = 998;

      await passport.setMaxSupply(id_PASSPORT_MEMBER_LEVEL_1, newMaxSupply);
      await expect(passport.setReserved(id_PASSPORT_ARTIST_LEVEL_2, newReserved)).to.be.revertedWith("Number of minted Passports plus the Reserved ones must be less than max supply");
    });
    
    it("Should not let set reserved_PASSPORT_ARTIST_LEVEL_3 because Reserved > MaxSupply", async function () {
      const { passport } = await loadFixture(initialize);
    
      const newReserved = 999;
      const newMaxSupply = 998;

      await passport.setMaxSupply(id_PASSPORT_MEMBER_LEVEL_1, newMaxSupply);
      await expect(passport.setReserved(id_PASSPORT_ARTIST_LEVEL_3, newReserved)).to.be.revertedWith("Number of minted Passports plus the Reserved ones must be less than max supply").to.be.revertedWith("Number of minted Passports plus the Reserved ones must be less than max supply");
    });
    
    it("Should not let set reserved_PASSPORT_PRODUCER_LEVEL_1 because Reserved > MaxSupply", async function () {
      const { passport } = await loadFixture(initialize);
    
      const newReserved = 999;
      const newMaxSupply = 998;

      await passport.setMaxSupply(id_PASSPORT_MEMBER_LEVEL_1, newMaxSupply);
      await expect(passport.setReserved(id_PASSPORT_PRODUCER_LEVEL_1, newReserved)).to.be.revertedWith("Number of minted Passports plus the Reserved ones must be less than max supply");
    });
    
    it("Should not let set reserved_PASSPORT_PRODUCER_LEVEL_2 because Reserved > MaxSupply", async function () {
      const { passport } = await loadFixture(initialize);
    
      const newReserved = 999;
      const newMaxSupply = 998;

      await passport.setMaxSupply(id_PASSPORT_MEMBER_LEVEL_1, newMaxSupply);
      await expect(passport.setReserved(id_PASSPORT_PRODUCER_LEVEL_2, newReserved)).to.be.revertedWith("Number of minted Passports plus the Reserved ones must be less than max supply");
    });
    
    it("Should not let set reserved_PASSPORT_PRODUCER_LEVEL_3 because Reserved > MaxSupply", async function () {
      const { passport } = await loadFixture(initialize);
    
      const newReserved = 999;
      const newMaxSupply = 998;

      await passport.setMaxSupply(id_PASSPORT_MEMBER_LEVEL_1, newMaxSupply);
      await expect(passport.setReserved(id_PASSPORT_PRODUCER_LEVEL_3, newReserved)).to.be.revertedWith("Number of minted Passports plus the Reserved ones must be less than max supply");
    });

    it("Should set right max_supply_MVERSE_TOKEN", async function () {
      const { passport } = await loadFixture(initialize);
    
      const newMaxSupply = ethers.BigNumber.from('50000000000000000000000');
      await passport.setMaxSupply(id_PASSPORT_MEMBER_LEVEL_1, newMaxSupply);
      expect(await passport.getMaxSupply(id_PASSPORT_MEMBER_LEVEL_1)).to.equal(newMaxSupply);
    });
    
    it("Should set right max_supply_PASSPORT_MEMBER_LEVEL_1", async function () {
      const { passport } = await loadFixture(initialize);
    
      const newMaxSupply = 999;
      await passport.setMaxSupply(id_PASSPORT_MEMBER_LEVEL_1, newMaxSupply);
      expect(await passport.getMaxSupply(id_PASSPORT_MEMBER_LEVEL_1)).to.equal(newMaxSupply);
    });
    
    it("Should set right max_supply_PASSPORT_MEMBER_LEVEL_2", async function () {
      const { passport } = await loadFixture(initialize);
    
      const newMaxSupply = 999;
      await passport.setMaxSupply(id_PASSPORT_MEMBER_LEVEL_2, newMaxSupply);
      expect(await passport.getMaxSupply(id_PASSPORT_MEMBER_LEVEL_2)).to.equal(newMaxSupply);
    });
    
    it("Should set right max_supply_PASSPORT_MEMBER_LEVEL_3", async function () {
      const { passport } = await loadFixture(initialize);
    
      const newMaxSupply = 999;
      await passport.setMaxSupply(id_PASSPORT_MEMBER_LEVEL_3, newMaxSupply);
      expect(await passport.getMaxSupply(id_PASSPORT_MEMBER_LEVEL_3)).to.equal(newMaxSupply);
    });
    
    it("Should set right max_supply_PASSPORT_ARTIST_LEVEL_1", async function () {
      const { passport } = await loadFixture(initialize);
    
      const newMaxSupply = 999;
      await passport.setMaxSupply(id_PASSPORT_ARTIST_LEVEL_1, newMaxSupply);
      expect(await passport.getMaxSupply(id_PASSPORT_ARTIST_LEVEL_1)).to.equal(newMaxSupply);
    });
    
    it("Should set right max_supply_PASSPORT_ARTIST_LEVEL_2", async function () {
      const { passport } = await loadFixture(initialize);
    
      const newMaxSupply = 999;
      await passport.setMaxSupply(id_PASSPORT_ARTIST_LEVEL_2, newMaxSupply);
      expect(await passport.getMaxSupply(id_PASSPORT_ARTIST_LEVEL_2)).to.equal(newMaxSupply);
    });
    
    it("Should set right max_supply_PASSPORT_ARTIST_LEVEL_3", async function () {
      const { passport } = await loadFixture(initialize);
    
      const newMaxSupply = 999;
      await passport.setMaxSupply(id_PASSPORT_ARTIST_LEVEL_3, newMaxSupply);
      expect(await passport.getMaxSupply(id_PASSPORT_ARTIST_LEVEL_3)).to.equal(newMaxSupply);
    });
    
    it("Should set right max_supply_PASSPORT_PRODUCER_LEVEL_1", async function () {
      const { passport } = await loadFixture(initialize);
    
      const newMaxSupply = 999;
      await passport.setMaxSupply(id_PASSPORT_PRODUCER_LEVEL_1, newMaxSupply);
      expect(await passport.getMaxSupply(id_PASSPORT_PRODUCER_LEVEL_1)).to.equal(newMaxSupply);
    });
    
    it("Should set right max_supply_PASSPORT_PRODUCER_LEVEL_2", async function () {
      const { passport } = await loadFixture(initialize);
    
      const newMaxSupply = 999;
      await passport.setMaxSupply(id_PASSPORT_PRODUCER_LEVEL_2, newMaxSupply);
      expect(await passport.getMaxSupply(id_PASSPORT_PRODUCER_LEVEL_2)).to.equal(newMaxSupply);
    });
    
    it("Should set right max_supply_PASSPORT_PRODUCER_LEVEL_3", async function () {
      const { passport } = await loadFixture(initialize);
    
      const newMaxSupply = 999;
      await passport.setMaxSupply(id_PASSPORT_PRODUCER_LEVEL_3, newMaxSupply);
      expect(await passport.getMaxSupply(id_PASSPORT_PRODUCER_LEVEL_3)).to.equal(newMaxSupply);
    });

    it("Should set right reserved_PASSPORT_MEMBER_LEVEL_1", async function () {
      const { passport } = await loadFixture(initialize);
    
      const newReserved = 999;
      const newMaxSupply = 1000;

      await passport.setMaxSupply(id_PASSPORT_MEMBER_LEVEL_1, newMaxSupply);
      await passport.setReserved(id_PASSPORT_MEMBER_LEVEL_1, newReserved);
      expect(await passport.getReserved(id_PASSPORT_MEMBER_LEVEL_1)).to.equal(newReserved);
    });
    
    it("Should set right reserved_PASSPORT_MEMBER_LEVEL_2", async function () {
      const { passport } = await loadFixture(initialize);
    
      const newReserved = 999;
      const newMaxSupply = 1000;

      await passport.setMaxSupply(id_PASSPORT_MEMBER_LEVEL_2, newMaxSupply);
      await passport.setReserved(id_PASSPORT_MEMBER_LEVEL_2, newReserved);
      expect(await passport.getReserved(id_PASSPORT_MEMBER_LEVEL_2)).to.equal(newReserved);
    });
    
    it("Should set right reserved_PASSPORT_MEMBER_LEVEL_3", async function () {
      const { passport } = await loadFixture(initialize);
    
      const newReserved = 999;
      const newMaxSupply = 1000;

      await passport.setMaxSupply(id_PASSPORT_MEMBER_LEVEL_3, newMaxSupply);
      await passport.setReserved(id_PASSPORT_MEMBER_LEVEL_3, newReserved);
      expect(await passport.getReserved(id_PASSPORT_MEMBER_LEVEL_3)).to.equal(newReserved);
    });
    
    it("Should set right reserved_PASSPORT_ARTIST_LEVEL_1", async function () {
      const { passport } = await loadFixture(initialize);
    
      const newReserved = 999;
      const newMaxSupply = 1000;

      await passport.setMaxSupply(id_PASSPORT_ARTIST_LEVEL_1, newMaxSupply);
      await passport.setReserved(id_PASSPORT_ARTIST_LEVEL_1, newReserved);
      expect(await passport.getReserved(id_PASSPORT_ARTIST_LEVEL_1)).to.equal(newReserved);
    });
    
    it("Should set right reserved_PASSPORT_ARTIST_LEVEL_2", async function () {
      const { passport } = await loadFixture(initialize);
    
      const newReserved = 999;
      const newMaxSupply = 1000;

      await passport.setMaxSupply(id_PASSPORT_ARTIST_LEVEL_2, newMaxSupply);
      await passport.setReserved(id_PASSPORT_ARTIST_LEVEL_2, newReserved);
      expect(await passport.getReserved(id_PASSPORT_ARTIST_LEVEL_2)).to.equal(newReserved);
    });
    
    it("Should set right reserved_PASSPORT_ARTIST_LEVEL_3", async function () {
      const { passport } = await loadFixture(initialize);
    
      const newReserved = 999;
      const newMaxSupply = 1000;

      await passport.setMaxSupply(id_PASSPORT_ARTIST_LEVEL_3, newMaxSupply);
      await passport.setReserved(id_PASSPORT_ARTIST_LEVEL_3, newReserved);
      expect(await passport.getReserved(id_PASSPORT_ARTIST_LEVEL_3)).to.equal(newReserved);
    });
    
    it("Should set right reserved_PASSPORT_PRODUCER_LEVEL_1", async function () {
      const { passport } = await loadFixture(initialize);
    
      const newReserved = 999;
      const newMaxSupply = 1000;

      await passport.setMaxSupply(id_PASSPORT_PRODUCER_LEVEL_1, newMaxSupply);
      await passport.setReserved(id_PASSPORT_PRODUCER_LEVEL_1, newReserved);
      expect(await passport.getReserved(id_PASSPORT_PRODUCER_LEVEL_1)).to.equal(newReserved);
    });
    
    it("Should set right reserved_PASSPORT_PRODUCER_LEVEL_2", async function () {
      const { passport } = await loadFixture(initialize);
    
      const newReserved = 999;
      const newMaxSupply = 1000;

      await passport.setMaxSupply(id_PASSPORT_PRODUCER_LEVEL_2, newMaxSupply);
      await passport.setReserved(id_PASSPORT_PRODUCER_LEVEL_2, newReserved);
      expect(await passport.getReserved(id_PASSPORT_PRODUCER_LEVEL_2)).to.equal(newReserved);
    });
    
    it("Should set right reserved_PASSPORT_PRODUCER_LEVEL_3", async function () {
      const { passport } = await loadFixture(initialize);
    
      const newReserved = 999;
      const newMaxSupply = 1000;

      await passport.setMaxSupply(id_PASSPORT_PRODUCER_LEVEL_3, newMaxSupply);
      await passport.setReserved(id_PASSPORT_PRODUCER_LEVEL_3, newReserved);
      expect(await passport.getReserved(id_PASSPORT_PRODUCER_LEVEL_3)).to.equal(newReserved);
    });
    
    it("Should set right fixed_MVERSE_TOKEN_AMOUNT_PASSPORT_MEMBER_LEVEL_1", async function () {
      const { passport } = await loadFixture(initialize);
    
      const newFixedMVerseTokenAmount = 999;
      await passport.setFixedMVerseTokenAmount(id_PASSPORT_MEMBER_LEVEL_1, newFixedMVerseTokenAmount);
      expect(await passport.getFixedMVerseTokenAmount(id_PASSPORT_MEMBER_LEVEL_1)).to.equal(newFixedMVerseTokenAmount);
    });
    
    it("Should set right fixed_MVERSE_TOKEN_AMOUNT_PASSPORT_MEMBER_LEVEL_2", async function () {
      const { passport } = await loadFixture(initialize);
    
      const newFixedMVerseTokenAmount = 999;
      await passport.setFixedMVerseTokenAmount(id_PASSPORT_MEMBER_LEVEL_2, newFixedMVerseTokenAmount);
      expect(await passport.getFixedMVerseTokenAmount(id_PASSPORT_MEMBER_LEVEL_2)).to.equal(newFixedMVerseTokenAmount);
    });
    
    it("Should set right fixed_MVERSE_TOKEN_AMOUNT_PASSPORT_MEMBER_LEVEL_3", async function () {
      const { passport } = await loadFixture(initialize);
    
      const newFixedMVerseTokenAmount = 999;
      await passport.setFixedMVerseTokenAmount(id_PASSPORT_MEMBER_LEVEL_3, newFixedMVerseTokenAmount);
      expect(await passport.getFixedMVerseTokenAmount(id_PASSPORT_MEMBER_LEVEL_3)).to.equal(newFixedMVerseTokenAmount);
    });
    
    it("Should set right fixed_MVERSE_TOKEN_AMOUNT_PASSPORT_ARTIST_LEVEL_1", async function () {
      const { passport } = await loadFixture(initialize);
    
      const newFixedMVerseTokenAmount = 999;
      await passport.setFixedMVerseTokenAmount(id_PASSPORT_ARTIST_LEVEL_1, newFixedMVerseTokenAmount);
      expect(await passport.getFixedMVerseTokenAmount(id_PASSPORT_ARTIST_LEVEL_1)).to.equal(newFixedMVerseTokenAmount);
    });
    
    it("Should set right fixed_MVERSE_TOKEN_AMOUNT_PASSPORT_ARTIST_LEVEL_2", async function () {
      const { passport } = await loadFixture(initialize);
    
      const newFixedMVerseTokenAmount = 999;
      await passport.setFixedMVerseTokenAmount(id_PASSPORT_ARTIST_LEVEL_2, newFixedMVerseTokenAmount);
      expect(await passport.getFixedMVerseTokenAmount(id_PASSPORT_ARTIST_LEVEL_2)).to.equal(newFixedMVerseTokenAmount);
    });
    
    it("Should set right fixed_MVERSE_TOKEN_AMOUNT_PASSPORT_ARTIST_LEVEL_3", async function () {
      const { passport } = await loadFixture(initialize);
    
      const newFixedMVerseTokenAmount = 999;
      await passport.setFixedMVerseTokenAmount(id_PASSPORT_ARTIST_LEVEL_3, newFixedMVerseTokenAmount);
      expect(await passport.getFixedMVerseTokenAmount(id_PASSPORT_ARTIST_LEVEL_3)).to.equal(newFixedMVerseTokenAmount);
    });
    
    it("Should set right fixed_MVERSE_TOKEN_AMOUNT_PASSPORT_PRODUCER_LEVEL_1", async function () {
      const { passport } = await loadFixture(initialize);
    
      const newFixedMVerseTokenAmount = 999;
      await passport.setFixedMVerseTokenAmount(id_PASSPORT_PRODUCER_LEVEL_1, newFixedMVerseTokenAmount);
      expect(await passport.getFixedMVerseTokenAmount(id_PASSPORT_PRODUCER_LEVEL_1)).to.equal(newFixedMVerseTokenAmount);
    });
    
    it("Should set right fixed_MVERSE_TOKEN_AMOUNT_PASSPORT_PRODUCER_LEVEL_2", async function () {
      const { passport } = await loadFixture(initialize);
    
      const newFixedMVerseTokenAmount = 999;
      await passport.setFixedMVerseTokenAmount(id_PASSPORT_PRODUCER_LEVEL_2, newFixedMVerseTokenAmount);
      expect(await passport.getFixedMVerseTokenAmount(id_PASSPORT_PRODUCER_LEVEL_2)).to.equal(newFixedMVerseTokenAmount);
    });
    
    it("Should set right fixed_MVERSE_TOKEN_AMOUNT_PASSPORT_PRODUCER_LEVEL_3", async function () {
      const { passport } = await loadFixture(initialize);
    
      const newFixedMVerseTokenAmount = 999;
      await passport.setFixedMVerseTokenAmount(id_PASSPORT_PRODUCER_LEVEL_3, newFixedMVerseTokenAmount);
      expect(await passport.getFixedMVerseTokenAmount(id_PASSPORT_PRODUCER_LEVEL_3)).to.equal(newFixedMVerseTokenAmount);
    });

    it("Should set right isFixedMVerseTokenAmount", async function () {
      const { passport } = await loadFixture(initialize);
    
      const newIsFixedMVerseTokenAmount = false;
      await passport.setIsFixedMVerseTokenAmount(newIsFixedMVerseTokenAmount);
      expect(await passport.getIsFixedMVerseTokenAmount()).to.equal(newIsFixedMVerseTokenAmount);
    });

    it("Should set right isMintActive", async function () {
      const { passport } = await loadFixture(initialize);
    
      const newIsMintActive = false;
      await passport.setIsMintActive(newIsMintActive);
      expect(await passport.getIsMintActive()).to.equal(newIsMintActive);
    });

    it("Should set right isBurnActive", async function () {
      const { passport } = await loadFixture(initialize);
    
      const newIsBurnActive = false;
      await passport.setIsBurnActive(newIsBurnActive);
      expect(await passport.getIsBurnActive()).to.equal(newIsBurnActive);
    });
  });

  describe("Mint with owner", function () {
    describe("mintTokens", function () {
      it("Should mint Passport to owner address", async function () {
          const { passport } = await loadFixture(initialize);

          const amount_MVERSE_TOKEN = reserved_MVERSE_TOKEN;
          const amount_PASSPORTS = reserved_PASSPORT_MEMBER_LEVEL_1;

          const ids = [id_MVERSE_TOKEN, id_PASSPORT_MEMBER_LEVEL_1];
          const amounts = [amount_MVERSE_TOKEN, amount_PASSPORTS];
          await passport.mintTokens(ids, amounts);
          expect(await passport.balanceOf(passport.owner(), id_PASSPORT_MEMBER_LEVEL_1)).to.equal(amount_PASSPORTS);
      });

      it("Should mint Token to owner address", async function () {
        const { passport } = await loadFixture(initialize);

        const amount_MVERSE_TOKEN = reserved_MVERSE_TOKEN;
        const amount_PASSPORTS = reserved_PASSPORT_MEMBER_LEVEL_1;

        const ids = [id_MVERSE_TOKEN, id_PASSPORT_MEMBER_LEVEL_1];
        const amounts = [amount_MVERSE_TOKEN, amount_PASSPORTS];
        await passport.mintTokens(ids, amounts);
        expect(await passport.balanceOf(passport.owner(), id_MVERSE_TOKEN)).to.equal(amount_MVERSE_TOKEN);
      });

      it("Should not mint Passport to owner address when amount is greater than Max Supply", async function () {
        const { passport } = await loadFixture(initialize);

        const amount_MVERSE_TOKEN = max_supply_MVERSE_TOKEN;
        const amount_PASSPORTS = reserved_PASSPORT_MEMBER_LEVEL_1+1;

        const ids = [id_MVERSE_TOKEN, id_PASSPORT_MEMBER_LEVEL_1];
        const amounts = [amount_MVERSE_TOKEN, amount_PASSPORTS];
        await expect(passport.mintTokens(ids, amounts)).to.be.revertedWith("Number of Passports with this Id to mint must be less than Reserved");
      });

      it("Should not mint Token to owner address when amount is greater than Max Supply", async function () {
        const { passport } = await loadFixture(initialize);

        const amount_MVERSE_TOKEN = max_supply_MVERSE_TOKEN+ethers.BigNumber.from('1');
        const amount_PASSPORTS = reserved_PASSPORT_MEMBER_LEVEL_1;

        const ids = [id_MVERSE_TOKEN, id_PASSPORT_MEMBER_LEVEL_1];
        const amounts = [amount_MVERSE_TOKEN, amount_PASSPORTS];
        await expect(passport.mintTokens(ids, amounts)).to.be.revertedWith("Not enough supply of Reserved MVerse Tokens to mint (max supply less than fixed amount)");
      });

      it("Should not mint Token to owner address when amount is greater than Max Supply", async function () {
        const { passport } = await loadFixture(initialize);

        const amount_MVERSE_TOKEN = max_supply_MVERSE_TOKEN+ethers.BigNumber.from('1');
        const amount_PASSPORTS = reserved_PASSPORT_MEMBER_LEVEL_1+1; // reserved + 1: not enough passports

        const ids = [id_MVERSE_TOKEN, id_PASSPORT_MEMBER_LEVEL_1];
        const amounts = [amount_MVERSE_TOKEN, amount_PASSPORTS];
        await expect(passport.mintTokens(ids, amounts)).to.be.revertedWith("Number of Passports with this Id to mint must be less than Reserved");
      });

      it("Should not mint Passport to owner address when first element of ids is not the id_MVERSE_TOKEN", async function () {
        const { passport } = await loadFixture(initialize);

        const amount_MVERSE_TOKEN = max_supply_MVERSE_TOKEN;
        const amount_PASSPORTS = max_supply_PASSPORT_MEMBER_LEVEL_1;

        const ids = [id_PASSPORT_MEMBER_LEVEL_1, id_PASSPORT_MEMBER_LEVEL_2]; // ids[0] must be id_MVERSE_TOKEN
        const amounts = [amount_PASSPORTS, amount_MVERSE_TOKEN];
        await expect(passport.mintTokens(ids, amounts)).to.be.revertedWith("The first element of array ids must be equal to id_MVERSE_TOKEN");
      });

      it("Should not mint Passport to owner address when first element of ids is not the id_MVERSE_TOKEN", async function () {
        const { passport } = await loadFixture(initialize);

        const amount_MVERSE_TOKEN = max_supply_MVERSE_TOKEN;
        const amount_PASSPORTS = max_supply_PASSPORT_MEMBER_LEVEL_1;

        const ids = [id_PASSPORT_MEMBER_LEVEL_1, id_MVERSE_TOKEN]; // ids[0] must be id_MVERSE_TOKEN
        const amounts = [amount_PASSPORTS, amount_MVERSE_TOKEN];
        await expect(passport.mintTokens(ids, amounts)).to.be.revertedWith("The first element of array ids must be equal to id_MVERSE_TOKEN");
      });

      it("Should not mint Passport to owner address when Id Passport not exist", async function () {
        const { passport } = await loadFixture(initialize);

        const amount_MVERSE_TOKEN = max_supply_MVERSE_TOKEN;
        const amount_PASSPORTS = 10;

        const ids = [id_MVERSE_TOKEN, 99999]; // Id 99999 for Passport should not exist
        const amounts = [amount_MVERSE_TOKEN, amount_PASSPORTS];
        await expect(passport.mintTokens(ids, amounts)).to.be.revertedWith("Passport Id doesn't exist");
      });

      it("Should not mint Token when id or amount don't have length equal to 2", async function () {
        const { passport } = await loadFixture(initialize);

        const amount_MVERSE_TOKEN = max_supply_MVERSE_TOKEN;
        const id_PASSPORT = id_PASSPORT_MEMBER_LEVEL_1; // Member_Level_1 Passport Id

        const ids = [id_MVERSE_TOKEN, 99999]; // Id 99999 for Passport should not exist
        const amounts = [amount_MVERSE_TOKEN];
        await expect(passport.mintTokens(ids, amounts)).to.be.revertedWith("Only two elements in each array allowed");
      });

      it("Should not mint Token when id or amount don't have length equal to 2", async function () {
        const { passport } = await loadFixture(initialize);

        const amount_MVERSE_TOKEN = max_supply_MVERSE_TOKEN;

        const ids = [id_MVERSE_TOKEN, 99999]; // Id 99999 for Passport should not exist
        const amounts = [amount_MVERSE_TOKEN];
        await expect(passport.mintTokens(ids, amounts)).to.be.revertedWith("Only two elements in each array allowed");
      });

      it("Should not mint Token when id or amount don't have length equal to 2", async function () {
        const { passport } = await loadFixture(initialize);

        const amount_MVERSE_TOKEN = max_supply_MVERSE_TOKEN;

        const ids = [id_MVERSE_TOKEN]; // Id 99999 for Passport should not exist
        const amounts = [amount_MVERSE_TOKEN];
        await expect(passport.mintTokens(ids, amounts)).to.be.revertedWith("Only two elements in each array allowed");
      });
    });

    describe("burnTokens", function () {
      it("Should burn minted tokens", async function () {
        const { passport, otherAccount } = await loadFixture(initialize);

        const amount_MVERSE_TOKEN = fixed_MVERSE_TOKEN_AMOUNT_PASSPORT_MEMBER_LEVEL_1;
        const amount_PASSPORTS = 1;

        const ids = [id_MVERSE_TOKEN, id_PASSPORT_MEMBER_LEVEL_1]; // ids[0] must be id_MVERSE_TOKEN
        const amounts = [amount_MVERSE_TOKEN, amount_PASSPORTS];
        await passport.mintTokens(ids, amounts, { value: ethers.utils.parseEther("1.0") });
        await passport.burnTokens(ids, amounts);
        const _amounts = await passport.balanceOfTokens(otherAccount.address, ids);
        expect([_amounts[0].toNumber(), _amounts[1].toNumber()]).to.eql([0, 0]);
      });

      it("Should not burn minted tokens when burnActive is false", async function () {
        const { passport } = await loadFixture(initialize);

        const amount_MVERSE_TOKEN = fixed_MVERSE_TOKEN_AMOUNT_PASSPORT_MEMBER_LEVEL_1;
        const amount_PASSPORTS = 1;

        const ids = [id_MVERSE_TOKEN, id_PASSPORT_MEMBER_LEVEL_1]; // ids[0] must be id_MVERSE_TOKEN
        const amounts = [amount_MVERSE_TOKEN, amount_PASSPORTS];
        await passport.mintTokens(ids, amounts, { value: ethers.utils.parseEther("1.0") });
        
        const newIsBurnActive = false;
        await passport.setIsBurnActive(newIsBurnActive);
        
        await expect(passport.burnTokens(ids, amounts)).to.be.revertedWith("Burn is not active right now, a maintenance can be in action, contact support for more details");
      });
    });
  });

  describe("Mint with other address", function () {
    describe("mintTokens", function () {
      it("Should mint Passport to address", async function () {
          const { passport_signer, signer, otherAccount } = await loadFixture(initialize_signer);

          const amount_MVERSE_TOKEN = ethers.BigNumber.from('1');
          const amount_PASSPORTS = 1;

          const ids = [id_MVERSE_TOKEN, id_PASSPORT_MEMBER_LEVEL_1];
          const amounts = [amount_MVERSE_TOKEN, amount_PASSPORTS];
          await passport_signer.mintTokens(ids, amounts, { value: ethers.utils.parseEther("1.0") });
          expect(await passport_signer.connect(signer).balanceOf(otherAccount.address, id_PASSPORT_MEMBER_LEVEL_1)).to.equal(amount_PASSPORTS);
      });

      it("Should mint fixed Tokens to address", async function () {
        const { passport_signer, signer, otherAccount } = await loadFixture(initialize_signer);

        const amount_MVERSE_TOKEN = ethers.BigNumber.from('100');
        const amount_PASSPORTS = 1;

        const ids = [id_MVERSE_TOKEN, id_PASSPORT_MEMBER_LEVEL_1];
        const amounts = [amount_MVERSE_TOKEN, amount_PASSPORTS];
        await passport_signer.mintTokens(ids, amounts, { value: ethers.utils.parseEther("1.0") });
        expect(await passport_signer.connect(signer).balanceOf(otherAccount.address, id_MVERSE_TOKEN)).to.equal(fixed_MVERSE_TOKEN_AMOUNT_PASSPORT_MEMBER_LEVEL_1); // should mint fixed_MVERSE_TOKEN_AMOUNT_PASSPORT_MEMBER_LEVEL_1, not 100 $MVerse Tokens like specified in amount_MVERSE_TOKEN
      });

      it("Should not mint Passport to address when amount is greater than Max Supply (fixed amount per Passport)", async function () {
        const { passport, passport_signer, signer } = await loadFixture(initialize_signer);

        const _reserved_MVERSE_TOKEN = ethers.BigNumber.from('50');
        const _max_supply_MVERSE_TOKEN = ethers.BigNumber.from('100');
        const amount_MVERSE_TOKEN = ethers.BigNumber.from('200');
        const amount_PASSPORTS = 1;

        await passport.setReserved(id_MVERSE_TOKEN, _reserved_MVERSE_TOKEN);
        await passport.setMaxSupply(id_MVERSE_TOKEN, _max_supply_MVERSE_TOKEN);

        const ids = [id_MVERSE_TOKEN, id_PASSPORT_MEMBER_LEVEL_1];
        const amounts = [amount_MVERSE_TOKEN, amount_PASSPORTS];
        await expect(passport_signer.connect(signer).mintTokens(ids, amounts, { value: ethers.utils.parseEther("1.0") })).to.be.revertedWith("Not enough supply of MVerse Tokens to mint (max supply less than fixed amount)");
      });

      it("Should not mint Passport to address when amount is greater than Max Supply (not fixed amount per Passport)", async function () {
        const { passport, passport_signer, signer } = await loadFixture(initialize_signer);

        const _reserved_MVERSE_TOKEN = ethers.BigNumber.from('50');
        const _max_supply_MVERSE_TOKEN = ethers.BigNumber.from('100');
        const amount_MVERSE_TOKEN = ethers.BigNumber.from('200');
        const amount_PASSPORTS = 1;

        await passport.setReserved(id_MVERSE_TOKEN, _reserved_MVERSE_TOKEN);
        await passport.setMaxSupply(id_MVERSE_TOKEN, _max_supply_MVERSE_TOKEN);
        await passport.setIsFixedMVerseTokenAmount(false);

        const ids = [id_MVERSE_TOKEN, id_PASSPORT_MEMBER_LEVEL_1];
        const amounts = [amount_MVERSE_TOKEN, amount_PASSPORTS];
        expect(await passport_signer.connect(signer).mintTokens(ids, amounts, { value: ethers.utils.parseEther("1.0") })).to.be.revertedWith("Not enough supply of MVerse Tokens to mint (max supply reached)");
      });

      it("Should not mint more than 2 Passports at to the same wallet", async function () {
        const { passport_signer, signer } = await loadFixture(initialize_signer);

        const amount_MVERSE_TOKEN = ethers.BigNumber.from('100');
        const amount_PASSPORTS = 2;

        const ids = [id_MVERSE_TOKEN, id_PASSPORT_MEMBER_LEVEL_1];
        const amounts = [amount_MVERSE_TOKEN, amount_PASSPORTS];
        await expect(passport_signer.connect(signer).mintTokens(ids, amounts, { value: ethers.utils.parseEther("1.0") })).to.be.revertedWith("Only one passport authorized per wallet");
      });

      it("Should not mint Token to address when there is other Passport in the wallet", async function () {
        const { passport_signer, signer } = await loadFixture(initialize_signer);

        const amount_MVERSE_TOKEN = max_supply_MVERSE_TOKEN+ethers.BigNumber.from('1');
        const amount_PASSPORTS = 1;

        const ids = [id_MVERSE_TOKEN, id_PASSPORT_MEMBER_LEVEL_1];
        const amounts = [amount_MVERSE_TOKEN, amount_PASSPORTS];

        const _ids = [id_MVERSE_TOKEN, id_PASSPORT_MEMBER_LEVEL_2];
        const _amounts = [amount_MVERSE_TOKEN, amount_PASSPORTS];
        await passport_signer.connect(signer).mintTokens(ids, amounts, { value: ethers.utils.parseEther("1.0") });
        await expect(passport_signer.connect(signer).mintTokens(_ids, _amounts, { value: ethers.utils.parseEther("1.0") })).to.be.revertedWith("Mint wallet must own zero passports");
      });

      it("Should not mint Passport to address when first element of ids is not the id_MVERSE_TOKEN", async function () {
        const { passport_signer, signer } = await loadFixture(initialize_signer);

        const amount_MVERSE_TOKEN = max_supply_MVERSE_TOKEN;
        const amount_PASSPORTS = max_supply_PASSPORT_MEMBER_LEVEL_1;

        const ids = [id_PASSPORT_MEMBER_LEVEL_1, id_PASSPORT_MEMBER_LEVEL_2]; // ids[0] must be id_MVERSE_TOKEN
        const amounts = [amount_PASSPORTS, amount_MVERSE_TOKEN];
        await expect(passport_signer.connect(signer).mintTokens(ids, amounts, { value: ethers.utils.parseEther("1.0") })).to.be.revertedWith("The first element of array ids must be equal to id_MVERSE_TOKEN");
      });

      it("Should not mint Passport to address when first element of ids is not the id_MVERSE_TOKEN", async function () {
        const { passport_signer, signer } = await loadFixture(initialize_signer);

        const amount_MVERSE_TOKEN = max_supply_MVERSE_TOKEN;
        const amount_PASSPORTS = max_supply_PASSPORT_MEMBER_LEVEL_1;

        const ids = [id_PASSPORT_MEMBER_LEVEL_1, id_MVERSE_TOKEN]; // ids[0] must be id_MVERSE_TOKEN
        const amounts = [amount_PASSPORTS, amount_MVERSE_TOKEN];
        await expect(passport_signer.connect(signer).mintTokens(ids, amounts, { value: ethers.utils.parseEther("1.0") })).to.be.revertedWith("The first element of array ids must be equal to id_MVERSE_TOKEN");
      });

      it("Should not mint Passport to address when Id Passport not exist", async function () {
        const { passport_signer, signer } = await loadFixture(initialize_signer);

        const amount_MVERSE_TOKEN = max_supply_MVERSE_TOKEN;
        const amount_PASSPORTS = 10;

        const ids = [id_MVERSE_TOKEN, 99999]; // Id 99999 for Passport should not exist
        const amounts = [amount_MVERSE_TOKEN, amount_PASSPORTS];
        await expect(passport_signer.connect(signer).mintTokens(ids, amounts, { value: ethers.utils.parseEther("1.0") })).to.be.revertedWith("Passport Id doesn't exist");
      });

      it("Should not mint Token when id or amount don't have length equal to 2", async function () {
        const { passport_signer, signer } = await loadFixture(initialize_signer);

        const amount_MVERSE_TOKEN = max_supply_MVERSE_TOKEN;
        const id_PASSPORT = id_PASSPORT_MEMBER_LEVEL_1; // Member_Level_1 Passport Id

        const ids = [id_MVERSE_TOKEN, 99999]; // Id 99999 for Passport should not exist
        const amounts = [amount_MVERSE_TOKEN];
        await expect(passport_signer.connect(signer).mintTokens(ids, amounts, { value: ethers.utils.parseEther("1.0") })).to.be.revertedWith("Only two elements in each array allowed");
      });

      it("Should not mint Token when id or amount don't have length equal to 2", async function () {
        const { passport_signer, signer } = await loadFixture(initialize_signer);

        const amount_MVERSE_TOKEN = max_supply_MVERSE_TOKEN;

        const ids = [id_MVERSE_TOKEN, 99999]; // Id 99999 for Passport should not exist
        const amounts = [amount_MVERSE_TOKEN];
        await expect(passport_signer.connect(signer).mintTokens(ids, amounts, { value: ethers.utils.parseEther("1.0") })).to.be.revertedWith("Only two elements in each array allowed");
      });

      it("Should not mint Token when id or amount don't have length equal to 2", async function () {
        const { passport_signer, signer } = await loadFixture(initialize_signer);

        const amount_MVERSE_TOKEN = max_supply_MVERSE_TOKEN;

        const ids = [id_MVERSE_TOKEN]; // Id 99999 for Passport should not exist
        const amounts = [amount_MVERSE_TOKEN];
        await expect(passport_signer.connect(signer).mintTokens(ids, amounts, { value: ethers.utils.parseEther("1.0") })).to.be.revertedWith("Only two elements in each array allowed");
      });

      it("Should get right balance after mint Token (balanceOfAddress)", async function () {
        const { passport_signer, signer, otherAccount } = await loadFixture(initialize_signer);

        const amount_MVERSE_TOKEN = fixed_MVERSE_TOKEN_AMOUNT_PASSPORT_MEMBER_LEVEL_1;
        const amount_PASSPORTS = 1;

        const ids = [id_MVERSE_TOKEN, id_PASSPORT_MEMBER_LEVEL_1]; // ids[0] must be id_MVERSE_TOKEN
        const amounts = [amount_MVERSE_TOKEN, amount_PASSPORTS];
        await passport_signer.connect(signer).mintTokens(ids, amounts, { value: ethers.utils.parseEther("1.0") });
        const [_ids, _amounts] = await passport_signer.connect(signer).balanceOfAddress(otherAccount.address);
        expect([[_ids[0].toNumber(), _ids[1].toNumber()], [_amounts[0].toNumber(), _amounts[1].toNumber()]]).to.eql([ids, amounts]);
      });

      it("Should get right balance after mint Token (balanceOfTokens)", async function () {
        const { passport_signer, signer, otherAccount } = await loadFixture(initialize_signer);

        const amount_MVERSE_TOKEN = fixed_MVERSE_TOKEN_AMOUNT_PASSPORT_MEMBER_LEVEL_1;
        const amount_PASSPORTS = 1;

        const ids = [id_MVERSE_TOKEN, id_PASSPORT_MEMBER_LEVEL_1]; // ids[0] must be id_MVERSE_TOKEN
        const amounts = [amount_MVERSE_TOKEN, amount_PASSPORTS];
        await passport_signer.connect(signer).mintTokens(ids, amounts, { value: ethers.utils.parseEther("1.0") });
        const _amounts = await passport_signer.connect(signer).balanceOfTokens(otherAccount.address, ids);
        expect([_amounts[0].toNumber(), _amounts[1].toNumber()]).to.eql(amounts);
      });

      it("Should get zero balance (balanceOfAddress)", async function () {
        const { passport_signer, signer, otherAccount } = await loadFixture(initialize_signer);

        const [_ids, _amounts] = await passport_signer.connect(signer).balanceOfAddress(otherAccount.address);
        expect([[_ids[0].toNumber(), _ids[1].toNumber()], [_amounts[0].toNumber(), _amounts[1].toNumber()]]).to.eql([[0, id_PASSPORT_MEMBER_LEVEL_1], [0, 0]]);
      });
    });
    describe("balanceOf", function () {
      it("Should get zero balance (balanceOfTokens)", async function () {
        const { passport_signer, signer, otherAccount } = await loadFixture(initialize_signer);

        const ids = [id_MVERSE_TOKEN, id_PASSPORT_MEMBER_LEVEL_1]; // ids[0] must be id_MVERSE_TOKEN
        const _amounts = await passport_signer.connect(signer).balanceOfTokens(otherAccount.address, ids);
        expect([_amounts[0].toNumber(), _amounts[1].toNumber()]).to.eql([0, 0]);
      });

      it("Should not mint Tokens when mintActive is equal to false", async function () {
        const { passport, passport_signer, signer } = await loadFixture(initialize_signer);

        const amount_MVERSE_TOKEN = fixed_MVERSE_TOKEN_AMOUNT_PASSPORT_MEMBER_LEVEL_1;
        const amount_PASSPORTS = 1;

        const ids = [id_MVERSE_TOKEN, id_PASSPORT_MEMBER_LEVEL_1]; // ids[0] must be id_MVERSE_TOKEN
        const amounts = [amount_MVERSE_TOKEN, amount_PASSPORTS];

        const newIsMintActive = false;
        await passport.setIsMintActive(newIsMintActive);

        await expect(passport_signer.connect(signer).mintTokens(ids, amounts, { value: ethers.utils.parseEther("1.0") })).to.be.revertedWith("Mint is not active right now, a maintenance can be in action, contact support for more details");
      });
    });
  });
});