// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "./Dependencies/ERC1155Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/security/PausableUpgradeable.sol";
import "./Dependencies/ERC1155BurnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";

contract Passport is Initializable, ERC1155Upgradeable, OwnableUpgradeable, PausableUpgradeable, ERC1155BurnableUpgradeable, UUPSUpgradeable {
   
    /// Defines Ids of types
    uint256 public id_MVERSE_TOKEN; // id of MVERSE_TOKEN
    uint256[] public id_PASSPORTS; // id of PASSPORTS: [0] = Member_Level_1; [1] = Member_Level_2; [2] = Member_Level_3 ...

    /// @notice This will set the address of the Gnosis-Safe for Mverse (Core Safe)
    /// @dev Should be initialized in the initialize() function with the current address of the Gnosis-Safe
    /// For development purposes we are using Mumbai Testnet and the safe is located on this Network.
    address public SAFE_MVERSE;

    // Modifier to permit only SAFE_MVERSE address to do the action
    modifier onlySafe() {
        require(msg.sender == SAFE_MVERSE, "only manager address can call this");        
        _;
    }

    uint256 public max_supply_MVERSE_TOKEN; // Supply of $MVerse Tokens
    uint256 public minted_MVERSE_TOKEN; // Number of Minted $MVerse Tokens
    uint256[] public max_supply_PASSPORTS; // Supply of Passports: [0] = Member_Level_1; [1] = Member_Level_2; [2] = Member_Level_3 ...
    uint256[] public reserved_PASSPORTS; // Reserved Passports: [0] = Member_Level_1; [1] = Member_Level_2; [2] = Member_Level_3 ...
    uint256[] public minted_PASSPORTS; // Number of Passports Minted: [0] = Member_Level_1; [1] = Member_Level_2; [2] = Member_Level_3 ...

    /// Defines mint rate of passports
    uint256[] public rate_PASSPORTS; // Rate of Passports: [0] = Member_Level_1; [1] = Member_Level_2; [2] = Member_Level_3 ...

    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() {
        _disableInitializers();
    }

    function initialize(
        uint256 _id_MVERSE_TOKEN,
        uint256[] memory _id_PASSPORTS,
        uint256 _max_supply_MVERSE_TOKEN,
        uint256[] memory _max_supply_PASSPORTS,
        uint256[] memory _reserved_PASSPORTS,
        uint256[] memory _rate_PASSPORTS,
        address _SAFE_MVERSE
    ) initializer public {
        // length of all arrays in params must be the same
        require(_id_PASSPORTS.length == _max_supply_PASSPORTS.length &&
            _id_PASSPORTS.length == _rate_PASSPORTS.length &&
            _id_PASSPORTS.length == _reserved_PASSPORTS.length,
            "Arrays _PASSPORTS, _supply_PASSPORTS, _rate_PASSPORTS and _reserved_PASSPORTS must be the same");

        //max supply of Passports must be greater than Reserved number of Passports
        for(uint256 i = 0; i < _max_supply_PASSPORTS.length; i++) {
            require(_max_supply_PASSPORTS[i] >= _reserved_PASSPORTS[i], "Supply of passports must be greater or equal than reserved");
        }

        id_MVERSE_TOKEN = _id_MVERSE_TOKEN;
        id_PASSPORTS = _id_PASSPORTS;

        max_supply_MVERSE_TOKEN = _max_supply_MVERSE_TOKEN;
        max_supply_PASSPORTS = _max_supply_PASSPORTS;
        reserved_PASSPORTS = _reserved_PASSPORTS;
        rate_PASSPORTS = _rate_PASSPORTS;

        SAFE_MVERSE = _SAFE_MVERSE;

        minted_MVERSE_TOKEN = 0; // number of minted $MVerse Tokens must be zero in the beginning
        for(uint256 i = 0; i < id_PASSPORTS.length; i++) {
            minted_PASSPORTS.push(0); // initial number of passports minted need to be zero to all Passports
        }

        require(minted_PASSPORTS.length == id_PASSPORTS.length, "Length of minted_PASSPORTS array must be the same of id_PASSPORTS");
        
        __ERC1155_init("https://mverse.io/");
        __Ownable_init();
        __Pausable_init();
        __ERC1155Burnable_init();
        __UUPSUpgradeable_init();
    }

    function mintTokens(uint256[] memory ids, uint256[] memory amounts)
        payable
        public
    {
        require(ids[1] != 0 && ids[1] <= id_PASSPORTS.length, "Passport id doesn't exist"); // ids[1] must be the Passport Id, so it needs to be in the range of 1..9
        require(ids[0] == 0, "The first element of array ids must be 0, specific for MVerse Tokens");
        if (msg.sender != owner()) {// if it is not the contract owner
            require(amounts[1] == 1, "Only one passport authorized per wallet"); // users (members,artists,producers) can only mint one passport in their wallet
            require(minted_PASSPORTS[ids[1]] < max_supply_PASSPORTS[ids[1]] - reserved_PASSPORTS[ids[1]], "Not enought supply left"); // user can only mint if the number of Minted passports is less than the Max Supply minus Reserved Passports
            require(this.balanceOf(msg.sender, ids[1]) == 0, "Mint wallet must own zero passports."); // users must have zero passports in their wallet.

            require(msg.value >= rate_PASSPORTS[ids[1]], "Not enough ether sent"); // users must pay the rate of Passport to own it
            
            minted_PASSPORTS[ids[1]]++; // a new Passport will be Minted, so we increase this value
        }
        else {


            require(reserved_PASSPORTS[ids[1]] > 0, "Number of Reserved Passports with this Id must be greater than zero");
            reserved_PASSPORTS[ids[1]]--;
        }

        minted_MVERSE_TOKEN = minted_MVERSE_TOKEN + amounts[0]; // a new Number of Tokens will be minted, so we increate this value
        _mintBatch(msg.sender, ids, amounts, "");
    }

    // Check if a passport with specified Id exists
    function tokenExists(
        uint256 id_TOKEN,
        bool checkOnlyPassports
    ) public view returns(bool) {
        if (!checkOnlyPassports && id_TOKEN == id_MVERSE_TOKEN) { // If param checkOnlyPassports is false, check if the Id specified is equal to the $MVerse Token Id
            return true; // If yes, return true because there is a token with this Id
        }

        // loop through Passport Ids
        for(uint256 i = 0; i < id_PASSPORTS.length; i++)
            if (id_PASSPORTS[i] == id_TOKEN) // if there is a Passport with the specified Id must return true
                return true;
        
        return false; // if there is not a Passport with the specified Id, returns false
    }

    // set new rate to Passport with specified Id
    function setRate(
        uint256 id_PASSPORT,
        uint256 rate_PASSPORT
    ) external onlyOwner {
        require(tokenExists(id_PASSPORT, true), "Passport with this Id doesn't exist"); // Id of Passport must be different from zero and less or equal than the total Passports Ids
        //require(rate_PASSPORT != 0, "Rate must be different from zero");
        rate_PASSPORTS[id_PASSPORT-1] = rate_PASSPORT;
    }

    // set new Reserved number for Passports with specified Id
    function setReserved(
        uint256 id_PASSPORT,
        uint256 reserved_PASSPORT
    ) external onlyOwner {
        require(tokenExists(id_PASSPORT, true), "Passport with this Id doesn't exist"); // Id of Passport must be different from zero and less or equal than the total Passports Ids
        require(minted_PASSPORTS[id_PASSPORT-1] + reserved_PASSPORT <= max_supply_PASSPORTS[id_PASSPORT-1],
            "number of minted passports plus the reserved ones must be less than total supply");
        //require(rate_PASSPORT != 0, "Rate must be different from zero");
        reserved_PASSPORTS[id_PASSPORT-1] = reserved_PASSPORT;
    }

    // set new Supply for Passport with specified Id
    function setMaxSupply(
        uint256 id_PASSPORT,
        uint256 max_supply_PASSPORT
    ) external onlyOwner {
        require(tokenExists(id_PASSPORT, true), "Passport with this Id doesn't exist"); // Id of Passport must be different from zero and less or equal than the total Passports Ids
        require(minted_PASSPORTS[id_PASSPORT-1] + reserved_PASSPORTS[id_PASSPORT-1] <= max_supply_PASSPORT,
            "number of minted passports plus the reserved ones must be less than total supply");
        //require(rate_PASSPORT != 0, "Rate must be different from zero");
        max_supply_PASSPORTS[id_PASSPORT-1] = max_supply_PASSPORT;
    }

    // get the Rate of Passport with specified Id
    function getRate(
        uint256 id_PASSPORT
    ) external view returns (uint256) {
        require(tokenExists(id_PASSPORT, true), "Passport with this Id doesn't exist"); // Id of Passport must be different from zero and less or equal than the total Passports Ids
        return rate_PASSPORTS[id_PASSPORT-1];
    }

    // CHECK: will there be Reserved $MVerse Tokens?
    // get the Reserved number of Passports with specified Id
    function getReserved(
        uint256 id_PASSPORT
    ) external view returns (uint256) {
        require(tokenExists(id_PASSPORT, true), "Passport with this Id doesn't exist"); // Id of Passport must be different from zero and less or equal than the total Passports Ids
        return reserved_PASSPORTS[id_PASSPORT-1];
    }

    // get the Supply of Tokens with specified Id
    function getMaxSupply(
        uint256 id_TOKEN
    ) external view returns (uint256) {
        require(tokenExists(id_TOKEN, false), "Token with this Id doesn't exist"); // Id of Token must be less or equal than the total Token Ids
        if (id_TOKEN == 0) { // if id_TOKEN is equal to 0, specified that needs to return the max supply of $Mverse Token
            return max_supply_MVERSE_TOKEN;
        }
        return max_supply_PASSPORTS[id_TOKEN-1];
    }

    // get the Number of Minted Tokens with specified Id
    function getMinted(
        uint256 id_TOKEN
    ) external view returns (uint256) {
        require(tokenExists(id_TOKEN, false), "Token with this Id doesn't exist"); // Id of Token must be less or equal than the total Token Ids
        if (id_TOKEN == 0) { // if id_TOKEN is equal to 0, specified that needs to return the number of $Mverse Token minted
            return minted_MVERSE_TOKEN;
        }
        return minted_PASSPORTS[id_TOKEN-1];
    }

    function setURI(string memory newuri) public onlyOwner {
        _setURI(newuri);
    }

    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }

    function mint(address account, uint256 id, uint256 amount, bytes memory data)
        public
        onlyOwner
    {
        _mint(account, id, amount, data);
    }

    function mintBatch(address to, uint256[] memory ids, uint256[] memory amounts, bytes memory data)
        public
        onlyOwner
    {
        _mintBatch(to, ids, amounts, data);
    }

    function _beforeTokenTransfer(address operator, address from, address to, uint256[] memory ids, uint256[] memory amounts, bytes memory data)
        internal
        whenNotPaused
        override
    {
        super._beforeTokenTransfer(operator, from, to, ids, amounts, data);
    }

    function _authorizeUpgrade(address newImplementation)
        internal
        onlyOwner
        override
    {}

    uint256[50] ___gap;
}