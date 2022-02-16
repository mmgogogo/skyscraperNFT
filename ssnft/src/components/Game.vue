<template>
  <!-- game info start https://elevenzhou.github.io/Space/ -->
  <div class="game">
    <div class="close"></div>
    <iframe id="game" title="game" sandbox="allow-scripts" :src="url"
    style="min-height:500px;height:768px;width:1080px;"
    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
    ></iframe>
  </div>
  <!-- game info end -->
</template>

<script>
export default {
  name: 'Game',
  data () {
    // initial data
    return {
    }
  },
  props: {
    url: String
  },
  methods: {
  },
  created () {
    console.log('[Game] created start!')
    const _that = this
    console.log('[Game] that ', _that.$Dapp)
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
  background: url(/images/close.png) -2px -2px no-repeat;
  background-size: 30px 30px;
}
</style>
