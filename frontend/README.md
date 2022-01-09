#### nft事例演示

##### 文件结构说明
```
├── README.md
├── abis
│   └── contract_nft.js                 # 合约接口描述
├── ether
│   └── app.js                          # ethers库 实现方案js部分
├── ether3_example.html                 # ethers库 实现显示部分
├── nft.sol                             # 测试合约
├── other
│   ├── function_signature_registry.html
│   └── signature-registry.js
├── packages                            # 第三方库，线上版本请使用云链接
│   ├── Toast.min.css
│   ├── Toast.min.js
│   ├── detect.js
│   ├── ethers-5.2.umd.min.js
│   ├── jquery-3.6.0.min.js
│   ├── toastify.css
│   ├── toastify.js
│   ├── wallet.js
│   └── web3.min.js
├── rss3.html
├── utils
│   └── file.js                         # 文件上传ipfs方案
├── web3
│   └── app.js                          # web3库 实现方案js部分
└── web3_example.html                   # web3库 实现方案js部分

##### 开启本地rpc节点
```
$ npm install -g ganache-cli

# or 

$ yarn global add ganache-cli

# start node server
$ ganache-cli

```