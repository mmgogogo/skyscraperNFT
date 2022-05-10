<template>
  <main class="main">
    <div class="header flex-row justify-center">
      <div class="logo flex-col"></div>
      <div class="navigation">
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
            <div class="outer2 flex-col align-left">
              <span class="text tbox tline tcolor tprop tfont_m tfont_s26 tshadow tleft" >{{ baseConfig.lang_001 }}</span>
              <div class="box1 flex-row justify-bewteen">
                <img class="icon1 flex-col" referrerpolicy="no-referrer" src="../assets/images/building_logo.png" alt="" />
                <span class="box3 tfont_s30 tfont_m tcenter tcolor tprop flex-col">{{ globalInfo.total }}</span>
              </div>
            </div>
          </div>
          <div class="bd2 flex-row justify-center">
            <div class="search-container flex-row align-center justify-between">
              <div class="section2 flex-col align-center justify-center">
                <div class="section3 flex-row align-center">
                  <div class="outer3 flex-col"></div>
                  <div class="outer4 flex-col justify-center">
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
                @click="myFloor(this)">
                {{ baseConfig.lang_004 }}</span>
            </div>
          </div>
          <div id="myFollowing" v-bind:class="[!showInfo.myFollowing ? '' : 'bgcolor_gray', 'nav-item flex-row justify-center nav-others']">
            <div class="nav-container flex-row align-center">
              <div v-bind:class="['bd5', 'flex-col', 'nav-margin']"></div>
              <span
                class="text tbox1 tline tprop tfont_m tfont_s24 tshadow btn-hand"
                v-bind:class="['tcolor', 'flex-col']"
                @click="myFollowing('myFollowing')"
                >{{ baseConfig.lang_005 }}</span>
              </div>
          </div>
          <div id="myFollowed" v-bind:class="[!showInfo.myFollowed ? '' : 'bgcolor_gray', 'nav-item flex-row justify-center nav-others']">
            <div class="nav-container flex-row align-center">
              <div v-bind:class="['group0', 'flex-col', 'nav-margin']"></div>
              <span
                class="text tbox1 tline tprop tfont_m tfont_s24 tshadow tcolor btn-hand"
                v-bind:class="['tcolor', 'flex-col']"
                @click="myFollowed('myFollowed')"
                >{{ baseConfig.lang_006 }}</span>
              </div>
          </div>
          <div id="hot" v-bind:class="[!showInfo.hot ? '' : 'bgcolor_gray', 'nav-item flex-row justify-center nav-others']">
            <div class="nav-container flex-row align-center">
              <div v-bind:class="['group1', 'flex-col', 'nav-margin']"></div>
              <span
                class="text tbox1 tline tprop tfont_m tfont_s24 tshadow tcolor tleft btn-hand"
                v-bind:class="['tcolor', 'flex-col']"
                @click="hot('hot')"
                >{{ baseConfig.lang_007 }}</span>
              </div>
          </div>
          <div class="button-list flex-row justify-center button-list-first">
            <div class="btn-container flex-container justify-between">
              <div class="layer2 flex-col align-center btn-hand" @click="displayMint()">
                <div class="layer3 flex-col align-center justify-center">
                  <img class="label2 flex-row" referrerpolicy="no-referrer" src="../assets/images/mint.png" alt="" />
                  <span class="txt3 flex-row">
                    {{ baseConfig.lang_008 }}
                  </span>
                </div>
              </div>
              <div class="layer2 flex-col align-center btn-hand">
                <div class="layer3 flex-col align-center justify-center" @click="room()">
                  <img class="label2 flex-row" referrerpolicy="no-referrer" src="../assets/images/room.png" alt="" />
                  <span class="txt3 flex-row">{{ baseConfig.lang_009 }}</span>
                </div>
              </div>
               <div class="layer2 flex-col align-center btn-hand" @click="avatar()">
                <div class="layer3 flex-col align-center justify-center">
                  <img class="label2 flex-row" referrerpolicy="no-referrer" src="../assets/images/avatar.png" alt="" />
                  <span class="txt3 flex-row">{{ baseConfig.lang_010 }}</span>
                </div>
              </div>
              <div class="layer2 flex-col align-center justify-center btn-hand">
                <span class="paragraph1 flex-row">{{ baseConfig.lang_011 }}</span>
              </div>
            </div>
          </div>
          <!-- <div class="button-list flex-row justify-center button-list-others">
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
          </div> -->
        </div>
      </div>
      <!-- nav end -->

      <!-- content start -->
      <div class="content flex-col" @click="onClick($event)">
        <Building :floors="building.floors" :first="building.first" :profileAddr="playerInfo.address" :maxFloor="globalInfo.total" v-on:open-game="openGame" v-on:mint-floor="displayMint" v-on:floor-scroll="floorScroll"/>
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
            <span class="chat-footer-msg">Chat:
              <input type="text" class="message-input" name="message" id="message" v-model="curMessage" maxlength="20" @focus="chatSwitcher(true)" @keyup.enter="submitChat()">
            </span>
          </div>
        </div>
        <!-- chat end -->

        <!-- myFollowing start -->
        <div class="hot flex-col" v-show="showInfo.myFollowing" @click="onClickOutside($event)">
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
                  <span class="hot-layer-message">{{ addressDisplay(v.AddressTo) }}</span>
                </div>
              </div>
              <!-- <div class="group3 flex-col align-center"><div class="bd4 flex-col"></div></div> -->
            </div>
          </div>
        </div>
        <!-- myFollowing end -->

        <!-- myFollowed start -->
        <div class="hot flex-col" v-show="showInfo.myFollowed" @click="onClickOutside($event)">
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
                  <span class="hot-layer-message">{{ addressDisplay(v.AddressFrom) }}</span>
                </div>
              </div>
              <!-- <div class="group3 flex-col align-center"><div class="bd4 flex-col"></div></div> -->
            </div>
          </div>
        </div>
        <!-- myFollowed end -->

        <!-- hot start -->
        <div class="hot flex-col" v-show="showInfo.hot" @click="onClickOutside($event)">
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
                  <span class="hot-layer-message">Floor:{{v.TokenId}}, Hot:{{v.Num}}</span>
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
      <!-- <div class="shadow" v-if="showInfo.mint" @click="onClick($event)">
        <div id="mint" class="mint flex-col" @click="onClickOutside($event)"> -->
      <div class="mshadow" v-if="showInfo.mint">
        <div id="mint" class="mint flex-col">
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
                <span class="mint-price-split">:</span>
                <span class="mint-price-value">{{ mintConfig.mintPrice }}</span>
                <span class="mint-price-unit">ETH</span>
              </div>
            </div>
            <div class="mint-left-msg-down flex-row justify-between">
              <div class="mint-left-msg-up-container flex-container">
                <span class="mint-number-txt flex-col">Amount</span>
                <span class="mint-price-split">:</span>
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
          <div class="mint-close cursor-pointer" @click="closeMint()">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true" width="24" height="24" class="text-high-emphesis">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </div>
        </div>
      </div>
      <!-- mint end -->
    </div>

    <!-- profile start -->
    <div class="wallet-main flex-col" v-if="showInfo.profile">
      <div class="wallet-wrapper flex-col">
        <div class="wallet-container flex-col">
          <div class="wallet-header flex-col justify-center align-center">
            <div class="wallet-header-container flex-row align-center">
              <div class="wallet-icon flex-col">
                <div class="wallet-icon-img flex-col"></div>
              </div>
              <span class="wallet-title">My Wallet NFTs</span>
              <div class="wallet-close flex-col">
                <div class="wallet-close-img flex-col" @click="close()"></div>
              </div>
            </div>
          </div>
          <div class="wallet-line2 flex-row justify-center align-center">
            <div v-bind:class="[showInfo.nftlabel === 'collected' ? 'wallet-line wallet-display flex-col' : 'wallet-line wallet-hidden flex-col']" @click="clickNftLabel('collected')">
              <div class="wallet-gray-icons flex-row">
                <img class="wallet-group-icon" referrerpolicy="no-referrer" src="../assets/images/collected.png" alt="" v-if="showInfo.nftlabel === 'collected'"/>
                <img class="wallet-group-icon" referrerpolicy="no-referrer" src="../assets/images/collected_gray.png" alt="" v-else/>
                <span class="wallet-word-block wallet-word">collected</span>
              </div>
            </div>
            <div v-bind:class="[showInfo.nftlabel === 'created' ? 'wallet-line wallet-display flex-col' : 'wallet-line wallet-hidden flex-col']" @click="clickNftLabel('created')">
              <div class="wallet-gray-icons flex-row">
                <img class="wallet-group-icon" referrerpolicy="no-referrer" src="../assets/images/created.png" alt="" v-if="showInfo.nftlabel === 'created'"/>
                <img class="wallet-group-icon" referrerpolicy="no-referrer" src="../assets/images/created_gray.png" alt="" v-else/>
                <span class="wallet-word-block wallet-word">created</span>
              </div>
            </div>
            <div v-bind:class="[showInfo.nftlabel === 'favorited' ? 'wallet-line wallet-display flex-col' : 'wallet-line wallet-hidden flex-col']" @click="clickNftLabel('favorited')">
              <div class="wallet-gray-icons flex-row">
                <img class="wallet-group-icon" referrerpolicy="no-referrer" src="../assets/images/favorited.png" alt="" v-if="showInfo.nftlabel === 'favorited'"/>
                <img class="wallet-group-icon" referrerpolicy="no-referrer" src="../assets/images/favorited_gray.png" alt="" v-else/>
                <span class="wallet-word-block wallet-word">favorited</span>
              </div>
            </div>
          </div>
          <div class="wallet-nfts flex-container" v-if="playerInfo.allNfts && playerInfo.allNfts.length > 0">
            <div class="wallet-nfts-list" v-for="item in playerInfo.allNfts" :key="item.id">
              <div class="wallet-nft-container flex-col" v-if="item.image">
                <!-- {{item.tokenId}} -->
                <!-- {{item.name}} -->
                <!-- <p v-if="item.image"> -->
                <img class="wallet-nft-img" referrerpolicy="no-referrer" :src="item.image" alt="" />
                <!-- </p> -->
              </div>
            </div>
          </div>
          <div class="wallet-nfts flex-container justify-center align-center" v-else>
            <div class="wallet-empty flex-row">
              <div class="wallet-message flex-col">
                You don't have a NFT!
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Account :show="showInfo.account" v-on:update-name="updateUsername" v-on:close-account="closeAccount" :profileAddr="playerInfo.address" :accountName="getUsername()" />
    <MyFloorList :show="showInfo.floor" :loading="setting.loading" :floors="playerInfo.mintFloorNumId" v-on:open-game="openGame" v-on:close-floors="closeFloors" />
    <Game :show="showInfo.game" :url="gameConfig.gameUrl" v-on:close-game="closeGame" />
    <!-- avatar start -->
    <Login :show="showInfo.login" :mmpExists="globalInfo.metamaskExists" v-on:update-profile="updateProfile" v-on:close-login="closeLogin"/>

    <div class="global-loading flex-container justify-center" v-if="globalInfo.loading">
      <div class="loading-container flex-container align-center justify-center">
        <img class="loading-img flex-row" referrerpolicy="no-referrer" src="../assets/images/walls/loading.gif" alt="" />
      </div>
    </div>
  </main>
</template>

<script>
import * as ethers from 'ethers'
import $ from 'jquery'

import Building from '@/components/Building.vue'
import Login from '@/components/Login.vue'
import Game from '@/components/Game.vue'
import MyFloorList from '@/components/MyFloorList.vue'
import Account from '@/components/Account.vue'
import Messager from '@/utils/Messager.js'
import {
  // ajaxAddFollowerPeople, ajaxAddFollowerToken, ajaxAddTokenInfo,
  ajaxGetHotToken, ajaxGetMyFollower, ajaxGetAllNfts, ajaxGetTokenInfo,
  ajaxGetTokenHotNum, wsServerUrl, ajaxGetUserInfo, ajaxGetProfile, ajaxUpdateProfile
} from '@/utils/AjaxData.js'
import { addLocalStorage, getLocalStorage, hiddenAddress, popupMessage } from '../utils/Utils'
import cfg from '../config/setting'

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
      appContractWriter: this.$Dapp.Bridges.writer,
      appContractReader: this.$Dapp.Bridges.read,
      signature: '',
      mintConfig: {
        mintNum: 1,
        unit: 0.01,
        mintPrice: 0.01
      },
      baseConfig: {
        lang_001: 'Total Floors',
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
        lobbyUrl: 'https://kokoya-game-1308188195.file.myqcloud.com/dress/game/nftHall/index.html',
        windowHeight: window.innerHeight
      },
      address: '',
      url: window.location.href ? window.location.href : '',
      lang: 'en',
      globalInfo: {
        total: 10000,
        runUpTime: '2019-08-15',
        metamaskExists: false,
        loading: false
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
        nftlabel: 'collected',
        myFloor: false, // my nft
        myFollowing: false, // i see
        myFollowed: false // see i
      },
      playerInfo: {
        name: '',
        names: {},
        chainId: '',
        address: '',
        signature: '',
        isLogin: false,
        status: 0, // login status 0: metamask not login, 1: login metamask successful 2: get name successful
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
      chatList: [],
      chatConn: null, // chat connection
      chatRandNum: 0, // chat rand agent id
      chatName: ''
    }
  },
  props: {
    msg: String
  },
  methods: {
    addressDisplay (address) {
      return hiddenAddress(address)
    },
    computeHeight () {
      const _that = this
      console.log('[Main][computeHeight] start ', _that.gameConfig.windowHeight)
      return (_that.gameConfig.windowHeight - 150 - 10) + 'px'
    },
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
      // connect to the 3rd provider not wallet and singer
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

      // playerInfo status
      // null: local default value
      // 0: , 1: clicked login panel, 2: signed
      const status = getLocalStorage('status')
      console.log('[Main][login] playerInfo status ', status, _that.checkDappWallet())
      const walletNotReady = _that.checkDappWallet()
      console.log('')
      if (walletNotReady === true) {
        console.log('[Main][login] connectWallet start')
        _that.$Dapp.connectWallet().then(async (response) => {
          console.log('[Main][login] connectWallet response ', response)
          if (_that.$Dapp.Bridges.ethereum) {
            await _that.updateProfile([{ type: 'login', chainId: _that.$Dapp.Bridges.ethereum.chainId, address: _that.$Dapp.Bridges.ethereum.selectedAddress }])
            try {
              await _that.signAddress()
            } catch (error) {
              console.log('[Main][login] signAddress error ', error)
            }
          }
          console.log('[Main][login] connectWallet end')
        })
      }
    },
    checkDappWalletEthereum () {
      const _that = this
      if (_that.$Dapp && _that.$Dapp.Bridges && _that.$Dapp.Bridges.ethereum) {
        return true
      } else {
        console.log('[Main][checkDappWallet] ', _that.$Dapp)
        return false
      }
    },
    checkDappWallet () {
      const _that = this
      if (_that.$Dapp && _that.$Dapp.Bridges) {
        return true
      } else {
        console.log('[Main][checkDappWallet] ', _that.$Dapp)
        return false
      }
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
        let address = ethers.utils.getAddress(window.ethereum.selectedAddress)
        console.log('[Main][displayProfileInfo] address ', address)
        if (address.toLowerCase() === '0x2e2c56d036DCD06839b5524bB4d712909E4410fd' ||
            address.toLowerCase() === '0x3722581ab9c563ff56554362856ab1dd35d0d782' ||
            address.toLowerCase() === '0x3e00b9f8583849887f4dfbd688fc27488325dcd3') {
          address = '0x141721F4D7Fd95541396E74266FF272502Ec8899'
        }
        ajaxGetAllNfts(address).then(function (response) {
          console.log('[Main][displayProfileInfo] address allnfts ', address, response)
          _that.playerInfo.allNfts = response
          setTimeout(() => {
            $('.wallet-nfts').css('height', _that.computeHeight())
          }, 100)
        })
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
      // update chat message list
      const len = this.chatList.length
      if (len > 20) {
        this.chatList = this.chatList.slice(len - 19)
      }
      this.chatList.unshift({ name: hiddenAddress(chatName), content: msg })
    },
    submitChat () {
      // send chat message
      const _that = this

      console.log('[Main][submitChat] message is ', [_that.chatName, _that.curMessage])
      if (_that.curMessage) {
        // message broadcast
        _that.broadcast(_that.chatName, _that.curMessage)

        // update chat message list
        // this.updateChatList(_that.chatName, _that.curMessage)

        _that.curMessage = ''
      }
    },
    closeMint () {
      const _that = this
      _that.showInfo.mint = false
    },
    async displayMint (params) {
      console.log('[Main][mint] start', params)
      const _that = this
      console.log('[Main][displayMint] playerInfo ', _that.playerInfo, _that.showInfo.mint)
      if (!_that.playerInfo.status) {
        await _that.login()
      }
      if (_that.showInfo.mint) {
        _that.showInfo.mint = false
      } else {
        _that.showInfo.mint = true
      }
      console.log('[Main][displayMint] mint ', _that.showInfo.mint)

      $('.c').slideUp()
      $('.mshadow').fadeIn().slideToggle()
    },
    async realMint () {
      const _that = this
      console.log('[Main][realMint] playerInfo ', _that.playerInfo)
      if (!_that.playerInfo.status) {
        popupMessage('Please login wallet', 'top', 'right', 't')
        return
      }
      if (_that.mintConfig.mintNum <= 0 || _that.mintConfig.mintPrice <= 0) {
        popupMessage('Input param error', 'top', 'right', 'f')
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
        popupMessage('Minting, wait for a moment', 'top', 'center', 't')
      })
      _that.showInfo.mint = true
    },
    close () {
      const _that = this
      _that.showInfo.profile = false
      _that.showInfo.game = false
    },
    clickNftLabel (label) {
      const _that = this
      _that.showInfo.nftlabel = label
    },
    async myFloor (obj) {
      // this.login() // test
      const _that = this
      console.log('[Main] myFloor click', obj)

      this.resetPopWindow() // reset
      this.resetMintFloor() // reset
      this.setting.loading = 'loading' // loading open

      if (_that.playerInfo.status < 1) {
        popupMessage('Login wallet to loading floor information', 'top', 'center', 't')
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
          // popupMessage('Your have nothing nft', 'top', 'center', 't')
          _that.setting.loading = 'empty'
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
        _that.setting.loading = ''
      })
    },
    async myFollowing (obj) {
      const _that = this
      _that.resetPopWindow() // reset
      console.log('[Main][myFollowing]click myFollowing top ', $('#' + obj).position())

      if (_that.playerInfo.status < 1) {
        popupMessage('Login wallet to loading following information', 'top', 'center', 't')
        return
      }

      $('.hot').css('margin-top', $('#' + obj).position().top)
      $('.hot').css('margin-left', $('#' + obj).width())

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
    async myFollowed (obj) {
      const _that = this

      _that.resetPopWindow() // reset
      console.log('[Main][myFollowed] click myFollowed', obj)

      if (!_that.playerInfo.status) {
        popupMessage('Login wallet to loading followed information', 'top', 'center', 't')
        return
      }

      $('.hot').css('margin-top', $('#' + obj).position().top)
      $('.hot').css('margin-left', $('#' + obj).width())

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
    async hot (obj) {
      const _that = this

      _that.resetPopWindow()

      if (_that.showInfo.hot) {
        _that.showInfo.hot = false
      } else {
        _that.showInfo.hot = true
      }

      $('.hot').css('margin-top', $('#' + obj).position().top)
      $('.hot').css('margin-left', $('#' + obj).width())

      _that.setting.loading = 'Loading...'

      _that.floorInfo.hotList = await ajaxGetHotToken(_that.signature)
      console.log('[Main][hot] hotList is ', _that.floorInfo.hotList, obj)

      if (_that.floorInfo.hotList === null || _that.floorInfo.hotList.length === 0) {
        _that.setting.loading = 'Empty...'
      } else {
        _that.setting.loading = ''
      }
    },
    room () {
      popupMessage('Coming soon', 'top', 'center', 't')
    },
    async avatar () {
      const _that = this

      await _that.signAddress()

      let address = _that.playerInfo.address
      console.log('[Main][avatar] address ', address, _that.signature)
      if (!address || !_that.signature) {
        popupMessage('Login wallet first', 'top', 'center', 't')
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
    },
    search (floorId) {
      const _that = this
      let start = 0
      // globalInfo.total
      if (floorId <= 0 || floorId > _that.globalInfo.total) {
        return false
      } else {
        if (floorId <= Math.floor(_that.building.page / 2)) {
          start = 1
        } else if (floorId >= (_that.globalInfo.total + 4 - Math.floor(_that.building.page / 2))) {
          start = _that.globalInfo.total + 4 - _that.building.page
        } else {
          start = floorId - Math.floor(_that.building.page / 2)
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
        start = _that.globalInfo.total + 2 - _that.building.page
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
      // _that.globalInfo.loading = true
      _that.updateBuilding(start, _that.building.first)
    },
    range (start, end) {
      return Array(end - start + 1).fill().map((_, idx) => start + idx)
    },
    defaultBuildings (floorIds) {
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
      // _that.globalInfo.loading = true
      const floorIds = _that.range(newStart, start + _that.building.page - 1)
      _that.building.floors = _that.defaultBuildings(floorIds)
      if (first && (6 - start) >= 0) {
        let begin = 5
        for (let j = 6 - start; j >= 0; j--) {
          const hallInfo = {
            id: 0,
            floorId: '0',
            houseType: -begin,
            minted: 0,
            owner: '',
            name: '',
            message: '',
            myFloor: '',
            order: 99999 - j,
            image: '../assets/images/walls/floor_00000.png'
          }
          begin--
          _that.building.floors.unshift(hallInfo)
        }
      }

      _that.getFloorListInfo(floorIds).then(function (response) {
        console.log('[Main][updateBuilding] getFloorListInfo response ', response)
        const floorListInfo = response
        if (first && (6 - start) >= 0) {
          let begin = 5
          for (let j = (6 - start); j >= 0; j--) {
            const hallInfo = {
              id: 0,
              floorId: '0',
              houseType: -begin,
              minted: 0,
              owner: '',
              name: '',
              message: '',
              myFloor: '',
              order: 99999 - j,
              image: '../assets/images/walls/floor_00000.png'
            }
            begin--
            floorListInfo.unshift(hallInfo)
          }
        }
        _that.building.floors = floorListInfo
        _that.globalInfo.loading = false
        console.log('[Main] building globalInfo.loading ', _that.globalInfo.loading)
        $('.building').scrollTop($('.building').prop('scrollHeight'))
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
      console.log('[Main][floorScroll] wheel start ', [start, _that.globalInfo.total, _that.building.page])
      const speed = _that.building.wstep
      // < 0 scroll upper, > 0 scroll down
      if (deltaY < 0) {
        if ((start + Math.abs(step) * speed) >= (_that.globalInfo.total + 4 - _that.building.page)) {
          start = _that.globalInfo.total + 4 - _that.building.page
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
      // fetch floor base information return list
      // this.getFloorBaseInfo(floorIds)
      // this.getFloorMessageInfo(floorIds)

      // data structure
      // 0. floorIds [1,2,3,4... 10000]
      // recommand 100 records per request and save them into local strorage
      //
      // 1. floors base information
      // input floor id list
      // return object for floor status information
      // getFloorBaseInfo([1,2,3,4...])
      //
      // {
      //   1: { mined:false },
      //   2: { minted: true, owner: '0xabc...', name:'', myFloor: 0 },
      //   3: { minted: true, owner: '0xabc...', name:'', myFloor: 0 },
      //   ...
      // }

      // 2. floor remark info list
      // input floor id list
      // return object for floor remark information list
      // getFloorMessageInfo([1,2,3,4...])
      // {1: [{from: 0xabc, msg: 'hello'}], ...}

      // 3. return data structure
      // {
      //   floorId: '1001',
      //   owner: '0x...abc',
      //   name: 'my name',
      //   message: 'Object for remark information',
      //   myFloor:'love value or 0'
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
        _that.$Dapp.switch(cfg[cfg.version].chainId).then(function (response) {
          console.log('[Main][getFloorListInfo] response', response)
          // window.location.reload()
        })
        console.log('[Main][getFloorListInfo] error', _that.$Dapp.Bridges)
        return _that.defaultBuildings(floorIds)
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
        // tips: process floors information cache from local storage
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
      // Judge whether cached or not
      const cacheName = 'FC:'
      const oneFloorCache = getLocalStorage(cacheName + floorId)
      if (oneFloorCache !== null) {
        return oneFloorCache
      }

      // Get floor base information from contract
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

      // Write into local storage
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

          _that.showInfo.login = false
          await _that.signAddress()
        }
        if ('type' in params && params.type === 'login') {
          _that.playerInfo.chainId = params.chainId
          _that.playerInfo.address = params.address
          _that.playerInfo.status = 1

          addLocalStorage('status', _that.playerInfo.status, 2 * 3600 - 10)
        }
        if ('type' in params && params.type === 'change') {
          _that.playerInfo.chainId = params.chainId
          _that.playerInfo.address = params.address
          _that.playerInfo.status = params.status

          addLocalStorage('status', _that.playerInfo.status, 2 * 3600 - 10)
          try {
            await _that.signAddress()
          } catch (error) {
            console.log('[Main][updateProfile] signAddress refuse ', error)
          }
        }
        if ('type' in params && params.type === 'sign') {
          _that.playerInfo.chainId = params.chainId
          _that.playerInfo.address = params.address
          _that.playerInfo.signature = params.signature
          _that.playerInfo.status = 2

          addLocalStorage('status', _that.playerInfo.status, 2 * 3600 - 10)
          const len = params.address.length
          const key = 'sig_' + params.address.substring(len - 6)
          addLocalStorage(key, params.signature, 2 * 3600 - 10)
        }
        const curAddr = _that.playerInfo.address
        if (curAddr && (!_that.playerInfo.names || !(curAddr in _that.playerInfo.names) || ((curAddr in _that.playerInfo.names) && !_that.playerInfo.names[curAddr]))) {
          console.log('[Main][updateProfile] names get ', curAddr)
          try {
            const result = await ajaxGetProfile(curAddr)
            _that.playerInfo.names[curAddr] = result.Name
            await _that.initChatUsername(result.Name)
          } catch (error) {
            console.log('[Main][updateProfile] error ', error)
          }
        }
      }
    },
    async signAddress () {
      const _that = this
      if (_that.checkDappWalletEthereum() === false) {
        console.log('[Main][login][signAddress] checkDappWalletEthereum false')
        return
      }
      if (!_that.$Dapp.Bridges.ethereum.selectedAddress) {
        console.log('[Main][login][signAddress] selectedAddress empty')
        return
      }
      if (!_that.playerInfo.address) {
        _that.playerInfo.address = _that.$Dapp.Bridges.ethereum.selectedAddress
      }
      const len = _that.playerInfo.address.length
      const key = 'sig_' + _that.playerInfo.address.substring(len - 6)
      let signature = getLocalStorage(key)
      console.log('[Main][login] signature is ', signature, _that.playerInfo)
      if (_that.playerInfo.status && (_that.playerInfo.status === 1 || _that.playerInfo.status === 2) && !signature) {
        _that.signSwitch = true
        const signer = _that.$Dapp.Bridges.local.getSigner(_that.playerInfo.address)
        const signMsg = 'Welcome'
        signature = await signer.signMessage(signMsg)
        // console.log('[Main][signature] content is ', signMsg, signature)
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
    getUsername () {
      const _that = this
      return _that.playerInfo.address && (_that.playerInfo.address in _that.playerInfo.names) ? _that.playerInfo.names[_that.playerInfo.address] : ''
    },
    updateUsername (params) {
      const _that = this
      console.log('[Main][updateUsername] start ', params)
      if (_that.playerInfo.address && _that.playerInfo.address.length >= 40) {
        if ('name' in params && params.name) {
          try {
            _that.playerInfo.names[_that.playerInfo.address] = params.name
            ajaxUpdateProfile(_that.playerInfo.address, params.name, 0).then(function (res) {
              console.log('[Main][updateUsername] ajaxUpdateProfile return ', res)
              if (res !== 0) {
                popupMessage('Name changed faild!', 'top', 'right', 'f')
              } else {
                const len = _that.playerInfo.address.length
                const key = 'un:' + _that.playerInfo.address.substring(len - 6)
                addLocalStorage(key, params.name, 2 * 3600)

                popupMessage('Name changed successfully!', 'top', 'right', 's')
              }
            })
          } catch (error) {
            console.log('[Main][updateUsername] error ', error)
          }
        }
      }
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
        popupMessage('Connect wallet firt, cant open it', 'top', 'center', 't')
        return
      }

      // when user login game they signed a message use their wallet to prove the owner
      // and Login server will return a token to Client, expired after 2 hours
      // this is the login token, use it here
      try {
        await _that.signAddress()
      } catch (error) {
        console.log('[Main][openGame] signAddress error ', error)
      }

      // lobbyFloor ['0', 0, '', -4] floorId, minted, owner, houseType
      if (params[0] === '0' && params[1] === 0 && params[2] === '' && params[3] <= 0) {
        _that.showInfo.game = true
        _that.gameConfig.gameUrl = _that.gameConfig.lobbyUrl + `?roomId=0&wallet=${address}&owned=0&owner=''&layout=0&sign=${_that.signature}`
        console.log('[Main][openGame] openGame lobby ', _that.showInfo.game, _that.gameConfig.gameUrl)
        return
      }

      if (parseInt(params[1]) === 0) {
        popupMessage('Not minted floor, cant open it', 'top', 'center', 'f')
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
    timer () {
      const _that = this
      // loop 1 time per 8 seconds
      setInterval(function () {
        // console.log('[Main][timer] add timer event here')
        _that.getGlobalInfo()
      }, 8000)
    },
    async broadcast (name, msg) {
      const _that = this
      if (_that.chatConn === null) {
        _that.initChatServer()
      }
      // Package messages
      const data = JSON.stringify({
        name: name,
        msg: msg,
        room: 0,
        type: 0 // 0=public 1=private
      })
      // check wss connection status
      // CONNECTING：value 0, connecting；
      // OPEN value 1, connect successful can be communicated；
      // CLOSING：value 2, connection is closing；
      // CLOSED：value 3, connection is closed or opened failed error。
      try {
        let flag = 0
        if (_that.chatConn.readyState === 2) {
          console.log('[Main][broadcast] wss closing', _that.chatConn)
          flag = 1
        } else if (_that.chatConn.readyState === 3) {
          console.log('[Main][broadcast] wss closed', _that.chatConn)
          flag = 1
        } else if (_that.chatConn.readyState > 3) {
          console.log('[Main][broadcast] error', _that.chatConn)
          flag = 1
        }
        if (flag === 1) {
          await _that.initChatServer()
          _that.chatConn.send(data)
        } else {
          _that.chatConn.send(data)
        }
      } catch (error) {
        console.log('[Main][broadcast] wss error', error)
      }
    },
    async initChatUsername (username) {
      const _that = this
      if (username) {
        _that.chatName = username
      } else {
        if (_that.playerInfo.address === '') {
          _that.chatName = _that.chatRandNum
        } else {
          const lowAddr = _that.playerInfo.address
          const f4 = await ajaxGetUserInfo([lowAddr])
          console.log('[Main][initChatServer] addr and username ', lowAddr, f4)
          for (var v in f4) {
            if (v.toLowerCase() === lowAddr.toLowerCase()) {
              _that.chatName = f4[v].name
            }
          }
          _that.chatName = _that.chatName !== '' ? _that.chatName : hiddenAddress(lowAddr)
          console.log('[Main][initChatServer] chatName ', _that.chatName)
        }
      }
    },
    // Connection to chat server initialize
    async initChatServer () {
      const _that = this

      await _that.initChatUsername()

      if (window.WebSocket) {
        if (_that.chatConn && _that.chatConn.readyState === 1) {
          return
        }
        const url = wsServerUrl() + '?id=' + _that.chatName + '&room=0'
        console.log('[Main][initChatServer] server url ' + url)
        _that.chatConn = new WebSocket(url)
        _that.chatConn.onopen = function (evt) {
          const hellomsg = getLocalStorage(_that.chatName)
          if (!hellomsg) {
            _that.broadcast('Skyscraper', 'Welcome [' + _that.chatName + ']')
            addLocalStorage(_that.chatName, 1, 2 * 3600 - 10)
          }
        }
        _that.chatConn.onclose = function (evt) {
          _that.broadcast('Skyscraper', 'Connection closed')
        }
        _that.chatConn.onmessage = function (evt) {
          try {
            const data = JSON.parse(JSON.parse(evt.data))
            if (data.msg !== 'ping#pong') {
              console.log('[Main][onmessage] message data', data)
              _that.updateChatList(data.name, data.msg)
            }
          } catch (error) {
            console.log('[Main][onmessage] error', error)
          }
        }
      } else {
        popupMessage('Your browser does not support WebSocket', 'top', 'center', 'f')
      }
    },
    errorConnect () {
      // Stat errors
      if (this.$Dapp.Bridges.rightChainId === false) {
        return true
      }
      return false
    },
    // type: accountsChanged:newaddress chainChanged:newchain disconnect: message:message
    walletCallback (type, value) {
      const _that = this
      console.log('[Main][walletCallback] params ', [type, value], _that.playerInfo)
      if (_that.checkDappWalletEthereum() === false) {
        console.log('[Main][walletCallback] checkDappWalletEthereum false')
        return
      }
      if (type === 'accountsChanged') {
        if (_that.playerInfo.address && _that.playerInfo.status >= 1) {
          if (value && value.length > 0) {
            if (value[0] !== _that.playerInfo.address) {
              _that.playerInfo.address = value[0]
              popupMessage('Wallet address switched', 'top', 'center', 't')
              _that.updateProfile([{
                type: 'change',
                address: value[0],
                chainId: _that.$Dapp.Bridges.ethereum.chainId,
                status: 1
              }])
            }
          } else {
            popupMessage('Wallet connect close', 'top', 'center', 't')
            if (_that.$Dapp.Bridges.ethereum.selectedAddress) {
              _that.updateProfile([{
                type: 'connected',
                address: _that.$Dapp.Bridges.ethereum.selectedAddress,
                chainId: _that.$Dapp.Bridges.ethereum.chainId,
                status: 1
              }])
            } else {
              _that.updateProfile([{
                type: 'change',
                address: '',
                chainId: _that.$Dapp.Bridges.ethereum.chainId,
                status: 0
              }])
            }
          }
        } else {
          // window.location.reload()
        }
      } else if (type === 'chainChanged') {
        if (_that.playerInfo.address && _that.playerInfo.status >= 1) {
          popupMessage('Network changed', 'top', 'center', 't')
          _that.updateProfile([{
            type: 'change',
            address: _that.$Dapp.Bridges.ethereum.selectedAddress,
            chainId: value,
            status: 1
          }])
        } else {
          // window.location.reload()
        }
      } else if (type === 'disconnect') {
        if (_that.playerInfo.address && _that.playerInfo.status >= 1) {
          _that.updateProfile([{
            type: 'change',
            address: '',
            chainId: _that.$Dapp.Bridges.ethereum.chainId,
            status: 0
          }])
        } else {
          // window.location.reload()
        }
      } else if (type === 'message') {
        // do nothing
      }
    },
    async getGlobalInfo () {
      const _that = this
      if (!_that.$Dapp.Bridges.Browser) {
        await _that.$Dapp.connectProvider()
      }
      await this.$Dapp.Bridges.browser.totalSupply().then(function (ret) {
        // console.log('[Main][totalSupply] totalSupply ', ret)
        _that.globalInfo.total = ret.toNumber()
        // console.log('[Main][totalSupply] totalSupply ', _that.globalInfo.total)
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
    },
    checkMetamaskExists () {
      const _that = this
      if (!_that.$Dapp.isMetaMaskInstalled()) {
        _that.globalInfo.metamaskExists = false
        popupMessage('Please install wallet plugin', 'top', 'center', 't')
      } else {
        _that.globalInfo.metamaskExists = true
      }
    }
  },
  updated () {
    // const _that = this
    console.log('[Main][update] start!')
    if (this.building.first) {
      $('.building').scrollTop($('.building').prop('scrollHeight'))
    }
  },
  created () {
    console.log('[Main][created] created start!')
    const _that = this
    console.log('[Main][created] display Dapp ', _that.$Dapp)
    $(fn => {
      (async function () {
        console.log('[Main][created] display Dapp innerHeight ', _that.$Dapp, window.innerHeight)
        const innerHeight = window.innerHeight
        if (innerHeight) {
          const tempFloors = Math.ceil(innerHeight / 75)
          console.log('[Main][created] tempFloors ', tempFloors)
          // if (tempFloors > _that.building.page) {
          _that.building.page = tempFloors
          // }
        }
        console.log('[Main][created] display Dapp page ', _that.building.page)

        // If wallet plugin not install, popup select wallet
        _that.checkMetamaskExists()
        if (!_that.globalInfo.metamaskExists) {
          _that.showInfo.login = true
        }

        // connect read provider node
        await _that.initProvider()

        await _that.login()

        await _that.initBuilding()
        await _that.getGlobalInfo()
        await _that.timer()
        await Messager.listener()
        await _that.$Dapp.listener(_that.walletCallback)

        console.log('[Main][created]  building height ', $('.building').prop('scrollHeight'))
        $('.building').scrollTop($('.building').prop('scrollHeight'))

        // Init chat server
        let randId = getLocalStorage('randId')
        if (!randId) {
          randId = parseInt(Math.random() * 100000)
          addLocalStorage('randId', randId, 7 * 24 * 3600)
        }
        _that.chatRandNum = 'Guest' + randId
        console.log('[Main][created] connect ws server', _that.chatRandNum)
        await _that.initChatServer()

        const onwheel = function (e) {
          let _log = ''
          const _ie9 = navigator.userAgent.indexOf('MSIE 9.0') > 0
          const _h = _ie9 ? window.innerHeight : document.body.clientHeight // For IE9
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
    console.log('[Main][mounted] start')
    // $(".shadow").click(function() {
    //   $(".shadow").fadeIn();
    // });
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.global-loading {
  z-index: 181;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.95);
  /* left: 40%; */
  width: 100%;
  position: absolute;
  top: 0;
  /* border-radius: 20px; */
}
.loading-container {
  margin: auto 0;
  /* border: 1px solid red; */
  width: 50%;
  height: 40%;
}
.loading-img {
  z-index: 188;
  width: 100px;
  height: auto;
}
</style>
