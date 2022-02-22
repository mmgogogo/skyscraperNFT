<template>
<div class="building flex-container align-end scroll" @scroll="handleScroll($event)">
  <div class="floor flex-row justify-between" v-for="(floorInfo, index) in floors" :key="index" :style="orderStyle(floorInfo.order)">
    <div class="owner flex-col">
      <span class="message">{{ floorInfo.myFloor || defaultMsg }}</span>
    </div>
    <div class="room flex-col align-center" v-bind:class="[floorInfo.isFirst?'first':'']">
      <div class="decoration flex-container align-start" v-on:click="$emit('open-game', [floorInfo.id, true, 'abc'])">
        <img class="floor-area flex-row" referrerpolicy="no-referrer" src="../assets/images/walls/floor_area.png" alt="" />
        <img class="floor-img flex-row" referrerpolicy="no-referrer" v-bind:src="requireImg(floorInfo.floorId)" alt="" />
      </div>
    </div>
    <div class="others flex-col">
      <span class="message">{{ floorInfo.message || defaultMsg }}</span>
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

export default {
  name: 'Floor',
  data () {
    return {
      defaultMsg: 'this is a message',
      scrolled: false
    }
  },
  props: {
    floors: []
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
    requireImg (imagePath) {
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
        '00010': floor00010
      }
      return imageCfg[imagePath]
    },
    handleScroll (event) {
      if (event) {
        const target = event.target
        // console.log('[Building] target ', target)
        // console.log('[Building] target offsetHeight offsetTop scrollHeight scrollTop clientHeight clientTop', target.offsetHeight, target.offsetTop, target.scrollHeight, target.scrollTop, target.clientHeight, target.clientTop)
        // console.log('[Building] target ', target.getBoundingClientRect())
        if (!this.scrolled) {
          // target.scrollTo(0, 0)
          target.scrollTop = target.scrollHeight
          this.scrolled = true
        }
      }
      // offsetHeight: 871
      // offsetTop: 76
      // scrollHeight: 876
      // scrollTop: 6
      // clientHeight: 871
      // clientTop: 0
      // ClientHeight = Height of an element.
      // OffsetHeight = ClientHeight + Scrollbar Height.
      // Height of scrollbar = offsetHeight  – clientHeight.

      // element.getBoundingClientRect().bottom

      // console.log('[Building] event ', event)
      // Any code to be executed when the window is scrolled
      // this.isUserScrolling = (window.scrollY > 0)
      // console.log('[Building]  calling handleScroll', window.scoll, window.pageYOffset)
    }
  },
  created () {
    console.log('[Game] created start!')
    const _that = this
    console.log('[Game] that ', _that.$Dapp)

    window.addEventListener('scroll', _that.handleScroll)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.game {
  z-index: 200;
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0px;
  left: 0px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: inherit;
  background-color: rgb(4 4 4 / 90%);
}
.close {
  position: absolute;
  top: 12px;
  right: 12px;
  width: 30px;
  height: 30px;
  background: url(../assets/images/close.png) -2px -2px no-repeat;
  background-size: 30px 30px;
}

.scroll {
  scrollbar-width: thin;          /* "auto" or "thin" */
  /* scrollbar-color: white white;   scroll thumb and track */
  scrollbar-color: transparent transparent;
}
/* Works on Firefox */
* {
  scrollbar-width: thin;
  scrollbar-color: transparent;
}

/* Works on Chrome, Edge, and Safari */
*::-webkit-scrollbar {
  width: 12px;
}

*::-webkit-scrollbar-track {
  background: transparent;
}

*::-webkit-scrollbar-thumb {
  background-color: transparent;
  border-radius: 20px;
  border: 3px solid transparent;
}
</style>
