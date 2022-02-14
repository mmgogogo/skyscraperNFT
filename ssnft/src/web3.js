import * as ethers from 'ethers'
import $ from 'jquery'
import _ from 'lodash'
import contractNFTTest from './contractAbi'

// -32000 execution reverted! "Internal JSON-RPC error." 原因为合约有报错
/**
 * 目标链ID
 */
const targetChainId = '0x2a' // Kovan测试链

_.assign(1, 1)

/**
 * 合约地址
 */
const contractAddress = '0x93893eB7a1eBB90ED99b0FcEE48b5171aADc2b06' // Kovan
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
  connect: () => {
    try {
      if (isMetaMaskInstalled()) {
        if (window.ethereum.chainId !== targetChainId) {
          // alert('链ID ' + targetChainId + ' 不是 主网！请在钱包中切换')
          // return Dapp
        }
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
            try {
              await window.ethereum.request({
                method: 'wallet_addEthereumChain',
                params: [{ chainId: targetChainId, rpcUrl: 'https://testnet.bscscan.com/' }]
              })
              // let accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
              // $('#id_span_wallet').innerHTML = '钱包地址：' + accounts[0]
              Dapp.Bridges.ethereum = window.ethereum
              Dapp.Bridges.local = new ethers.providers.Web3Provider(window.ethereum, 'any')
              Dapp.Bridges.reader = new ethers.Contract(contractAddress, contractAbi, Dapp.Bridges.local)
              Dapp.Bridges.signer = Dapp.Bridges.local.getSigner() // 钱包签名
              Dapp.Bridges.writer = Dapp.Bridges.reader.connect(Dapp.Bridges.signer)
            } catch (addError) {
              console.log('addError ', addError)
            }
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

// $(fn => {
//   (async function () {
//     await Dapp.connect()
//   })()
// })

export default {
  install: (App) => {
    console.log('herere there ')
    App.config.globalProperties.$Dapp = Dapp
    console.log('herere there ', App.config.globalProperties.$Dapp)
  }
}
