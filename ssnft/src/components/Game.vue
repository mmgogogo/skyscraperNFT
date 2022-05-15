<template>
  <!-- <div class="game" v-if="game">
    <div class="close" @click="close()"></div>
    <iframe id="game" title="game" :src="url"
    style="min-height:500px;height:768px;width:1080px;"
    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
    ></iframe>
  </div> -->
  <div class="game" v-if="display">
      <div class="close" @click="close()"></div>
      <iframe :id="gameType" :title="gameType" :src="gameUrl" :style="windowCompute()"
      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
      ></iframe>
  </div>
</template>

<script>
export default {
  name: 'Game',
  data () {
    // initial data
    return {
      windowHeight: window.innerHeight,
      display: false,
      gameUrl: '',
      name: ''
    }
  },
  props: {
    show: Boolean,
    url: String,
    gameType: String
  },
  methods: {
    close () {
      const _that = this
      _that.$emit('close-game', [])
    },
    windowCompute () {
      const _that = this
      console.log('[Game][windowCompute] windowHeight', _that.windowHeight)
      const wHeight = _that.windowHeight // eslint-disable-line no-unused-vars
      return {
        'min-height': '300px',
        'box-sizing': 'content-box',
        'border-width': '0px',
        height: '95%',
        width: '98%'

      }
    }
  },
  updated () {
    console.log('[Game][updated] start', this.show)
    const _that = this
    _that.display = _that.show
    _that.gameUrl = _that.url
    _that.name = _that.gameType
  },
  mounted () {
    console.log('[Game][mounted] start', this.show)
    const _that = this
    _that.display = _that.show
    _that.gameUrl = _that.url
    _that.name = _that.gameType
  },
  created () {
    console.log('[Game][created] start', this.show)
    const _that = this
    _that.display = _that.show
    _that.gameUrl = _that.url
    _that.name = _that.gameType
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@media screen and (max-width: 800px){
  .game {
  z-index: 200;
  position: absolute;
  height: 50%;
  width: 100%;
  top: 25%;
  left: 0px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: inherit;
  background-color: rgb(4 4 4 / 90%);
}
  }
@media screen and (min-width: 801px){
.game {
  z-index: 200;
  position: absolute;
  height: 98%;
  width: 100%;
  top: 1%;
  left: 0px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: inherit;
  background-color: rgb(4 4 4 / 90%);
}
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
</style>
