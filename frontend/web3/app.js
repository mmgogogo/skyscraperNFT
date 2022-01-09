/**
 * 目标链ID
 */
const targetChainId = "0x61"; // BSC测试链

/**
 * 合约地址
 */
const contract_address = '0x2c3dA85c091A6886C029deAaD188eb9A07677bAA';

/**
 * 节点token
 * register: https://web3api.com/
 */
const provider_token = 'RRXXG62RXYR52G2FUY37CG3E9ZZPCYMT9M';
/**
 * Web3 http provider
 * @mainnet https://bsc-mainnet.web3api.com/v1/
 * @testnet https://bsc-testnet.web3api.com/v1/
 */
const web3_http_provider = 'https://bsc-testnet.web3api.com/v1/' + provider_token;

/**
 * ABI
 */
const contract_abi = contract_nfttest;
/* 主体逻辑 */
(async function() {

    /**
     * 小狐狸钱包是否已安装
     * @returns {boolean}
     */
    const isMetaMaskInstalled = () => {
        const { ethereum } = window;
        return Boolean(ethereum && ethereum.isMetaMask);
    };

    /**
     * web3连接合约的实例
     */
    let web3 = undefined; // web3实例（写）
    let myContract = undefined; // 合约实例（写）
    let web3reader = new Web3(new Web3.providers.HttpProvider(web3_http_provider));// web3实例（读）
    let myContractReader = new web3reader.eth.Contract(contract_abi, contract_address); // 合约实例（读）

    /**
     * 辅助函数
     * @param id
     * @returns {HTMLElement|null|HTMLCollectionOf<Element>}
     */
    let $ = function (id) {
        let s = id.charAt(0);
        id = id.substr(1);
        if (s === '.') {
            return document.getElementsByClassName(id);
        } else if (s === '#') {
            return document.getElementById(id);
        } else {
            return null;
        }
    };

    /**
     * 合约浏览器
     */
    $('#id_span_scan').innerHTML = '<a target="_blank" href="https://testnet.bscscan.com/address/' + contract_address + '">打开合约浏览器网页</a>';

    /**
     * 连接钱包
     */
    $('#id_btn_wallet').onclick = async function () {
        if (isMetaMaskInstalled()) {
            if (window.ethereum.chainId != targetChainId) {
                alert("链ID不是 " + targetChainId + "（BSC测试链）！请在钱包中切换");
                return;
            }
            let accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            $('#id_span_wallet').innerHTML = '钱包地址：' + accounts[0];
            web3 = new Web3(window.ethereum);
            myContract = new web3.eth.Contract(contract_abi, contract_address, {
                from: window.ethereum.selectedAddress
            });
            window.ethereum.on('accountsChanged', function () {
                web3 = undefined;
                myContract = undefined;
                $('#id_span_wallet').innerHTML = '';
            });
            window.ethereum.on('chainChanged', function () {
                web3 = undefined;
                myContract = undefined;
                $('#id_span_wallet').innerHTML = '';
            });
            window.ethereum.on('disconnect', function () {
                web3 = undefined;
                myContract = undefined;
                $('#id_span_wallet').innerHTML = '';
            });
            return;
        }
        alert("请安装小狐狸钱包！");
    };

    /**
     * 添加作品
     */
    $('#id_btn_add_artwork').onclick = async function() {
        if (myContract == undefined) {
            alert("请先连接钱包！");
            return;
        }
        let price = $('#id_input_price').value;
        let tokenURI = $('#id_input_token_uri').value;
        let maxAmount = $('#id_input_amount').value;
        if (price == '' || tokenURI == '' || maxAmount == '') {
            alert("三个值都不能为空！");
            return;
        }
        $('#id_span_add_artwork').innerHTML = 'loading...';
        myContract.methods.addArtwork(web3.utils.toWei(price, 'ether'), tokenURI, maxAmount).send().then(function (ret) {
            console.log(ret);
            $('#id_span_add_artwork').innerHTML = '新添加作品的ID：' + ret.events.AddedArtwork.returnValues.artworkId;
        });
    };

    /**
     * 按ID取作品
     */
    $('#id_btn_get_artwork_by_id').onclick = async function () {
        let id = $('#id_input_artworkId').value;
        if (id == '') {
            alert('请输入ID');
            return;
        }
        $('#id_span_artwork_info').innerHTML = "loading...";
        myContractReader.methods.getArtwork(id).call().then(function (ret) {
            console.log(ret);
            let retObj = {
                'price': web3reader.utils.fromWei(ret[0]),
                'tokenURI': web3reader.utils.hexToUtf8(ret[1]),
                'amount': ret[2],
                'sold': ret[3]
            };
            $('#id_span_artwork_info').innerHTML = JSON.stringify(retObj);
        });
    };

    /**
     * 按作品铸造
     */
    $('#id_btn_mint_by_id').onclick = async function() {
        if (myContract == undefined) {
            alert("请先连接钱包！");
            return;
        }
        let id = $('#id_input_artworkId_for_mint').value;
        if (id == '') {
            alert('请输入作品ID');
            return;
        }
        $('#id_span_mint_info').innerHTML = "loading...";
        myContract.methods.getArtwork(id).call().then(function (ret) {
            console.log(ret);
            if (parseInt(ret[3]) >= parseInt(ret[2])) {
                $('#id_span_mint_info').innerHTML = '已售完！';
                return;
            }
            myContract.methods.mintWithBuy(id).send({
                value: new web3.utils.BN(ret[0])
            }).then(function (ret) {
                console.log(ret);
                $('#id_span_mint_info').innerHTML = '你得到 NFT 的tokenID是：' + ret.events.MintToken.returnValues.tokenId;
            });
        });
    }

    /**
     * 添加超级管理员
     */
    $('#id_btn_add_admin').onclick = async function() {
        if (myContract == undefined) {
            alert("请先连接钱包！");
            return;
        }
        $('#id_span_add_admin').innerHTML = 'loading...';
        let adminAddress = $('#id_input_admin_address').value;
        myContract.methods.grantRole('0x00', adminAddress).send().then(function (ret) {
            console.log(ret);
            $('#id_span_add_admin').innerHTML = '添加超级管理员：' + ret.events.RoleGranted.returnValues.account;
        });
    };

    /**
     * 按NFT-ID取它的元数据
     */
    $('#id_btn_get_metadata_by_nft_id').onclick = async function() {
        let id = $('#id_input_nftId').value;
        if (id == '') {
            alert('请输入 NFT ID');
            return;
        }
        $('#id_span_nft_metadata').innerHTML = "loading...";
        myContractReader.methods.tokenURI(id).call().then(function (ret) {
            console.log(ret);
            $('#id_span_nft_metadata').innerHTML = ret;
        });
    };

    /**
     * 修改作品
     */
    $('#id_btn_set_artwork').onclick = async function() {
        if (myContract == undefined) {
            alert("请先连接钱包！");
            return;
        }
        let id = $('#id_input_artworkId_set').value;
        if (id == '') {
            alert('请输入ID');
            return;
        }
        let price = $('#id_input_new_price').value;
        let maxAmount = $('#id_input_new_amount').value;
        $('#id_span_set_artwork').innerHTML = "loading...";
        myContract.methods.setArtwork(id, web3.utils.toWei(price, 'ether'), maxAmount).send().then(function (ret) {
            console.log(ret);
            $('#id_span_set_artwork').innerHTML = '修改成功，作品的ID：' + ret.events.SetArtwork.returnValues.artworkId;
        });
    };

    /**
     * 删除作品
     */
    $('#id_btn_del_artwork').onclick = async function() {
        if (myContract == undefined) {
            alert("请先连接钱包！");
            return;
        }
        let id = $('#id_input_artworkId_del').value;
        if (id == '') {
            alert('请输入ID');
            return;
        }
        $('#id_span_del_artwork').innerHTML = 'loading...';
        myContract.methods.delArtwork(id).send().then(function (ret) {
            console.log(ret);
            $('#id_span_del_artwork').innerHTML = '删除成功，作品的ID：' + ret.events.DeletedArtwork.returnValues.artworkId;
        });
    };

    /**
     * 我的NFT列表
     */
    $('#id_btn_get_nft_list').onclick = async function() {
        if (myContract == undefined) {
            alert("请先连接钱包！");
            return;
        }
        $('#id_span_nft_list').innerHTML = 'loading...';
        myContract.methods.balanceOf(window.ethereum.selectedAddress).call().then(function (ret) {
            let len = parseInt(ret);
            if (len == 0) {
                $('#id_span_nft_list').innerHTML = '你目前未拥有任何NFT';
                return;
            }
            $('#id_span_nft_list').innerHTML = '';
            for (let i = 0; i < len; i++) {
                myContract.methods.tokenOfOwnerByIndex(window.ethereum.selectedAddress, i).call().then(function (ret) {
                    console.log(ret);
                    $('#id_span_nft_list').innerHTML += 'NFT ID: ' + ret + '<br />';
                });
            }
        });
    };

    /**
     * 转让出售，设定价格
     */
    $('#id_btn_owner_set_price').onclick = async function() {
        if (myContract == undefined) {
            alert("请先连接钱包！");
            return;
        }
        let id = $('#id_input_nftId_for_sold').value;
        let price = $('#id_input_nft_price_for_sold').value;
        if (id == '' || price == '') {
            alert('不能为空');
            return;
        }
        $('#id_span_owner_set_price').innerHTML = "loading...";
        myContract.methods.ownerSetPrice(id, web3.utils.toWei(price, 'ether')).send().then(function (ret) {
            console.log(ret);
            $('#id_span_owner_set_price').innerHTML = "设置待售NFT：" + ret.events.OwnerSetPrice.returnValues.tokenId;
        });
    };

    /**
     * 用户放弃售卖
     */
    $('#id_btn_owner_not_sell').onclick = async function() {
        if (myContract == undefined) {
            alert("请先连接钱包！");
            return;
        }
        let id = $('#id_input_nftId_not_for_sold').value;
        if (id == '') {
            alert('不能为空');
            return;
        }
        $('#id_span_owner_not_sell').innerHTML = "loading...";
        myContract.methods.ownerNotSell(id).send().then(function (ret) {
            console.log(ret);
            $('#id_span_owner_not_sell').innerHTML = "放弃售卖NFT：" + ret.events.OwnerNotSell.returnValues.tokenId;
        });
    }

    /**
     * 销毁我的NFT
     */
    $('#id_btn_owner_burn').onclick = async function() {
        if (myContract == undefined) {
            alert("请先连接钱包！");
            return;
        }
        let id = $('#id_input_nftId_for_burn').value;
        if (id == '') {
            alert('不能为空');
            return;
        }
        $('#id_span_owner_burn').innerHTML = "loading...";
        myContract.methods.burn(id).send().then(function (ret) {
            console.log(ret);
            $('#id_span_owner_burn').innerHTML = "已销毁NFT：" + ret.events.Transfer.returnValues.tokenId;
        });
    };

    /**
     * 购买别人转售
     */
    $('#id_btn_buy').onclick = async function() {
        if (myContract == undefined) {
            alert("请先连接钱包！");
            return;
        }
        let id = $('#id_input_nftId_other_selling').value;
        if (id == '') {
            alert('请输入ID');
            return;
        }
        $('#id_span_buy').innerHTML = "loading...";
        myContract.methods.askForOwnerPrice(id).call().then(function (ret) {
            console.log(ret);
            if (ret[0] == '0x0000000000000000000000000000000000000000') {
                $('#id_span_buy').innerHTML = "它的所有者暂时不想卖";
                return;
            }
            myContract.methods.buy(id).send({
                value: new web3.utils.BN(ret[1])
            }).then(function (ret) {
                console.log(ret);
                $('#id_span_buy').innerHTML = '你得到 NFT 的tokenID是：' + ret.events.Transfer.returnValues.tokenId;
            });
        });
    };

})();