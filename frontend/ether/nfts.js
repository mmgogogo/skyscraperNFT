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
                 alert("链ID不是 " + targetChainId + "（BSC测试链）！请在钱包中切换");
                 return;
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

 })();