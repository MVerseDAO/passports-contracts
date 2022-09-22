// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "./Dependencies/ERC1155Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/security/PausableUpgradeable.sol";
import "./Dependencies/ERC1155BurnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "hardhat/console.sol";

contract Passport is Initializable, ERC1155Upgradeable, OwnableUpgradeable, PausableUpgradeable, ERC1155BurnableUpgradeable, UUPSUpgradeable {
    event MintedPassport(address minter, uint256[] ids, uint256[] amounts);
    event BurnedPassport(address burner, uint256[] ids, uint256[] amounts);
    
    /// @notice This will set the address of the Gnosis-Safe for Mverse (Core Safe)
    /// @dev Should be initialized in the initialize() function with the current address of the Gnosis-Safe
    /// For development purposes we are using Mumbai Testnet and the safe is located on this Network.
    address public SAFE_MVERSE;

    /// Defines State Variables of $MVerse Token
    uint256 public id_MVERSE_TOKEN; // id of MVERSE_TOKEN
    uint256 public max_supply_MVERSE_TOKEN; // Supply of $MVerse Tokens
    uint256 public reserved_MVERSE_TOKEN; // Reserved $MVerse Tokens
    uint256 public minted_MVERSE_TOKEN; // Number of Minted $MVerse Tokens

    // Defines State Variables of Passports
    uint256[] public id_PASSPORTS; // id of Passports
    mapping(uint256 => uint256) public max_supply_PASSPORTS; // Supply of Passports of specific Id
    mapping(uint256 => uint256) public reserved_PASSPORTS; // Number Reserved of Passports of specific Id
    mapping(uint256 => uint256) public minted_PASSPORTS; // Number of Passports Minted of specific Id
    mapping(uint256 => uint256) public fixed_MVERSE_TOKEN_AMOUNT_PASSPORTS; // Fixed Amount of $MVerse Token to be given to Passport of specific Id when isFixed_MVERSE_TOKEN_AMOUNT_PASSPORTS == true
    mapping(uint256 => uint256) public rate_PASSPORTS; // Rate of Passports

    bool public isFixed_MVERSE_TOKEN_AMOUNT_PASSPORTS;
    bool public isMintActive;
    bool public isBurnActive;

    // Modifier to permit only SAFE_MVERSE address to do the action
    modifier onlySafe() {
        require(msg.sender == SAFE_MVERSE, "only manager address can call this");
        _;
    }

    // Modifier to pause MintTokens if needed
    modifier mintActive() {
        require(isMintActive, "Mint is not active right now, a maintenance can be in action, contact support for more details");
        _;
    }

    // Modifier to pause burnTokens if needed
    modifier burnActive() {
        require(isBurnActive, "Burn is not active right now, a maintenance can be in action, contact support for more details");
        _;
    }

    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() {
        _disableInitializers();
    }

    function initialize(
        uint256 _id_MVERSE_TOKEN,
        uint256[] memory _id_PASSPORTS,
        uint256 _max_supply_MVERSE_TOKEN,
        uint256 _reserved_MVERSE_TOKEN,
        uint256[] memory _max_supply_PASSPORTS,
        uint256[] memory _reserved_PASSPORTS,
        uint256[] memory _rate_PASSPORTS,
        uint256[] memory _fixed_MVERSE_TOKEN_AMOUNT_PASSPORTS,
        bool _isFixed_MVERSE_TOKEN_AMOUNT_PASSPORTS,
        address _SAFE_MVERSE
    ) initializer public {
        // length of all arrays in params must be the same
        require(_id_PASSPORTS.length == _max_supply_PASSPORTS.length &&
            _id_PASSPORTS.length == _rate_PASSPORTS.length &&
            _id_PASSPORTS.length == _reserved_PASSPORTS.length &&
            _id_PASSPORTS.length == _fixed_MVERSE_TOKEN_AMOUNT_PASSPORTS.length,
            "Length of arrays _PASSPORTS, _supply_PASSPORTS, _rate_PASSPORTS, _reserved_PASSPORTS and _fixed_MVERSE_TOKEN_AMOUNT_PASSPORTS must be the same");

        require(_max_supply_MVERSE_TOKEN > 0, "Max Supply of MVerse Token must be greater than zero");
        require(_max_supply_MVERSE_TOKEN >= _reserved_MVERSE_TOKEN, "Max Supply of MVerse Token must be greater or equal than Reserved");

        //max supply of Passports must be greater than Reserved number of Passports
        for(uint256 i = 0; i < _id_PASSPORTS.length; i++) {
            require(_max_supply_PASSPORTS[i] > 0, "Max Supply of Passports must be greater than zero");
            require(_max_supply_PASSPORTS[i] >= _reserved_PASSPORTS[i], "Max Supply of Passports must be greater or equal than Reserved");
            require(_id_PASSPORTS[i] != _id_MVERSE_TOKEN, "Tokens must have a unique Id"); // check if there is not a Passport with the same $MVerse Token Id
            require(max_supply_PASSPORTS[_id_PASSPORTS[i]] == 0, "Passports must have a unique Id"); // check if there is not a Passport with the same Id than another
            max_supply_PASSPORTS[_id_PASSPORTS[i]] = _max_supply_PASSPORTS[i];
            reserved_PASSPORTS[_id_PASSPORTS[i]] = _reserved_PASSPORTS[i];
            fixed_MVERSE_TOKEN_AMOUNT_PASSPORTS[_id_PASSPORTS[i]] = _fixed_MVERSE_TOKEN_AMOUNT_PASSPORTS[i];
            rate_PASSPORTS[_id_PASSPORTS[i]] = _rate_PASSPORTS[i];
            //minted_PASSPORTS[_id_PASSPORTS[i]] = 0; // mapping values are automatically initialized with zero
        }

        id_PASSPORTS = _id_PASSPORTS;
        id_MVERSE_TOKEN = _id_MVERSE_TOKEN;
        max_supply_MVERSE_TOKEN = _max_supply_MVERSE_TOKEN;
        reserved_MVERSE_TOKEN = _reserved_MVERSE_TOKEN;
        isFixed_MVERSE_TOKEN_AMOUNT_PASSPORTS = _isFixed_MVERSE_TOKEN_AMOUNT_PASSPORTS;
        minted_MVERSE_TOKEN = 0; // number of minted $MVerse Tokens must be zero in the beginning

        SAFE_MVERSE = _SAFE_MVERSE;
        isMintActive = true;
        isBurnActive = true;
        
        __ERC1155_init("https://mverse.io/");
        __Ownable_init();
        __Pausable_init();
        __ERC1155Burnable_init();
        __UUPSUpgradeable_init();
    }

    // Check if a passport with specified Id exists
    function tokenExists(
        uint256 id_TOKEN,
        bool checkOnlyPassports
    ) public view returns(bool) {
        bool mxs = max_supply_PASSPORTS[id_TOKEN] > 0; // verify if max_supply of Passport is greater than id_TOKEN (if it does not exists, mapping will return 0)
        if (checkOnlyPassports)
            return mxs;
        else if (id_TOKEN == id_MVERSE_TOKEN)
            return true;
        else
            return mxs;
    }

    // check if the specific address is owner from any of the Passports types
    function hasPassportInWallet(address addr) internal view returns (bool) {
        require(address(addr) != address(0), "Address must be different from 0 address");
        for(uint256 i = 0; i < id_PASSPORTS.length; i++)
            if (this.balanceOf(addr, id_PASSPORTS[i]) > 0) // if there is any Passport with any Id must return true
                return true;
        return false; // if not was found return false
    }

    // if msg.sender is the owner, it will mint a max number of tokens/passports of the specific type equals to reserved
    // if msg.sender is not the owner, it will only mint 1 passport max to address, and a fixed limit of tokens
    function mintTokens(uint256[] memory ids, uint256[] memory amounts)
        payable
        public
        mintActive
    {
        require(amounts.length == 2 && ids.length == 2, "Only two elements in each array allowed");
        require(ids[0] == id_MVERSE_TOKEN, "The first element of array ids must be equal to id_MVERSE_TOKEN");
        require(tokenExists(ids[1], true), "Passport Id doesn't exist"); // id[1] must be an existing Passport Id

        if (_msgSender() != owner()) {// if it is not the contract owner
            if (amounts[0] > 0) {
                if (isFixed_MVERSE_TOKEN_AMOUNT_PASSPORTS)
                    require(minted_MVERSE_TOKEN + reserved_MVERSE_TOKEN + getFixedMVerseTokenAmount(ids[1]) <= max_supply_MVERSE_TOKEN, "Not enough supply of MVerse Tokens to mint (max supply less than fixed amount)");
                else
                    require(minted_MVERSE_TOKEN + reserved_MVERSE_TOKEN + 1 <= max_supply_MVERSE_TOKEN, "Not enough supply of MVerse Tokens to mint (max supply reached)");
            }
            require(amounts[1] == 1, "Only one passport authorized per wallet"); // users (members,artists,producers) can only mint one passport in their wallet
            require(minted_PASSPORTS[ids[1]] < max_supply_PASSPORTS[ids[1]] - reserved_PASSPORTS[ids[1]], "Not enought supply left"); // user can only mint if the number of Minted passports is less than the Max Supply minus Reserved Passports
            
            require(!hasPassportInWallet(_msgSender()), "Mint wallet must own zero passports"); // users must have zero passports in their wallet.
            // CHECK: how to precify $MVerse Tokens if amounts[0] != 0 ?
            // CHECK2:  operator must be >= or >
            require(msg.value >= rate_PASSPORTS[ids[1]], "Not enough ether sent"); // users must pay the rate of Passport to own it

            amounts[0] = 1;
            if (isFixed_MVERSE_TOKEN_AMOUNT_PASSPORTS)
                amounts[0] = getFixedMVerseTokenAmount(ids[1]);

            super._mintBatch(_msgSender(), ids, amounts, "");
            minted_PASSPORTS[ids[1]]++; // a new Passport will be Minted, so we increase this value
            minted_MVERSE_TOKEN += amounts[0]; // a new Number of Tokens will be minted, so we increate this value
        }
        else {
            // CHECK: owner must use passport from reserved?
            require(amounts[1] <= reserved_PASSPORTS[ids[1]], "Number of Passports with this Id to mint must be less than Reserved");
            require(amounts[0] <= reserved_MVERSE_TOKEN, "Not enough supply of Reserved MVerse Tokens to mint (max supply less than fixed amount)");

            super._mintBatch(_msgSender(), ids, amounts, "");
            reserved_PASSPORTS[ids[1]] -= amounts[1];
            minted_PASSPORTS[ids[1]] += amounts[1];
            reserved_MVERSE_TOKEN -= amounts[0];
            minted_MVERSE_TOKEN += amounts[0];
        }
        emit MintedPassport(_msgSender(), ids, amounts);
    }

    // if msg.sender is the owner, it can burn more than one Passport with specific Id, and all the tokens related to them (be careful)
    // if msg.sender is not the owner, it will burn a specific Passport and a specific number of Tokens
    function burnTokens(
        uint256[] memory ids,
        uint256[] memory amounts
    ) public
      onlyOwner
      burnActive
    {
        require(amounts.length == 2 && ids.length == 2, "Only two elements in each array allowed");
        require(ids[0] == id_MVERSE_TOKEN, "The first element of array ids must be equal to id_MVERSE_TOKEN");
        require(tokenExists(ids[1], true), "Passport Id doesn't exist"); // id[1] must be an existing Passport Id
        
        super._burnBatch(_msgSender(), ids, amounts);
        emit BurnedPassport(_msgSender(), ids, amounts);
    }

    // get amounts of Tokens informing the address and ids of Tokens (ids[0] must be id_MVERSE_TOKEN and ids[1] must be the Id of Passport)
    function balanceOfTokens(
        address addr,
        uint256[] memory ids
    ) public view returns (uint256[] memory)
    {
        require(address(addr) != address(0), "Address must be different from 0 address");
        require(ids.length == 2, "Only two elements in each array allowed");
        require(ids[0] == id_MVERSE_TOKEN, "The first element of array ids must be equal to id_MVERSE_TOKEN");
        require(tokenExists(ids[1], true), "Passport Id doesn't exist"); // id[1] must be an existing Passport Id

        uint256[] memory batchBalances = new uint256[](2);

        try this.balanceOf(addr, ids[0]) returns (uint256 t) {
            batchBalances[0] = t;
        } catch Error(string memory /*reason*/) {
            batchBalances[0] = 0;
        }

        try this.balanceOf(addr, ids[1]) returns (uint256 p) {
            batchBalances[1] = p;
        } catch Error(string memory /*reason*/) {
            batchBalances[1] = 0;
        }

        return batchBalances;
    }

    // get amounts of Tokens informing the address
    function balanceOfAddress(
        address addr
    ) public view returns (uint256[] memory, uint256[] memory)
    {
        require(address(addr) != address(0), "Address must be different from 0 address");

        uint256[] memory ids = new uint256[](2);
        uint256[] memory amounts = new uint256[](2);

        ids[0] = 0;
        try this.balanceOf(addr, id_MVERSE_TOKEN) returns (uint256 t) {
            amounts[0] = t;
        } catch Error(string memory /*reason*/) {
            amounts[0] = 0;
        }

        bool go = true;
        for(uint256 i = 0; i < id_PASSPORTS.length && go; i++) {
            try this.balanceOf(addr, id_PASSPORTS[i]) returns (uint256 p) {
                amounts[1] = p;
                ids[1] = id_PASSPORTS[i];
                go = false;
            } catch Error(string memory /*reason*/) {
                amounts[1] = 0;
                ids[1] = 0;
            }
        }
        
        return (ids, amounts);
    }

    // set new rate to Passport with specified Id
    function setRate(
        uint256 id_PASSPORT,
        uint256 rate_PASSPORT
    ) external onlyOwner {
        require(tokenExists(id_PASSPORT, true), "Passport with this Id doesn't exist"); // Id of Passport must be different from zero and less or equal than the total Passports Ids
        //require(rate_PASSPORT != 0, "Rate must be different from zero");
        rate_PASSPORTS[id_PASSPORT] = rate_PASSPORT;
    }

    // set new Reserved number for Passports with specified Id
    function setReserved(
        uint256 id_TOKEN,
        uint256 reserved_TOKENS
    ) external onlyOwner {
        require(tokenExists(id_TOKEN, false), "Token with this Id doesn't exist"); // Id of Passport must be different from zero and less or equal than the total Passports Ids
        if (id_TOKEN == id_MVERSE_TOKEN) {
            require(minted_MVERSE_TOKEN + reserved_TOKENS <= max_supply_MVERSE_TOKEN,
            "Number of minted MVerse Token plus the Reserved ones must be less than max supply");
            reserved_MVERSE_TOKEN = reserved_TOKENS;
        }
        else {
            require(minted_PASSPORTS[id_TOKEN] + reserved_TOKENS <= max_supply_PASSPORTS[id_TOKEN],
            "Number of minted Passports plus the Reserved ones must be less than max supply");
            reserved_PASSPORTS[id_TOKEN] = reserved_TOKENS;
        }
    }

    // set new Supply for Passport with specified Id
    function setMaxSupply(
        uint256 id_TOKEN,
        uint256 max_supply_TOKEN
    ) external onlyOwner {
        require(tokenExists(id_TOKEN, false), "Token with this Id doesn't exist"); // Id of Passport must be different from zero and less or equal than the total Passports Ids
        if (id_TOKEN != id_MVERSE_TOKEN) {
            require(minted_PASSPORTS[id_TOKEN] + reserved_PASSPORTS[id_TOKEN] <= max_supply_TOKEN,
                "Number of minted passports plus the reserved ones must be less than max supply");
            max_supply_PASSPORTS[id_TOKEN] = max_supply_TOKEN;
        }
        else {
            require(minted_MVERSE_TOKEN + reserved_MVERSE_TOKEN <= max_supply_TOKEN,
                "Number of minted MVerse Token plus the reserved ones must be less than max supply");
            max_supply_MVERSE_TOKEN = max_supply_TOKEN;
        }
    }

    /*
    // set new Supply for Passport with specified Id
    function setMaxSupply(
        uint256 id_PASSPORT,
        uint256 max_supply_PASSPORT
    ) external onlyOwner {
        require(tokenExists(id_PASSPORT, true), "Passport with this Id doesn't exist"); // Id of Passport must be different from zero and less or equal than the total Passports Ids
        require(minted_PASSPORTS[id_PASSPORT] + reserved_PASSPORTS[id_PASSPORT] <= max_supply_PASSPORT,
            "Number of minted passports plus the reserved ones must be less than max supply");
        max_supply_PASSPORTS[id_PASSPORT] = max_supply_PASSPORT;
    }
    */

    // set new Fixed $MVerse Token amount for Passport with specified Id
    function setFixedMVerseTokenAmount(
        uint256 id_PASSPORT,
        uint256 fixed_MVERSE_TOKEN_AMOUNT_PASSPORT
    ) external onlyOwner {
        require(tokenExists(id_PASSPORT, true), "Passport with this Id doesn't exist"); // Id of Passport must be different from zero and less or equal than the total Passports Ids
        fixed_MVERSE_TOKEN_AMOUNT_PASSPORTS[id_PASSPORT] = fixed_MVERSE_TOKEN_AMOUNT_PASSPORT;
    }

    // set new Fixed $MVerse Token amount for Passport with specified Id
    function setIsFixedMVerseTokenAmount(
        bool _isFixed_MVERSE_TOKEN_AMOUNT_PASSPORTS
    ) external onlyOwner {
        isFixed_MVERSE_TOKEN_AMOUNT_PASSPORTS = _isFixed_MVERSE_TOKEN_AMOUNT_PASSPORTS;
    }

    // activate/deactivate mintTokens feature
    function setIsMintActive(
        bool _isMintActive
    ) external onlyOwner {
        isMintActive = _isMintActive;
    }

    // activate/deactivate burnTokens feature
    function setIsBurnActive(
        bool _isBurnActive
    ) external onlyOwner {
        isBurnActive = _isBurnActive;
    }

    // get the Rate of Passport with specified Id
    function getRate(
        uint256 id_PASSPORT
    ) external view returns (uint256) {
        require(tokenExists(id_PASSPORT, true), "Passport with this Id doesn't exist"); // Id of Passport must be different from zero and less or equal than the total Passports Ids
        return rate_PASSPORTS[id_PASSPORT];
    }

    // CHECK: will there be Reserved $MVerse Tokens?
    // get the Reserved number of Passports with specified Id
    function getReserved(
        uint256 id_PASSPORT
    ) external view returns (uint256) {
        require(tokenExists(id_PASSPORT, true), "Passport with this Id doesn't exist"); // Id of Passport must be different from zero and less or equal than the total Passports Ids
        return reserved_PASSPORTS[id_PASSPORT];
    }

    // get the Supply of Tokens with specified Id
    function getMaxSupply(
        uint256 id_TOKEN
    ) public view returns (uint256) {
        require(tokenExists(id_TOKEN, false), "Token with this Id doesn't exist"); // Id of Token must be less or equal than the total Token Ids
        if (id_TOKEN == id_MVERSE_TOKEN) { // if id_TOKEN is equal to 0, specified that needs to return the max supply of $Mverse Token
            return max_supply_MVERSE_TOKEN;
        }
        return max_supply_PASSPORTS[id_TOKEN];
    }

    // get the Number of Minted Tokens with specified Id
    function getMinted(
        uint256 id_TOKEN
    ) external view returns (uint256) {
        require(tokenExists(id_TOKEN, false), "Token with this Id doesn't exist"); // Id of Token must be less or equal than the total Token Ids
        if (id_TOKEN == id_MVERSE_TOKEN) { // if id_TOKEN is equal to 0, specified that needs to return the number of $Mverse Token minted
            return minted_MVERSE_TOKEN;
        }
        return minted_PASSPORTS[id_TOKEN];
    }

    // get the Fixed Amount value of Passports with specified Id
    function getFixedMVerseTokenAmount(
        uint256 id_PASSPORT
    ) public view returns (uint256) {
        require(tokenExists(id_PASSPORT, true), "Passport with this Id doesn't exist"); // Id of Token must be less or equal than the total Token Ids
        return fixed_MVERSE_TOKEN_AMOUNT_PASSPORTS[id_PASSPORT];
    }

    function getIsFixedMVerseTokenAmount() external view returns (bool) {
        return isFixed_MVERSE_TOKEN_AMOUNT_PASSPORTS;
    }

    function getIsMintActive() external view returns (bool) {
        return isMintActive;
    }

    function getIsBurnActive() external view returns (bool) {
        return isBurnActive;
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
    // CHECK: needs to be internal?
        internal
        onlyOwner
    {
        _mint(account, id, amount, data);
    }

    function mintBatch(address to, uint256[] memory ids, uint256[] memory amounts, bytes memory data)
    // CHECK: needs to be internal?
        internal
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