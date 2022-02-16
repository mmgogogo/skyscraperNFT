<template>
  <main class="main">
    <div class="header flex-col justify-center">
      <div class="navigation flex-row">
        <div class="logo flex-col"></div>
        <div class="wallet flex-col" @click="login()"></div>
        <div class="profile flex-col" @click="displayProfile()"></div>
      </div>
    </div>
    <div class="container flex-row">
      <!-- nav start -->
      <div class="nav flex-col align-center">
        <div class="outer1 flex-col">
          <div class="bd1 flex-col">
            <div class="outer2 flex-col justify-between">
              <span class="text tbox tline tcolor tprop tfont_m tfont_s26 tshadow">{{ baseConfig.lang_001 }}</span>
              <div class="box1 flex-row justify-between">
                <img class="icon1" referrerpolicy="no-referrer" src="images/building_logo.png" />
                <span class="box3 tfont_s30 tfont_m tleft tcolor tprop">{{ gameConfig.total }}</span>
              </div>
            </div>
          </div>
          <div class="bd2 flex-row justify-between">
            <div class="section2 flex-col">
              <div class="section3 flex-row justify-between">
                <div class="outer3 flex-col"></div>
                <div class="outer4">
                  <span class="info2">{{ baseConfig.lang_002 }}</span>
                  <span class="tbox1 tline tcolor_gray0 tprop tfont_m tfont_s24 tshadow ttop">…</span>
                </div>
              </div>
            </div>
            <div class="section4 flex-col align-center">
              <span class="txt2">{{ baseConfig.lang_003 }}</span>
            </div>
          </div>
          <div class="bd3 flex-row justify-between">
            <div class="layer1 flex-col"></div>
            <span class="text tbox1 tline tprop tfont_m tfont_s24 tshadow ttop tcolor_gray0">{{ baseConfig.lang_004 }}</span>
          </div>
          <div class="bd4 flex-row justify-between">
            <div class="bd5 flex-col"></div>
            <span class="text tbox1 tline tprop tfont_m tfont_s24 tshadow ttop tcolor">{{ baseConfig.lang_005 }}</span>
          </div>
          <div class="bd4 flex-row justify-between">
            <div class="group0 flex-col"></div>
            <span class="text tbox1 tline tprop tfont_m tfont_s24 tshadow tcolor">{{ baseConfig.lang_006 }}</span>
          </div>
          <div class="bd4 flex-row justify-between">
            <div class="group1 flex-col"></div>
            <span class="text tbox1 tline tprop tfont_m tfont_s24 tshadow tcolor tleft" @click="hot()">{{ baseConfig.lang_007 }}</span>
          </div>
          <div class="bd8 flex-row justify-between">
            <div class="layer2 flex-col align-center">
              <div class="layer3 flex-col justify-between">
                <div class="layer4 flex-col"></div>
                <span class="txt3" @click="mint()">
                  {{ baseConfig.lang_008 }}
                </span>
              </div>
            </div>
            <div class="layer5 flex-col align-center">
              <div class="group2 flex-col justify-between">
                <img
                  class="label2"
                  referrerpolicy="no-referrer"
                  src="https://lanhu.oss-cn-beijing.aliyuncs.com/SketchPng761b6545dec0faf9196ceabe44734f37945c18d76dcd24495b1dfc2be778eb39"
                />
                <span class="word4">{{ baseConfig.lang_009 }}</span>
              </div>
            </div>
          </div>
          <div class="bd9 flex-row justify-between">
            <div class="group3 flex-col">
              <div class="box2 flex-col justify-between">
                <div class="mod1 flex-col"></div>
                <span class="word5">{{ baseConfig.lang_010 }}</span>
              </div>
            </div>
            <div class="group4 flex-col">
              <span class="paragraph1">{{ baseConfig.lang_011 }}</span>
            </div>
          </div>
        </div>
      </div>
      <!-- nav end -->

      <!-- hot start -->
      <div class="hot flex-col" v-show="showInfo.hot">
        <div class="group1 flex-col justify-between">
          <div class="main5 flex-col justify-center"><span class="txt5">Hot&nbsp;Floor</span></div>
          <div class="main6 flex-row">
            <div class="group10 flex-col">
              <div class="layer flex-col justify-center"><span class="txt6">Jack&nbsp;Chow</span></div>
              <div class="layer flex-col justify-center"><span class="txt6">Jack&nbsp;Chow</span></div>
              <div class="layer flex-col justify-center"><span class="txt6">Jack&nbsp;Chow</span></div>
            </div>
            <!-- <div class="group3 flex-col align-center"><div class="bd4 flex-col"></div></div> -->
          </div>
        </div>
      </div>
      <!-- hot end -->

      <!-- mint start -->
      <div class="shadow" v-show="showInfo.mint">
        <div id="mint" class="mint flex-col">
          <div class="block flex-row justify-between">
            <div class="main4 flex-col"></div>
            <div class="main5 flex-col justify-between">
              <span class="txt3">Skyscraper&nbsp;Floor</span>
              <span class="txt4">
              Phanta&nbsp;Bear&nbsp;is&nbsp;a&nbsp;collection&nbsp;of&nbsp;10,000&nbsp;algorithmically&nbsp;generated&nbsp;digital&nbsp;collectibles&nbsp;that&nbsp;double&nbsp;as&nbsp;memebership&nbsp;cards&nbsp;for&nbsp;the&nbsp;Ezek&nbsp;Club.&nbsp;Each&nbsp;Phanta&nbsp;Bear&nbsp;has&nbsp;a&nbsp;unique&nbsp;set&nbsp;of&nbsp;traits&nbsp;and&nbsp;unlocks&nbsp;varying,&nbsp;unique&nbsp;levels&nbsp;of&nbsp;access&nbsp;and&nbsp;perks&nbsp;for&nbsp;its&nbsp;owner.&nbsp;Phanta&nbsp;Bear&nbsp;project&nbsp;was&nbsp;jointly&nbsp;launched&nbsp;by&nbsp;PHANTACi&nbsp;and&nbsp;Ezek
              </span>
              <div class="mod2 flex-col justify-center"><span class="info7">mint</span></div>
            </div>
          </div>
          <div class="block2 flex-col">
            <div class="box13 flex-row">
              <div class="box14">
                <span class="info10">Price</span>
                <span class="word9">：</span>
                <span class="word10">0.26</span>
                <span class="txt5"></span>
                <span class="txt6">ETH</span>
              </div>
            </div>
            <div class="box15 flex-row justify-between">
                <div class="main6 flex-col"><div class="group6 flex-col"></div></div>
                <span class="word11">1</span>
                <div class="main7 flex-col"><div class="group7 flex-col"></div></div>
            </div>
            <img class="pic1" referrerpolicy="no-referrer" src="images/floor_icon.png" />
            <span class="info11">Amount：</span>
          </div>
        </div>
      </div>
      <!-- mint end -->
    </div>
    <!-- profile start -->
    <div class="pcontent flex-col" v-show="showInfo.profile">
      <div class="player5 flex-col">
        <div class="player6 flex-col">
          <div class="player7 flex-col justify-center align-center">
            <div class="player8 flex-row">
              <div class="pmod6 flex-col"><div class="psection11 flex-col"></div></div>
              <span class="pinfo4">My&nbsp;Wallet</span>
              <div class="pmod7 flex-col">
                <div class="player9 flex-col" @click="close()"></div>
              </div>
            </div>
          </div>
          <div class="player10 flex-row">
            <img class="picon2" referrerpolicy="no-referrer" src="images/collected.png" alt="" />
            <!-- <div class="pgroup3 flex-col"></div> -->
            <img class="pgroup3" referrerpolicy="no-referrer" src="images/created.png" alt="" />
            <img class="plabel2" referrerpolicy="no-referrer" src="images/favorited.png" alt="" />
          </div>
          <div class="player11 flex-row">
            <img class="plabel3" referrerpolicy="no-referrer" src="images/collected_gray.png" alt="" />
            <span class="pword7">collected</span>
            <img class="picon3" referrerpolicy="no-referrer" src="images/created_gray.png" alt="" />
            <span class="pword8">created</span>
            <img class="picon3" referrerpolicy="no-referrer" src="images/favorited_gray.png" alt="" />
            <span class="pword9">favorited</span>
          </div>
          <div class="player12 flex-col"></div>
          <div class="player13 flex-col"></div>
          <div class="player14 flex-container">
            <div class="pblock4">
              <div class="player17 flex-col">
                <img class="pimg1" referrerpolicy="no-referrer" src="images/nft_example001.png" alt="" />
              </div>
            </div>
            <div class="pblock4">
              <div class="player17 flex-col">
                <img class="pimg1" referrerpolicy="no-referrer" src="images/nft_example002.png" alt="" />
              </div>
            </div>
            <div class="pblock4">
              <div class="player17 flex-col">
                <img class="pimg1" referrerpolicy="no-referrer" src="images/nft_example003.png" alt="" />
              </div>
            </div>
            <div class="pblock4">
              <div class="player17 flex-col">
                <img class="pimg1" referrerpolicy="no-referrer" src="images/nft_example004.png" alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- profile end -->
    <!-- game info start https://elevenzhou.github.io/Space/ -->
    <Game :url="gameConfig.gameUrl" />
    <!-- game info end -->
  </main>
</template>

<script>
import Game from '@/components/Game.vue'
export default {
  name: 'Navigator',
  components: {
    Game
  },
  data () {
    // initial data
    return {
      // 基础配置
      baseConfig: {
        lang_001: 'Total Floor',
        lang_002: 'Search',
        lang_003: 'GO',
        lang_004: 'My Floor',
        lang_005: 'Following',
        lang_006: 'Followed',
        lang_007: 'Hot',
        lang_008: 'Mint',
        lang_009: 'Room',
        lang_010: 'Avatar',
        lang_011: 'Not \n open'
      },
      gameConfig: {
        total: 10000,
        gameUrl: 'https://elevenzhou.github.io/Space/'
      },
      url: window.location.href ? window.location.href : '',
      lang: 'en',
      // 全局数据
      globalInfo: {
        runUpTime: '2019-08-15'
      },
      isShow: true,
      showInfo: {
        mint: false,
        hot: false,
        profile: false
      },
      playerInfo: {
        metamask: '',
        address: '',
        isLogin: false, // 是否登录
        status: 0 // 登录状态值 0: metamask未登录, 1: 获得钱包账号，但游戏数据未返回, 2: 已获取游戏数据 3:已成功注册
      }
    }
  },
  props: {
    msg: String
  },
  methods: {
    navi () {
      console.log('[navigator] navi ', this.$Dapp)
    },
    login () {
      const _that = this
      console.log('[Main] login ', _that.$Dapp)
      _that.$Dapp.connect()
      _that.playerInfo.address = _that.$Dapp.Bridges.ethereum.selectedAddress
      console.log('address ', _that.playerInfo.address)
    },
    hot () {
      const _that = this
      if (_that.showInfo.hot) {
        _that.showInfo.hot = false
      } else {
        _that.showInfo.hot = true
      }
      // 添加关闭倒计时
    },
    mint () {
      const _that = this
      if (_that.showInfo.mint) {
        _that.showInfo.mint = false
      } else {
        _that.showInfo.mint = true
      }
      // 添加关闭倒计时
    },
    displayProfile () {
      const _that = this
      _that.showInfo.profile = true
    },
    // 关闭个人信息窗口操作
    close () {
      const _that = this
      _that.showInfo.profile = false
    }
  },
  created () {
    console.log('[navigator] created start!')
    const _that = this
    console.log('[navigator] that ', _that.$Dapp)
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
