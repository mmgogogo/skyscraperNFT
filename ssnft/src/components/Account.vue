<template>
  <div class="profile-account flex-col" v-if="display">
    <div class="account-container flex-col">
      <div class="account-content flex-col align-left">
        <div class="account-header flex-row align-center">
          <div class="account-header-content flex-row align-center">
            <div class="account-icon-bg flex-col justify-center">
              <!-- <div class="account-icon flex-col"></div> -->
            </div>
            <div class="account-wallet flex-col justify-center">
              <span class="account-wallet-word">Wallet&nbsp;Address</span>
            </div>
            <div class="account-close flex-col justify-center" @click="close">
              <div class="account-close-img flex-col"></div>
            </div>
          </div>
        </div>
        <span class="account-title flex-row align-center">
          <span class="account-title-word">Account&nbsp;Settings</span>
        </span>
        <span class="account-username-label">Username</span>
        <div class="account-username-input flex-col justify-center">
          <input type="text" class="account-message-input" name="message" id="message" v-model="name" maxlength="20">
        </div>
        <span class="account-label2">Network&nbsp;List</span>
        <div class="account-network flex-col">
          <div class="account-network-header flex-row justify-between">
            <span class="account-network-header-info">EVM&nbsp;Chain</span>
            <div class="account-network-header-info2 flex-container justify-center">
              <input class="account-address flex-col" type="text" name="address" id="messageInfo" v-model="playerInfo.address" readonly>
              <button type="button" class="account-address-copy flex-col" @click="copy" data-clipboard-target="#messageInfo">Copy</button>
              <!-- <span class="account-address">0xc2f1…76E3</span> -->
              <!-- <span class="account-address-copy">Copied</span> -->
            </div>
          </div>
          <div class="account-network-body flex-row justify-start">
            <div class="account-network-item chain-r flex-col">
              <span class="chain-type">R</span>
            </div>
            <div class="account-network-item chain-m flex-col">
              <span class="chain-type">M</span>
            </div>
          </div>
        </div>
        <div class="account-btn-container flex-row justify-center">
          <div class="account-btn flex-col" @click="submitName()"><span class="account-btn-word">Save</span></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Clipboard from 'clipboard'
import Toastify from 'toastify-js'
import { addLocalStorage, getLocalStorage } from '../utils/Utils'
import { ajaxGetProfile, ajaxUpdateProfile } from '../utils/AjaxData'

export default {
  name: 'Account',
  data () {
    return {
      name: '',
      count: 0,
      display: false,
      playerInfo: {
        address: ''
      }
    }
  },
  props: {
    profileAddr: String,
    show: Boolean
  },
  methods: {
    async walletSelect (chainId) {
      const _that = this
      console.log('[Account][Click] this dapp ', chainId, _that.$Dapp)
    },
    popupMessage (message, gravity = 'top', position = 'center') {
      Toastify({
        text: message,
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: gravity, // `top` or `bottom`
        position: position, // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: 'linear-gradient(to right, #00b09b, #96c93d)'
        }
      }).showToast()
    },
    copy () {
      const _that = this
      const clipboard = new Clipboard('.account-address-copy')
      clipboard.on('success', e => {
        console.log('[Account] copy address is', e)
        _that.popupMessage('Copied !')
      })
      clipboard.on('error', e => {
        _that.popupMessage('Copy failed')
      })
    },
    close () {
      this.$emit('close-account')
    },
    async submitName (chatName) {
      const _that = this
      if (!_that.playerInfo.address) {
        _that.popupMessage('Login wallet first')
        return
      }
      if (chatName === undefined) {
        chatName = this.playerInfo.address
      }
      console.log('[Account] name is', _that.name)
      if (_that.name) {
        addLocalStorage('username' + chatName, _that.name, 2 * 3600)
        // 入库
        const res = await ajaxUpdateProfile(this.playerInfo.address, _that.name, 0)
        console.log('[Account] code', res)
        if (res !== 0) {
          _that.popupMessage('Username updated faild!', 'top', 'right')
        } else {
          _that.popupMessage('Username updated!', 'top', 'right')
        }
      }
    }
  },
  async updated () {
    const _that = this
    console.log('[Account][updated] updated start!', _that.name)
    _that.display = _that.show
    _that.playerInfo.address = _that.profileAddr

    if (('ethereum' in _that.$Dapp.Bridges) && ('selectedAddress' in _that.$Dapp.Bridges.ethereum)) {
      _that.playerInfo.address = _that.$Dapp.Bridges.ethereum.selectedAddress
    }

    if (_that.playerInfo.address && !_that.name && _that.count <= 1) {
      _that.count++

      if (_that.name === '') {
        console.log('[Account][updated] _that.playerInfo.address ', _that.playerInfo.address)
        const result = await ajaxGetProfile(_that.playerInfo.address)
        console.log('[Account][updated] result: ', result)
        _that.name = result.Name
      }
    }
  },
  mounted () {
    console.log('[Account][mounted] mounted start!')
  },
  created () {
    const _that = this
    console.log('[Account][created] created start!')
    if (_that.playerInfo.address) {
      _that.name = getLocalStorage('username' + _that.playerInfo.address)
    }
    console.log('[Account][created] created end ', _that.name, _that.playerInfo)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
