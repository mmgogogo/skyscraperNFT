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
          <input type="text" class="account-message-input" name="username" id="username" :value="username" maxlength="20">
        </div>
        <span class="account-label2">Network&nbsp;List</span>
        <div class="account-network flex-col">
          <div class="account-network-header flex-row justify-between">
            <span class="account-network-header-info">EVM&nbsp;Chain</span>
            <div class="account-network-header-info2 flex-container justify-center">
              <input class="account-address flex-col" type="text" name="address" id="messageInfo" v-model="address" readonly>
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
import $ from 'jquery'
import Clipboard from 'clipboard'
// addLocalStorage, getLocalStorage,
import { popupMessage } from '../utils/Utils'
import { ethers } from 'ethers'
// import { ajaxGetProfile, ajaxUpdateProfile } from '../utils/AjaxData'

export default {
  name: 'Account',
  data () {
    return {
      username: '',
      tmpNmae: '',
      display: false,
      address: ''
    }
  },
  props: {
    profileAddr: String,
    accountName: String,
    show: Boolean
  },
  methods: {
    copy () {
      // const _that = this
      const clipboard = new Clipboard('.account-address-copy')
      clipboard.on('success', e => {
        console.log('[Account] copy address is', e)
        popupMessage('Address copied !', 'top', 'center', 's')
      })
      clipboard.on('error', e => {
        popupMessage('Copy failed', 'top', 'center', 'f')
      })
    },
    close () {
      this.$emit('close-account')
    },
    submitName () {
      const _that = this
      const username = $('#username').val()
      console.log('[Account][submitName] username ', username)
      _that.$emit('update-name', { name: username })
    }
  },
  async updated () {
    const _that = this
    console.log('[Account][updated] updated start!', [_that.username, _that.profileAddr, _that.accountName])
    _that.display = _that.show
    _that.address = _that.profileAddr ? ethers.utils.getAddress(_that.profileAddr) : ''
    _that.username = _that.accountName
    // _that.name = _that.accountName[_that.playerInfo.address]
    // if (_that.accountName && (_that.playerInfo.address in _that.accountName)) {
    //   _that.name = _that.accountName[_that.playerInfo.address]
    //   return
    // }

    // if (!_that.profileAddr && ('ethereum' in _that.$Dapp.Bridges) && ('selectedAddress' in _that.$Dapp.Bridges.ethereum)) {
    //   _that.playerInfo.address = _that.$Dapp.Bridges.ethereum.selectedAddress
    // }

    // // user address exists and name empty and only 1 time
    // if (_that.playerInfo.address && _that.count <= 1) {
    //   _that.count++
    //   const len = _that.playerInfo.address.length
    //   const key = 'un:' + _that.playerInfo.address.substring(len - 6)
    //   const localName = getLocalStorage(key)
    //   if (localName) {
    //     _that.name = localName
    //   } else {
    //     console.log('[Account][updated] _that.playerInfo.address ', _that.playerInfo.address)
    //     try {
    //       const result = await ajaxGetProfile(_that.playerInfo.address)
    //       console.log('[Account][updated] result: ', result)
    //       _that.name = result.Name
    //     } catch (error) {
    //       _that.name = ''
    //       console.log('[Account][updated] error ', error)
    //     }
    //   }
    // }
  },
  mounted () {
    console.log('[Account][mounted] mounted start!')
  },
  created () {
    // const _that = this
    console.log('[Account][created] created start!')
    // if (_that.playerInfo.address) {
    //   _that.name = getLocalStorage('username' + _that.playerInfo.address)
    // }
    // console.log('[Account][created] created end ', _that.name, _that.playerInfo)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
