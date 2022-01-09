// ethereum.isConnected()
const config = {
    infuraId:'735d69b2d035422ab5ff680934b338dc',
    filecoin: "https://23MY72HLwNriMDzkcfQhgh1Y76x:bdcb96b79f602f4cae17b871784adffd@filecoin.infura.io" ,
    nftstorage: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweEU0QTFDOTZBRjA1N2JkNDZGOGM0OThlOTY2MjcyOTA2MjgzNDM1MGIiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTYzOTM5MjIxMzI0OCwibmFtZSI6InNtYXJ0LnN0b25lIn0.uO9UTsdRDUnEcr5F54HTqkPUl2TetSH9HNX2Cf-TNJc",
}
const networks = {
    localhost: {
        name: "localhost",
        color: "#666666",
        chainId: 31337,
        blockExplorer: "",
        rpcUrl: "http://" + window.location.hostname + ":8545",
    },
    mainnet: {
        name: "mainnet",
        color: "#ff8b9e",
        chainId: 1,
        rpcUrl: `https://mainnet.infura.io/v3/${config.infuraId}`,
        blockExplorer: "https://etherscan.io/",
    },
    kovan: {
        name: "kovan",
        color: "#7003DD",
        chainId: 42,
        rpcUrl: `https://kovan.infura.io/v3/${config.infuraId}`, // 9aa3d95b3bc440fa88ea12eaa4456161
        blockExplorer: "https://kovan.etherscan.io/",
        faucet: "https://gitter.im/kovan-testnet/faucet", // https://faucet.kovan.network/
    },
    rinkeby: {
        name: "rinkeby",
        color: "#e0d068",
        chainId: 4,
        rpcUrl: `https://rinkeby.infura.io/v3/${config.infuraId}`,
        faucet: "https://faucet.rinkeby.io/",
        blockExplorer: "https://rinkeby.etherscan.io/",
    },
    ropsten: {
        name: "ropsten",
        color: "#F60D09",
        chainId: 3,
        faucet: "https://faucet.ropsten.be/",
        blockExplorer: "https://ropsten.etherscan.io/",
        rpcUrl: `https://ropsten.infura.io/v3/${config.infuraId}`,
    },
    goerli: {
        name: "goerli",
        color: "#0975F6",
        chainId: 5,
        faucet: "https://goerli-faucet.slock.it/",
        blockExplorer: "https://goerli.etherscan.io/",
        rpcUrl: `https://goerli.infura.io/v3/${config.infuraId}`,
    },
    bscMain: {
        name: "Binance Smart Chain Mainnet",
        color: "#0975F6",
        chainId: 56,
        faucet: "",
        blockExplorer: "https://bscscan.com/",
        rpcUrl: `https://bsc-mainnet.web3api.com/v1/RRXXG62RXYR52G2FUY37CG3E9ZZPCYMT9M`,
        currency: "BNB",
    },
    bscTest: {
        name: "Binance Smart Chain Testnet",
        color: "#0975F6",
        chainId: 97,
        faucet: "https://testnet.binance.org/faucet-smart/",
        blockExplorer: "https://testnet.bscscan.com/",
        rpcUrl: `https://bsc-testnet.web3api.com/v1/RRXXG62RXYR52G2FUY37CG3E9ZZPCYMT9M`,
        currency: "tBNB",
    },
    xdai: {
        name: "xdai",
        color: "#48a9a6",
        chainId: 100,
        price: 1,
        gasPrice: 1000000000,
        rpcUrl: "https://dai.poa.network",
        faucet: "https://xdai-faucet.top/",
        blockExplorer: "https://blockscout.com/poa/xdai/",
    },
    matic: {
        name: "matic",
        color: "#2bbdf7",
        chainId: 137,
        price: 1,
        gasPrice: 1000000000,
        rpcUrl: "https://rpc-mainnet.maticvigil.com",
        faucet: "https://faucet.matic.network/",
        blockExplorer: "https://explorer-mainnet.maticvigil.com//",
    },
    mumbai: {
        name: "mumbai",
        color: "#92D9FA",
        chainId: 80001,
        price: 1,
        gasPrice: 1000000000,
        rpcUrl: "https://rpc-mumbai.maticvigil.com",
        faucet: "https://faucet.matic.network/",
        blockExplorer: "https://mumbai-explorer.matic.today/",
    }
}
const Dapp = {
    "wallet": {
    },
    "remote": [],
    detect: () => {
        if (typeof window.ethereum !== 'undefined' && window.ethereum) {
            if (ethereum.isMetaMask) {
                Dapp["wallet"]["isMetaMask"]  =   true;
            }
            try {
                // 钱包版本
                Dapp["wallet"]["network"]   =   ethereum.networkVersion
                Dapp["wallet"]["current"]   =   ethereum.selectedAddress
                Dapp["wallet"]["ethereum"]  =   ethereum
                const provider              =   new ethers.providers.Web3Provider(window.ethereum)
                Dapp["wallet"]["provider"]  =   provider
                Dapp["wallet"]["signer"]    =   provider.getSigner()
                console.log("[iBuilding] Info ", Dapp["wallet"]["provider"], Dapp["wallet"]["signer"])
            } catch (error) {
                console.log( "[iBuilding] Error ", error )
                ethereum.disconnect();
                Dapp["wallet"]["ethereum"]  =   null
                Dapp["wallet"]["provider"]  =   null
                Dapp["wallet"]["signer"]    =   null
            }
        } else if (window.web3) {
            // 兼容老版本
            // window.web3 = new Web3(web3.currentProvider);
            alert("Update your wallet!")
        }
    },
    getAccount: async () => { // 获取当前钱包地址
        try {
            // eth_sendTransaction eth_personalSign eth_signTypedData eth_accounts
            const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
            const account = accounts[0];
            // Dapp["wallet"]["current"]  =   account;
            console.log("[iBuilding] INFO account ", account );
            return account
        } catch (e) {
            console.log("[iBuilding] ERROR ", e )
            Toastify({
                text: "User Reject Connect",
                gravity: "top",
                position: 'center',
                style: {
                  background: "linear-gradient(to right, #00b09b, #96c93d)",
                }
              }).showToast();
        }
    },
    getChainId: async () => {
        const chainId = await ethereum.request({ method: 'eth_chainId' });
        return chainId
    },
    switchChain: async (chainId) => {
        try {
            await ethereum.request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId: '0xf00' }],
            });
        } catch (switchError) {
            // This error code indicates that the chain has not been added to MetaMask.
            if (switchError.code === 4902) {
                try {
                    await ethereum.request({
                        method: 'wallet_addEthereumChain',
                        params: [{ chainId: '0xf00', rpcUrl: 'https://...' /* ... */ }],
                    });
                } catch (addError) {
                    // handle "add" error
                }
            }
            // handle other "switch" errors
        }
    },
    watchAsset: async () => {
        ethereum.request({
            method: 'wallet_watchAsset',
            params: {
            type: 'ERC20',
            options: {
                address: '0xb60e8dd61c5d32be8058bb8eb970870f07233155',
                symbol: 'FOO',
                decimals: 18,
                image: 'https://foo.io/token-image.svg',
            },
            },
        })
        .then((success) => {
            if (success) {
            console.log('FOO successfully added to wallet!')
            } else {
            throw new Error('Something went wrong.')
            }
        })
        .catch(console.error)
    },
    listeners: async () => {
        if (typeof window.ethereum !== 'undefined' && window.ethereum) {
            ethereum.on('connect', (connectInfo) => {
                console.log("[iBuilding] Event wallet connect ", connectInfo );
            });
            ethereum.on('disconnect', function (ProviderRpcError) {
                console.log("[iBuilding] Event wallet disconnect ", ProviderRpcError );
            });
            ethereum.on('chainChanged', (_chainId) => {
                console.log("[iBuilding] Event chainChanged ", _chainId );
                // 页面重新加载 ？
                window.location.reload();
            });
            ethereum.on('accountsChanged', (accounts) => {
                if (accounts.length === 0) {
                    // MetaMask is locked or the user has not connected any accounts
                    console.log('[iBuilding] Warning Please connect to MetaMask.');
                } else if (accounts[0] !== dapp["wallet"]["current"]) {
                    console.log("[iBuilding] Event accountsChanged ", dapp["wallet"]["current"], accounts[0]);
                    dapp["wallet"]["current"] = accounts[0];
                }
            });
        }
    },
    connect: async () => {
        const provider = await detectEthereumProvider()
        if (provider) {
            // handle provider
            console.log("provider info ", provider);
            startApp(provider); // initialize your app
        } else {
            // handle no provider
            console.log('Please install MetaMask!');
        }
        function startApp(provider) {
            // If the provider returned by detectEthereumProvider is not the same as
            // window.ethereum, something is overwriting it, perhaps another wallet.
            if (provider !== window.ethereum) {
                console.error('Do you have multiple wallets installed?');
            }
            // Access the decentralized web!
        }
    }
}
