import * as ethers from 'ethers'
import $ from 'jquery'
import _ from 'lodash'
import contractNFTTest from './contractAbi'

// -32000 execution reverted! "Internal JSON-RPC error." 原因为合约有报错
/**
 * 目标链ID
 */
// const targetChainId = '0x2a' // Kovan测试链
const targetChainId = '0x3' // Ropster测试链

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
// const providerToken = '735d69b2d035422ab5ff680934b338dc'
/**
 * Network http provider
 * @mainnet https://bsc-mainnet.web3api.com/v1/
 * @testnet https://bsc-testnet.web3api.com/v1/
 */
// const networkHttpProvider = 'https://kovan.infura.io/v3/' + providerToken

// alchemy
const contractAddress = '0xFD0B9c88DF4A884Eee463B7DBb46d97c53fa757B'
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

const Dapp = {
  Bridges: {},
  isMetaMaskInstalled: () => {
    const { ethereum } = window
    return Boolean(ethereum && ethereum.isMetaMask)
  },
  connect: async () => {
    try {
      if (isMetaMaskInstalled()) {
        if (window.ethereum.chainId !== targetChainId) {
          console.log('window.ethereum.chainId', window.ethereum.chainId, targetChainId)
          alert('链ID ' + targetChainId + ' 不是 主网！请在钱包中切换')
          return Dapp
        }

        await window.ethereum.request({ method: 'eth_requestAccounts' })
        Dapp.Bridges.ethereum = window.ethereum
        Dapp.Bridges.local = new ethers.providers.Web3Provider(window.ethereum)
        Dapp.Bridges.reader = new ethers.Contract(contractAddress, contractAbi, Dapp.Bridges.local)
        Dapp.Bridges.signer = Dapp.Bridges.local.getSigner() // 钱包签名
        Dapp.Bridges.writer = Dapp.Bridges.reader.connect(Dapp.Bridges.signer)

        return Dapp
      }
      alert('请安装钱包！')
    } catch (e) {
      console.log(['dapp exception ', e])
      throw e
    }
  },
  listen: async () => {
    window.ethereum.on('accountsChanged', function () {
      $('#id_span_wallet').innerHTML = ''
    })
    window.ethereum.on('chainChanged', function () {
      $('#id_span_wallet').innerHTML = ''
    })
    window.ethereum.on('disconnect', function () {
      $('#id_span_wallet').innerHTML = ''
    })
    window.ethereum.on('message', (message) => {
      console.log('metemask message ', message)
    })
  },
  switch: async () => {
    if (isMetaMaskInstalled()) {
      if (window.ethereum.chainId !== targetChainId) {
        try {
          await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: targetChainId }]
          })
        } catch (switchError) {
          // This error code indicates that the chain has not been added to MetaMask.
          if (switchError.code === 4902) {
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
            this.connect()
          }
          // handle other "switch" errors
          console.log('switchError ', switchError)
        }
      }
      return
    }
    alert('请安装钱包！')
  }
}

export default {
  install: (App) => {
    console.log('herere there ')
    App.config.globalProperties.$Dapp = Dapp
    console.log('herere there ', App.config.globalProperties.$Dapp)
  }
}
