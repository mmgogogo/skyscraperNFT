<template>
  <div id="headlessui-portal-root" v-show="isOpen">
    <div>
      <div class="fixed z-50 inset-0" id="headlessui-dialog-11" role="dialog" aria-modal="true">
        <div class="relative flex items-center justify-center block min-h-screen text-center">
          <div class="backdrop-blur-[10px] bg-[rgb(0,0,0,0.4)] fixed inset-0 filter" id="headlessui-dialog-overlay-13" aria-hidden="true"></div>
          <div class="bg-dark-900 border border-dark-800 lg:max-w-md w-full inline-block align-bottom rounded-xl text-left overflow-hidden transform p-4">
            <div class="flex flex-col w-full space-y-4">
              <div class="flex items-start justify-between">
                <div class="flex flex-col gap-1 justify-center">
                  <div class="text-base leading-5 font-bold flex gap-3 text-high-emphesis items-center">Install a wallet plugin</div>
                </div>
                <div class="flex items-center justify-center w-6 h-6 cursor-pointer" @click="close()">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true" width="24" height="24" class="text-high-emphesis">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </div>
              </div>
              <div class="grid grid-cols-1 gap-4 overflow-y-auto md:grid-cols-2">
                <div role="button" @click="goto()" class="cursor-pointer bg-[rgba(0,0,0,0.2)] focus:outline-none flex items-center gap-4 justify-between w-full px-4 py-3 rounded border border-dark-700 hover:border-blue">
                  <div class="flex flex-col gap-1">
                    <div id="wallet-option-MetaMask" class="flex items-center">
                      <div class="text-sm leading-5 font-bold text-high-emphesis">metamask</div>
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
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// walletId: Number, // walletId 1:mainnet - 3:ropsten
// walletName: String, // MetaMask(mainnet)
// walletImgArr: Array
import WalletCell from '@/components/WalletCell.vue'

export default {
  name: 'Login',
  components: {
    WalletCell: WalletCell
  },
  data () {
    return {
      isOpen: false
    }
  },
  props: {
    show: Boolean
  },
  methods: {
    onClickOutside (e) {
      console.log('[Web][Login] onclick outside e ', e)
      e.stopPropagation()
    },
    close () {
      console.log('[Web][Login] close start!')
      const _that = this
      _that.isOpen = false
      _that.$emit('close-login', [_that.isOpen])
      console.log('[Web][Login] close end!', _that.show)
    }
  },
  updated () {
    console.log('[Web][Login] updated start!')
    const _that = this
    _that.isOpen = _that.show
    console.log('[Web][Login] updated end!', _that.show)
  },
  mounted () {
    console.log('[Web][Login] mounted start!')
    const _that = this
    _that.isOpen = _that.show
  },
  created () {
    console.log('[Web][Login] created start!')
    const _that = this
    _that.isOpen = _that.show
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
