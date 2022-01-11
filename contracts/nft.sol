// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Pausable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/AccessControlEnumerable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

// import "./nftcontext/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
// import "./nftcontext/contracts/token/ERC721/extensions/ERC721Burnable.sol";
// import "./nftcontext/contracts/token/ERC721/extensions/ERC721Pausable.sol";
// import "./nftcontext/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
// import "./nftcontext/contracts/access/AccessControlEnumerable.sol";
// import "./nftcontext/contracts/utils/Counters.sol";

contract IBuilding is Context, AccessControlEnumerable, ERC721Enumerable, ERC721Burnable, ERC721Pausable {

    // fund account
    address payable public receiver;

    // contract admin role
    bytes32 public constant PAUSER_ROLE = keccak256("PAUSER_ROLE");
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");

    // nft storage struct
    enum Sales { EXPECT, SELLING, CLOSE }
    // house types random
    struct HouseType {
        uint256 sittingRoom;
        uint256 bedroom;
        uint256 room2;
        uint256 room3;
        uint256 room4;
    }

    struct Floor {
        uint256 floorNo;    // floor number
        address owner;      // owner who minted
        uint256 tokenId;    // nftId
        HouseType houseType;// random hourseType 
        bytes uri;          // tokenURI
    }
    
    mapping(uint256 => Floor) public _floorTokenMap;
    mapping(uint256 => uint256) public _tokenFloorMap;

    // Re-Entrant prevent
    uint256 private constant _NOT_ENTERED = 1;
    uint256 private constant _ENTERED = 2;
    uint256 private _status;
    modifier nonReentrant() {
        require(_status != _ENTERED, "reentrant call");
        _status = _ENTERED;
        _;
        _status = _NOT_ENTERED;
    }

    using Counters for Counters.Counter;
    Counters.Counter private _tokenIdCounter;

    // event list
    event MintToken(address from, address to, uint256 tokenId);

    constructor() ERC721("PZ NFT", "Fei") {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(PAUSER_ROLE, msg.sender);
        _grantRole(MINTER_ROLE, msg.sender);
        _status = _NOT_ENTERED;
        receiver = payable(msg.sender);
    }

    function mint(uint256 floor) external payable nonReentrant {
        require(floor > 0 && floor <= 10000, "floor no. not valid");
        require(_floorTokenMap[floor].owner == address(0), "floor minted");

        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();

        _floorTokenMap[floor].owner = msg.sender;
        _floorTokenMap[floor].tokenId = tokenId;
        _tokenFloorMap[tokenId] = floor;

        _safeMint(msg.sender, tokenId);
        // todo 户型随机

        emit MintToken(address(0), msg.sender, tokenId);
    }
    function tokenURI( uint256 tokenId ) public override view returns (string memory) {
        require(_exists(tokenId), "ERC721Metadata: URI query for nonexistent token");

        string memory baseURI = _baseURI();
        uint256 floor = _tokenFloorMap[tokenId];

        return bytes(baseURI).length > 0 ? 
            string(abi.encodePacked(baseURI, string(_floorTokenMap[floor].uri))) : string(_floorTokenMap[floor].uri);
    }
    
    function _beforeTokenTransfer(address from, address to, uint256 tokenId) internal override(ERC721, ERC721Enumerable, ERC721Pausable) {
        super._beforeTokenTransfer(from, to, tokenId);
    }
    function burn(uint256 tokenId) public override whenNotPaused {
        // require(_isApprovedOrOwner(_msgSender(), tokenId), "ERC721Burnable: caller is not owner nor approved");
        require(_msgSender() == ownerOf(tokenId), "ERC721Burnable: caller is not owner nor approved");
        _burn(tokenId);

        uint256 floor = _tokenFloorMap[tokenId];
        delete _floorTokenMap[floor];
        delete _tokenFloorMap[tokenId];
    }
    function pause() public onlyRole(PAUSER_ROLE) {
        _pause();
    }
    function unpause() public onlyRole(PAUSER_ROLE) {
        _unpause();
    }
    // The following functions are overrides required by Solidity.
    function supportsInterface(bytes4 interfaceId) public
        view
        virtual
        override(AccessControlEnumerable, ERC721, ERC721Enumerable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
    function withdraw() public onlyRole(DEFAULT_ADMIN_ROLE) {
        receiver.transfer(address(this).balance);
    }
    receive() external payable {}
}