// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Pausable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/IERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/structs/EnumerableSet.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract IBuilding is Context, Ownable, ERC721, ERC721Burnable, ERC721Pausable, IERC721Enumerable {
    using EnumerableSet for EnumerableSet.UintSet;
    using Counters for Counters.Counter;
    using Strings for uint256;

    // fund account
    address payable public receiver;

    // nft storage struct
    enum Sales { EXPECT, SELLING, CLOSE }

    // houtType 1-17 blocks information
    uint8[][] private blocks = [[4,4,0,0],[4,2,1,0],[4,1,0,1],[4,0,2,0],[5,5,0,0],[5,3,1,0],[5,2,0,1],[5,1,2,0],[5,0,1,1],[7,7,0,0],[7,5,1,0],[7,4,0,1],[7,3,2,0],[7,2,1,1],[7,1,3,0],[7,1,0,2],[7,0,2,1]];

    // floor information
    struct Floor {
        uint256 floorNo;    // floor number
        address owner;      // owner who minted
        uint256 tokenId;    // nftId
        uint256 houseType;  // random houseType
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
    Counters.Counter private _tokenIdCounter;

    // event list
    event MintToken(address indexed from, address indexed to, uint256 indexed tokenId);
    event DeleteTokenInfo(address indexed from, address indexed to, uint256 indexed tokenId);

    constructor() ERC721("Skyscraper NFT", "SKY") {
        _status = _NOT_ENTERED;
        receiver = payable(msg.sender);
        _mintPrice = 0.1 ether;
    }

    function Kill() public payable onlyOwner() {
        selfdestruct(payable(address(owner())));
    }

    function random(uint256 tokenId) internal view returns (uint256) {
        uint256 rand = uint256(keccak256(abi.encodePacked(tokenId, block.difficulty, block.timestamp, msg.sender)));
        return rand % 17;
    }

    function mint(uint256 num) external payable nonReentrant {
        uint256 value = msg.value;
        require(num > 0 && num <= 100, "max num 100");
        require(value >= _mintPrice && value >= num * _mintPrice, "check balance");
        
        for(uint256 i = 0; i < num; i++) {
            _tokenIdCounter.increment();                    /// @notice tokenId increment
            uint256 tokenId = _tokenIdCounter.current();    /// @notice tokenId start one
            mintOne(tokenId);
        }
    }

    function mintOne(uint256 tokenId) internal {
        uint256 floor = tokenId;
        require(_floorTokenMap[floor].owner == address(0), "floor minted");

        uint256 houseType = 17;
        if (tokenId <= 20) {
            houseType = random(tokenId);
        }

        _floorTokenMap[floor].owner = msg.sender;       /// @notice Set floor owner
        _floorTokenMap[floor].tokenId = tokenId;        /// @notice Set floor tokenId
        _floorTokenMap[floor].houseType = houseType;   /// @notice Set floor houseType
        _tokenFloorMap[tokenId] = floor;                /// @notice Set token map floor
        _ownerFloors[msg.sender].add(floor);            /// @notice Add owner floor

        _safeMint(msg.sender, tokenId);                 /// @notice Mint to owner
        
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

    function tokenOfOwnerByIndex(address owner, uint256 index) public view returns (uint256)  {
        uint256 floor = _ownerFloors[owner].at(index);
        if (floor > 0) {
            return _floorTokenMap[floor].tokenId;
        }
        return 0;
    }

    function totalSupply() public view virtual returns (uint256) {
        return _tokenIdCounter.current();
    }

    function tokenByIndex(uint256 index) public view virtual returns (uint256) {
        require(index < _tokenIdCounter.current(), "Global index out of bounds");
        return index + 1;
    }
    
    function tokenURI( uint256 tokenId ) public override view returns (string memory) {
        require(_exists(tokenId), "ERC721Metadata: URI query for nonexistent token");

        string memory baseURI = _baseURI();
        baseURI = bytes(baseURI).length > 0 ? baseURI : "https://theskyscraper.io/images/";
        uint256 floor = _tokenFloorMap[tokenId];
        uint256 houseType = _floorTokenMap[floor].houseType;
        
        string memory metadata = string(abi.encodePacked(
            '{"platform": "Skyscraper NFT",' ,
            '"name": "Floor #', tokenId.toString(), '",' ,
            '"description": "This a description~",' ,
            '"collection_name": "Skyscraper NFT",' ,
            '"image": "', baseURI , tokenId.toString(), '.png",' ,
            '"external_url": "', baseURI , tokenId.toString(), '",' ,
            '"interactive_nft": {' ,
            '"code_uri": "', baseURI, '",' ,
            '"version": "2.0"},' ,
            '"attributes": [{"trait_type": "HouseType","value": "', houseType.toString() ,'"},' ,
            '{"trait_type": "Size","value": "', _blockInfo(houseType, 0) ,'"},' ,
            '{"trait_type": "1 Block Room","value": "', _blockInfo(houseType, 1) ,'"},' ,
            '{"trait_type": "2 Blocks Room","value": "', _blockInfo(houseType, 2) ,'"},' ,
            '{"trait_type": "3 Blocks Room","value": "', _blockInfo(houseType, 3) ,'"}]}'
        ));

        return string(abi.encodePacked(
            "data:application/json;base64,",
            Base64.encode(bytes(metadata))
        ));
    }

    function _blockInfo(uint256 houseType, uint8 index) private view returns (string memory) {
        uint256 room = blocks[houseType-1][index];
        return room.toString();
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
        override(IERC165,ERC721)
        returns (bool)
    {
        return interfaceId == type(IERC721Enumerable).interfaceId ||
        super.supportsInterface(interfaceId);
    }

    function withdraw() public onlyOwner() {
        receiver.transfer(address(this).balance);
    }
}

/// [MIT License]
/// @title Base64
/// @notice Provides a function for encoding some bytes in base64
/// @author Brecht Devos <brecht@loopring.org>
library Base64 {
    bytes internal constant TABLE = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";

    /// @notice Encodes some bytes to the base64 representation
    function encode(bytes memory data) internal pure returns (string memory) {
        uint256 len = data.length;
        if (len == 0) return "";

        // multiply by 4/3 rounded up
        uint256 encodedLen = 4 * ((len + 2) / 3);

        // Add some extra buffer at the end
        bytes memory result = new bytes(encodedLen + 32);

        bytes memory table = TABLE;

        assembly {
            let tablePtr := add(table, 1)
            let resultPtr := add(result, 32)

            for {
                let i := 0
            } lt(i, len) {

            } {
                i := add(i, 3)
                let input := and(mload(add(data, i)), 0xffffff)

                let out := mload(add(tablePtr, and(shr(18, input), 0x3F)))
                out := shl(8, out)
                out := add(out, and(mload(add(tablePtr, and(shr(12, input), 0x3F))), 0xFF))
                out := shl(8, out)
                out := add(out, and(mload(add(tablePtr, and(shr(6, input), 0x3F))), 0xFF))
                out := shl(8, out)
                out := add(out, and(mload(add(tablePtr, and(input, 0x3F))), 0xFF))
                out := shl(224, out)

                mstore(resultPtr, out)

                resultPtr := add(resultPtr, 4)
            }

            switch mod(len, 3)
            case 1 {
                mstore(sub(resultPtr, 2), shl(240, 0x3d3d))
            }
            case 2 {
                mstore(sub(resultPtr, 1), shl(248, 0x3d))
            }

            mstore(result, encodedLen)
        }

        return string(result);
    }
}