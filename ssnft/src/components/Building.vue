<template>
<div class="building flex-container align-end scroll" @wheel="handleWheel($event)">
  <div class="floor flex-row justify-between" v-for="(floorInfo, index) in floors" :key="index" :style="orderStyle(floorInfo.order)">
    <div class="owner flex-container">
      <div class="owner-card flex-col align-center">
        <div class="owner-card-section flex-col">
          <span class="owner-card-name">{{ floorInfo.name || hiddenAddress(floorInfo.owner) || defaultName }}</span>
          <div class="owner-card-line flex-col"></div>
          <div class="owner-card-value flex-row align-center">
            <div class="owner-card-mod flex-col justify-center">
              <div class="owner-card-layer flex-col"></div>
            </div>
            <span class="ower-card-word flex-col">{{ floorInfo.myFloor }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="room flex-col align-center" v-bind:class="[floorInfo.isFirst?'first':'']">
      <div class="decoration flex-container align-start" v-on:click="$emit('open-game', [floorInfo.floorId, floorInfo.minted, floorInfo.owner, floorInfo.houseType])">
        <img class="floor-area flex-row" referrerpolicy="no-referrer" src="../assets/images/walls/floor_area.png" alt="" />
        <img class="floor-img flex-row" referrerpolicy="no-referrer" v-bind:src="requireImg(floorInfo.houseType)" alt="" />
      </div>
    </div>
    <div class="others flex-col">
      <div class="board flex-row align-start">
        <div class="board-container">
          <span class="board-word flex-row">{{ floorInfo.id || '' }}</span>
          <div class="board-icon flex-row"></div>
        </div>
        <span class="board-message">{{ floorInfo.message || defaultMsg }}</span>
      </div>
    </div>
  </div>
</div>
</template>

<script>
// import { ref } from 'vue'
// import $ from 'jquery'
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
import floorx from '../assets/images/walls/floor_x.png'
import { hiddenAddress } from '@/utils/Utils.js'

export default {
  name: 'Building',
  data () {
    return {
      defaultMsg: '欢迎来我家',
      defaultName: '空置房',
      scrolled: false
    }
  },
  props: {
    first: Boolean,
    floors: Array
  },
  methods: {
    close () {
      const _that = this
      _that.game = false
    },
    orderStyle (i) {
      return {
        order: i
      }
    },
    strPadLeft (str, chr = '0', len = 5) {
      // console.log('[Main] strPadLeft str ', str)
      return chr.repeat(len - String(str).length) + String(str)
    },
    requireImg (houseType) {
      if (houseType !== 'x') {
        if (houseType > 10) {
          houseType = 10
        }
        houseType = this.strPadLeft(houseType)
      }
      const imageCfg = {
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
        x: floorx
      }
      return imageCfg[houseType]
    },
    handleWheel (event) {
      event.preventDefault()
      console.log('[Building][handleWheel] emit event ', event.deltaY)

      this.$emit('floor-scroll', event)
    },
    hiddenAddress (address) {
      return hiddenAddress(address)
    }
  },
  created () {
    console.log('[Buiding] created start!')
    const _that = this
    console.log('[Buiding] that ', _that.$Dapp)

    window.addEventListener('scroll', _that.handleScroll)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
