<template>
<div class="building flex-container align-end scroll" @wheel="handleWheel($event)" @click="onClick($event)">
  <div class="floor flex-row align-center" v-for="(floorInfo, index) in floorList" :key="index" :style="orderStyle(floorInfo.order)">
    <div class="owner base-floor flex-col align-end" v-if="floorInfo.floorId === '0' && floorInfo.houseType === 0"></div>
    <div class="owner flex-col align-end" v-else-if="floorInfo.houseType < 0">
      <img class="ower-img flex-row" referrerpolicy="no-referrer" v-bind:src="leftImg(floorInfo.houseType)" alt="" />
    </div>
    <div class="owner owner-hidden flex-col align-end" :style="hidden(floorInfo.id)" v-else>
      <div class="owner-card flex-col align-center">
        <div class="owner-card-section flex-col justify-center">
          <span class="owner-card-name flex-row">{{ hiddenName(floorInfo.name) || hiddenAddress(floorInfo.owner) || defaultName }}</span>
          <div class="owner-card-line flex-row"></div>
          <div class="owner-card-value flex-row align-center">
            <div class="owner-container flex-row justify-around">
              <div class="owner-card-mod flex-col justify-center">
                <div class="owner-card-layer flex-col"></div>
              </div>
              <span class="ower-card-word flex-col">{{ floorInfo.myFloor }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- maxFloor >= floorInfo.floorId -->
    <!-- building ground -->
    <div class="room base-floor flex-col align-center" v-if="floorInfo.floorId === '0' && floorInfo.houseType === 0"></div>
    <!-- building facade wall -->
    <div class="room flex-col align-center" v-else-if="floorInfo.floorId === '0' && floorInfo.houseType < 0 ">
      <div class="decoration flex-container align-start" v-on:click="$emit('open-game', [floorInfo.floorId, floorInfo.minted, floorInfo.owner, floorInfo.houseType])">
        <!-- <img class="floor-area flex-row" referrerpolicy="no-referrer" src="../assets/images/walls/floor_area.png" alt="" /> -->
        <img class="floor-img flex-row" referrerpolicy="no-referrer" v-bind:src="requireImg(floorInfo.houseType, floorInfo.floorId)" alt="" />
      </div>
    </div>
    <!-- building floors -->
    <div class="room flex-col align-center" v-else-if="floorInfo.floorId > 0 && maxFloor >= floorInfo.floorId">
      <div class="decoration flex-container align-start" v-on:click="$emit('open-game', [floorInfo.floorId, floorInfo.minted, floorInfo.owner, floorInfo.houseType])">
        <!-- <img class="floor-area flex-row" referrerpolicy="no-referrer" src="../assets/images/walls/floor_area.png" alt="" /> -->
        <img class="floor-img flex-row" referrerpolicy="no-referrer" v-bind:src="requireImg(floorInfo.houseType, floorInfo.floorId)" alt="" />
      </div>
    </div>
    <!-- building max floors -->
    <div class="room flex-col align-center" v-else-if="floorInfo.floorId > 0 && maxFloor < floorInfo.floorId">
      <div class="decoration flex-container align-start">
        <div class="mint-btn-container flex-col jusity-center align-center">
          <div class="mint-btn-wrapper flex-row justify-center align-center" v-on:click="$emit('mint-floor',[1])">
            <img class="mint-icon flex-col" referrerpolicy="no-referrer" src="../assets/images/ic_build2x.png" alt="" />
            <span class="mint-message flex-col">mint</span>
          </div>
         </div>
      </div>
    </div>
    <div class="others base-floor flex-col justify-center" v-if="floorInfo.floorId === '0' && floorInfo.houseType === 0"></div>
    <div class="others flex-col justify-center" v-else-if="floorInfo.houseType < 0">
      <img class="others-img flex-row" referrerpolicy="no-referrer" v-bind:src="rightImg(floorInfo.houseType)" alt="" />
    </div>
    <div class="others flex-col justify-center" :id="floorInfo.floorId" :style="hidden(floorInfo.id)" @click="onClickOutside($event, floorInfo.floorId)" v-else>
      <div class="board flex-row align-center">
        <div class="board2 flex-row align-center">
          <div class="board-container flex-container align-center">
            <div class="board-icon flex-col"></div>
            <span class="board-word flex-col">{{ floorInfo.id || '' }}</span>
            <span class="board-message" v-if="editId === floorInfo.floorId">
              <input class="board-msg-input remark flex-col" type="text" name="message"
                :id="'remarkInfo_' + floorInfo.floorId"
                v-model="remarkMessage"
                @keyup.enter="submitRemark(floorInfo.floorId)"
                @keyup="computeWords(floorInfo.floorId)"
                />
            </span>
            <span class="board-message" v-else>
              {{ floorInfo.message || defaultMsg }}
            </span>
          </div>
        </div>
        <div class="ic-edit flex-row align-center" @click="displayEdit(floorInfo.floorId)" :style="editHidden(floorInfo.minted,floorInfo.owner)"></div>
      </div>
    </div>
  </div>
  <div class="foundation">
    <div class="decoration flex-container align-start">
      <img class="loading-img flex-row" referrerpolicy="no-referrer" scr="../assets/images/walls/loading.gif" alt="" />
    </div>
  </div>
</div>
</template>

<script>
// import { ref } from 'vue'
import $ from 'jquery'
import floor00000 from '../assets/images/walls/floor_00000.png'
import floor00001 from '../assets/images/walls/floor_00001.png'
import floor00002 from '../assets/images/walls/floor_00002.png'
import floor00003 from '../assets/images/walls/floor_00003.png'
import floor00004 from '../assets/images/walls/floor_00004.png'
import floor00005 from '../assets/images/walls/floor_00005.png'
import floor00006 from '../assets/images/walls/floor_00006.png'
import floor00007 from '../assets/images/walls/floor_00007.png'
import floor00008 from '../assets/images/walls/floor_00008.png'
import floor00009 from '../assets/images/walls/floor_00009.png'
import floor00010 from '../assets/images/walls/floor_00010.png'
import floor00011 from '../assets/images/walls/floor_00011.png'
import floor00012 from '../assets/images/walls/floor_00012.png'
import floor00013 from '../assets/images/walls/floor_00013.png'
import floor00014 from '../assets/images/walls/floor_00014.png'
import floor00015 from '../assets/images/walls/floor_00015.png'
import floor00016 from '../assets/images/walls/floor_00016.png'
import floor00017 from '../assets/images/walls/floor_00017.png'
import floorx from '../assets/images/walls/floor_x.png'
import facade0001 from '../assets/images/base/Facade-1.png'
import facade0002 from '../assets/images/base/Facade-2.png'
import facade0003 from '../assets/images/base/Facade-3.png'
import facade0004 from '../assets/images/base/Facade-4.png'
import facade0005 from '../assets/images/base/Facade-5.png'
import facade0001l from '../assets/images/base/Facade-1-l.png'
import facade0002l from '../assets/images/base/Facade-2-l.png'
import facade0003l from '../assets/images/base/Facade-3-l.png'
import facade0004l from '../assets/images/base/Facade-4-l.png'
import facade0005l from '../assets/images/base/Facade-5-l.png'
import facade0001r from '../assets/images/base/Facade-1-r.png'
import facade0002r from '../assets/images/base/Facade-2-r.png'
import facade0003r from '../assets/images/base/Facade-3-r.png'
import facade0004r from '../assets/images/base/Facade-4-r.png'
import facade0005r from '../assets/images/base/Facade-5-r.png'
import { hiddenAddress, hiddenName, popupMessage } from '@/utils/Utils.js'
import { ajaxAddTokenInfo } from '@/utils/AjaxData.js'

export default {
  name: 'Building',
  data () {
    return {
      maxChar: 60,
      count: 0,
      timearea: 0,
      startTime: 0,
      defaultMsg: 'Welcome to my room',
      defaultName: 'Empty Room',
      scrolled: false,
      floorList: [],
      editId: 0,
      remarkMessage: '',
      address: ''
    }
  },
  props: {
    first: Boolean,
    floors: Array,
    profileAddr: String,
    maxFloor: Number
  },
  methods: {
    onClick () {
      const _that = this
      _that.remarkMessage = ''
      _that.editId = 0
    },
    onClickOutside (event, floorId) {
      const _that = this
      console.log('[Building] onclick outside event ', event)
      if (floorId === _that.editId) {
        event.stopPropagation()
      }
    },
    close () {
      const _that = this
      _that.game = false
    },
    orderStyle (i) {
      return {
        order: i
      }
    },
    hidden (id) {
      if (!id) {
        return {
          visibility: 'hidden'
        }
      } else {
        return {}
      }
    },
    editHidden (id, address) {
      // console.log('[Building][editHidden] start ', id, address, this.address)
      if (!id) {
        return {
          visibility: 'hidden'
        }
      } else {
        if (!address || !this.address || (address && address.toLowerCase() !== this.address.toLowerCase())) {
          return {
            visibility: 'hidden'
          }
        } else {
          return {}
        }
      }
    },
    strPadLeft (str, chr = '0', len = 5) {
      // console.log('[Main] strPadLeft str ', str)
      return chr.repeat(len - String(str).length) + String(str)
    },
    requireImg (houseType, floorId) {
      if (houseType !== 'x') {
        if (houseType > 0) {
          houseType = this.strPadLeft(houseType)
        } else {
          if (floorId > 0) {
            houseType = this.strPadLeft(houseType)
          } else {
            houseType = 'f000' + (Math.abs(houseType)).toString()
          }
        }
      }
      const imageCfg = {
        '00000': floor00000,
        '00001': floor00001,
        '00002': floor00002,
        '00003': floor00003,
        '00004': floor00004,
        '00005': floor00005,
        '00006': floor00006,
        '00007': floor00007,
        '00008': floor00008,
        '00009': floor00009,
        '00010': floor00010,
        '00011': floor00011,
        '00012': floor00012,
        '00013': floor00013,
        '00014': floor00014,
        '00015': floor00015,
        '00016': floor00016,
        '00017': floor00017,
        f0001: facade0001,
        f0002: facade0002,
        f0003: facade0003,
        f0004: facade0004,
        f0005: facade0005,
        // mint: notmintfloor,
        x: floorx
      }
      return imageCfg[houseType]
    },
    leftImg (houseType, d = 'left') {
      houseType = 'f000' + (Math.abs(houseType)).toString() + 'l'
      const imageCfg = {
        f0001l: facade0001l,
        f0002l: facade0002l,
        f0003l: facade0003l,
        f0004l: facade0004l,
        f0005l: facade0005l
      }
      return imageCfg[houseType]
    },
    rightImg (houseType) {
      houseType = 'f000' + (Math.abs(houseType)).toString() + 'r'
      const imageCfg = {
        f0001r: facade0001r,
        f0002r: facade0002r,
        f0003r: facade0003r,
        f0004r: facade0004r,
        f0005r: facade0005r
      }
      return imageCfg[houseType]
    },
    handleWheel (event) {
      event.preventDefault()
      const _that = this
      console.log('[Building][handleWheel] emit event ', event.deltaY, event.timeStamp)
      _that.count++
      if (!_that.startTime || ((event.timeStamp - _that.startTime) > 200)) {
        _that.startTime = event.timeStamp
      }
      const timearea = Math.ceil(event.timeStamp - _that.startTime)
      setTimeout(function () {
        console.log('[Building][handleWheel] settimeout count ', _that.count, ' timearea ', timearea)
        if (_that.count >= 15 || timearea > 200) {
          _that.$emit('floor-scroll', event)
          _that.count = 0
        }
      }, 200)
      console.log('[Building][handleWheel] this.count ', _that.count, timearea, event)
    },
    hiddenAddress (address) {
      return hiddenAddress(address)
    },
    hiddenName (username) {
      return hiddenName(username)
    },
    async getRemarkInfo (tokenId) {
      const _that = this
      let message = _that.defaultMsg
      for (const floorInfo of _that.floors) {
        if (floorInfo.floorId === tokenId) {
          message = floorInfo.message
        }
      }
      return message
    },
    computeWords (tokenId) {
      const _that = this
      function getByteLen (data) {
        let len = 0
        let newData = ''
        for (let i = 0; i < data.length; i++) {
          const ch = data.charCodeAt(i)
          if (len <= _that.maxChar) {
            newData += data[i]
          }
          console.log('data ch ', ch)
          if ((ch >= 0x0001 && ch <= 0x007e) || (ch >= 0xff60 && ch <= 0xff9f)) {
            len++
          } else {
            len += 2
          }
        }
        return [len, newData]
      }
      const content = $('#remarkInfo_' + tokenId).val()
      const lenArr = getByteLen(content)
      if (lenArr[0] > _that.maxChar) {
        $('#remarkInfo_' + tokenId).val(lenArr[1])
        _that.remarkMessage = $('#remarkInfo_' + tokenId).val()
        popupMessage('Max message 30 chars', 'top', 'center', 't')
      }
      console.log('[Building] computeWords length is ', lenArr)
      return lenArr[0]
    },
    async displayEdit (tokenId) {
      const _that = this
      if (_that.editId > 0) {
        if (_that.editId !== tokenId) {
          _that.remarkMessage = ''
        } else {
          await _that.submitRemark(tokenId)
          return
        }
      }
      _that.editId = tokenId
      setTimeout(function () {
        $('#remarkInfo_' + tokenId).focus()
      })
      console.log('[Buiding] displayEdit ', _that.editId)
    },
    async submitRemark (tokenId) {
      const _that = this
      _that.updateMessage(tokenId, _that.remarkMessage)
      _that.editId = 0
    },
    async updateMessage (tokenId, remark) {
      const _that = this
      console.log('[Buiding] editMessage ', tokenId, _that.address, remark)

      // update floor message local
      _that.updateFloorsInfo(tokenId, remark)

      // Is room owner?
      const resCode = await ajaxAddTokenInfo(tokenId, _that.address, remark)
      console.log('[Building][updateMessage] resCode', resCode)
      if (resCode !== 0) {
        // alert('bind faild')
        popupMessage('Remark faild', 'top', 'center', 'f')
      } else {
        popupMessage('Remark success', 'top', 'center', 's')
      }
    },
    updateFloorsInfo (floorId, message) {
      const _that = this
      for (let i = 0; i < _that.floorList.length; i++) {
        const floorInfo = _that.floorList[i]
        if (floorInfo.floorId === floorId) {
          _that.floorList[i].message = message
        }
      }
      _that.remarkMessage = ''
    }
  },
  updated () {
    const _that = this
    _that.floorList = _that.floors
    _that.address = _that.profileAddr
    if (('ethereum' in _that.$Dapp.Bridges) && ('selectedAddress' in _that.$Dapp.Bridges.ethereum)) {
      _that.address = _that.$Dapp.Bridges.ethereum.selectedAddress
    }
  },
  created () {
    console.log('[Buiding][created] start!')
    const _that = this
    console.log('[Buiding][created] that.$Dapp ', _that.$Dapp)

    window.addEventListener('scroll', _that.handleScroll)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
