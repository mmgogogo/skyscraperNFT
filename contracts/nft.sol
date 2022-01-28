// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Pausable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/AccessControlEnumerable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract IBuilding is Context, AccessControlEnumerable, ERC721Enumerable, ERC721Burnable, ERC721Pausable {
    using EnumerableSet for EnumerableSet.UintSet;
    using Counters for Counters.Counter;

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

    // 楼层描述
    struct Floor {
        uint256 floorNo;    // floor number
        address owner;      // owner who minted
        uint256 tokenId;    // nftId
        HouseType houseType;// random hourseType 
        bytes uri;          // tokenURI
    }

    uint256 buildingId;

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
    Counters.Counter private _tokenIdCounter;

    // event list
    event MintToken(address indexed from, address indexed to, uint256 indexed tokenId);
    event DeleteTokenInfo(address indexed from, address indexed to, uint256 indexed tokenId);

    constructor() ERC721("PZ NFT", "Fei") {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(PAUSER_ROLE, msg.sender);
        _grantRole(MINTER_ROLE, msg.sender);
        _status = _NOT_ENTERED;
        receiver = payable(msg.sender);
        _mintPrice = 0.1 ether;
    }

    function mint(uint256 floor) external payable nonReentrant {
        uint256 value = msg.value;
        require(value >= _mintPrice, "check balance");
        require(floor > 1000 && floor <= 100000, "floor no. not valid");
        require(_floorTokenMap[floor].owner == address(0), "floor minted");

        _tokenIdCounter.increment();                /// @notice tokenId increment
        uint256 tokenId = _tokenIdCounter.current();/// @notice tokenId start one

        _floorTokenMap[floor].owner = msg.sender;   /// @notice Set floor owner
        _floorTokenMap[floor].tokenId = tokenId;    /// @notice Set floor tokenId
        _floorTokenMap[floor].floorNo = floor;      /// @notice Set floor No
        _tokenFloorMap[tokenId] = floor;            /// @notice Set token map floor
        _ownerFloors[msg.sender].add(floor);        /// @notice Add owner floor

        _safeMint(msg.sender, tokenId);             /// @notice Mint to owner
        // todo 户型随机
        // 资产分配，分配钱包列表
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
    function tokenURI( uint256 tokenId ) public override view returns (string memory) {
        require(_exists(tokenId), "ERC721Metadata: URI query for nonexistent token");

        string memory baseURI = _baseURI();
        uint256 floor = _tokenFloorMap[tokenId];

        return bytes(baseURI).length > 0 ? 
            string(abi.encodePacked(baseURI, string(_floorTokenMap[floor].uri))) : string(_floorTokenMap[floor].uri);
    }
    
    // 楼层资源修改 TODO

    function _beforeTokenTransfer(address from, address to, uint256 tokenId) internal override(ERC721, ERC721Enumerable, ERC721Pausable) {
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
    function withdraw() external onlyRole(DEFAULT_ADMIN_ROLE) {
        receiver.transfer(address(this).balance);
    }
    function destroy() public onlyRole(DEFAULT_ADMIN_ROLE) {
        selfdestruct(receiver);
    }
}
