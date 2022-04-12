<template>
  <main class="main">
    <div class="header flex-col justify-center">
      <div class="navigation flex-row">
        <div class="logo flex-col"></div>
        <div class="profile flex-col btn-hand btn-margin-1" @click="displayProfileInfo('account')"></div>
        <div v-bind:class="[playerInfo.status >= 1 ? '' : 'animation', 'wallet flex-col btn-hand btn-margin-2 justify-center']" @click="selectAWallet()">
          <span class="wallet-txt flex-row">{{playerInfo.status >= 1 ? getWallet() : 'Connect Wallet'}}</span>
        </div>
        <!-- <div class="wallet flex-col btn-hand" @click="login(1)"></div>
        <div class="profile flex-col btn-hand" @click="displayProfileInfo()"></div> -->
      </div>
    </div>
    <div class="building-container flex-row">
      <!-- nav start -->
      <div class="nav flex-col align-center">
        <div class="outer1 flex-col">
          <div class="bd1 flex-row justify-center">
            <div class="outer2 flex-col align-center">
              <span class="text tbox tline tcolor tprop tfont_m tfont_s26 tshadow tcenter" >{{ baseConfig.lang_001 }}</span>
              <div class="box1 flex-row justify-center">
                <img class="icon1 flex-col" referrerpolicy="no-referrer" src="../assets/images/building_logo.png" alt="" />
                <span class="box3 tfont_s30 tfont_m tcenter tcolor tprop flex-col">{{ globalInfo.total }}</span>
              </div>
            </div>
          </div>
          <div class="bd2 flex-row justify-center">
            <div class="search-container flex-row justify-between">
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
              <div class="section4 flex-col justify-center">
                <span class="txt2 btn-hand flex-col" @click="goto()" >{{ baseConfig.lang_003 }}</span>
              </div>
            </div>
          </div>
          <div class="" v-bind:class="[!showInfo.floor ? '' : 'bgcolor_gray', 'nav-item flex-row justify-center nav-first']">
            <div class="nav-container flex-row align-center">
              <div v-bind:class="['layer1', 'flex-col', 'nav-margin']"></div>
              <span
                class="text tbox1 tline tprop tfont_m tfont_s24 tshadow btn-hand"
                v-bind:class="['tcolor', 'flex-col']"
                @click="myFloor()">
                {{ baseConfig.lang_004 }}</span>
            </div>
          </div>
          <div v-bind:class="[!showInfo.myFollowing ? '' : 'bgcolor_gray', 'nav-item flex-row justify-center nav-others']">
            <div class="nav-container flex-row align-center">
              <div v-bind:class="['bd5', 'flex-col', 'nav-margin']"></div>
              <span
                class="text tbox1 tline tprop tfont_m tfont_s24 tshadow btn-hand"
                v-bind:class="['tcolor', 'flex-col']"
                @click="myFollowing()"
                >{{ baseConfig.lang_005 }}</span>
              </div>
          </div>
          <div v-bind:class="[!showInfo.myFollowed ? '' : 'bgcolor_gray', 'nav-item flex-row justify-center nav-others']">
            <div class="nav-container flex-row align-center">
              <div v-bind:class="['group0', 'flex-col', 'nav-margin']"></div>
              <span
                class="text tbox1 tline tprop tfont_m tfont_s24 tshadow tcolor btn-hand"
                v-bind:class="['tcolor', 'flex-col']"
                @click="myFollowed()"
                >{{ baseConfig.lang_006 }}</span>
              </div>
          </div>
          <div v-bind:class="[!showInfo.hot ? '' : 'bgcolor_gray', 'nav-item flex-row justify-center nav-others']">
            <div class="nav-container flex-row align-center">
              <div v-bind:class="['group1', 'flex-col', 'nav-margin']"></div>
              <span
                class="text tbox1 tline tprop tfont_m tfont_s24 tshadow tcolor tleft btn-hand"
                v-bind:class="['tcolor', 'flex-col']"
                @click="hot()"
                >{{ baseConfig.lang_007 }}</span>
              </div>
          </div>
          <div class="button-list flex-row justify-center button-list-first">
            <div class="btn-container justify-between">
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
          </div>
          <div class="button-list flex-row justify-center button-list-others">
            <div class="btn-container justify-between">
              <div class="group3 flex-col btn-hand" @click="avatar()">
                <div class="box2 flex-col justify-between">
                  <div class="mod1 flex-col"></div>
                  <span class="word5">{{ baseConfig.lang_010 }}</span>
                </div>
              </div>
              <div class="group4 flex-col btn-hand">
                <span class="paragraph1">{{ baseConfig.lang_011 }}</span>
              </div>
          </div>
          </div>
        </div>
      </div>
      <!-- nav end -->

      <!-- content start -->
      <div class="content flex-col" @click="onClick($event)">
        <Building :floors="building.floors" :first="building.first" :profileAddr="playerInfo.address" v-on:open-game="openGame"  v-on:floor-scroll="floorScroll"/>
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
        <!---->
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
              <input type="text" class="message-input" name="message" id="message" v-model="curMessage" maxlength="20" @focus="chatSwitcher(true)" @keyup.enter="submitChat()">
            </span>
          </div>
        </div>
        
        <!-- chat end -->

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
          <div class="mint-close cursor-pointer" @click="closePopup()">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true" width="24" height="24" class="text-high-emphesis">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
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
          <!-- <div class="pwallet flex-col justify-center align-center">
            <div class="pwlayer8 flex-row">
              <div class="pwlogowrapper flex-col">
                <div class="pwlogo flex-col"></div>
              </div>
              <span class="pwaddr">
                <input type="text" name="address" id="msg" v-model="playerInfo.address" readonly>
                <input type="button" class="copy" @click="copy" data-clipboard-target="#msg" :value="baseConfig.lang_028" />
              </span>
            </div>
          </div> -->
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
          <div class="player14 flex-container">
            <div class="pblock4" v-for="item in playerInfo.allNfts" :key="item.id">
              <div class="player17 flex-col" v-if="item.image">
                <!-- {{item.tokenId}} -->
                <!-- {{item.name}} -->
                <!-- <p v-if="item.image"> -->
                <img class="pimg1" referrerpolicy="no-referrer" :src="item.image" alt="" />
                <!-- </p> -->
              </div>
            </div>
            <div class="pblock4">
              <div class="player17 flex-col">
                <img class="pimg1" referrerpolicy="no-referrer" src="../assets/images/nft_example001.png" alt="" />
              </div>
            </div>
            <div class="pblock4">
              <div class="player17 flex-col">
                <img class="pimg1" referrerpolicy="no-referrer" src="../assets/images/nft_example002.png" alt="" />
              </div>
            </div>
            <div class="pblock4">
              <div class="player17 flex-col">
                <img class="pimg1" referrerpolicy="no-referrer" src="../assets/images/nft_example003.png" alt="" />
              </div>
            </div>
            <div class="pblock4">
              <div class="player17 flex-col">
                <img class="pimg1" referrerpolicy="no-referrer" src="../assets/images/nft_example004.png" alt="" />
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
    <Account :show="showInfo.account" v-on:close-account="closeAccount" :profileAddr="playerInfo.address" />
    <MyFloorList :show="showInfo.floor" :loading="setting.loading" :floors="playerInfo.mintFloorNumId" v-on:open-game="openGame" v-on:close-floors="closeFloors" />
    <Game :show="showInfo.game" :url="gameConfig.gameUrl" v-on:close-game="closeGame" />
    <!-- avatar start -->
    <Login :show="showInfo.login" :mmpExists="globalInfo.metamaskExists" v-on:update-profile="updateProfile" v-on:close-login="closeLogin"/>
  </main>
</template>

<script>
import * as ethers from 'ethers'
import $ from 'jquery'
import Toastify from 'toastify-js'
import 'toastify-js/src/toastify.css'
import Clipboard from 'clipboard'

import Building from '@/components/Building.vue'
import Login from '@/components/Login.vue'
import Game from '@/components/Game.vue'
import MyFloorList from '@/components/MyFloorList.vue'
import Account from '@/components/Account.vue'
import Messager from '@/utils/Messager.js'
import {
  // ajaxAddFollowerPeople, ajaxAddFollowerToken, ajaxAddTokenInfo,
  ajaxGetHotToken, ajaxGetMyFollower, ajaxGetAllNfts, ajaxGetTokenInfo, ajaxGetTokenHotNum, wsServerUrl, ajaxGetUserInfo
} from '@/utils/AjaxData.js'
import { addLocalStorage, getLocalStorage, hiddenAddress } from '@/utils/Utils.js'

export default {
  name: 'Navigator',
  components: {
    Building: Building,
    Login: Login,
    Game: Game,
    MyFloorList: MyFloorList,
    Account: Account
  },
  data () {
    // initial data
    return {
      // 合约函数
      appContractWriter: this.$Dapp.Bridges.writer,
      appContractReader: this.$Dapp.Bridges.read,
      signature: '',
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
        lang_011: 'DAO',
        lang_028: '复制'
      },
      gameConfig: {
        // baseUrl: 'http://127.0.0.1:9000', // https://dontil.github.io/test/ http://127.0.0.1:9000
        baseUrl: 'https://kokoya-game-1308188195.file.myqcloud.com/dress/game/nft/index.html',
        gameUrl: '',
        avatarBaseUrl: 'https://kokoya-game-1308188195.file.myqcloud.com/dress/game/nftAvatar/index.html',
        windowHeight: window.innerHeight
      },
      address: '',
      url: window.location.href ? window.location.href : '',
      lang: 'en',
      // 全局数据
      globalInfo: {
        total: 10000,
        runUpTime: '2019-08-15',
        metamaskExists: false
      },
      isShow: true,
      showInfo: {
        mint: false,
        hot: false,
        profile: false,
        game: false,
        chat: false,
        login: false,
        floor: false,
        account: false,
        myFloor: false, // my nft
        myFollowing: false, // i see
        myFollowed: false // see i
      },
      playerInfo: {
        name: '',
        chainId: '',
        address: '',
        signature: '',
        isLogin: false,
        status: 0, // 登录状态值 0: metamask未登录, 1: 登录metamask成功 2: 获取name数据成功
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
        page: 15, // max floors per page
        min: 4, // curser min value
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
      chatRandNum: 0, // chat rand agent id
      chatName: ''
    }
  },
  props: {
    msg: String
  },
  methods: {
    mintIncrement () {
      const _that = this
      if (_that.mintConfig.mintNum >= 2) {
        return
      }
      _that.mintConfig.mintNum++
      _that.mintConfig.mintPrice = _that.mintConfig.unit * _that.mintConfig.mintNum
    },
    mintDecrement () {
      const _that = this
      if (_that.mintConfig.mintNum <= 1) {
        return
      }
      _that.mintConfig.mintNum--
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
    selectAWallet () {
      console.log('[Main][selectAWallet] start ', this.showInfo.login)
      const _that = this
      if (_that.playerInfo.status < 1) {
        _that.showInfo.login = true
      } else if (_that.playerInfo.status >= 1) {
        _that.displayProfileInfo()
      }
      console.log('[Main][selectAWallet] end ', this.showInfo.login)
    },
    async initProvider () {
      const _that = this
      await _that.$Dapp.connectProvider()
    },
    getWallet () {
      const _that = this
      if (_that.playerInfo.address) {
        const address = _that.playerInfo.address
        return address.substr(0, 4) + '...' + address.substr(-4)
      }
      return ''
    },
    async login () {
      const _that = this
      const dapp = _that.$Dapp
      console.log('[Main][login] Dapp is', dapp)

      // if (!dapp.isMetaMaskInstalled()) {
      //   _that.popupMessage('Please install wallet plugin')
      //   return
      // }
      // TODO:切换账号这里应该重新处理
      // if (!dapp.Bridges.local || !dapp.Bridges.ethereum || dapp.Bridges.ethereum === undefined) {
      //   console.log('[Main][login] connect')
      //   await _that.$Dapp.connectWallet()
      //   // await _that.$Dapp.sign(_that.$Dapp.Bridges.ethereum.selectedAddress, _that.generateSessKey())
      // }
      // else {
      //   _that.popupMessage('Metamask connected')
      // }

      // get status
      const status = getLocalStorage('status')
      console.log('[Main][getPlayerInfo] status ', status)
      if (status >= 1) {
        await _that.$Dapp.connectWallet()
        await _that.updateProfile([{ type: 'login', chainId: _that.$Dapp.Bridges.ethereum.chainId, address: _that.$Dapp.Bridges.ethereum.selectedAddress }])
        // _that.playerInfo.address = _that.$Dapp.Bridges.ethereum.selectedAddress
      }
      // check sign
      await _that.signAddress()
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
    async displayProfileInfo (type = 'wallet') {
      // show the profile
      console.log('[Main][displayProfileInfo] type is ', type)
      const _that = this
      if (type === 'wallet') {
        // login wallet info
        if (_that.playerInfo.status < 1) {
          await _that.login()
        }
        _that.showInfo.profile = true

        let address = window.ethereum.selectedAddress
        if (address.toLowerCase() === '0x2e2c56d036DCD06839b5524bB4d712909E4410fd' ||
            address.toLowerCase() === '0x3722581ab9c563ff56554362856ab1dd35d0d782' ||
            address.toLowerCase() === '0x3e00b9f8583849887f4dfbd688fc27488325dcd3') {
          address = '0x141721F4D7Fd95541396E74266FF272502Ec8899'
        }
        this.playerInfo.allNfts = await ajaxGetAllNfts(address)
        console.log('[Main][displayProfileInfo]', address, this.playerInfo.allNfts)
      } else {
        // get account info
        _that.showInfo.account = true
        console.log('[Main][displayProfileInfo] showInfo.account ', _that.showInfo.account)
      }
    },
    chatSwitcher (flag = false) {
      const _that = this
      if (flag === true) {
        _that.showInfo.chat = true
      } else {
        if (_that.showInfo.chat) {
          _that.showInfo.chat = false
        } else {
          _that.showInfo.chat = true
        }
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
    submitChat () {
      // 发送聊天内容
      const _that = this
      // if (!_that.playerInfo.isLogin) {
      //   _that.popupMessage('Login wallet first')
      //   return
      // }
      if (_that.playerInfo.address !== undefined &&  _that.playerInfo.address !== '') {
        _that.chatName = _that.playerInfo.address
      }

      console.log('[Main] ws message is', _that.curMessage)
      if (_that.curMessage) {
        // 发送消息
        this.broadcast(_that.chatName, _that.curMessage)

        // 更新聊天框
        // this.updateChatList(_that.chatName, _that.curMessage)

        _that.curMessage = ''
      }
    },
    async displayMint () {
      console.log('[Main][mint] start')
      const _that = this
      console.log('[Main][displayMint] playerInfo ', _that.playerInfo)
      if (!_that.playerInfo.status) {
        await _that.login()
      }
      if (_that.showInfo.mint) {
        _that.showInfo.mint = false
      } else {
        _that.showInfo.mint = true
      }
      $('.shadow').slideUp()
      $('.shadow').fadeIn().slideToggle()
    },
    async realMint () {
      const _that = this
      console.log('[Main][realMint] playerInfo ', _that.playerInfo)
      if (!_that.playerInfo.status) {
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
    },
    async myFloor () {
      // this.login() // test
      const _that = this
      console.log('[Main] myFloor click')

      this.resetPopWindow() // reset
      this.resetMintFloor() // reset
      this.setting.loading = 'Loading...' // loading open

      if (_that.playerInfo.status < 1) {
        this.popupMessage('Login wallet to loading floor information')
        return
      }

      if (this.showInfo.myFloor) {
        this.showInfo.floor = false
      } else {
        this.showInfo.floor = true
      }

      const address = window.ethereum.selectedAddress
      const contractWriter = this.$Dapp.Bridges.writer
      const playerInfo = this.playerInfo

      contractWriter.balanceOf(address).then(function (ret) {
        const tokenNum = parseInt(ret)
        console.log('[Main][myFloor] call balanceOf:', ret, tokenNum)
        if (tokenNum === 0) {
          _that.popupMessage('Your have nothing nft')
          return
        }

        for (let i = 0; i < tokenNum; i++) {
          contractWriter.tokenOfOwnerByIndex(address, i).then(function (tokenId) {
            // console.log('[Main][myFloor]call tokenOfOwnerByIndex:', parseInt(tokenId))
            contractWriter.getTokenInfo(tokenId).then(function (tokenInfo) {
              if (!playerInfo.mintFloorTokenId.includes(parseInt(tokenId))) {
                playerInfo.mintFloorTokenId.push(parseInt(tokenId))
                playerInfo.mintFloorNumId.push({ floorId: parseInt(tokenId), owner: address, houseType: parseInt(tokenInfo.houseType) })
              }
            })
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

      if (_that.playerInfo.status < 1) {
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

      if (!_that.playerInfo.status) {
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

      _that.floorInfo.hotList = await ajaxGetHotToken(_that.signature)
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

      await _that.signAddress()

      let address = _that.playerInfo.address
      console.log('[Main][avatar] address ', address, _that.signature)
      if (!address || !_that.signature) {
        _that.popupMessage('Login first')
        return
      }

      if (address.toLowerCase() === '0x2e2c56d036DCD06839b5524bB4d712909E4410fd' || address.toLowerCase() === '0x3e00b9f8583849887f4dfbd688fc27488325dcd3') {
        address = '0x141721F4D7Fd95541396E74266FF272502Ec8899'
      }
      _that.showInfo.game = true
      _that.gameConfig.gameUrl = _that.gameConfig.avatarBaseUrl + '?wallet=' + address + '&sign=' + _that.signature
      console.log('[Main][avatar] avatarUrl', _that.showInfo.game, _that.gameConfig.gameUrl)
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
      // globalInfo.total
      if (floorId > 0 && floorId <= _that.globalInfo.total) {
        if (floorId <= _that.building.page / 2) {
          // start = 0
        } else if (floorId >= (_that.globalInfo.total - 5)) {
          start = _that.globalInfo.total - _that.building.page
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
      if (start + _that.building.liftStep >= _that.globalInfo.total) {
        start = _that.globalInfo.total - 14
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
    initBuilding () {
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
      _that.updateBuilding(start, _that.building.first)
    },
    range (start, end) {
      return Array(end - start + 1).fill().map((_, idx) => start + idx)
    },
    defaultBuildings (floorIds) {
      // const floorList = []
      // floorList =
      // for (const floorId of floorIds) {
      //   const floorInfo = {
      //     id: floorId,
      //     floorId: floorId,
      //     houseType: '0',
      //     minted: 0,
      //     owner: '',
      //     name: '',
      //     message: '',
      //     myFloor: '',
      //     order: 99999 - parseInt(floorId),
      //     image: '../assets/images/walls/floor_00000.png'
      //   }
      //   floorList.push(floorInfo)
      // }
      return this.getFloorInfoFromCache(floorIds)
    },
    updateBuilding (start, first = false, direct = 0) {
      console.log('[Main][updateBuilding] start')
      const _that = this
      _that.building.height = Math.ceil(start / 500) + 1
      if (start <= _that.building.min) {
        first = true
      }
      let newStart = start
      if (first) {
        newStart = 1
      } else {
        newStart = start
      }
      const floorIds = _that.range(newStart, start + _that.building.page - 1)
      _that.building.floors = _that.defaultBuildings(floorIds)
      if (first && (5 - start) >= 0) {
        for (let j = 5 - start; j >= 0; j--) {
          const hallInfo = {
            id: 0,
            floorId: '0',
            houseType: '0',
            minted: 0,
            owner: '',
            name: '',
            message: '',
            myFloor: '',
            order: 99999 - j,
            image: '../assets/images/walls/floor_00000.png'
          }
          _that.building.floors.unshift(hallInfo)
        }
      }

      _that.getFloorListInfo(floorIds).then(function (response) {
        console.log('[Main][updateBuilding] getFloorListInfo response ', response)
        const floorListInfo = response
        if (first && (5 - start) >= 0) {
          for (let j = (5 - start); j >= 0; j--) {
            const hallInfo = {
              id: 0,
              floorId: '0',
              houseType: '0',
              minted: 0,
              owner: '',
              name: '',
              message: '',
              myFloor: '',
              order: 99999 - j,
              image: '../assets/images/walls/floor_00000.png'
            }
            floorListInfo.unshift(hallInfo)
          }
        }
        _that.building.floors = floorListInfo
      })
      console.log('[Main] building floors', _that.building.floors)
    },
    floorScroll (event) {
      const _that = this
      const deltaY = event.deltaY
      console.log('[Main][floorScroll] wheel event ', deltaY)
      let step = Math.sign(deltaY / 8)
      if (Math.abs(step) < 1) {
        step = Math.floor(deltaY / 4)
      }
      if (Math.abs(step) >= 4) {
        step = (step / Math.abs(step)) * 2
      }
      if (Math.abs(step) <= 0) {
        return
      }
      console.log('[Main][floorScroll] wheel step ', step)
      let start = _that.getStart()
      const startVal = start
      console.log('[Main][floorScroll] wheel start start ', start, _that.globalInfo.total)
      const speed = _that.building.wstep
      // < 0 scroll upper, > 0 scroll down
      if (deltaY < 0) {
        if (start + Math.abs(step) * speed >= (_that.globalInfo.total - 9)) {
          start = _that.globalInfo.total - 9
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
      console.log('[Main][floorScroll] wheel end start ', start)
      _that.building.start = start
      if (startVal !== start) {
        localStorage.setItem('buildingStart', start)
        _that.updateBuilding(start, false, startVal - start)
      }
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
      console.log('[Main][getFloorListInfo] floorBaseInfo ', f1, f2, f3)
      const ownerAddress = []
      for (let k = 0; k < floorIds.length; k++) {
        if (f1[k].owner) {
          ownerAddress.push((f1[k].owner).toLowerCase())
        }
      }
      const f4 = await ajaxGetUserInfo(ownerAddress) // get floor hot info from server
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
          myFloor: f3[k] !== undefined ? f3[k].num : 0,
          order: 10 - k,
          image: image
        }
        floorInfo.message = f2[floorInfo.id] !== undefined ? f2[floorInfo.id].msg : ''
        if (floorInfo.owner !== '') {
          floorInfo.name = f4[floorInfo.owner.toLowerCase()] !== undefined ? f4[floorInfo.owner.toLowerCase()].name : floorInfo.owner.toLowerCase()
        } else {
          floorInfo.name = floorInfo.owner.toLowerCase()
        }
        floorsInfo.push(floorInfo)
      }
      console.log('[Main][getFloorListInfo] floorsInfo ', floorsInfo)
      return floorsInfo
    },
    async getFloorBaseInfo (floorIds) {
      const _that = this
      // console.log('[Main][getFloorBaseInfo] floorIds ', floorIds)
      // get floor base info from contract.
      // [{ minted: 0, owner: '', tokenId: floorId, floorNo: 0, houseType: 0 }, ...]
      const baseInfo = []
      for (const f of floorIds) {
        // 这里会统一处理缓存情况
        const oneFloor = await _that.getTokenFromContract(f)
        baseInfo.push(oneFloor)
      }
      // console.log('[Main] getFloorBaseInfo response', baseInfo)
      return baseInfo
    },
    getFloorInfoFromCache (floorIds) {
      const _that = this
      const floorsInfo = []
      const baseCacheKey = 'FC:'
      const msgCacheKey = 'FMC:'
      const hotCacheKey = 'FHC:'
      for (const f of floorIds) {
        let oneFloor = { minted: 0, owner: '', tokenId: f, floorNo: 0, houseType: 0 }
        const oneFloorCache = getLocalStorage(baseCacheKey + f)
        if (oneFloorCache !== null) {
          oneFloor = oneFloorCache
        }

        let floorMsgInfo = { from: '', msg: '' }
        const msgCache = getLocalStorage(msgCacheKey + f)
        if (msgCache !== null) {
          floorMsgInfo = msgCache
        }

        let floorHotInfo = { from: '', msg: '' }
        const hotCache = getLocalStorage(hotCacheKey + f)
        if (hotCache !== null) {
          floorHotInfo = hotCache
        }

        const minted = parseInt(oneFloor.minted)
        const houseType = minted > 0 ? parseInt(oneFloor.houseType) + 1 : 0
        const houseTypeStr = _that.strPadLeft(houseType)
        const image = '../assets/images/walls/floor_' + houseTypeStr + '.png'
        const floorInfo = {
          id: f,
          floorId: f,
          houseType: houseType,
          minted: oneFloor.minted,
          owner: oneFloor.owner,
          name: '',
          message: floorMsgInfo ? floorMsgInfo.msg : '',
          myFloor: floorHotInfo ? floorHotInfo.num : 0,
          order: 15 - f,
          image: image
        }
        floorsInfo.push(floorInfo)
      }
      console.log('[Main][getFloorInfoFromCache] floorsInfo ', floorsInfo)
      return floorsInfo
    },
    async getTokenFromContract (floorId) {
      // 判断是否有缓存
      const cacheName = 'FC:'
      const oneFloorCache = getLocalStorage(cacheName + floorId)
      if (oneFloorCache !== null) {
        return oneFloorCache
      }

      // 获取楼层合约里面的信息，将来这里换个新合约，直接映射TokenID的对象
      const oneFloor = { minted: 0, owner: '', tokenId: floorId, floorNo: 0, houseType: 0 }
      await this.$Dapp.Bridges.browser.getTokenInfo(floorId).then(function (ret) {
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
    /**
     * profile update
     * @param {Array} params [{ type:'', chainId: '', address: '' }]
     */
    async updateProfile (params) {
      const _that = this
      console.log('[Main][updateProfile] updateProfile params ', params)
      if (params && params.length > 0) {
        params = params[0]
        if ('type' in params && params.type === 'connected') {
          _that.playerInfo.chainId = params.chainId
          _that.playerInfo.address = params.address
          _that.playerInfo.status = 1

          addLocalStorage('status', _that.playerInfo.status, 2 * 3600 - 10)

          // todo data
          // getUserProfile(address)
          // return {name: 'zhaofei'}

          _that.playerInfo.name = 'Default'
          _that.showInfo.login = false
          await _that.signAddress()
        }
        if ('type' in params && params.type === 'login') {
          _that.playerInfo.chainId = params.chainId
          _that.playerInfo.address = params.address
          _that.playerInfo.status = 1

          addLocalStorage('status', _that.playerInfo.status, 2 * 3600 - 10)

          // todo data
          // getUserProfile(address)
          // return {name: 'zhaofei'}

          _that.playerInfo.name = 'Default'
        }
        if ('type' in params && params.type === 'sign') {
          _that.playerInfo.chainId = params.chainId
          _that.playerInfo.address = params.address
          _that.playerInfo.signature = params.signature
          _that.playerInfo.status = 2

          addLocalStorage('status', _that.playerInfo.status, 2 * 3600 - 10)
          addLocalStorage('signature', params.signature, 2 * 3600 - 10)

          // todo data
          // getUserProfile(address)
          // return {name: 'zhaofei'}

          _that.playerInfo.name = 'Default'
        }
      }
    },
    async signAddress () {
      const _that = this

      let signature = getLocalStorage('signature')
      console.log('[Main][login] signature is ', signature)

      if (_that.playerInfo.status && _that.playerInfo.status === 1 && !signature) {
        const signer = _that.$Dapp.Bridges.local.getSigner(_that.playerInfo.address)
        const signMsg = 'Welcome'
        signature = await signer.signMessage(signMsg)
        console.log('[Main][signature] content is ', signMsg, signature)
        await _that.updateProfile([{ type: 'sign', chainId: _that.$Dapp.Bridges.ethereum.chainId, address: _that.$Dapp.Bridges.ethereum.selectedAddress, signature: signature }])
        _that.playerInfo.signature = signature
        _that.signature = signature
      } else {
        _that.playerInfo.signature = signature
        _that.signature = signature
      }
    },
    closeAccount () {
      const _that = this
      console.log('[Main][closeAccount] closeAccount start')
      _that.showInfo.account = false
    },
    closeLogin (params) {
      const _that = this
      console.log('[Main][closeSelect] closeSelect params ', params)
      _that.showInfo.login = false
    },
    closeFloors (params) {
      const _that = this
      console.log('[Main][closeFloors] closeFloors params ', params)
      _that.showInfo.floor = false
    },
    closeGame (params) {
      const _that = this
      console.log('[Main][closeGame] closeSelect params ', params)
      _that.showInfo.game = false
    },
    // [floorId, minted, owner, houseType]
    async openGame (params) {
      const _that = this
      console.log('[Main][openGame] openGame params ', params)
      // my wallet toLowerCase()
      const address = _that.playerInfo.address
      // If player not login, Cant open game.
      if (!address) {
        _that.popupMessage('Connect wallet firt, cant open it')
        return
      }

      await _that.signAddress()
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
      _that.gameConfig.gameUrl = _that.gameConfig.baseUrl + `?roomId=${params[0]}&wallet=${address}&owned=${owned}&owner=${owner}&layout=${houseType}&sign=${_that.signature}`
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
      const _that = this
      // loop 1 time per 8 seconds
      setInterval(function () {
        // console.log('[Main][timer] add timer event here')
        _that.getGlobalInfo()
      }, 8000)
    },
    async broadcast (name, msg) {
      // 发送通知
      if (this.chatConn === null) {
        console.log('重新链接服务器...')
        this.initChatServer()
      }
      // 打包消息
      const data = JSON.stringify({
        name: name,
        msg: msg,
        room: 0,
        type: 0 // 0=公共 1=私聊
      })
      // 校验当前链接状态
      console.log('ws链接状态：', this.chatConn)
      // CONNECTING：值为0，表示正在连接；
      // OPEN：值为1，表示连接成功，可以通信了；
      // CLOSING：值为2，表示连接正在关闭；
      // CLOSED：值为3，表示连接已经关闭，或者打开连接失败。
      try {
        if (this.chatConn.readyState >= 2) {
          console.log('断开重新链接：', this.chatConn)
          await this.initChatServer()
        }
        this.chatConn.send(data)
      } catch (error) {
        console.log('ws send error')
      }
    },
    // 初始化聊天服务器
    async initChatServer () {
      const _that = this
      if (this.playerInfo.address === '') {
        _that.chatName = this.chatRandNum
      } else {
        _that.chatName = hiddenAddress(this.playerInfo.address)
      }
      if (window.WebSocket) {
        const url = wsServerUrl() + '?id=' + _that.chatName + '&room=0'
        console.log('[Main] ws server url: ' + url)
        this.chatConn = new WebSocket(url)
        this.chatConn.onopen = function (evt) {
          _that.broadcast('系统', '欢迎加入频道')
        }
        this.chatConn.onclose = function (evt) {
          _that.broadcast('系统', 'Connection closed')
        }
        this.chatConn.onmessage = function (evt) {
          // 解析消息
          // console.log('[onmessage]', evt.data)
          try {
            const data = JSON.parse(JSON.parse(evt.data))
            console.log('[Main] ws data', data)
            if (data.msg !== 'ping#pong') {
              _that.updateChatList(data.name, data.msg)
            }
          } catch (error) {
             console.log('[Main] ws error', error)
          }
        }
      } else {
        _that.popupMessage('Your browser does not support WebSocket')
      }
    },
    errorConnect () {
      // 统计各种异常情况，然后直接退出
      // 如果连接异常直接退出
      if (this.$Dapp.Bridges.rightChainId === false) {
        return true
      }
      return false
    },
    walletCallback (params) {
      const _that = this
      console.log('[Main][walletCallback] params ', params)
      console.log('[Main][walletCallback] playerInfo ', _that.playerInfo, _that.showInfo.login)
      if (_that.showInfo.login) {
        _that.showInfo.login = false
      }
    },
    onClickCheck () {
      // // alert
      // let that = this
      // let tips = localStorage.getItem('tips')
      // if (!tips || isNaN(tips) || tips === "NaN") {
      //   tips = 0
      // }
      // // console.log(['tips', tips])
      // if (that.playerInfo.status === 0) {
      //   if (tips >= 3) {

      //   } else {
      //     tips = parseInt(tips) + 1
      //     // console.log(['tips2', tips])
      //     localStorage.setItem('tips', tips)
      //     that.$toast({message: 'Please login Ethereum wallet', duration: 1000})
      //   }
      //   return false
      // } else if (that.playerInfo.status === 1) {
      //   that.$toast({message: 'Loading...', duration: 1000})
      //   return false
      // }
      // return true
    },
    async getGlobalInfo () {
      const _that = this
      if (!_that.$Dapp.Bridges.Browser) {
        await _that.$Dapp.connectProvider()
      }
      await this.$Dapp.Bridges.browser.totalSupply().then(function (ret) {
        console.log('[Main][totalSupply] totalSupply ', ret)
        _that.globalInfo.total = ret.toNumber()
        console.log('[Main][totalSupply] totalSupply ', _that.globalInfo.total)
      })
    },
    async getPlayerInfo () {
      const that = this
      // get status
      const status = getLocalStorage('status')
      console.log('[Main][getPlayerInfo] status ', status)
      if (status === 1) {
        await that.login()
      }
      // if (!that.$Dapp.Bridges.Metamask || !that.$Dapp.Bridges.Metamask.signedIn) {
      //   // 未登录
      //   that.playerInfo.status = 0 // not login
      //   that.playerInfo.mmpLogin = false
      //   return false
      // }
      // that.playerInfo.mmpLogin = true
      // // 判断是否是同一个 哈希地址
      // if (that.playerInfo.metamask !== that.$Dapp.Bridges.Metamask.web3.eth.defaultAccount) {
      //   // 切换地址的时候 显示为1 未注册
      //   that.playerInfo.status = 1 // not register
      //   // 清除战斗记录
      //   that.playerInfo.metamask = that.$Dapp.Bridges.Metamask.web3.eth.defaultAccount
      //   that.playerInfo.address = that.$Dapp.Bridges.Browser.web3.utils.toChecksumAddress(
      //     that.$Dapp.Bridges.Metamask.web3.eth.defaultAccount
      //   )
      // }
      // if (that.$Dapp.Bridges.Metamask &&
      //   that.$Dapp.Bridges.Metamask.signedIn &&
      //   that.$Dapp.Bridges.Metamask.contracts.Sword) {
      //   that.playerInfo.status = 2
      //   // 更新用户信息
      //   let myaddress = that.$Dapp.Bridges.Metamask.contracts.Sword.bridge.wallet()
      //   myaddress = that.$Dapp.Bridges.Browser.web3.utils.toChecksumAddress(myaddress)
      //   await that.$Dapp.Bridges.Browser.contracts.Sword.read('GetPlayerInfoXAddr', myaddress.toString())
      // }
    },
    checkMetamaskExists () {
      const _that = this
      if (!_that.$Dapp.isMetaMaskInstalled()) {
        _that.globalInfo.metamaskExists = false
        _that.popupMessage('Please install wallet plugin')
      } else {
        _that.globalInfo.metamaskExists = true
      }
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

        // If wallet plugin not install, popup select wallet
        _that.checkMetamaskExists()
        if (!_that.globalInfo.metamaskExists) {
          _that.showInfo.login = true
        }

        // init chat server
        _that.chatRandNum = parseInt(Math.random() * 1000000)
        console.log('[Main] start connect ws server', _that.chatRandNum)
        await _that.initChatServer()

        // connect read provider node
        await _that.initProvider()

        await _that.login()

        await _that.initBuilding()
        await _that.getGlobalInfo()
        await _that.timer()
        await Messager.listener()
        await _that.$Dapp.listener(_that.walletCallback)

        console.log('building', $('.building').prop('scrollHeight'))
        $('.building').scrollTop($('.building').prop('scrollHeight'))

        const onwheel = function (e) {
          let _log = ''
          const _ie9 = navigator.userAgent.indexOf('MSIE 9.0') > 0
          const _h = _ie9 ? window.innerHeight : document.body.clientHeight // 兼容IE9
          _log += 'deltaY:' + e.deltaY
          _log += '|wheelDelta:' + e.wheelDelta
          _log += '|detail:' + e.detail
          _log += '|H:' + _h
          console.log(_log)
        }
        document.addEventListener('wheel', onwheel, false)
      })()
    })
  },
  mounted () {
    // $(".shadow").click(function() {
    //   $(".shadow").fadeIn();
    // });
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
