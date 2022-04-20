export default {
  version: 'dev',
  prod: {
    chainId: '0x1',
    chainName: 'Mainnet',
    providerToken: '735d69b2d035422ab5ff680934b338dc',
    providerUrl: 'https://infura.io/v3/',
    contractAddress: '0xc53885d4A9be6D17fcC56F4907E2CAc1d31261fd'
  },
  dev: {
    chainId: '0x3',
    chainName: 'Ropsten',
    providerToken: '735d69b2d035422ab5ff680934b338dc',
    providerUrl: 'https://ropsten.infura.io/v3/', // 'https://kovan.infura.io/v3/'
    contractAddress: '0xc53885d4A9be6D17fcC56F4907E2CAc1d31261fd'
  }
}
