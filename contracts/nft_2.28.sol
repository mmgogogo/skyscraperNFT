// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/structs/EnumerableSet.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract IBuilding is Context, Ownable, ERC721, ERC721Burnable, ERC721Pausable {
    using EnumerableSet for EnumerableSet.UintSet;
    using Counters for Counters.Counter;

    // fund account
    address payable public receiver;

    // nft storage struct
    enum Sales { EXPECT, SELLING, CLOSE }

    // 楼层描述
    struct Floor {
        uint256 floorNo;    // floor number
        address owner;      // owner who minted
        uint256 tokenId;    // nftId
        uint256 houseType;  // random hourseType 
        bytes uri;          // tokenURI
    }

    uint256 public buildingId;

    mapping(uint256 => Floor) public _floorTokenMap;
    mapping(uint256 => uint256) public _tokenFloorMap;
    // manager owner floors
    mapping(address => EnumerableSet.UintSet) private _ownerFloors;

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

    uint256 public _mintPrice;  // wei
    uint256 private _start;
    Counters.Counter private _tokenIdCounter;

    // event list
    event MintToken(address indexed from, address indexed to, uint256 indexed tokenId);
    event DeleteTokenInfo(address indexed from, address indexed to, uint256 indexed tokenId);

    constructor() ERC721("Skyscraper NFT", "SKY") {
        _status = _NOT_ENTERED;
        receiver = payable(msg.sender);
        _mintPrice = 0.1 ether;
        _start = 21;
    }

    function Kill() public onlyOwner() {
        selfdestruct(owner());
    }

    function random(uint256 tokenId) internal view returns (string memory) {
        uint256 rand = uint256(keccak256(abi.encodePacked(tokenId, block.difficulty, block.timestamp, msg.sender)));
        return rand % 17;
    }

    function mint(uint256 num) external payable nonReentrant {
        uint256 value = msg.value;
        require(num > 0 && num <= 100, "max num 100");
        require(value >= _mintPrice && value >= num * _mintPrice, "check balance");
        
        // require(_floorTokenMap[floor].owner == address(0), "floor minted");
        for( uint256 i = 0; i < num; i++) {
            uint256 tokenId = _start + _tokenIdCounter.current();/// @notice tokenId start one
            mintOne(tokenId);
            _tokenIdCounter.increment();                /// @notice tokenId increment
        }
    }

    function mintOne(uint256 tokenId) internal view {
        uint256 floor = tokenId;
        uint256 houseType = random(tokenId);

        _floorTokenMap[floor].owner = msg.sender;       /// @notice Set floor owner
        _floorTokenMap[floor].tokenId = tokenId;        /// @notice Set floor tokenId
        _floorTokenMap[floor].houseType = hourseType;   /// @notice Set floor houseType
        _tokenFloorMap[tokenId] = floor;                /// @notice Set token map floor
        _ownerFloors[msg.sender].add(floor);            /// @notice Add owner floor

        _safeMint(msg.sender, tokenId);                 /// @notice Mint to owner
        
        emit MintToken(address(0), msg.sender, tokenId);
    }

    function mint(uint256 floor) external payable nonReentrant onlyOwner() {
        uint256 value = msg.value;
        require(value >= _mintPrice, "check balance");
        require(floor > 0 && floor <= 20, "floor no. not valid");
        require(_floorTokenMap[floor].owner == address(0), "floor minted");

        uint256 tokenId = floor;
        uint256 houseType = random(tokenId);

        _floorTokenMap[floor].owner = msg.sender;       /// @notice Set floor owner
        _floorTokenMap[floor].tokenId = tokenId;        /// @notice Set floor tokenId
        _floorTokenMap[floor].houseType = houseType;    /// @notice Set floor houseType
        _tokenFloorMap[tokenId] = floor;                /// @notice Set token map floor
        _ownerFloors[msg.sender].add(floor);            /// @notice Add owner floor

        _safeMint(msg.sender, tokenId);             /// @notice Mint to owner

        emit MintToken(address(0), msg.sender, tokenId);
    }

    function _updateTokenInfo(address from, address to, uint256 tokenId) internal {
        uint256 floor = _tokenFloorMap[tokenId];    /// @notice Set token map floor
        // remove from info
        _floorTokenMap[floor].owner = to;           /// @notice Update floor owner to to address
        _ownerFloors[from].remove(floor);           /// @notice Delete from address's floor
        _ownerFloors[to].add(floor);                /// @notice Add to address's floor
    }
    // burn
    function _delUserTokenInfo(address from, address to, uint256 tokenId) internal {
        uint256 floor = _tokenFloorMap[tokenId];
        _ownerFloors[from].remove(floor);           /// @notice Add owner floor
        _floorTokenMap[floor].owner = address(0);   /// @notice Set floor owner to zero address
        _floorTokenMap[floor].tokenId = 0;          /// @notice Set floor tokenId zero
        delete _tokenFloorMap[tokenId];             /// @notice Delete token map floor

        emit DeleteTokenInfo(from, to, tokenId);
    }
    function getTokenInfo(uint256 tokenId) public view returns (Floor memory) {
        uint256 floor = _tokenFloorMap[tokenId];
        return _floorTokenMap[floor];
    }
    function getFloorInfo(uint256 floor) public view returns (Floor memory) {
        return _floorTokenMap[floor];
    }
    function getUserInfo(address owner) public view returns (uint256[] memory) {
        return _ownerFloors[owner].values();
    }
    function tokenOfOwnerByIndex(address owner, uint256 index) public view override returns (uint256)  {
        uint256 floor = _ownerFloors[owner].at(index);
        if (floor > 0) {
            return _floorTokenMap[floor].tokenId;
        }
        return 0;
    }
    function totalSupply() public view virtual override returns (uint256) {
        return _tokenIdCounter.current();
    }
    function tokenByIndex(uint256 index) public view virtual override returns (uint256) {
        require(index < _tokenIdCounter.current(), "Global index out of bounds");
        return index + 1;
    }
    
    function tokenURI( uint256 tokenId ) public override view returns (string memory) {
        require(_exists(tokenId), "ERC721Metadata: URI query for nonexistent token");

        string memory baseURI = _baseURI();
        uint256 floor = _tokenFloorMap[tokenId];

        return bytes(baseURI).length > 0 ? 
            string(abi.encodePacked(baseURI, string(_floorTokenMap[floor].uri))) : string(_floorTokenMap[floor].uri);
    }
    
    function _beforeTokenTransfer(address from, address to, uint256 tokenId) internal override(ERC721, ERC721Pausable) {
        super._beforeTokenTransfer(from, to, tokenId);
        if (from == address(0)) { // mint function
        }
        if (to == address(0)) { // burn
            _delUserTokenInfo(from, to, tokenId);
        }
        if (from != address(0) && to != address(0) && to != from) { // 转移
            _updateTokenInfo(from, to, tokenId);
        }
    }
    function burn(uint256 tokenId) public override whenNotPaused {
        // require(_isApprovedOrOwner(_msgSender(), tokenId), "ERC721Burnable: caller is not owner nor approved");
        require(_msgSender() == ownerOf(tokenId), "ERC721Burnable: caller is not owner nor approved");
        _burn(tokenId);
    }
    function pause() public onlyOwner() {
        _pause();
    }
    function unpause() public onlyOwner() {
        _unpause();
    }
    // The following functions are overrides required by Solidity.
    function supportsInterface(bytes4 interfaceId) public
        view
        virtual
        override(ERC721)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
    function withdraw() public onlyOwner() {
        receiver.transfer(address(this).balance);
    }
}