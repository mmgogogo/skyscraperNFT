<template>
  <div class="grid grid-cols-1 gap-4 overflow-y-auto md:grid-cols-2">
    <div v-for="(walletInfo, index) in walletConfig" :key="index" role="button" @click="walletSelect(walletInfo.id)" class="cursor-pointer bg-[rgba(0,0,0,0.2)] focus:outline-none flex items-center gap-4 justify-between w-full px-4 py-3 rounded border border-dark-700 hover:border-blue">
      <div class="flex flex-col gap-1">
        <div id="wallet-option-MetaMask" class="flex items-center">
          <div class="text-sm leading-5 font-bold text-high-emphesis">{{ walletInfo.name }}</div>
        </div>
      </div>
      <span style="box-sizing: border-box; display: inline-block; overflow: hidden; width: initial; height: initial; background: none; opacity: 1; border: 0px; margin: 0px; padding: 0px; position: relative; max-width: 100%;">
        <span style="box-sizing: border-box; display: block; width: initial; height: initial; background: none; opacity: 1; border: 0px; margin: 0px; padding: 0px; max-width: 100%;">
          <img alt="" aria-hidden="true" src="data:image/svg+xml,%3csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20version=%271.1%27%20width=%2732%27%20height=%2732%27/%3e" style="display: block; max-width: 100%; width: initial; height: initial; background: none; opacity: 1; border: 0px; margin: 0px; padding: 0px;">
        </span>
        <img alt="Icon" :src="walletInfo.icons[0]" decoding="async" data-nimg="intrinsic" :srcset="walletInfo.icons[1]+' 1x, ' + walletInfo.icons[2] +' 2x'" style="position: absolute; inset: 0px; box-sizing: border-box; padding: 0px; border: none; margin: auto; display: block; width: 0px; height: 0px; min-width: 100%; max-width: 100%; min-height: 100%; max-height: 100%;">
      </span>
    </div>
  </div>
</template>

<script>
import wallet001 from '../assets/images/metamask.png'
import wallet002 from '../assets/images/metamask-1x.png'
import wallet003 from '../assets/images/metamask-2x.png'
import cfg from '../config/setting'

export default {
  name: 'Wallet',
  data () {
    return {
      walletConfig: [
        {
          id: cfg.prod.chainId,
          name: 'Metamask(MN)',
          icons: [wallet001, wallet002, wallet003],
          download: 'https://metamask.io/download/'
        },
        {
          id: cfg.dev.chainId,
          name: 'Metamask(RS)',
          icons: [wallet001, wallet002, wallet003],
          download: 'https://metamask.io/download/'
        }
      ]
    }
  },
  props: {
    mmpExists: Boolean
  },
  methods: {
    async walletSelect (chainId) {
      const _that = this
      console.log('[Wallet][Click] this dapp ', chainId, _that.mmpExists)
      // If metamask plugin not exists, navigate to download page.
      if (!_that.mmpExists) {
        window.open('https://metamask.io/download/')
      } else {
        await _that.$Dapp.switch(chainId)
        _that.$emit('update-profile', [{ type: 'connected', chainId: chainId, address: _that.$Dapp.Bridges.address }])
      }
    }
  },
  mounted () {
    console.log('[Wallet][Click] mounted start!')
  },
  created () {
    console.log('[Wallet][Click] created start!')
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
