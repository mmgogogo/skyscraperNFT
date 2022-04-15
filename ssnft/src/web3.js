import * as ethers from 'ethers'
// import $ from 'jquery'
import _ from 'lodash'
import Toastify from 'toastify-js'
import contractNFTTest from './contractAbi'

// -32000 execution reverted! "Internal JSON-RPC error." 原因为合约有报错
/**
 * 目标链ID
 */
// const targetChainId = '0x2a' // Kovan测试链
const targetChainId = '0x3' // Ropster测试链
// const targetChainId = '0x1' // Mainnet

_.assign(1, 1)

/**
 * 合约地址
 */
// const contractAddress = '0x93893eB7a1eBB90ED99b0FcEE48b5171aADc2b06' // Kovan
// const contractUrl = 'https://kovan.etherscan.io/address/0x93893eb7a1ebb90ed99b0fcee48b5171aadc2b06'

/**
 * 节点token
 * register: https://web3api.com/
 */
const providerToken = '735d69b2d035422ab5ff680934b338dc'
/**
 * Network http provider
 * @mainnet https://bsc-mainnet.web3api.com/v1/
 * @testnet https://bsc-testnet.web3api.com/v1/
 */
// const networkHttpProvider = 'https://kovan.infura.io/v3/' + providerToken
const networkHttpProvider = 'https://ropsten.infura.io/v3/' + providerToken

// alchemy
// const contractAddress = '0xFD0B9c88DF4A884Eee463B7DBb46d97c53fa757B'
const contractAddress = '0xc53885d4A9be6D17fcC56F4907E2CAc1d31261fd'
// const web3HttpProvider = 'https://eth-ropsten.alchemyapi.io/v2/Po-F6eE3SaJQ9R74LUWLa1gOW36CTh7J'

/**
 * ABI
 */
const contractAbi = contractNFTTest

/**
 * Metamask钱包是否已安装
 * @returns {boolean}
 */
const isMetaMaskInstalled = () => {
  const { ethereum } = window
  return Boolean(ethereum && ethereum.isMetaMask)
}

const signatureStr = `
Welcome to SkyScraper!
Click to sign in and accept the SkyScraper Terms of Service: https://superscape.net/

This request will not trigger a blockchain transaction or cost any gas fees.
Your authentication status will reset after 2 hours.

Wallet address:
\${wallet}

Nonce:
\${nonce}
`

const Dapp = {
  Bridges: {},
  checksumAddr: (address) => {
    return ethers.utils.getAddress(address)
  },
  isMetaMaskInstalled: () => {
    const { ethereum } = window
    return Boolean(ethereum && ethereum.isMetaMask)
  },
  connectProvider: async () => {
    try {
      if (!Dapp.Bridges.browser) {
        console.log('[Web3][provider] init start', networkHttpProvider)

        Dapp.Bridges.jsonProvider = new ethers.providers.JsonRpcProvider(networkHttpProvider)
        Dapp.Bridges.browser = new ethers.Contract(contractAddress, contractAbi, Dapp.Bridges.jsonProvider)

        // Dapp.Bridges.ethereum = window.ethereum
        // Dapp.Bridges.local = new ethers.providers.Web3Provider(window.ethereum)
        // Dapp.Bridges.browser = new ethers.Contract(contractAddress, contractAbi, Dapp.Bridges.local)
      }
      return Dapp
    } catch (e) {
      console.log(['[Web3][provider] Provider init exception ', e])
      throw e
    }
  },
  connectWallet: async () => {
    try {
      if (isMetaMaskInstalled()) {
        if (window.ethereum.chainId !== targetChainId) {
          Dapp.Bridges.rightChainId = false
          console.log('window.ethereum.chainId', window.ethereum.chainId, targetChainId)
          Toastify({
            text: 'Please switch to Ropsten Test Network',
            duration: 3000,
            newWindow: true,
            close: true,
            gravity: 'top', // `top` or `bottom`
            position: 'right', // `left`, `center` or `right`
            stopOnFocus: true, // Prevents dismissing of toast on hover
            style: {
              background: 'linear-gradient(to right, #00b09b, #96c93d)'
            }
          }).showToast()
          return Dapp
        }

        const [account] = await window.ethereum.request({ method: 'eth_requestAccounts' })
        Dapp.Bridges.ethereum = window.ethereum
        Dapp.Bridges.local = new ethers.providers.Web3Provider(window.ethereum)
        Dapp.Bridges.reader = new ethers.Contract(contractAddress, contractAbi, Dapp.Bridges.local)
        Dapp.Bridges.signer = Dapp.Bridges.local.getSigner() // 钱包签名
        Dapp.Bridges.writer = Dapp.Bridges.reader.connect(Dapp.Bridges.signer)
        Dapp.Bridges.rightChainId = true
        Dapp.Bridges.address = account

        console.log('[web3] account address', account)
        // 签名钱包数据
        // const signer = Dapp.Bridges.local.getSigner(account)
        // const signature = await signer.signMessage('Please sign to let us verify that you are the owner of this address ' + account)
        // console.log('[web3]signature', 'Please sign to let us verify that you are the owner of this address ' + account, signature)
        // Dapp.Bridges.signature = signature

        return Dapp
      }
      Toastify({
        text: 'Please install wallet plugin',
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: 'top', // `top` or `bottom`
        position: 'right', // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: 'linear-gradient(to right, #00b09b, #96c93d)'
        }
      }).showToast()
      return null
    } catch (e) {
      console.log(['dapp exception ', e])
      throw e
    }
  },
  sign: async (wallet, nonce) => {
    console.log('[Web3][sign]', wallet, nonce)
    const signMessage = _.template(signatureStr)({ wallet: wallet, nonce: nonce })
    const signature = await Dapp.Bridges.signer.signMessage(signMessage)
    console.log('[Web3][sign] signature', signature)
  },
  listener: async (callbackFunc) => {
    window.ethereum.on('accountsChanged', function () {
      console.log('[Web3][disconnect] accountsChanged')
      callbackFunc('accountsChanged')
    })
    window.ethereum.on('chainChanged', function () {
      console.log('[Web3][disconnect] chainChanged')
      callbackFunc('chainChanged')
    })
    window.ethereum.on('disconnect', function () {
      console.log('[Web3][disconnect] emit')
      callbackFunc('disconnect')
    })
    window.ethereum.on('message', (message) => {
      console.log('[Web3][disconnect] metemask message ', message)
      callbackFunc('message')
    })
  },
  switch: async (chainId) => {
    if (isMetaMaskInstalled()) {
      if (window.ethereum.chainId === chainId) {
        await Dapp.connectWallet()
      } else {
        try {
          await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: chainId }]
          })
        } catch (switchError) {
          // This error code indicates that the chain has not been added to MetaMask.
          if (switchError.code === 4902) {
            await Dapp.connectWallet()
          } else {
            Toastify({
              text: '[Error] ' + switchError.message,
              duration: 3000,
              newWindow: true,
              close: true,
              gravity: 'top', // `top` or `bottom`
              position: 'right', // `left`, `center` or `right`
              stopOnFocus: true, // Prevents dismissing of toast on hover
              style: {
                background: 'linear-gradient(to right, #00b09b, #96c93d)'
              }
            }).showToast()
          }
        }
      }
    } else {
      Toastify({
        text: 'Please install wallet plugin',
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: 'top', // `top` or `bottom`
        position: 'right', // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: 'linear-gradient(to right, #00b09b, #96c93d)'
        }
      }).showToast()
      return null
    }
  },
  addChain: async (chainId) => {
    // try {
    //   await window.ethereum.request({
    //     method: 'wallet_addEthereumChain',
    //     params: [{ chainId: targetChainId, rpcUrl: 'https://testnet.bscscan.com/' }]
    //   })
    //   await window.ethereum.request({ method: 'eth_requestAccounts' })
    //   Dapp.Bridges.ethereum = window.ethereum
    //   Dapp.Bridges.local = new ethers.providers.Web3Provider(window.ethereum)
    //   Dapp.Bridges.reader = new ethers.Contract(contractAddress, contractAbi, Dapp.Bridges.local)
    //   Dapp.Bridges.signer = Dapp.Bridges.local.getSigner() // 钱包签名
    //   Dapp.Bridges.writer = Dapp.Bridges.reader.connect(Dapp.Bridges.signer)
    // } catch (addError) {
    //   console.log('addError ', addError)
    // }
  }
}

export default {
  install: (App) => {
    console.log('herere there ')
    App.config.globalProperties.$Dapp = Dapp
    console.log('herere there ', App.config.globalProperties.$Dapp)
  }
}
