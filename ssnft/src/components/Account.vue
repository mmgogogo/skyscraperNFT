<template>
  <div class="profile-account flex-col" v-if="display">
    <div class="account-container flex-col">
      <div class="account-content flex-col align-left">
        <div class="account-header flex-row align-center">
          <div class="account-header-content flex-row">
            <div class="account-icon-bg flex-col justify-center">
              <div class="account-icon flex-col"></div>
            </div>
            <div class="account-wallet flex-col justify-center">
              <span class="account-wallet-word">Wallet&nbsp;Address</span>
            </div>
            <div class="account-close flex-col justify-center" @click="close">
              <div class="account-close-img flex-col"></div>
            </div>
          </div>
        </div>
        <span class="account-title">Account&nbsp;Settings</span>
        <span class="account-username-label">Username</span>
        <div class="account-username-input flex-col justify-center">
          <input type="text" style="color:black;padding-left:10px;" class="message-input" name="message" id="message" v-model="name" maxlength="20">
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
    console.log('[Account][updated] updated start!', _that.name, _that.count)
    _that.display = _that.show
    _that.playerInfo.address = _that.$Dapp.Bridges.ethereum.selectedAddress
    if (_that.playerInfo.address && !_that.name && _that.count <= 1) {
      // _that.name = getLocalStorage('username' + _that.playerInfo.address)
      _that.count++

      if (_that.name === '') {
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
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.profile-account {
  z-index: 181;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  right: 0px;
  width: 360px;
  position: absolute;
  top: 0px;
}
.account-container {
  z-index: 182;
  height: 100%;
  background-color: rgba(255, 255, 255, 1);
  width: 360px;
  position: relative;
}
.account-content {
  width: 360px;
  height: 449px;
}
.account-header {
  height: 60px;
  background-color: rgba(43, 46, 53, 1);
  box-shadow: 0px 1px 3px 0px rgb(0 0 0 / 30%);
  width: 360px;
  margin: 0 auto;
}
.account-header-content {
  width: 320px;
  height: 40px;
  margin: 0 auto;
}
.account-icon-bg {
  height: 38px;
  width: 38px;
  border: 0.6551724137931034px solid rgba(255, 255, 255, 1);
  box-shadow: inset 1px 1px 1px 0px rgb(0 0 0 / 20%);
  border-radius: 50%;
  background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAKKADAAQAAAABAAAAKAAAAAB65masAAAFQ0lEQVRYCc2ZS2wbRRjHd9fPOnWSOin1o8F2UCqlwAUlcOylJVeCOCHxUNUckCJS9RG1oUoflFIe4oQQQogDFw6Ack0RHHpsHXGihqSt7YT4IeHESUuwExwv//+sx3ISO06JHPuT1uPdncdP/5n5Zr5ZVdmF6bruRvF+XF5cnmKKREngShbTkKqqKT78P2Z+0kKAOoIyg7nc6vHp6RnHndCUNT4ft6dSqdbM0lKnipft7a60x/3UI1+XL/tiX9+/2WzuH7vd9jNeTQB25knaZH07MoAF19cL18LhcPf3P/zYOXP/QY9JM6lmi1kxmy2KpqmKqmpINVFfoVBQdL2gFAq6ks/n9WAwMP3aq68s9vb2RkwmbRyg0Z00XBMQYPtR0bVYLPbSx59+1p3JLLltNptisVgBZgYUwbavBnUAVoAq+53OxMjwO7FAwH8H9RL07+1At62ZquVyuW+vX79x6GEk1mO1WRWbzV4CY8W14GTjBKRJ0K6uw3+cP3s6bbfb30QdVdWsCoiKji1mMh+Njo71ZHNZl8PhKHaltmMoCbc5JSSHAODSV8bfe9DW1noBkLc35+N9RUDCzc3NfXjh4qU+EwaYw9EiVBMFanRnpUYqPSMkraDra5fGRqd8Xu9YJcgtgCgYhHLfDQ+PvGC2WAHnUEwm065VqwTJZwQF2NoH71/5FUq+vrm7jSlXLI3MTo45dquhXH3h2CyACGm9cfOTZ9g2GYo4ItkAiCdXOSGMMddSV+XKIQi5srJy8PMvvuwgQ/m7EiDIg3QlnK3GhDBcSHnmev+fnf2zNx5P9JNFtlUCpBOmn6MroeNthAFM+errbwJkke0LQLw4whXCcMJ2sRpQ9kbY4mLmcCQS9ZOJ7UsFB7l8cYWQq0Mj4GSbk7duufB/kPcCkAs/11YuX41STsIxxTw4urq6epz/NUjpnp2ddYiFH2trow08cDsFNZFI2clGBfvvhqYs3JVQvWZQEIzKvXthE9kI6J2fj+/jzG0GONmDyWRqH9kEIDeb3M81i7Gb04sLbRLQI3bC2Gw2ky0vPzoIHo+ggna63Ak3AySHGnpUbHcImEQMsdAMYOUMba2tadwnCJhggMMNZLMY54PL1bEMnqQAZPTFAKcZzHB1muJ2H8qCRygYYmjI6KtZjPPh+eeezYMnZAZxinErQ0MYbhvrbgwFVd3n8+TIJmYxg+og4lb6H16NMsIxvAgG/GGLxfILOQQg0gkG1VCxUWyiXQNQUwZePkGvMsGHYneAFzP5/HoEQXVgNZfzMuNem1Svvf3AfHd3YI5MZJAKQlptnBE/VWxEN0vAk2+/EcUkGZcClQCRIcrjCEb8xrnK3o1FzlqMOSXwdNfvXq9niixbAIsPLhePI+jF98SoHHfxLS0t6aGhk2y3pB4BSgryBpkf86yExxGM+Ovd1RIOgGvnz47cR8jxFp5tOEzaAFiEjPKshMcRyFw3SNmt6Nq1M2fevet0Oi+ivVLXkoVWdbpCvWPY8txkxM+g2si++1+qxotjjt16Dsq1GnC3K9VeFZCZASmO3xjxM6jeTZdLMDpiXpwQQ0On0jabhd26RTkJuy1gEZJnJVcZ8TOoZtwqC9cCJhSNqQGm4Xj4wDxdCWcrXl3Gu8ciU5WfmoCyHNVkxB9BUD05+ZPrYTR6lNGXXBklrIQqPxLGMz3o94cHBk4s0AnTz+FZVdVkm0x3DCgLAUQcojNuZWj4G6KvFAIcxhDFbbqCSfZXZ0fnMrdM3JVw4ceY49pav0N0CVieArb8M4T8FMEs8hMEP0fs6jPEfygDPz1ycYxKAAAAAElFTkSuQmCC) 0px 0px no-repeat;
  background-size: 38px 38px;
}

.account-icon {
  width: 23px;
  height: 26px;
  background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABcAAAAaCAYAAABctMd+AAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAF6ADAAQAAAABAAAAGgAAAABedxUYAAACyklEQVRIDaWVO2/TUBSA40dDiik0QSUg0qioUspCioQU1CxVJ8QIPwDUTl3YO2aHhakrcyTEyENCQihjFoYoAqFUTauydCgJzYM4Md9x7ZQmtuu2R/pk+97z8r3n3KtEQohlWYqrpiiK5b6f9hwajSo6DlXGozAJOvyFNvTAOi2QGIyJ41hjIg4zYMAizMM2fHSeof8C/SPBuQoJuAfPYRuGMhgMmp1OZ71QKMif+f696+/EEy8TkIFH0ABP2dvbe4qhBAgneFEgBll4C77S7XZ/4jUGntn7RXWVs0EpRaPR+Y2NjRQ6nn7GBp0KMDGQypBKCRRVVa+g4CYTqGtPsg6yoTOmab73XRMmer3eLwxmwbPqxjJ3QkuJHWD8iqfUtKdUKpXXTHThbCVJYkq5XJ6gItb7/f5oxZj1en0Tp3NwGTyXxXMQZVskwMrKira2tnY3l8s9icfjC41GY7dUKn1dXV2toHQAf2AAp2cvDkHWfAjNomezWSOVSiWSyeSNdDodX1pamiwWi5ro49hThhOOkrT8BEiVyPtwnvdIs9lUDg8PFcMwrKmpKcm0D7Lmsi/90bPGNnYcX0JBzpFrII2xAEla/UQAxv4XCdBD55uu62Xe26MBIjiPwh24Dy+hDWcSAnxvtVp5jI6TkQ+4DouwCecWArRrtZp09VEAPMnGzcJj6MGFhOy/4Fz2THGbSDZPzmvPTmM8tMRisVwmk7mKge1cNkV2PBHaQ4AiGzqZz+flklFkM2XNDc6RZxdaD8eYY7iO49ugq07pdDRN+0CAakBSoaa2trbeoGjfsbaBk722s7PzkMNq97x/sL+//441n8Op3LnqcU3y5dyJNzk3XkxPTz/gMrgV1ESc5RbzJl37o1qtfl5eXv6Em9/QgLHuk2CClJJEl6dU1Ikk+B4VObjkcmmBFId9kPkZuUH85rEfE6k6F3vyH7rZ5EDWseUNAAAAAElFTkSuQmCC) 0px 0px no-repeat;
  background-size: 23px 26px;
  margin: 0 auto;
}

.account-wallet {
  height: 40px;
  border-radius: 5px;
  border: 0.6551724137931034px solid rgba(255, 255, 255, 1);
  background-color: rgba(252, 132, 76, 1);
  box-shadow: inset 1px 1px 1px 0px rgb(0 0 0 / 20%);
  margin-left: 14px;
  width: 120px;
}

.account-wallet-word {
  width: 110px;
  height: 20px;
  display: block;
  overflow-wrap: break-word;
  color: rgba(255, 255, 255, 1);
  font-size: 16px;
  font-family: SFProDisplay-Medium;
  white-space: nowrap;
  line-height: 19px;
  text-align: center;
  text-shadow: 1px 1px 1px rgb(0 0 0 / 20%);
  margin: 0 auto;
}

.account-close {
  height: 16px;
  background-color: rgba(0, 0, 0, 0);
  width: 16px;
  margin: 12px 0 0 138px;
}
.account-close-img {
  width: 16px;
  height: 16px;
  background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAFKADAAQAAAABAAAAFAAAAACy3fD9AAACcklEQVQ4EYWUX4sSURjGZ1xdDQoGEYSwC/EbeOmVfgcv7MIPEIsXZkpblgYSKHVVsXW7QrgF+gUEvfIjiBdd7IYbCP6FKI3R6XmmOcOZYXZ74eX8e85v3vec94yqwAzDUNkKU1XVEH2v9ja9z1okMAA/hqvuDTLUSy+v+60B2+Ner3eq67rR7/dfYaPujtQFC3S73RfQ/06n043hcLgHwxBAxYI94weSyaSWSqXKAGwF1A2D/uV+vy9jXclms/cAfI6tWx8BMHxIt88tHA6f5PP5t4CGCPKCQV/+t1VR1uu1hv4DuN9nRWCmiYV3QhSJRB4JKObEGQcYmQwbj8fn1Wr1AhozIPt2GUUmkwnmcrk3jFCAF4vF2Ww2e1qr1Q5esHq9/hnaK/glfGsDMTDLxwu6Wq0+aZr2C9kUqaMxMhdsh2ln/VF4U6RcE3YTjOviUoTWbAeDwZ/NZnOKM/3oWMBgMpmcNxoNOU0zMqFzAOXbrFQqBtMUQtEGYMFg8EcsFuO5OWDU2EAZhnnzNtE+pki2RCLxsNlsnkSjUZaTvGT2zUvxgsmlwTQZGWGCMJ/Pz9rtdmk0GtnFzzX//2C8AJ5ZKBS6brVaa9YnN1p1qqD4S2DYUJEyn6Bn0bI0EO0VAN8Y0XK5/EAgTRR/PB4PYmhmK54VYQ05Ta/S4Jl51SkK/32hUOBT3IkI9cPh8JNfpXnBMG3wmaKkdp1O54kcKfqMkG/5yC/eMn5Br/Hs7uKww0jzCxa/wy/hjtKw9LvpdFoqFot76O/gWX6FzvmWMcEz4A/2PvwIPoU7YBjLJuuZ6TV8KwtEnxdk/yfF5C2tQ/8XtGOCYGlEoHAAAAAASUVORK5CYII=) 0px 0px no-repeat;
  background-size: 16px 16px;
}

.account-title {
  width: 164px;
  height: 26px;
  display: block;
  overflow-wrap: break-word;
  color: rgba(51, 51, 51, 1);
  font-size: 22px;
  font-family: SFProDisplay-Medium;
  white-space: nowrap;
  line-height: 26px;
  text-align: center;
  margin: 24px 0 0 106px;
}
.account-username-label {
width: 81px;
  height: 21px;
  display: block;
  overflow-wrap: break-word;
  color: rgba(51, 51, 51, 1);
  font-size: 18px;
  font-family: SFProDisplay-Medium;
  white-space: nowrap;
  line-height: 21px;
  text-align: center;
  margin: 32px 0 0 12px;
}

.account-username-input {
  width: 335px;
  height: 50px;
  border-radius: 5px;
  border: 1px solid rgba(230, 230, 230, 1);
  margin: 12px 0 0 12px;
}
.account-label2 {
  width: 98px;
  height: 21px;
  display: block;
  overflow-wrap: break-word;
  color: rgba(51, 51, 51, 1);
  font-size: 18px;
  font-family: SFProDisplay-Medium;
  white-space: nowrap;
  line-height: 21px;
  text-align: left;
  margin: 24px 0 0 12px;
}

.account-network {
  height: 77px;
  border-radius: 5px;
  border: 1px solid rgba(230, 230, 230, 1);
  width: 335px;
  justify-content: flex-center;
  margin: 12px 0 0 12px;
}

.account-network-header {
  width: 320px;
  height: 17px;
  margin: 12px 0 0 12px;
}

.account-network-header-info {
  width: 63px;
  height: 17px;
  display: block;
  overflow-wrap: break-word;
  color: rgba(153, 153, 153, 1);
  font-size: 12px;
  font-family: PingFangSC-Medium;
  white-space: nowrap;
  line-height: 17px;
  text-align: left;
}

.account-network-header-info2 {
  /* width: 118px; */
  width: 200px;
  height: 20px;
  /* height: 17px;
  overflow-wrap: break-word;
  text-align: left;
  white-space: nowrap;
  font-size: 0; */
}

.account-address {
  font-size: 12px;
  font-family: PingFangSC-Medium;
  color: rgba(51, 51, 51, 1);
  line-height: 17px;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: right;
}

.account-address-copy {
  height: 17px;
  border-radius: 4px;
  font-size: 11px;
  background-color: #ef4f4f;
  color: #fff;
  border: 0;
  /* width: 34px; */
  text-align: center;
  vertical-align: middle;
  margin: 0 auto;
}

.account-network-body {
  width: 148px;
  height: 20px;
  margin: 16px 0 12px 12px;
}

.account-network-item {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  margin: 0 5px;
}

.chain-r {
  background-image: linear-gradient( 180deg, rgba(255, 129, 193, 1) 0%, rgba(255, 74, 141, 1) 100% );
}

.chain-m {
  background-image: linear-gradient( 180deg, rgb(104, 74, 236) 0%, rgb(105, 13, 190) 100% );
}

.account-btn-container {
  width: 327px;
  height: 45px;
  margin: 45px 0 0 24px;
}
.account-btn {
  height: 44px;
  border-radius: 5px;
  border: 1px solid rgba(238, 238, 238, 1);
  background-color: rgba(252, 132, 76, 1);
  /* background-color: rgba(215, 215, 215, 1); */
  box-shadow: inset 1px 1px 1px 0px rgb(0 0 0 / 20%);
  margin-top: 1px;
  width: 150px;
}
.account-btn-word {
  width: 46px;
  height: 24px;
  display: block;
  overflow-wrap: break-word;
  color: rgba(255, 255, 255, 1);
  /* color: rgba(255, 255, 255, 1); */
  font-size: 20px;
  font-family: SFProDisplay-Bold;
  white-space: nowrap;
  line-height: 24px;
  text-align: center;
  text-shadow: 1px 1px 1px rgb(0 0 0 / 20%);
  margin: 10px 0 0 52px;
}
.chain-type {
  text-align: center;
  vertical-align: middle;
  font-size: 13px;
  color: white;
}
</style>
