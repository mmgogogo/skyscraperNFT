import * as ethers from 'ethers'
// import $ from 'jquery'
import _ from 'lodash'
import { popupMessage } from './utils/Utils'
import contractNFTTest from './contractAbi'
import cfg from './config/setting'

// -32000 execution reverted! "Internal JSON-RPC error." 原因为合约有报错
/**
 * 目标链ID
 */
const targetChainId = cfg[cfg.version].chainId

/**
 * 节点token
 * register: https://web3api.com/
 */
const providerToken = cfg[cfg.version].providerToken
/**
 * Network http provider
 * @mainnet https://bsc-mainnet.web3api.com/v1/
 * @testnet https://bsc-testnet.web3api.com/v1/
 */
const networkHttpProvider = cfg[cfg.version].providerUrl + providerToken
const contractAddress = cfg[cfg.version].contractAddress
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
        if (!('chainId' in window.ethereum) || (('chainId' in window.ethereum) && window.ethereum.chainId !== targetChainId)) {
          Dapp.Bridges.rightChainId = false
          popupMessage('Please switch to Ropsten Test Network', 'top', 'center', 'f')
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
      popupMessage('Please install wallet plugin', 'top', 'center', 'f')
      return null
    } catch (e) {
      console.log(['ConnectWallet error ', e])
      // throw e
    }
  },
  sign: async (wallet, nonce) => {
    console.log('[Web3][sign]', wallet, nonce)
    const signMessage = _.template(signatureStr)({ wallet: wallet, nonce: nonce })
    const signature = await Dapp.Bridges.signer.signMessage(signMessage)
    console.log('[Web3][sign] signature', signature)
  },
  listener: async (callbackFunc) => {
    window.ethereum.on('accountsChanged', async function (params) {
      console.log('[Web3][accountsChanged] params ', params, Dapp.Bridges.ethereum, window.ethereum)
      await callbackFunc('accountsChanged', params)
    })
    window.ethereum.on('chainChanged', async function (params) {
      console.log('[Web3][chainChanged] params ', params)
      await callbackFunc('chainChanged', params)
    })
    window.ethereum.on('disconnect', async function (params) {
      console.log('[Web3][disconnect] params ', params)
      await callbackFunc('disconnect', params)
    })
    window.ethereum.on('message', async (message) => {
      console.log('[Web3][message] message ', message)
      await callbackFunc('message', message)
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
          await Dapp.connectWallet()
          window.location.reload()
        } catch (switchError) {
          // This error code indicates that the chain has not been added to MetaMask.
          if (switchError.code === 4902) {
            // add a chain
          } else {
            popupMessage('[Error] ' + switchError.message, 'top', 'center', 'f')
          }
        }
      }
    } else {
      popupMessage('Please install wallet plugin', 'top', 'center', 'f')
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
    App.config.globalProperties.$Dapp = Dapp
  }
}
