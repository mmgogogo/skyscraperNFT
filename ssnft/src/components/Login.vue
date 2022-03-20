<template>
  <div id="headlessui-portal-root" v-if="isOpen">
    <div>
      <div class="fixed z-[1000] inset-0" id="headlessui-dialog-11" role="dialog" aria-modal="true">
        <div class="relative flex items-center justify-center block min-h-screen text-center">
          <div class="backdrop-blur-[10px] bg-[rgb(0,0,0,0.4)] fixed inset-0 filter" id="headlessui-dialog-overlay-13" aria-hidden="true"></div>
          <div class="bg-dark-900 border border-dark-800 lg:max-w-md w-full inline-block align-bottom rounded-xl text-left overflow-hidden transform p-4">
            <div class="flex flex-col w-full space-y-4">
              <div class="flex items-start justify-between">
                <div class="flex flex-col gap-1 justify-center">
                  <div class="text-base leading-5 font-bold flex gap-3 text-high-emphesis items-center">Select a wallet</div>
                </div>
                <div class="flex items-center justify-center w-6 h-6 cursor-pointer" @click="close()">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true" width="24" height="24" class="text-high-emphesis">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </div>
              </div>
              <WalletCell :mmpExists="mmpExists" v-on:update-profile="updateProfile" />
              <div class="flex justify-center">
                <span class="text-xs leading-4 font-medium text-secondary">New to Ethereum?
                  <span class="text-xs leading-4 font-medium text-blue">
                  <a target="_blank" rel="noopener noreferrer" href="https://ethereum.org/wallets/" class="text-baseline whitespace-nowrap text-blue opacity-80 hover:opacity-100 focus:opacity-100" tabindex="0">Learn more about wallets</a>
                  </span>
                </span>
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
    mmpExists: Boolean,
    show: Boolean
  },
  methods: {
    close () {
      console.log('[Web][Login] close start!')
      const _that = this
      _that.isOpen = false
      _that.$emit('close-login', [_that.isOpen])
      console.log('[Web][Login] close end!', _that.show)
    },
    updateProfile (params) {
      const _that = this
      console.log('[Web][Login] updateProfile params ', params)
      _that.$emit('update-profile', params)
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
