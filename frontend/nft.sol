// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8.10;

// import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC721/presets/ERC721PresetMinterPauserAutoId.sol";
import "./nftcontext/contracts/token/ERC721/presets/ERC721PresetMinterPauserAutoId.sol";

contract NFTTest is ERC721PresetMinterPauserAutoId {

    address private receiver; // 收款账户

    uint private artworkMaxId = 1; // 作品编号，自增ID

    uint private nftTokenMaxId; // NFT ID，自增ID

    /* 作品结构体 */
    struct artwork {
        uint price; // wei
        bytes tokenURI;
        uint amount;
        uint sold;
    }

    mapping(uint => artwork) private artworks; // 作品列表

    mapping(uint => uint) private nft2artworks; // NFT映射至作品

    /* 二次出售定价 */
    struct ownerPrice {
        address ownerAddress;
        uint price;
    }

    mapping(uint => ownerPrice) private nftOwnerPrices; // 所有者二次出售定价集合

    bool private locked = false; // 独占锁

    event SetReceiver(address indexed _receiver); // 设置收款账号事件
    event AddedArtwork(uint indexed artworkId); // 添加作品事件
    event DeletedArtwork(uint indexed artworkId); // 删除作品事件
    event SetArtwork(uint indexed artworkId); // 修改作品事件
    event MintToken(address indexed to, uint indexed tokenId, uint indexed artworkId); // 铸造事件
    event OwnerSetPrice(uint indexed tokenId); // 二次销售定价事件
    event OwnerNotSell(uint indexed tokenId); // 放弃销售事件

    /**
     * 独占锁
     */
    modifier isLocked {
        require(locked == false, "Just locked");
        locked = true;
        _;
        locked = false;
    }

    /**
     * 构造函数
     */
    constructor() ERC721PresetMinterPauserAutoId("WZBB NFT", "WZBB", "") {
        receiver = msg.sender;
    }

    /* 设置收款账号地址 */
    function setReceiver(address addr) public {
        require(hasRole(DEFAULT_ADMIN_ROLE, _msgSender()));
        require(addr != address(0));
        receiver = addr;
        emit SetReceiver(addr);
    }

    /**
     * 管理员添加一件作品
     */
    function addArtwork(uint _price, string memory _tokenURI, uint _amount) public {
        require(hasRole(DEFAULT_ADMIN_ROLE, _msgSender()));
        require(_amount > 0, "Mount must > 0");
        require(locked == false, "Wait pls");
        locked = true;
        uint newId = artworkMaxId;
        artworkMaxId++;
        locked = false;
        artworks[newId] = artwork({
            price: _price,
            tokenURI: bytes(_tokenURI),
            amount: _amount,
            sold: 0
        });
        emit AddedArtwork(newId);
    }

    /**
     * 管理员删除一件作品
     */
    function delArtwork(uint id) public {
        require(hasRole(DEFAULT_ADMIN_ROLE, _msgSender()));
        require(artworks[id].amount > 0, "Id is not exists");
        require(artworks[id].sold == 0, "Artwork has been sold");
        delete artworks[id];
        emit DeletedArtwork(id);
    }

    /**
     * 管理员设置一件作品，价格和最大发行数量
     */
    function setArtwork(uint id, uint _price, uint _amount) public {
        require(hasRole(DEFAULT_ADMIN_ROLE, _msgSender()));
        require(artworks[id].amount > 0, "Id is not exists");
        require(_amount == 0 || (_amount >= 1 && _amount >= artworks[id].sold), "Wrong amount");
        if (_amount > 0) {
            artworks[id].amount = _amount;
        }
        artworks[id].price = _price;
        emit SetArtwork(id);
    }

    /**
     * 按ID取一条作品数据
     */
    function getArtwork(uint id) public view returns (artwork memory) {
        return artworks[id];
    }

    /**
     * 重写：按NFT的ID，找到元数据地址
     */
    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        require(_exists(tokenId), "ERC721Metadata: URI query for nonexistent token");
        require(nft2artworks[tokenId] > 0, "Can not find artworkId with this tokenId");
        return string(artworks[nft2artworks[tokenId]].tokenURI);
    }

    /**
     * 购买即铸造
     */
    function mint(uint artworkId) public payable isLocked whenNotPaused {
        /* 收款人不能铸造 */
        require(msg.sender != receiver, "Receiver can not mint");
        /* 判断作品是否存在 */
        require(artworks[artworkId].amount > 0, "Artwork is not exists");
        /* 用户支付必须 >= 定价 */
        require(msg.value >= artworks[artworkId].price, "Pay error");
        /* 是否售尽 */
        require(artworks[artworkId].sold < artworks[artworkId].amount, "Artwork sold out");
        /* 增加售出量 */
        artworks[artworkId].sold += 1;
        /* 关联NFT与作品 */
        nft2artworks[nftTokenMaxId] = artworkId;
        /* 铸造 */
        _mint(msg.sender, nftTokenMaxId);
        emit MintToken(msg.sender, nftTokenMaxId, artworkId);
        nftTokenMaxId++;
        /* 收益转账 */
        payable(receiver).transfer(msg.value);
    }

    /**
     * 拥有者二次出售定价
     */
    function ownerSetPrice(uint nftId, uint _price) public {
        require(msg.sender == ownerOf(nftId), "Must be owner");
        nftOwnerPrices[nftId] = ownerPrice({
            ownerAddress: msg.sender,
            price: _price
        });
        emit OwnerSetPrice(nftId);
    }

    /**
     * 用户放弃销售
     */
    function ownerNotSell(uint nftId) public {
        require(msg.sender == ownerOf(nftId), "Must be owner");
        delete nftOwnerPrices[nftId];
        emit OwnerNotSell(nftId);
    }

    /**
     * 二次出售的NFT，不能直接转移
     */
    function _beforeTokenTransfer(address from, address to, uint256 tokenId) internal override {
        super._beforeTokenTransfer(from, to, tokenId);
        require(nftOwnerPrices[tokenId].ownerAddress == address(0), "Token is selling");
    }

    /**
     * 获取别人的转售价格
     */
    function askForOwnerPrice(uint nftId) public view returns (ownerPrice memory) {
        return nftOwnerPrices[nftId];
    }

    /**
     * 用户购买他人二次出售的NFT
     */
    function buy(uint nftId) public payable isLocked whenNotPaused {
        address lastOwner = ownerOf(nftId);
        require(nftOwnerPrices[nftId].ownerAddress == lastOwner, "It is not selling");
        require(msg.sender != receiver && msg.sender != lastOwner, "Receiver or owner can not buy");
        require(msg.value >= nftOwnerPrices[nftId].price, "Pay error");
        nftOwnerPrices[nftId].ownerAddress = address(0);
        _safeTransfer(lastOwner, msg.sender, nftId, "");

        uint pay2receiver = msg.value * 25 / 1000;
        payable(receiver).transfer(pay2receiver);
        payable(lastOwner).transfer(msg.value - pay2receiver);
    }
}
