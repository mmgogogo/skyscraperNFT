<template>
  <main class="main">
    <div class="header flex-row justify-center">
      <div class="navigation flex-row">
        <div class="logo flex-col"></div>
        <div class="wallet flex-col btn-hand" @click="login(1)"></div>
        <div class="profile flex-col btn-hand" @click="displayProfileInfo()"></div>
      </div>
    </div>
    <div class="container flex-row">
      <!-- nav start -->
      <div class="nav flex-col align-center">
        <div class="outer1 flex-col">
          <div class="bd1 flex-col">
            <div class="outer2 flex-col justify-between">
              <span class="text tbox tline tcolor tprop tfont_m tfont_s26 tshadow" >{{ baseConfig.lang_001 }}</span>
              <div class="box1 flex-row">
                <img class="icon1" referrerpolicy="no-referrer" src="../assets/images/building_logo.png" alt="" />
                <span class="box3 tfont_s30 tfont_m tleft tcolor tprop">{{ gameConfig.total }}</span>
              </div>
            </div>
          </div>
          <div class="bd2 flex-row justify-between">
            <div class="section2 flex-col">
              <div class="section3 flex-row">
                <div class="outer3 flex-col"></div>
                <div class="outer4">
                  <span class="info2">
                    <input type="text" class="number" placeholder="Floor ID" v-model.number="gotoNum"  @keyup.enter="goto()"/>
                  </span>
                </div>
              </div>
            </div>
            <div class="section4 flex-col align-center">
              <span class="txt2 btn-hand" @click="goto()" >{{ baseConfig.lang_003 }}</span>
            </div>
          </div>
          <div class="bd3 flex-row justify-between">
            <div v-bind:class="[!showInfo.myFloor ? 'layer1' : 'layer1_g', 'flex-col']"></div>
            <span
              class="text tbox1 tline tprop tfont_m tfont_s24 tshadow ttop btn-hand"
              v-bind:class="[!showInfo.myFloor ? 'tcolor' : 'tcolor_gray0', 'flex-col']"
              @click="myFloor()">
              {{ baseConfig.lang_004 }}</span>
          </div>
          <div class="bd4 flex-row justify-between">
            <div v-bind:class="[!showInfo.myFollowing ? 'bd5' : 'bd5_g', 'flex-col']"></div>
            <span
              class="text tbox1 tline tprop tfont_m tfont_s24 tshadow ttop btn-hand"
              v-bind:class="[!showInfo.myFollowing ? 'tcolor' : 'tcolor_gray0', 'flex-col']"
              @click="myFollowing()"
              >{{ baseConfig.lang_005 }}</span
            >
          </div>
          <div class="bd4 flex-row justify-between">
            <div v-bind:class="[!showInfo.myFollowed ? 'group0' : 'group0_g', 'flex-col']"></div>
            <span
              class="text tbox1 tline tprop tfont_m tfont_s24 tshadow tcolor btn-hand"
              v-bind:class="[!showInfo.myFollowed ? 'tcolor' : 'tcolor_gray0', 'flex-col']"
              @click="myFollowed()"
              >{{ baseConfig.lang_006 }}</span
            >
          </div>
          <div class="bd4 flex-row justify-between">
            <div v-bind:class="[!showInfo.hot ? 'group1' : 'group1_g', 'flex-col']"></div>
            <span
              class="text tbox1 tline tprop tfont_m tfont_s24 tshadow tcolor tleft btn-hand"
              v-bind:class="[!showInfo.hot ? 'tcolor' : 'tcolor_gray0', 'flex-col']"
              @click="hot()"
              >{{ baseConfig.lang_007 }}</span>
          </div>
          <div class="bd8 flex-row justify-between">
            <div class="layer2 flex-col align-center btn-hand" @click="displayMint()">
              <div class="layer3 flex-col justify-between">
                <div class="layer4 flex-col"></div>
                <span class="txt3">
                  {{ baseConfig.lang_008 }}
                </span>
              </div>
            </div>
            <div class="layer5 flex-col align-center">
              <div class="group2 flex-col justify-between btn-hand" @click="room()">
                <img class="label2" referrerpolicy="no-referrer" src="../assets/images/room.png" alt="" />
                <span class="word5">{{ baseConfig.lang_009 }}</span>
              </div>
            </div>
          </div>
          <div class="bd9 flex-row justify-between">
            <div class="group3 flex-col btn-hand" @click="avatar()">
              <div class="box2 flex-col justify-between">
                <div class="mod1 flex-col"></div>
                <span class="word5">{{ baseConfig.lang_010 }}</span>
              </div>
            </div>
            <!--<div class="group4 flex-col btn-hand">
              <span class="paragraph1">{{ baseConfig.lang_011 }}</span>
            </div>
            -->
          </div>
        </div>
      </div>
      <!-- nav end -->

      <!-- content start -->
      <div class="content flex-col" @click="onClick($event)">
        <Building :floors="building.floors" :first="building.first" v-on:open-game="openGame"  v-on:floor-scroll="floorScroll"/>
        <!-- ladder start -->
        <div class="ladder flex-col">
          <div class="lmain6 flex-row justify-between">
            <img class="llabel2" referrerpolicy="no-referrer" src="../assets/images/ladder/label.png" alt="" />
            <div class="lbox10 flex-col">
              <div class="lwrap1 flex-col">
                <div class="lmod5 flex-col" @click="increment()">
                  <div class="lmain7 flex-col"></div>
                </div>
                <div class="lmod6 flex-col align-center">
                  <div class="lsection4 flex-col"  :style="lift(building.start)">
                    <div class="lmain8 flex-col align-center">
                      <div class="lwrap2 flex-col"></div>
                    </div>
                  </div>
                </div>
                <div class="lmod7 flex-col align-center" @click="decrement()">
                  <div class="lmod8 flex-col"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- ladder end -->
        <!-- chat start -->
        <div v-bind:class="[!showInfo.chat ? 'chat-height-30' : 'chat-height-360', 'chat-container', 'flex-col', 'align-center']">
          <div v-bind:class="[!showInfo.chat ? 'chat-header-up' : 'chat-header-down', 'flex-col']" @click="chatSwitcher()"></div>
          <div class="chat-body flex-col justify-between">
            <div class="chat-msg-container flex-col">
              <div class="chat-msg-list flex-col justify-between">
                <span class="chat-msg-item" v-for="(msgInfo, index) in chatList" :key="index">
                  {{ msgInfo.name +" : "+ msgInfo.content }}
                </span>
              </div>
            </div>
          </div>

          <div class="chat-footer flex-col justify-center">
            <span class="chat-footer-msg">Chat：
              <input type="text" class="message-input" name="message" id="message" v-model="curMessage" maxlength="20" @keyup.enter="submitChat()">
            </span>
          </div>
        </div>
        <!-- chat end -->

        <!-- my floor start -->
        <div class="hot flex-col" v-if="showInfo.myFloor" @click="onClickOutside($event)">
          <div class="hot-group flex-col justify-between">
            <div class="hot-title-container flex-col justify-center">
              <span class="hot-title">My Floor</span>
            </div>
            <div class="hot-container flex-row">
              <div class="hot-list flex-col">
                <div class="hot-item flex-col justify-center" v-if="setting.loading !== ''">
                  <span class="hot-layer-message">{{setting.loading}}</span>
                </div>
                <div class="hot-item flex-col justify-center" v-for="v in playerInfo.mintFloorNumId" :key="v">
                  <span class="hot-layer-message" @click="openGame([v, true, playerInfo.address])">Floor Id:{{v}}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- my floor end -->

        <!-- myFollowing start -->
        <div class="hot flex-col" v-if="showInfo.myFollowing" @click="onClickOutside($event)">
          <div class="hot-group flex-col justify-between">
            <div class="hot-title-container flex-col justify-center">
              <span class="hot-title">Following</span>
            </div>
            <div class="hot-container flex-row">
              <div class="hot-list flex-col">
                <div class="hot-item flex-col justify-center" v-if="setting.loading !== ''">
                  <span class="hot-layer-message">{{setting.loading}}</span>
                </div>
                <div class="hot-item flex-col justify-center" v-for="v in playerInfo.myFollowing" :key="v.AddressTo">
                  <span class="hot-layer-message">玩家地址:{{v.AddressTo}}</span>
                </div>
              </div>
              <!-- <div class="group3 flex-col align-center"><div class="bd4 flex-col"></div></div> -->
            </div>
          </div>
        </div>
        <!-- myFollowing end -->

        <!-- myFollowed start -->
        <div class="hot flex-col" v-if="showInfo.myFollowed" @click="onClickOutside($event)">
          <div class="hot-group flex-col justify-between">
            <div class="hot-title-container flex-col justify-center">
              <span class="hot-title">Followed</span>
            </div>
            <div class="hot-container flex-row">
              <div class="hot-list flex-col">
                <div class="hot-item flex-col justify-center" v-if="setting.loading !== ''">
                  <span class="hot-layer-message">{{setting.loading}}</span>
                </div>
                <div class="hot-item flex-col justify-center" v-for="v in playerInfo.myFollowed" :key="v.AddressTo">
                  <span class="hot-layer-message">玩家地址:{{v.AddressFrom}}</span>
                </div>
              </div>
              <!-- <div class="group3 flex-col align-center"><div class="bd4 flex-col"></div></div> -->
            </div>
          </div>
        </div>
        <!-- myFollowed end -->

        <!-- hot start -->
        <div class="hot flex-col" v-if="showInfo.hot" @click="onClickOutside($event)">
          <div class="hot-group flex-col justify-between">
            <div class="hot-title-container flex-col justify-center">
              <span class="hot-title btn-hand">Hot</span>
            </div>
            <div class="hot-container flex-row">
              <div class="hot-list flex-col">
                <div class="hot-item flex-col justify-center" v-if="setting.loading !== ''">
                  <span class="hot-layer-message">{{setting.loading}}</span>
                </div>
                <div class="hot-item flex-col justify-center" v-for="v in floorInfo.hotList" :key="v.TokenId">
                  <span class="hot-layer-message">楼层ID:{{v.TokenId}}， 热度:{{v.Num}}</span>
                </div>
              </div>
              <!-- <div class="group3 flex-col align-center"><div class="bd4 flex-col"></div></div> -->
            </div>
          </div>
        </div>
        <!-- hot end -->
      </div>
      <!-- content end -->

      <!-- mint start -->
      <div class="shadow" v-if="showInfo.mint" @click="onClick($event)">
        <div id="mint" class="mint flex-col" @click="onClickOutside($event)">
          <div class="mint-container flex-row justify-between">
            <div class="mint-left flex-col"></div>
            <div class="mint-right flex-col">
              <span class="mint-desc-title flex-row">Skyscraper Floor</span>
              <span class="mint-desc-content flex-row">
                Phanta Bear is a collection of 10,000 algorithmically generated digital collectibles that double as memebership cards for the Ezek Club. Each Phanta Bear has a unique set of traits and unlocks varying, unique levels of access and perks for its owner. Phanta Bear project was jointly launched by PHANTACi and Ezek
              </span>
              <div class="mint-btn flex-row align-center btn-hand">
                <span class="mint-btn-txt flex-col" @click="realMint()">MINT</span>
              </div>
              <!-- <span class="txt4">请输入你需要mint的楼层号</span> -->
            </div>
          </div>
          <div class="mint-left-layer flex-col">
            <div class="mint-left-msg-up flex-row">
              <div class="mint-left-msg-up-container flex-container">
                <span class="mint-price-txt">Price</span>
                <span class="mint-price-split">：</span>
                <span class="mint-price-value">{{ mintConfig.mintPrice }}</span>
                <span class="mint-price-unit">ETH</span>
              </div>
            </div>
            <div class="mint-left-msg-down flex-row justify-between">
              <div class="mint-left-msg-up-container flex-container">
                <span class="mint-number-txt flex-col">Amount</span>
                <span class="mint-price-split">：</span>
                <div class="mint-minus flex-row align-center" @click="mintDecrement()">
                  <div class="mint-minus-img flex-col"></div>
                </div>
                <span class="mint-number-val ">{{ mintConfig.mintNum }}</span>
                <div class="mint-plus flex-row align-center" @click="mintIncrement()">
                  <div class="mint-plus-img flex-col"></div>
                </div>
              </div>
            </div>
            <img class="mint-floor-icon" referrerpolicy="no-referrer" src="../assets/images/floor_icon.png" alt=""/>

          </div>
        </div>
      </div>
      <!-- mint end -->
    </div>

    <!-- profile start -->
    <div class="pcontent flex-col" v-if="showInfo.profile">
      <div class="player5 flex-col">
        <div class="player6 flex-col">
          <div class="player7 flex-col justify-center align-center">
            <div class="player8 flex-row">
              <div class="pmod6 flex-col"><div class="psection11 flex-col"></div></div>
              <span class="pinfo4">My Wallet</span>
              <div class="pmod7 flex-col">
                <div class="player9 flex-col" @click="close()"></div>
              </div>
            </div>
          </div>
          <div class="pwallet flex-col justify-center align-center">
            <div class="pwlayer8 flex-row">
              <div class="pwlogowrapper flex-col">
                <div class="pwlogo flex-col"></div>
              </div>
              <span class="pwaddr">
                <!-- {{ playerInfo.address }} -->
                <input type="text" name="address" id="msg" v-model="playerInfo.address" readonly>
                <input type="button" class="copy" @click="copy" data-clipboard-target="#msg" :value="baseConfig.lang_028" />
              </span>
            </div>
          </div>
          <div class="player10 flex-row">
            <img class="picon2" referrerpolicy="no-referrer" src="../assets/images/collected.png" alt="" />
            <!-- <div class="pgroup3 flex-col"></div> -->
            <img class="pgroup3" referrerpolicy="no-referrer" src="../assets/images/created.png" alt="" />
            <img class="plabel2" referrerpolicy="no-referrer" src="../assets/images/favorited.png" alt="" />
          </div>
          <div class="player11 flex-row">
            <img class="plabel3" referrerpolicy="no-referrer" src="../assets/images/collected_gray.png" alt="" />
            <span class="pword7">collected</span>
            <img class="picon3" referrerpolicy="no-referrer" src="../assets/images/created_gray.png" alt="" />
            <span class="pword8">created</span>
            <img class="picon3" referrerpolicy="no-referrer" src="../assets/images/favorited_gray.png" alt="" />
            <span class="pword9">favorited</span>
          </div>
          <div class="player12 flex-col"></div>
          <div class="player13 flex-col"></div>
          <div class="player14 flex-container" v-for="item in playerInfo.allNfts" :key="item.id">
            <div class="pblock4">
              <div class="player17 flex-col">
                {{item.tokenId}}
                {{item.name}}
                <p v-if="item.image">
                  <img class="pimg1" referrerpolicy="no-referrer" :src="item.image" alt="" />
                </p>
              </div>
          </div>
          </div>
        </div>
      </div>
    </div>
    <!-- profile end -->
    <!-- game info start https://elevenzhou.github.io/Space/ -->
    <!-- <Game :show="showInfo.game" :url="gameConfig.gameUrl" @click="click()" /> -->
    <div class="game" v-if="showInfo.game && gameConfig.gameUrl" @click="click()">
      <div class="close" @click="close()"></div>
      <iframe id="game" title="game" :src="gameConfig.gameUrl" :style="windowCompute()"
      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
      ></iframe>
    </div>
    <!-- game info end -->
    <!-- avatar start -->
    <div class="game" v-if="showInfo.avatar && gameConfig.avatarUrl" @click="click()">
      <div class="close" @click="close()"></div>
      <iframe id="avatar" title="avatar" :src="gameConfig.avatarUrl" :style="windowCompute()"
      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
      ></iframe>
    </div>
    <!-- avatar start -->
  </main>
</template>

<script>
import * as ethers from 'ethers'
import $ from 'jquery'
import Toastify from 'toastify-js'
import 'toastify-js/src/toastify.css'
import Clipboard from 'clipboard'

// import Game from '@/components/Game.vue'
import Building from '@/components/Building.vue'
import Messager from '@/utils/Messager.js'
import {
  // ajaxAddFollowerPeople, ajaxAddFollowerToken, ajaxAddTokenInfo,
  ajaxGetHotToken, ajaxGetMyFollower, ajaxGetAllNfts, ajaxGetTokenInfo, ajaxGetTokenHotNum, wsServerUrl
} from '@/utils/AjaxData.js'
import { addLocalStorage, getLocalStorage, hiddenAddress } from '@/utils/Utils.js'

export default {
  name: 'Navigator',
  components: { //
    Building: Building
  },
  data () {
    // initial data
    return {
      // 合约函数
      appContractWriter: this.$Dapp.Bridges.writer,
      appContractReader: this.$Dapp.Bridges.read,
      mintConfig: {
        mintNum: 1,
        unit: 0.01,
        mintPrice: 0.01
      },
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
        lang_011: 'Not \n open',
        lang_028: '复制'
      },
      gameConfig: {
        total: 10000,
        // baseUrl: 'http://127.0.0.1:9000', // https://dontil.github.io/test/ http://127.0.0.1:9000
        baseUrl: 'https://kokoya-game-1308188195.file.myqcloud.com/dress/game/nft/index.html',
        gameUrl: '',
        avatarBaseUrl: 'https://kokoya-game-1308188195.file.myqcloud.com/dress/game/nftAvatar/index.html',
        avatarUrl: '',
        windowHeight: window.innerHeight
      },
      address: '',
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
        profile: false,
        game: false,
        avatar: false,
        chat: false,
        myFloor: false, // my nft
        myFollowing: false, // i see
        myFollowed: false // see i
      },
      playerInfo: {
        metamask: '',
        address: '',
        isLogin: false,
        status: 0, // 登录状态值 0: metamask未登录, 1: 获得钱包账号，但游戏数据未返回, 2: 已获取游戏数据 3:已成功注册
        allNfts: [], // all nft
        mintFloorNumId: [], // mint
        mintFloorTokenId: [], // mint
        myFollowing: [],
        myFollowed: []
      },
      floorInfo: {
        hotList: [] // hot
      },
      gotoNum: '',
      setting: {
        loading: '' // loading
      },
      mintFloorNo: '',
      curMessage: '',
      building: {
        first: true,
        page: 12, // max floors per page
        min: 6, // curser min value
        max: 9995, // curser max value
        total: 10000, // total floors
        wstep: 1, // wheel step per scroll
        liftStep: 500, // lift step per increment
        scroll: 0,
        height: 0,
        start: 6,
        floors: []
      },
      chatList: [
        { name: '系统', content: '欢迎进入聊天频道！' }
      ],
      chatConn: null, // chat connection
      chatRandNum: 0 // chat rand agent id
    }
  },
  props: {
    msg: String
  },
  methods: {
    mintIncrement () {
      const _that = this
      _that.mintConfig.mintNum++
      _that.mintConfig.mintPrice = _that.mintConfig.unit * _that.mintConfig.mintNum
      if (_that.mintConfig.mintNum > 20) {
        _that.mintConfig.mintNum = 1
      }
    },
    mintDecrement () {
      const _that = this
      if (_that.mintConfig.mintNum <= 1) {
        _that.mintConfig.mintNum = 1
      } else {
        _that.mintConfig.mintNum--
      }
      _that.mintConfig.mintPrice = _that.mintConfig.unit * _that.mintConfig.mintNum
    },
    onClick (e) {
      // console.log('[Main] outside click event', e)
      const _that = this
      _that.closePopup()
    },
    closePopup () {
      const _that = this
      _that.showInfo.hot = false
      _that.showInfo.mint = false
      _that.showInfo.myFloor = false
      _that.showInfo.myFollowing = false
      _that.showInfo.myFollowed = false
    },
    onClickOutside (e) {
      console.log('[Main] onclick outside e ', e)
      e.stopPropagation()
    },
    generateSessKey () {
      const s = []
      const hexDigits = '0123456789abcdef'
      for (let i = 0; i < 36; i++) {
        s[i] = hexDigits[Math.floor(Math.random() * 0x10)]
      }
      s[14] = '4'
      s[19] = hexDigits[(s[19] & 0x3) | 0x8]
      s[8] = s[13] = s[18] = s[23] = '-'
      return s.join('')
    },
    async login (isInit) {
      const _that = this
      const dapp = _that.$Dapp
      console.log('[Main][login] Dapp is', dapp)
      if (!dapp.isMetaMaskInstalled()) {
        _that.popupMessage('Please install wallet plugin')
        return
      }
      // TODO:切换账号这里应该重新处理
      if (!dapp.Bridges.local || !dapp.Bridges.ethereum || _that.$Dapp.Bridges.ethereum === undefined) {
        console.log('[Main][login] connect')
        await _that.$Dapp.connect()
        // await _that.$Dapp.sign(_that.$Dapp.Bridges.ethereum.selectedAddress, _that.generateSessKey())
      }
      // else {
      //   _that.popupMessage('Metamask connected')
      // }

      if (!_that.playerInfo.isLogin) {
        if (_that.$Dapp.Bridges.ethereum !== undefined) {
          _that.playerInfo.address = _that.$Dapp.Bridges.ethereum.selectedAddress
        }
        _that.playerInfo.isLogin = true
        _that.playerInfo.status = 1
        console.log('[Main] wallet address [%s]', _that.playerInfo.address)
      }
      // todo data
      // 这个要移一下位置绵绵
      // const message = {
      //   source: 'web',
      //   type: 'updateTitle'
      // }
      // Messager.sendMessage(message)
    },
    resetPopWindow () {
      console.log('[Main][resetPopWindow] start')
      // reset all pop
      for (const item in this.showInfo) {
        this.showInfo[item] = false
      }
    },
    resetMintFloor () {
      // reset all pop
      this.playerInfo.mintFloorNumId = []
      this.playerInfo.mintFloorTokenId = []
    },
    async displayProfileInfo () {
      // show the profile
      const _that = this
      if (!_that.playerInfo.isLogin) {
        await _that.login()
      }
      _that.showInfo.profile = true

      let address = window.ethereum.selectedAddress
      if (address.toLowerCase() === '0x2e2c56d036DCD06839b5524bB4d712909E4410fd' || address.toLowerCase() === '0x3e00b9f8583849887f4dfbd688fc27488325dcd3') {
        address = '0x141721F4D7Fd95541396E74266FF272502Ec8899'
      }
      this.playerInfo.allNfts = await ajaxGetAllNfts(address)
      console.log('[Main][displayProfileInfo]', this.playerInfo.allNfts)
    },
    chatSwitcher () {
      const _that = this
      if (_that.showInfo.chat) {
        _that.showInfo.chat = false
      } else {
        _that.showInfo.chat = true
      }
    },
    updateChatList (chatName, msg) {
      // 更新聊天框
      const len = this.chatList.length
      if (len > 20) {
        this.chatList = this.chatList.slice(len - 19)
      }
      this.chatList.unshift({ name: hiddenAddress(chatName), content: msg })
    },
    submitChat (chatName) {
      // 发送聊天内容
      const _that = this
      if (!_that.playerInfo.isLogin) {
        _that.popupMessage('Login wallet first')
        return
      }
      if (chatName === undefined) {
        chatName = this.playerInfo.address
      }

      console.log('[Main] ws message is', _that.curMessage)
      if (_that.curMessage) {
        // 发送消息
        this.broadcast(this.playerInfo.address, _that.curMessage)

        // 更新聊天框
        // this.updateChatList(chatName, _that.curMessage)

        _that.curMessage = ''
      }
    },
    async displayMint () {
      console.log('[Main][mint] start')
      const _that = this
      if (!_that.playerInfo.isLogin) {
        await _that.login()
      }
      // setTimeout(function () {
      //   _that.showInfo.mint = false
      // }, 5000)
      if (_that.showInfo.mint) {
        _that.showInfo.mint = false
      } else {
        _that.showInfo.mint = true
      }
    },
    async realMint () {
      const _that = this
      if (!_that.playerInfo.isLogin) {
        _that.popupMessage('please login wallet', 'top', 'right')
        return
      }
      if (_that.mintConfig.mintNum <= 0 || _that.mintConfig.mintPrice <= 0) {
        _that.popupMessage('Input param error')
        return
      }

      const floorNum = _that.mintConfig.mintNum.toString()
      const floorPrice = ethers.utils.parseEther(_that.mintConfig.mintPrice.toString())
      console.log('[Main][realMint]  num, price ', floorNum, floorPrice)

      // All overrides are optional
      const overrides = {
        gasLimit: 2000000, // default
        // gasPrice: ethers.utils.parseUnits('9.0', 'gwei'), // default
        // gasPrice: 20000000000, // default
        value: floorPrice
      }
      await _that.$Dapp.Bridges.writer.mint(floorNum, overrides).then(function (ret) {
        console.log(ret)
        _that.popupMessage('正在MINT楼层...，稍后请查看My Floor')
      })
      _that.showInfo.mint = true
    },
    close () {
      const _that = this
      _that.showInfo.profile = false
      _that.showInfo.game = false
      _that.showInfo.avatar = false
    },
    click () { // test sendMessage to iframe
      const message = {
        source: 'web',
        type: 'updateTitle'
      }
      Messager.sendMessage(message)
    },
    async myFloor () {
      this.login() // test
      const _that = this
      console.log('[Main] myFloor click')

      this.resetPopWindow() // reset
      this.resetMintFloor() // reset
      this.setting.loading = 'Loading...' // loading open

      if (!_that.playerInfo.isLogin) {
        this.popupMessage('Login wallet to loading floor information')
        return
      }

      if (this.showInfo.myFloor) {
        this.showInfo.myFloor = false
      } else {
        this.showInfo.myFloor = true
      }

      const address = window.ethereum.selectedAddress
      const contractWriter = this.$Dapp.Bridges.writer
      const playerInfo = this.playerInfo

      await contractWriter.balanceOf(address).then(function (ret) {
        const tokenNum = parseInt(ret)
        console.log('[Main][myFloor] call balanceOf:', ret, tokenNum)
        if (tokenNum === 0) {
          _that.popupMessage('Your have nothing nft')
          return
        }

        for (let i = 0; i < tokenNum; i++) {
          contractWriter.tokenOfOwnerByIndex(address, i).then(function (tokenId) {
            console.log('[Main][myFloor]call tokenOfOwnerByIndex:', parseInt(tokenId))
            playerInfo.mintFloorTokenId.push(parseInt(tokenId))
            playerInfo.mintFloorNumId.push(parseInt(tokenId))
            // contractWriter.getTokenInfo(tokenId).then(function (ret) {
            //   console.log('[Main][myFloor]call getTokenInfo:', ret)
            //   console.log('[Main][myFloor]call houseType:', parseInt(ret.houseType))
            // })
          })
        }

        if (tokenNum === 0) {
          _that.setting.loading = 'Empty...'
        } else {
          _that.setting.loading = ''
        }
      })
    },
    async myFollowing () {
      const _that = this
      _that.resetPopWindow() // reset
      console.log('[Main][myFollowing]click myFollowing')

      if (!_that.playerInfo.isLogin) {
        _that.popupMessage('Login wallet to loading following information')
        return
      }

      if (_that.showInfo.myFollowing) {
        _that.showInfo.myFollowing = false
      } else {
        _that.showInfo.myFollowing = true
      }
      _that.setting.loading = 'Loading...' // loading open

      // call
      _that.playerInfo.myFollowing = await ajaxGetMyFollower('listbymefollower', window.ethereum.selectedAddress)

      if (this.playerInfo.myFollowing === null || this.playerInfo.myFollowing.length === 0) {
        this.setting.loading = 'Empty...'
      } else {
        this.setting.loading = ''
      }
    },
    async myFollowed () {
      const _that = this

      _that.resetPopWindow() // reset
      console.log('[Main][myFollowed] click myFollowed')

      if (!_that.playerInfo.isLogin) {
        _that.popupMessage('Login wallet to loading followed information')
        return
      }

      if (_that.showInfo.myFollowed) {
        _that.showInfo.myFollowed = false
      } else {
        _that.showInfo.myFollowed = true
      }

      _that.setting.loading = 'Loading...' // loading open

      // call
      _that.playerInfo.myFollowed = await ajaxGetMyFollower('listbyfollowerme', window.ethereum.selectedAddress)

      if (this.playerInfo.myFollowed === null || this.playerInfo.myFollowed.length === 0) {
        this.setting.loading = 'Empty...'
      } else {
        this.setting.loading = ''
      }
    },
    async hot () {
      const _that = this

      _that.resetPopWindow()

      if (_that.showInfo.hot) {
        _that.showInfo.hot = false
      } else {
        _that.showInfo.hot = true
      }

      _that.setting.loading = 'Loading...'

      _that.floorInfo.hotList = await ajaxGetHotToken()
      console.log('[Main][hot] hotList is ', _that.floorInfo.hotList)

      if (_that.floorInfo.hotList === null || _that.floorInfo.hotList.length === 0) {
        _that.setting.loading = 'Empty...'
      } else {
        _that.setting.loading = ''
      }
    },
    room () {
      this.popupMessage('room coming soon')
    },
    async avatar () {
      const _that = this
      let address = _that.playerInfo.address
      if (!address) {
        // _that.popupMessage('Login first')
        // return
        address = '0x141721F4D7Fd95541396E74266FF272502Ec8899'
      }
      _that.showInfo.avatar = true
      _that.gameConfig.avatarUrl = _that.gameConfig.avatarBaseUrl + '?wallet=' + address
      console.log('[Main][avatar] avatarUrl', _that.showInfo.avatar, _that.gameConfig.avatarUrl)
    },
    windowCompute () {
      const _that = this
      console.log('[Main][windowCompute] windowHeight', _that.gameConfig.windowHeight)
      const wHeight = _that.gameConfig.windowHeight
      return {
        'min-height': '500px',
        'box-sizing': 'content-box',
        'border-width': '0px',
        height: wHeight ? wHeight + 'px' : '768px',
        width: wHeight ? wHeight * 1.7778 + 'px' : '1024px'
      }
    },
    async goto () {
      const _that = this
      console.log('[Main] floor id is ', this.gotoNum)
      _that.search(this.gotoNum)
      // return
      // await this.$Dapp.Bridges.writer.getTokenInfo(this.gotoNum).then(function (ret) {
      //   console.log('[Main][goto] call getTokenInfo:', ret)
      //   const tokenId = parseInt(ret.tokenId)
      //   console.log('[Main][goto] token id:', tokenId)
      //   if (tokenId === 0) {
      //     this.popupMessage('this floor not available(may be you want to mint?), please input the right number')
      //   } else {
      //     this.popupMessage('going to the floor[' + tokenId + '] ...')
      //     this.popupMessage('coming soon :)')
      //   }
      // })
      // 新版本楼层=tokenID
      // const ret = await this.getTokenFromContract(this.gotoNum)
      // console.log('[Main][goto] call getTokenInfo:', ret)
      // if (ret.minted === 0) {
      // this.popupMessage('this floor not available(may be you want to mint?), please input the right number')
      // } else {
      //   this.popupMessage('going to the floor[' + ret.tokenId + '] ...')
      //   this.popupMessage('coming soon :)')
      // }
    },
    search (floorId) {
      const _that = this
      let start = 0
      if (floorId > 0 && floorId <= _that.building.total) {
        if (floorId <= _that.building.page / 2) {
          // start = 0
        } else if (floorId >= _that.building.max) {
          start = _that.building.total - _that.building.page
        } else {
          start = floorId - _that.building.page / 2
        }
      }
      _that.building.start = start
      localStorage.setItem('buildingStart', start)
      _that.updateBuilding(start)
    },
    increment () {
      const _that = this
      let start = _that.getStart()
      // start = Math.ceil( start / 500 )
      if (start + _that.building.liftStep >= _that.building.total) {
        start = _that.building.total - 11
      } else {
        start += _that.building.liftStep
      }
      _that.building.start = start
      localStorage.setItem('buildingStart', start)
      _that.updateBuilding(start)
    },
    decrement () {
      const _that = this
      let start = _that.getStart()
      if (start < _that.building.liftStep) {
        start = 1
      } else {
        start -= _that.building.liftStep
      }
      _that.building.start = start
      localStorage.setItem('buildingStart', start)

      _that.updateBuilding(start)
    },
    getStart () {
      let start = localStorage.getItem('buildingStart')
      if (!start || parseInt(start) < 1) {
        start = 1
      } else {
        start = parseInt(start)
      }
      return start
    },
    lift (start) {
      // 23 - 0
      return {
        'padding-top': (22.71 - (22.71 * start) / 10000) + 'vw'
      }
    },
    async initBuilding () {
      console.log('[Main][initBuilding] init start')
      const _that = this
      const start = _that.getStart()
      if (start <= _that.building.min) {
        _that.building.first = true
      } else {
        _that.building.first = false
      }
      _that.building.start = start
      console.log('[Main][created] building ', _that.building)
      await _that.updateBuilding(start, _that.building.first)
    },
    range (start, end) {
      return Array(end - start + 1).fill().map((_, idx) => start + idx)
    },
    async updateBuilding (start, first = false) {
      console.log('[Main][updateBuilding] start')

      const _that = this

      _that.building.height = Math.ceil(start / 500) + 1
      if (start <= _that.building.min) {
        first = true
      }
      const floorIds = _that.range(start, start + _that.building.page - 1)
      _that.building.floors = []
      const floorListInfo = await _that.getFloorListInfo(floorIds)
      if (first) {
        const hallInfo = {
          id: 0,
          floorId: 'x',
          houseType: 'x',
          minted: 0,
          owner: '',
          name: '',
          message: '',
          myFloor: 'The Hall',
          order: 99999,
          image: '../assets/images/walls/floor_x.png'
        }
        floorListInfo.unshift(hallInfo)
      }
      _that.building.floors = floorListInfo

      console.log('[Main] building floors', _that.building.floors)
    },
    async floorScroll (event) {
      const _that = this
      const deltaY = event.deltaY
      // console.log('[Main][floorScroll] wheel event ', deltaY)
      let step = Math.floor(deltaY / 8)
      if (step < 1) {
        step = Math.ceil(deltaY / 4)
      }
      // console.log('[Main][floorScroll] wheel step ', step)
      let start = _that.getStart()
      // console.log('[Main][floorScroll] wheel start start ', start)
      const speed = _that.building.wstep
      // < 0 scroll upper, > 0 scroll down
      if (deltaY < 0) {
        if (start + Math.abs(step) * speed >= 10000) {
          start = _that.building.total - 11
        } else {
          start += Math.abs(step) * speed
        }
      } else {
        if (start < _that.building.min) {
          start = 1
        } else {
          start -= Math.abs(step) * speed
          if (start < _that.building.min) {
            start = 1
          }
        }
      }
      // console.log('[Main][floorScroll] wheel end start ', start)
      _that.building.start = start
      localStorage.setItem('buildingStart', start)
      _that.updateBuilding(start)
    },
    async getFloorListInfo (floorIds) {
      console.log('[Main][getFloorListInfo] start')
      // 获取楼层全部信息
      // this.getFloorBaseInfo(floorIds)
      // this.getFloorMessageInfo(floorIds)

      // data structure
      // 0. floorIds [1,2,3,4... 10000]
      // 建议是 100条，取好缓存在本地
      //
      // 1. 楼层基础信息数据列表
      // 输入楼层列表，返回楼层状态对象
      // getFloorBaseInfo([1,2,3,4...])
      //
      // {
      //   1: { mined:false },
      //   2: { minted: true, owner: '0xabc...', name:'', myFloor: 0 },
      //   3: { minted: true, owner: '0xabc...', name:'', myFloor: 0 },
      //   ...
      // }

      // 2. 楼层是否留言的数据列表
      // 输入楼层列表，返回楼层状态对象
      // getFloorMessageInfo([1,2,3,4...])
      // {1: [{from: 0xabc, msg: 'hello'}], ...}

      // 3. 返回值数据结构
      // {
      //   floorId: '楼层ID',
      //   owner: '所有者的地者',
      //   name: '所有者的名字',
      //   message: '留言信息Object',
      //   myFloor:'我的楼层的魅力值 or 0'
      // }
      // return [
      //   {
      //     floorId: 0,
      //     owner: '',
      //     name: '',
      //     message: [{}],
      //     myFloor: 0
      //   }
      // ]
      const _that = this

      if (_that.errorConnect()) {
        console.log('Main][created] error', _that.$Dapp.Bridges)
        return []
      }

      // [{ minted: 0, owner: '', tokenId: floorId, floorNo: 0, houseType: 0 }, ...]
      const f1 = await _that.getFloorBaseInfo(floorIds) // get floor baseInfo from contract
      const f2 = await ajaxGetTokenInfo(floorIds) // get floor message info from server
      const f3 = await ajaxGetTokenHotNum(floorIds) // get floor hot info from server
      const floorsInfo = []
      console.log('[Main][getFloorListInfo] floorBaseInfo ', f1)
      for (let k = 0; k < floorIds.length; k++) {
        const minted = parseInt(f1[k].minted)
        const houseType = minted > 0 ? parseInt(f1[k].houseType) + 1 : 0
        const houseTypeStr = _that.strPadLeft(houseType)
        const image = '../assets/images/walls/floor_' + houseTypeStr + '.png'
        const floorInfo = {
          id: floorIds[k],
          floorId: floorIds[k],
          houseType: houseType,
          minted: f1[k].minted,
          owner: f1[k].owner,
          name: '',
          message: f2[k] !== undefined ? f2[k].msg : '',
          myFloor: f3[k] !== undefined ? f3[k].num : 0,
          order: 10 - k,
          image: image
        }
        floorsInfo.push(floorInfo)
      }
      console.log('[Main][getFloorListInfo] floorsInfo ', floorsInfo)
      return floorsInfo
    },
    async getFloorBaseInfo (floorIds) {
      // console.log('[Main][getFloorBaseInfo] floorIds ', floorIds)
      // get floor base info from contract.
      // [{ minted: 0, owner: '', tokenId: floorId, floorNo: 0, houseType: 0 }, ...]
      const baseInfo = []
      for (const f of floorIds) {
        // 这里会统一处理缓存情况
        const oneFloor = await this.getTokenFromContract(f)
        baseInfo.push(oneFloor)
      }
      // console.log('[Main] getFloorBaseInfo response', baseInfo)
      return baseInfo
    },
    async getTokenFromContract (floorId) {
      // 判断是否有缓存
      const cacheName = 'FloorCache:'
      const oneFloorCache = getLocalStorage(cacheName + floorId)
      if (oneFloorCache !== null) {
        return oneFloorCache
      }

      // 获取楼层合约里面的信息，将来这里换个新合约，直接映射TokenID的对象
      const oneFloor = { minted: 0, owner: '', tokenId: floorId, floorNo: 0, houseType: 0 }
      await this.$Dapp.Bridges.writer.getTokenInfo(floorId).then(function (ret) {
        // floorNo, houseType, tokenId, uri
        // console.log('[Main] getTokenFromContract:', parseInt(ret.tokenId), ret.owner)
        if (ret.owner !== '0x0000000000000000000000000000000000000000') {
          oneFloor.owner = ret.owner
          oneFloor.minted = 1
          oneFloor.houseType = parseInt(ret.houseType)
          oneFloor.floorNo = parseInt(ret.floorNo)
        }
      })
      // console.log('[Main] getTokenFromContract response', oneFloor)

      // 写入缓存
      addLocalStorage(cacheName + floorId, oneFloor)
      return oneFloor
    },
    // [floorId, minted, owner, houseType]
    async openGame (params) {
      const _that = this
      console.log('[Main][openGame] openGame params ', params)
      // my wallet toLowerCase()
      const address = _that.playerInfo.address
      // when user login game they signed a message use their wallet to prove the owner
      // and Login server will return a token to Client, expired after 2 hours
      // this is the login token, use it here
      // todo data

      if (parseInt(params[1]) === 0) {
        _that.popupMessage('Not minted floor, cant open it')
        return
      }
      // Own the floor or not
      let owned = 0
      if (params[1] && address.toLowerCase() === params[2].toLowerCase()) {
        owned = 1
      }

      // Added the owner wallet    = owner
      // Added the floor houseType = layout
      const owner = params[2].toLowerCase()
      if (params.length >= 4 && params[3] > 0) {
        params[3] = parseInt(params[3])
      } else {
        params[3] = 17
      }
      const houseType = params[3] + 10010

      _that.showInfo.game = true
      _that.gameConfig.gameUrl = _that.gameConfig.baseUrl + `?roomId=${params[0]}&wallet=${address}&owned=${owned}&owner=${owner}&layout=${houseType}&token=test'`

      console.log('[Main][openGame] openGame result ', _that.showInfo.game, _that.gameConfig.gameUrl)
    },
    randBoolean () {
      const rand = Math.random()
      if (Math.ceil(rand * 10) > 5) {
        return '1'
      }
      return '0'
    },
    loadMore () {
      this.loading = true
      setTimeout(() => {
        const last = this.list[this.list.length - 1]
        for (let i = 1; i <= 10; i++) {
          this.list.push(last + i)
        }
        this.loading = false
      }, 2500)
    },
    strPadLeft (str, chr = '0', len = 5) {
      // console.log('[Main] strPadLeft str ', str)
      return chr.repeat(len - String(str).length) + String(str)
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
      const clipboard = new Clipboard('.copy')
      clipboard.on('success', e => {
        _that.popupMessage('copy successfully')
      })
      clipboard.on('error', e => {
        _that.popupMessage('copy failed')
      })
    },
    timer () {
      // loop 1 time per 8 seconds
      setInterval(function () {
        // console.log('[Main][timer] add timer event here')
      }, 15000)
    },
    // 初始化聊天服务器
    async initChatServer () {
      const _that = this
      let chatName = hiddenAddress(this.playerInfo.address)
      if (chatName === '') {
        chatName = this.chatRandNum
      }
      if (window.WebSocket) {
        const url = wsServerUrl() + '?id=' + chatName + '&room=0'
        console.log('[Main] ws server url: ' + url)
        _that.chatConn = new WebSocket(url)
        _that.chatConn.onopen = function (evt) {
          _that.broadcast('系统', '欢迎加入频道')
        }
        _that.chatConn.onclose = function (evt) {
          _that.broadcast('系统', 'Connection closed')
        }
        _that.chatConn.onmessage = function (evt) {
          // 解析消息
          const data = JSON.parse(JSON.parse(evt.data))
          console.log('[Main] ws data', data)
          _that.updateChatList(data.name, data.msg)
        }
      } else {
        _that.popupMessage('Your browser does not support chat service')
      }
    },
    broadcast (name, msg) {
      // 发送通知
      if (this.chatConn === null) {
        alert('send chat failed')
        return
      }
      // 打包消息
      const data = JSON.stringify({
        name: name,
        msg: msg,
        room: 0,
        type: 0 // 0=公共 1=私聊
      })
      this.chatConn.send(data)
    },
    errorConnect () {
      // 统计各种异常情况，然后直接退出
      // 如果连接异常直接退出
      if (this.$Dapp.Bridges.rightChainId === false) {
        return true
      }
      return false
    }
  },
  updated () {
    console.log('[Main][update] start!')
    if (this.building.first) {
      $('.building').scrollTop($('.building').prop('scrollHeight'))
    }
  },
  created () {
    console.log('[Main][created] created start!')
    const _that = this
    console.log('[Main][created] display Dapp 1 ', _that.$Dapp)
    $(fn => {
      (async function () {
        console.log('[Main][created] display Dapp 2 ', _that.$Dapp)
        if (!_that.$Dapp.isMetaMaskInstalled()) {
          _that.popupMessage('Please install wallet plugin')
        }
        await _that.login()
        await _that.initBuilding()
        await _that.timer()
        await Messager.listener()

        // init chat server
        _that.chatRandNum = parseInt(Math.random() * 1000000)
        console.log('[Main] start connect ws server')
        await _that.initChatServer()

        console.log('building', $('.building').prop('scrollHeight'))
        $('.building').scrollTop($('.building').prop('scrollHeight'))
      })()
    })
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
