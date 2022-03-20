<template>
<div class="floors flex-container justify-center" v-if="display">
  <div class="floors-list flex-col">
    <div class="closee flex-row" @click="close()"></div>
    <div class="fc-title flex-row justify-center">
      <span class="fc-title-word">My&nbsp;Floors</span>
    </div>
    <div class="floors-container flex-row">
      <div class="floor-loading flex-col justify-center" v-if="loading !== ''">
        <span class="floor-loading-message">{{loading}}</span>
      </div>
      <div class="floor-card flex-col" v-else v-for="(floorInfo, index) in floorList" :key="index" v-on:click="$emit('open-game', [floorInfo.floorId, 1, floorInfo.owner, floorInfo.houseType])">
        <img class="floor-icon flex-row" referrerpolicy="no-referrer" alt="" src="../assets/images/floor_icon.png" />
        <div class="floor-info flex-container align-start">
          <span class="floor-word flex-row">{{ floorInfo.owner ? processAddress(floorInfo.owner)  + '\'s Home' : 'Bob Home' }}</span>
          <div class="floor-word flex-row">
            <span class="flex-col">Floor</span>
            <span class="flex-col">：</span>
            <span class="floor-spacial flex-col">{{ floorInfo.floorId ? floorInfo.floorId : '200' }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'FloorList',
  data () {
    return {
      windowHeight: window.innerHeight,
      display: false,
      loadingInfo: '',
      floorList: [
        {
          owner: '0xsg...8sys',
          floorId: 200
        },
        {
          owner: '0xsg...8sys',
          floorId: 201
        },
        {
          owner: '0xsg...8sys',
          floorId: 202
        }
      ]
    }
  },
  props: {
    show: Boolean,
    loading: String,
    floors: Array
  },
  methods: {
    close () {
      const _that = this
      _that.$emit('close-floors', [])
    },
    windowCompute () {
      const _that = this
      console.log('[Game][windowCompute] windowHeight', _that.windowHeight)
      const wHeight = _that.windowHeight
      return {
        'min-height': '500px',
        'box-sizing': 'content-box',
        'border-width': '0px',
        height: wHeight ? wHeight + 'px' : '768px',
        width: wHeight ? wHeight * 1.7778 + 'px' : '1024px'
      }
    },
    processAddress (address) {
      if (address) {
        return address.substr(0, 4) + '...' + address.substr(-4)
      }
      return ''
    }
  },
  updated () {
    console.log('[Game][updated] start', this.show)
    const _that = this
    _that.display = _that.show
    _that.loadingInfo = _that.loading
    if (_that.floors && _that.floors.length > 0) {
      _that.floorList = _that.floors
      _that.floorList.sort(function (a, b) {
        return a.floorId - b.floorId
      })
    } else {
      _that.floorList = _that.floors
    }
  },
  mounted () {
    console.log('[Game][mounted] start', this.show)
    const _that = this
    _that.display = _that.show
    _that.loadingInfo = _that.loading
    _that.floorList = _that.floors
  },
  created () {
    console.log('[Game][created] start', this.show)
    const _that = this
    _that.display = _that.show
    _that.loadingInfo = _that.loading
    _that.floorList = _that.floors
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.floors-list {
  width: 682px;
  height: auto;
  margin: auto 0;
  background-color: #2B2E35;
  border-radius: 5px;
}

.floors {
  z-index: 79;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  width: 100%;
  position: absolute;
  left: 0;
  top: 0;
}

.closee {
  position: absolute;
  margin-top: 3px;
  margin-left: 653px;
  width: 25px;
  height: 25px;
  background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAMAAABg3Am1AAAAAXNSR0IArs4c6QAAAbBQTFRFAAAAAAAA////AAAAf39/////qqqq////QEBAv7+/////AAAAMzMzzMzM////AAAAKioq////AAAAJCQkSUlJ////ICAgQEBA39/fAAAAcXFx////AAAAMzMzZmZm////Li4uRkZG////Tk5O6+vr////qqqqAAAAEBAQn5+fAAAAAAAADg4OKysruLi4AAAADQ0NGxsbrq6uAAAAJiYmAAAADAwMMTExFxcXLi4uCwsLKioqHx8fMzMzUlJSFBQUAAAAAAAAIyMjT09PAAAAbm5uAAAAaGhoAAAAAAAAAAAAAAAABgYGDw8PAAAAAAAAExMTAAAAAAAAAAAAAAAABAQECAgIAAAAAAAAAAAABAQECgoKDg4OAAAAAwMDBwcHra2tpaWlpqamrKysmZmZp6enra2tmJiYpqamra2trq6ukpKSkpKSg4ODgoKCrq6unJyclpaWr6+vmpqah4eHlZWVk5OTlpaWhoaGk5OTl5eXmZmZlpaWlZWVmpqalpaWmZmZp6enenp6mJiYpaWlkpKSkpKSfn5+fX19fn5+gICAiYmJiYmJhoaGhoaGqqqqn7SfswAAAI90Uk5TAAEBAgICAwMEBAQFBQUFBgYGBwcHBwgICAkJCQoKCgoLCwwNDQ0PEBAQERISEhITExMTFBQVFRUWFhgYGRkZGhwdHR0eHh8gJCYnKCgyNDU1Njc6Ozw+RUZHR0tLTExNeXx+gYSFhYaGhoeIioyNjY6Pj5CRkZKSk5OTk5SVlZaWlpeXl5ianJ2enqKkpqfTXHcfAAAB4UlEQVRIx2NgGEaACQhIE2dlxSaDW5ydj4+LlYkEcVFpeVEMGSYmLhzi7KLySkqZybxsTOjqgeL5CbwsqDqYWPmklVSz+vszlEVY0NWrFvX3JykIMGNoAKrv7y+2FGfBVN/fn24gxIzmpLR+MKixhulAVt/fn2OMriMZItFfC9WBqr6/wkufnxFFB2cqig409e2RQW4yqN5gUSxA0oGmviMWQwMDE49uFUIHG7r6EDQnAQGLgAlch62cBJp6b1RPo+uod9ZUIageRUezuxFh9ag6WohQj6KDKPVAHSLm1aSoZ2Bik7KrI0U9E5eEmmsDTH1XfBRB9aLyKnqNMA19MWE+BNUj4gsIegLsxUhR39/f5iTLQop6YJxbi7MQpb6zl4AO9PQcF92NlqPwq4+NCvVtxaMDM7+E+FjZVOHUASmX0NKzmDAif1gLs2Apl9DTM3KOshDGLJcw0z+Sjkoz9FJGMB9LekPSUWaKriMBW/pE6MjzxiiXErGlZ6COcpB4E2a5xCSbAiyvMNI/i4BhKVB9bESgC3q5xKGRXRIegZH+WQR0CnPDI4K9tNHLJUZ+LQ8/fy+M9M/Mrw0U98SSLxj51R0ctTHFmfm1sIoDdXBLynBjEWfGIQ7UAQSkiA9VAADt/0hMCEriIAAAAABJRU5ErkJggg==) 0px 0px no-repeat;
  background-size: 25px 25px;
}
.fc-title {
  margin-top: 10px;
}

.fc-title-word {
  height: 29px;
  overflow-wrap: break-word;
  color: rgba(255, 255, 255, 1);
  font-size: 24px;
  font-family: SFProDisplay-Medium;
  white-space: nowrap;
  line-height: 29px;
  text-align: center;
  text-shadow: 1px 1px 1px rgb(0 0 0 / 20%);
}

.floors-container {
  width: 100%;
  height: 315px;
  overflow-y: auto;
  flex-wrap: wrap;
  padding: 10px;
}

.floors-container::-webkit-scrollbar {
  width: 2px;
}
.floors-container::-webkit-scrollbar-thumb {
    background-color: #2B2E35;
    border-radius: 2px;
    border: 1px solid #2B2E35;
}
.floors-container::-webkit-scrollbar-track {
    background: #FC844C;
}

.floor-card {
  background-color: #6B6D71;
  border-radius: 5px;
  width: 200px;
  margin: 10px;
  cursor: pointer;
}

.floor-icon {
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
}

.floor-word {
  font-size: 19px;
  font-family: SFProDisplay-Medium, SFProDisplay;
  font-weight: 500;
  color: #FFFFFF;
  line-height: 29px;
}

.floor-info {
  height: 76px;
  padding: 10px;
}

.floor-spacial {
  color: #FC844C;
  font-size: 26px;
  font-weight: 500;
}
.floor-loading {
  width: 100%;
  background-color: #4b4d53;
  height: 100%;
  border-radius: 5px;
}

.floor-loading-message {
  font-size: 24px;
  font-family: SFProDisplay-Medium;
  color: white;
  line-height: 26px;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: center;
  width: 100%;
}
</style>
