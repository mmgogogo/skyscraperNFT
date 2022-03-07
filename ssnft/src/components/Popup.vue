<template>
  <div class="hot flex-col" v-if="isOpen" @click="onClickOutside($event)">
    <div class="hot-group flex-col justify-between">
      <div class="hot-title-container flex-col justify-center">
        <span class="hot-title btn-hand">{{title}}</span>
      </div>
      <div class="hot-container flex-row">
        <div class="hot-list flex-col">
          <div class="hot-item flex-col justify-center" v-if="loading">
            <span class="hot-layer-message">{{loading ? 'Loading' : ''}}</span>
          </div>
          <div class="hot-item flex-col justify-center" v-for="(itemInfo, index) in popupList" :key="index">
            <span class="hot-layer-message">{{itemInfo.message}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Game',
  data () {
    return {
      isShow: false
    }
  },
  props: {
    show: Boolean,
    title: String,
    loading: Boolean,
    popupList: Array,
  },
  methods: {
    onClickOutside (e) {
      console.log('[Web][Popup] onclick outside e ', e)
      e.stopPropagation()
    },
    close () {
      const _that = this
      _that.isOpen = false
    }
  },
  mounted () {
    console.log('[Web][Popup] mounted start!')
    const _that = this
    _that.game = _that.show
  },
  created () {
    console.log('[Web][Popup] created start!')
    const _that = this
    _that.isOpen = _that.show
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
</style>
