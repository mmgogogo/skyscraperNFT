// -32000 execution reverted! "Internal JSON-RPC error." 原因为合约有报错
/**
 * 目标链ID
 */
 const targetChainId = "0x61"; // BSC测试链
//  const targetChainId = "0x2a"; // Kovan测试链

 /**
  * 合约地址
  */
 const contract_address = '0xC2B5C1871B932EC53139C33eb670c25EfB1A6b65'; // test bsc
//  const contract_address = '0x93893eB7a1eBB90ED99b0FcEE48b5171aADc2b06'; // Kovan

const contract_url = 'https://testnet.bscscan.com/address/' + contract_address;
//  const contract_url = 'https://kovan.etherscan.io/address/0x93893eb7a1ebb90ed99b0fcee48b5171aadc2b06';

 /**
  * 节点token
  * register: https://web3api.com/
  */
 const provider_token = 'RRXXG62RXYR52G2FUY37CG3E9ZZPCYMT9M';
//  const provider_token = '735d69b2d035422ab5ff680934b338dc';
 /**
  * Network http provider
  * @mainnet https://bsc-mainnet.web3api.com/v1/
  * @testnet https://bsc-testnet.web3api.com/v1/
  */
 const network_http_provider = 'https://bsc-testnet.web3api.com/v1/' + provider_token;
 //  const network_http_provider = 'https://kovan.infura.io/v3/735d69b2d035422ab5ff680934b338dc';
 //  const network_http_provider = 'https://data-seed-prebsc-1-s1.binance.org:8545/';// https://data-seed-prebsc-1-s1.binance.org:8545/

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
      * ether连接合约的实例
      */
     let localProvider =   new ethers.providers.Web3Provider(window.ethereum); // ethers钱包节点实例
    //  let remoteProvider = ethers.getDefaultProvider(network_http_provider, {infura: provider_token});// ethers远程节点实例（读）
    //  let remoteProvider = new ethers.providers.JsonRpcProvider(network_http_provider);
    //  let remoteProvider = new web3.providers.HttpProvider(network_http_provider);
     let myContractReader = new ethers.Contract( contract_address, contract_abi , localProvider ); // 远程节点合约实例（读）
     let walletSigner = localProvider.getSigner(); // 钱包签名
     let appContractWriter = myContractReader.connect( walletSigner ); // 合约实例（写）
 
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
     $('#id_span_scan').innerHTML = '<a target="_blank" href="'+ contract_url + '">打开合约浏览器网页</a>';
 
     /**
      * 连接钱包
      */
     $('#id_btn_wallet').onclick = async function () {
         if (isMetaMaskInstalled()) {
             if (window.ethereum.chainId != targetChainId) {
                //  alert("链ID不是 " + targetChainId + "（BSC测试链）！请在钱包中切换");
                //  return;
             }
             console.log( ethereum );
             let accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
             $('#id_span_wallet').innerHTML = '钱包地址：' + ethereum.selectedAddress;
            //  web3 = new Web3(window.ethereum);
            //  myContract = new web3.eth.Contract(contract_abi, contract_address, {
            //      from: window.ethereum.selectedAddress
            //  });

            localProvider =   new ethers.providers.Web3Provider(window.ethereum, "any"); // ethers钱包节点实例
            // remoteProvider = ethers.getDefaultProvider(network_http_provider, {infura: provider_token});// ethers远程节点实例（读）
            // remoteProvider = new ethers.providers.JsonRpcProvider(network_http_provider);
            myContractReader = new ethers.Contract( contract_address, contract_abi , localProvider ); // 远程节点合约实例（读）
            walletSigner = localProvider.getSigner(); // 钱包签名
            appContractWriter = myContractReader.connect( walletSigner ); // 合约实例（写）
            // myContractReader.on("network", (newNetwork, oldNetwork) => {
            //     if (oldNetwork) {
            //         window.location.reload();
            //     }
            // });
             window.ethereum.on('accountsChanged', function () {
                 $('#id_span_wallet').innerHTML = '';
             });
             window.ethereum.on('chainChanged', function () {
                 $('#id_span_wallet').innerHTML = '';
             });
             window.ethereum.on('disconnect', function () {
                 $('#id_span_wallet').innerHTML = '';
             });
             window.ethereum.on('message', (message) => {
                console.log("metemask message ", message)
             });
             return;
         }
         alert("请安装钱包！");
     };

     /**
      * 网络切换
      */
     $('#id_btn_wallet_switch').onclick = async function () {
        if (isMetaMaskInstalled()) {
            if (window.ethereum.chainId != targetChainId) {
                try {
                    await window.ethereum.request({
                        method: 'wallet_switchEthereumChain',
                        params: [{ chainId: targetChainId }],
                    });
                } catch (switchError) {
                    // This error code indicates that the chain has not been added to MetaMask.
                    if (switchError.code === 4902) {
                        try {
                            await window.ethereum.request({
                                method: 'wallet_addEthereumChain',
                                params: [{ chainId: targetChainId, rpcUrl: 'https://testnet.bscscan.com/' }],
                            });
                            let accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                            $('#id_span_wallet').innerHTML = '钱包地址：' + accounts[0];
                            //  web3 = new Web3(window.ethereum);
                            //  myContract = new web3.eth.Contract(contract_abi, contract_address, {
                            //      from: window.ethereum.selectedAddress
                            //  });

                            localProvider =   new ethers.providers.Web3Provider(window.ethereum); // ethers钱包节点实例
                            remoteProvider = ethers.getDefaultProvider(network_http_provider);// ethers远程节点实例（读）
                            myContractReader = new ethers.Contract( contract_address, contract_abi , remoteProvider ); // 远程节点合约实例（读）
                            signer = localProvider.getSigner(); // 钱包签名
                            appContractWriter = myContractReader.connect(signer); // 合约实例（写）
                        } catch (addError) {
                            console.log( 'addError ', addError );
                        }
                    }
                    // handle other "switch" errors
                    console.log( 'switchError ', switchError );
                }
            }
            return;
        }
        alert("请安装钱包！");
     };
 
     /**
      * 添加作品
      */
     $('#id_btn_add_artwork').onclick = async function() {
         if (appContractWriter == undefined) {
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
         // bafyreiaep2hvj57rngpeqldqzcuf4eptk33g7vftpvqbrvuehrfuy4rzqq/metadata.json
         // ethers.utils.parseUnits(price, "gwei") -> BN.toNumber() -> number
         // ethers.utils.parseUnits(price, "gwei") -> BN.toString() -> string
         price = ethers.utils.parseUnits(price, "gwei").toString()
         appContractWriter.addArtwork(price, tokenURI, maxAmount).then(function (ret) {
            console.log(ret);
            myContractReader.on("AddedArtwork", (artworkId) => {
                console.log(`added artworkId ${ artworkId } successful`);
                $('#id_span_add_artwork').innerHTML = '新添加作品的ID：' + artworkId;
            });
         }).catch((error) => {
             console.log(error);
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
         myContractReader.getArtwork(id).then(function (info) {
            console.log("info ", info)
            let retObj = {
                'price': ethers.utils.formatUnits(info[0]),
                'tokenURI': ethers.utils.toUtf8String(ethers.utils.arrayify(info[1])),
                'amount': info[2].toNumber(),
                'sold': info[3].toNumber()
            };
            $('#id_span_artwork_info').innerHTML = JSON.stringify(retObj);
        })
     };
 
     /**
      * 按作品铸造
      */
     $('#id_btn_mint_by_id').onclick = async function() {
         if (myContractReader == undefined) {
             alert("请先连接钱包！");
             return;
         }
         let id = $('#id_input_artworkId_for_mint').value;
         if (id == '') {
             alert('请输入作品ID');
             return;
         }
         $('#id_span_mint_info').innerHTML = "loading...";
         myContractReader.getArtwork(id).then(function (ret) {
             console.log(ret);
             if (ret[3].toNumber() >= ret[2].toNumber()) {
                 $('#id_span_mint_info').innerHTML = '已售完！';
                 return;
             }
            //  console.log( ethers.utils.formatUnits(ret[0], "ether"))
            let price = ethers.utils.parseUnits(ret[0], "wei").toString()
            appContractWriter.mintWithBuy(id, {value: price}).then(function (ret) {
                console.log(ret);
                myContractReader.on("MintToken", (from, tokenId, artworkId) => {
                    console.log(`mint tokenId ${tokenId} artworkId${artworkId} from ${ from} successful`);
                    if (ethers.utils.getAddress(from) == ethers.utils.getAddress(ethereum.selectedAddress)) {
                        $('#id_span_mint_info').innerHTML = '你得到 NFT 的tokenID是：' + tokenId;
                    }
                });
             });
         });
     }
 
     /**
      * 添加超级管理员
      */
     $('#id_btn_add_admin').onclick = async function() {
         if (appContractWriter == undefined) {
             alert("请先连接钱包！");
             return;
         }
         $('#id_span_add_admin').innerHTML = 'loading...';
         let adminAddress = $('#id_input_admin_address').value;
         appContractWriter.grantRole(ethers.utils.formatBytes32String("0x00"), adminAddress).then(function (ret) {
            console.log(ret);
            myContractReader.on("RoleGranted", (role, account, sender) => {
                console.log(`mint role ${role} account ${account} sender ${sender} successful`);
                $('#id_span_add_admin').innerHTML = '添加超级管理员：' + account;
            });
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
         myContractReader.tokenURI(id).then(function (ret) {
             console.log(ret);
             $('#id_span_nft_metadata').innerHTML = ret;
         });
     };
 
     /**
      * 修改作品
      */
     $('#id_btn_set_artwork').onclick = async function() {
         if (appContractWriter == undefined) {
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
         appContractWriter.setArtwork(id, ethers.utils.parseEther(price), maxAmount).then(function (ret) {
             console.log(ret);
             myContractReader.on("SetArtwork", (artworkId) => {
                console.log(`set artworkId ${artworkId} successful`);
                $('#id_span_set_artwork').innerHTML = '修改成功，作品的ID：' + artworkId
            });
         });
     };
 
     /**
      * 删除作品
      */
     $('#id_btn_del_artwork').onclick = async function() {
         if (appContractWriter == undefined) {
             alert("请先连接钱包！");
             return;
         }
         let id = $('#id_input_artworkId_del').value;
         if (id == '') {
             alert('请输入ID');
             return;
         }
         $('#id_span_del_artwork').innerHTML = 'loading...';
         appContractWriter.delArtwork(id).then(function (ret) {
             console.log(ret);
             myContractReader.on("DeletedArtwork", (artworkId) => {
                console.log(`DeletedArtwork artworkId ${artworkId} successful`);
                $('#id_span_del_artwork').innerHTML = '删除成功，作品的ID：' + artworkId;
            });
         });
     };
 
     /**
      * 我的NFT列表
      */
     $('#id_btn_get_nft_list').onclick = async function() {
         if (myContractReader == undefined) {
             alert("请先连接钱包！");
             return;
         }
         $('#id_span_nft_list').innerHTML = 'loading...';
         myContractReader.balanceOf(window.ethereum.selectedAddress).then(function (ret) {
             let len = parseInt(ret);
             if (len == 0) {
                 $('#id_span_nft_list').innerHTML = '你目前未拥有任何NFT';
                 return;
             }
             $('#id_span_nft_list').innerHTML = '';
             for (let i = 0; i < len; i++) {
                myContractReader.tokenOfOwnerByIndex(window.ethereum.selectedAddress, i).then(function (ret) {
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
         if (myContractReader == undefined) {
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
         appContractWriter.ownerSetPrice(id, ethers.utils.parseUnits(price, "gwei").toString()).then(function (ret) {
             console.log(ret);
             myContractReader.on("OwnerSetPrice", (tokenId) => {
                console.log(`OwnerSetPrice tokenId ${tokenId} successful`);
                $('#id_span_owner_set_price').innerHTML = "设置待售NFT：" + tokenId;
            });
             
         });
     };
 
     /**
      * 用户放弃售卖
      */
     $('#id_btn_owner_not_sell').onclick = async function() {
         if (appContractWriter == undefined) {
             alert("请先连接钱包！");
             return;
         }
         let id = $('#id_input_nftId_not_for_sold').value;
         if (id == '') {
             alert('不能为空');
             return;
         }
         $('#id_span_owner_not_sell').innerHTML = "loading...";
         appContractWriter.ownerNotSell(id).then(function (ret) {
             console.log(ret);
             myContractReader.on("OwnerNotSell", (tokenId) => {
                console.log(`OwnerNotSell tokenId ${tokenId} successful`);
                $('#id_span_owner_not_sell').innerHTML = "放弃售卖NFT：" + tokenId;
            });
         });
     }
 
     /**
      * 销毁我的NFT
      */
     $('#id_btn_owner_burn').onclick = async function() {
         if (appContractWriter == undefined) {
             alert("请先连接钱包！");
             return;
         }
         let id = $('#id_input_nftId_for_burn').value;
         if (id == '') {
             alert('不能为空');
             return;
         }
         $('#id_span_owner_burn').innerHTML = "loading...";
         appContractWriter.burn(id).then(function (ret) {
             console.log(ret);
             myContractReader.on("Transfer", (params) => {
                console.log(`burn Transfer `, params);
                $('#id_span_owner_burn').innerHTML = "已销毁NFT：" + params.tokenId;
            });
         });
     };
 
     /**
      * 购买别人转售
      */
     $('#id_btn_buy').onclick = async function() {
         if (myContractReader == undefined) {
             alert("请先连接钱包！");
             return;
         }
         let id = $('#id_input_nftId_other_selling').value;
         if (id == '') {
             alert('请输入ID');
             return;
         }
         $('#id_span_buy').innerHTML = "loading...";
         myContractReader.askForOwnerPrice(id).then(function (ret) {
             console.log(ret);
             if (ret[0] == '0x0000000000000000000000000000000000000000') {
                 $('#id_span_buy').innerHTML = "它的所有者暂时不想卖";
                 return;
             }
             let price = ethers.utils.parseUnits(ret["price"].toString(), "wei").toString()
             appContractWriter.buy(id, {value: price}).then(function (ret) {
                 console.log(ret);
                 myContractReader.on("Transfer", (params) => {
                    console.log(`buy Transfer `, params);
                    $('#id_span_buy').innerHTML = '你得到 NFT 的tokenID是：' + id;
                });
             });
         });
     };


     /**
      * 签名
      *  To sign a simple string, which are used for logging into a service, such as CryptoKitties, pass the string in.
      *  '0x5a77beb84677b221d7110b08605a2658dd6c1e88a2ba9293436e587dbf6479d4798d0ca34ba2113bdb51ad97cd831975ccaccaf5f6fbd5d566fe662f11e2ca411b'
      *
      *  A common case is also signing a hash, which is 32 bytes. It is important to note, that to sign binary
      *  data it MUST be an Array (or TypedArray)
      * 
      *  n This string is 66 characters long
      *  message = "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef"
      *  This array representation is 32 bytes long
      * 
      *  messageBytes = ethers.utils.arrayify(message);
      *  Uint8Array [ 221, 242, 82, 173, 27, 226, 200, 155, 105, 194, 176, 104, 252, 55, 141, 170, 149, 43, 167, 241, 99, 196, 161, 22, 40, 245, 90, 77, 245, 35, 179, 239 ]
      *  To sign a hash, you most often want to sign the bytes
      * 
      *  signature = await signer.signMessage(messageBytes)
      *  '0xe099cce5e80dec1d8464d00c4156855d1c14cc4f83473deee7ab8e60be770f4b5ea04e90e7b7102ac5b493f7822b0ad10dc26bfda0761530a58e5f461f90b2fd1b'
      */
      $('#id_btn_signer').onclick = async function () {
        if (isMetaMaskInstalled()) {
            if (appContractWriter) 
            {
                let salt = $('#id_sign_text_salt').value;
                let contract = $('#id_sign_text_contract').value;
                let owner = $('#id_sign_text_recepient').value;
                console.log(["string","address","address"][salt,contract,owner])
                let encodeStr = ethers.utils.defaultAbiCoder.encode(["string","address","address"],[salt,contract,owner]);
                let hash = ethers.utils.keccak256(encodeStr);
                // let token = ethers.utils.defaultAbiCoder.encode(["string","bytes32"],["\x19Ethereum Signed Message:\n32",hash]);
                // console.log("token is ", token);
                let signature = await walletSigner.signMessage( ethers.utils.arrayify(hash) );

                $('#id_span_token').innerHTML = hash;
                $('#id_span_signed').innerHTML = signature;
            }
            return;
        }
        alert("请安装钱包！");
     };

     $('#id_btn_signer_local').onclick = async function () {
        let privateKey = "0xf77c3a3b6c4067c8e45e62a877e509130f9b294714bf73f25ddab2da0798d763"
        let wallet = new ethers.Wallet(privateKey);
        
        let salt = $('#id_sign_text_salt2').value;
        let contract = $('#id_sign_text_contract2').value;
        let owner = $('#id_sign_text_recepient2').value;
        console.log(["string","address","address"][salt,contract,owner])
        let encodeStr = ethers.utils.defaultAbiCoder.encode(["string","address","address"],[salt,contract,owner]);
        let hash = ethers.utils.keccak256(encodeStr);

        let signature = await wallet.signMessage( ethers.utils.arrayify(hash) );

        $('#id_span_token2').innerHTML = hash;
        $('#id_span_signed2').innerHTML = signature;
     };
 
 })();