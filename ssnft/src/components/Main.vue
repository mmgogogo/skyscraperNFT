<template>
  <main class="main">
    <div class="header flex-col justify-center">
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
              <span
                class="text tbox tline tcolor tprop tfont_m tfont_s26 tshadow"
                >{{ baseConfig.lang_001 }}</span
              >
              <div class="box1 flex-row justify-between">
                <img
                  class="icon1"
                  referrerpolicy="no-referrer"
                  src="images/building_logo.png"
                />
                <span class="box3 tfont_s30 tfont_m tleft tcolor tprop">{{
                  gameConfig.total
                }}</span>
              </div>
            </div>
          </div>
          <div class="bd2 flex-row justify-between">
            <div class="section2 flex-col">
              <div class="section3 flex-row justify-between">
                <div class="outer3 flex-col"></div>
                <div class="outer4">
                  <span class="info2">
                    <input type="number" class="" placeholder="Search" v-model.number="gotoNum"/>
                  </span>
                </div>
              </div>
            </div>
            <div class="section4 flex-col align-center">
              <span class="txt2 btn-hand" @click="goto()">{{ baseConfig.lang_003 }}</span>
            </div>
          </div>
          <div class="bd3 flex-row justify-between">
            <div class="layer1 flex-col"></div>
            <span
              class="text tbox1 tline tprop tfont_m tfont_s24 tshadow ttop tcolor_gray0 btn-hand"
              @click="myFloor()">
              {{ baseConfig.lang_004 }}</span>
          </div>
          <div class="bd4 flex-row justify-between">
            <div class="bd5 flex-col"></div>
            <span
              class="text tbox1 tline tprop tfont_m tfont_s24 tshadow ttop tcolor btn-hand"
              @click="myFollowing()"
              >{{ baseConfig.lang_005 }}</span
            >
          </div>
          <div class="bd4 flex-row justify-between">
            <div class="group0 flex-col"></div>
            <span
              class="text tbox1 tline tprop tfont_m tfont_s24 tshadow tcolor btn-hand"
              @click="myFollowed()"
              >{{ baseConfig.lang_006 }}</span
            >
          </div>
          <div class="bd4 flex-row justify-between">
            <div class="group1 flex-col"></div>
            <span
              class="text tbox1 tline tprop tfont_m tfont_s24 tshadow tcolor tleft btn-hand"
              @click="hot()"
              >{{ baseConfig.lang_007 }}</span
            >
          </div>
          <div class="bd8 flex-row justify-between">
            <div class="layer2 flex-col align-center btn-hand" @click="mint()">
              <div class="layer3 flex-col justify-between">
                <div class="layer4 flex-col"></div>
                <span class="txt3">
                  {{ baseConfig.lang_008 }}
                </span>
              </div>
            </div>
            <div class="layer5 flex-col align-center">
              <div class="group2 flex-col justify-between btn-hand" @click="room()">
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
      <div class="content flex-col">
        <div class="building flex-container align-end">
          <div class="floor flex-row justify-between">
            <div class="owner flex-col">
              <span class="message">this is a message too</span>
            </div>
            <div class="room flex-col align-center">
              <div class="decoration flex-row align-center">
                <img class="floor-img flex-col" referrerpolicy="no-referrer" src="/images/walls/03.png" alt="" />
              </div>
              <!-- <div class="section3 flex-row justify-between">
                <div class="outer3 flex-col"></div>
                <div class="outer4">
                  <span class="info2">{{ baseConfig.lang_002 }}</span>
                  <span class="tbox1 tline tcolor_gray0 tprop tfont_m tfont_s24 tshadow ttop">…</span>
                </div>
              </div> -->
            </div>
            <div class="others flex-col">
              <span class="message">this is a message</span>
            </div>
          </div>
        </div>
        <!-- ladder start -->
        <div class="ladder flex-col">
          <div class="lmain6 flex-row justify-between">
            <img class="llabel2" referrerpolicy="no-referrer" src="/images/ladder/label.png" alt="" />
            <div class="lbox10 flex-col">
              <div class="lwrap1 flex-col">
                <div class="lmod5 flex-col"><div class="lmain7 flex-col"></div></div>
                <div class="lmod6 flex-col align-center">
                  <div class="lsection4 flex-col">
                    <div class="lmain8 flex-col align-center"><div class="lwrap2 flex-col"></div></div>
                  </div>
                </div>
                <div class="lmod7 flex-col align-center"><div class="lmod8 flex-col"></div></div>
              </div>
            </div>
          </div>
        </div>
        <!-- ladder end -->
        <!-- chat start -->
        <div class="chat flex-col align-center">
          <div class="clayer5 flex-col"></div>
        </div>
        <!-- chat end -->
      </div>
      <!-- content end -->

      <!-- my floor start -->
      <div class="hot flex-col" v-show="showInfo.myFloor">
        <div class="group1 flex-col justify-between">
          <div class="main5 flex-col justify-center">
            <span class="txt5">My Floor</span>
          </div>
          <div class="main6 flex-row">
            <div class="group10 flex-col">
              <div class="layer flex-col justify-center" v-for="v in playerInfo.mintFloorNumId" :key="v">
                <span class="txt6">Floor Id:{{v}}</span>
              </div>
            </div>
            <!-- <div class="group3 flex-col align-center"><div class="bd4 flex-col"></div></div> -->
          </div>
        </div>
      </div>
      <!-- my floor end -->

      <!-- myFollowing start -->
      <div class="hot flex-col" v-show="showInfo.myFollowing">
        <div class="group1 flex-col justify-between">
          <div class="main5 flex-col justify-center">
            <span class="txt5">Following</span>
          </div>
          <div class="main6 flex-row">
            <div class="group10 flex-col">
              <div class="layer flex-col justify-center" v-for="v in playerInfo.myFollowing" :key="v.AddressTo">
                <span class="txt6">玩家地址:{{v.AddressTo}}</span>
              </div>
            </div>
            <!-- <div class="group3 flex-col align-center"><div class="bd4 flex-col"></div></div> -->
          </div>
        </div>
      </div>
      <!-- myFollowing end -->

      <!-- myFollowed start -->
      <div class="hot flex-col" v-show="showInfo.myFollowed">
        <div class="group1 flex-col justify-between">
          <div class="main5 flex-col justify-center">
            <span class="txt5">Followed</span>
          </div>
          <div class="main6 flex-row">
            <div class="group10 flex-col">
              <div class="layer flex-col justify-center" v-for="v in playerInfo.myFollowed" :key="v.AddressTo">
                <span class="txt6">玩家地址:{{v.AddressFrom}}</span>
              </div>
            </div>
            <!-- <div class="group3 flex-col align-center"><div class="bd4 flex-col"></div></div> -->
          </div>
        </div>
      </div>
      <!-- myFollowed end -->

      <!-- hot start -->
      <div class="hot flex-col" v-if="showInfo.hot">
        <div class="group1 flex-col justify-between">
          <div class="main5 flex-col justify-center">
            <span class="txt5 btn-hand">Hot</span>
          </div>
          <div class="main6 flex-row">
            <div class="group10 flex-col">
              <div class="layer flex-col justify-center">
                <span class="txt6">come soon</span>
              </div>
            </div>
            <!-- <div class="group3 flex-col align-center"><div class="bd4 flex-col"></div></div> -->
          </div>
        </div>
      </div>
      <!-- hot end -->

      <!-- mint start -->
      <div class="shadow" v-if="showInfo.mint">
        <div id="mint" class="mint flex-col">
          <div class="block flex-row justify-between">
            <div class="main4 flex-col"></div>
            <div class="main5 flex-col justify-between">
              <span class="txt3">Skyscraper&nbsp;Floor</span>
              <span class="txt4">
                Phanta&nbsp;Bear&nbsp;is&nbsp;a&nbsp;collection&nbsp;of&nbsp;10,000&nbsp;algorithmically&nbsp;generated&nbsp;digital&nbsp;collectibles&nbsp;that&nbsp;double&nbsp;as&nbsp;memebership&nbsp;cards&nbsp;for&nbsp;the&nbsp;Ezek&nbsp;Club.&nbsp;Each&nbsp;Phanta&nbsp;Bear&nbsp;has&nbsp;a&nbsp;unique&nbsp;set&nbsp;of&nbsp;traits&nbsp;and&nbsp;unlocks&nbsp;varying,&nbsp;unique&nbsp;levels&nbsp;of&nbsp;access&nbsp;and&nbsp;perks&nbsp;for&nbsp;its&nbsp;owner.&nbsp;Phanta&nbsp;Bear&nbsp;project&nbsp;was&nbsp;jointly&nbsp;launched&nbsp;by&nbsp;PHANTACi&nbsp;and&nbsp;Ezek
              </span>
              <div class="mod2 flex-col justify-center btn-hand">
                <span class="info7" @click="realMint()">MINT</span>
              </div>
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
              <div class="main6 flex-col">
                <div class="group6 flex-col"></div>
              </div>
              <span class="word11">1</span>
              <div class="main7 flex-col">
                <div class="group7 flex-col"></div>
              </div>
            </div>
            <img class="pic1" referrerpolicy="no-referrer" src="images/floor_icon.png"/>
            <span class="info11">Amount：</span>
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
              <span class="pinfo4">My&nbsp;Wallet</span>
              <div class="pmod7 flex-col">
                <div class="player9 flex-col" @click="close()"></div>
              </div>
            </div>
          </div>
          <div>address: {{ playerInfo.address }}</div>
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
    <Game :show="showInfo.game" :url="gameConfig.gameUrl" @click="click()" />
    <!-- game info end -->
  </main>
</template>

<script>
import * as ethers from 'ethers'
import Game from '@/components/Game.vue'
import sendMessage from '@/utils/Utils.js'
// import { ajaxGetMyFollower, ajaxGetAllNfts } from '@/utils/AjaxData.js'
// import { showFullScreenLoading, hideFullScreenLoading } from '@/utils/Loading.js'
import axios from 'axios'

// 服务器地址
const serverUrl = '127.0.0.1:9950'
// const wsServer = 'ws://' + serverUrl + '/ws'
const apiServer = 'http://' + serverUrl

export default {
  name: 'Navigator',
  components: {
    Game
  },
  data () {
    // initial data
    return {
      // 合约函数
      appContractWriter: this.$Dapp.Bridges.writer,
      appContractReader: this.$Dapp.Bridges.read,

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
        gameUrl: 'https://dontil.github.io/test/'
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
        profile: false,
        game: false,
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
      gotoNum: ''
    }
  },
  props: {
    msg: String
  },
  methods: {
    navi () {
      console.log('[navigator] navi ', this.$Dapp)
    },
    async login (isInit) {
      const _that = this
      console.log('[Main] login ', _that.$Dapp)
      await _that.$Dapp.connect()
      _that.playerInfo.address = _that.$Dapp.Bridges.ethereum.selectedAddress
      console.log('address ', _that.playerInfo.address)

      // set profile
      if (_that.playerInfo.address !== '') {
        _that.playerInfo.isLogin = true
        _that.playerInfo.status = 1

        if (isInit) {
          alert('Metamask had connect success')
        }
      }
      const message = {
        source: 'web',
        type: 'updateTitle'
      }
      sendMessage(message)
    },
    resetPopWindow () {
      // reset all pop
      for (var item in this.showInfo) {
        this.showInfo[item] = false
      }
    },
    resetMintFloor () {
      // reset all pop
      this.playerInfo.mintFloorNumId = []
      this.playerInfo.mintFloorTokenId = []
    },
    hot () {
      this.resetPopWindow() // reset

      const _that = this
      if (_that.showInfo.hot) {
        _that.showInfo.hot = false
      } else {
        _that.showInfo.hot = true
      }
      // 添加关闭倒计时
    },
    async displayProfileInfo () {
      // show the profile
      const _that = this

      // common login
      _that.login()

      _that.showInfo.profile = true

      // 独立出去
      // ajaxGetAllNfts(window.ethereum.selectedAddress).then(response => {
      //   console.log('ajaxGetAllNfts:', response)
      //   for (var v in response.content) {
      //     const image = JSON.parse(response.content[v].nft_json).image
      //     this.playerInfo.allNfts.push({
      //       token_id: response.content[v].token_id,
      //       nft_name: response.content[v].nft_name,

      //       // ipfs://QmQqzMTavQgT4f4T5v6PWBp7XNKtoPmC9jvn12WPT3gkSE
      //       // https://ipfs.io/ipfs/QmQqzMTavQgT4f4T5v6PWBp7XNKtoPmC9jvn12WPT3gkSE
      //       image: image.replace('ipfs://', 'https://ipfs.io/ipfs/')
      //     })
      //   }
      // })
      // get all my nft list
      const url = apiServer + '/user/getallnft?address=' + window.ethereum.selectedAddress
      await axios.post(url).then(response => {
        const data = response.data.Data

        // TODO not support more then 100 nft
        console.log('response:', data.data)
        if (data.code !== 200) {
          alert('get error, please try again')
        } else {
          const result = data.data.content
          for (var v in result) {
            let image = JSON.parse(result[v].nft_json).image
            if (image !== '') {
              image = image.replace('ipfs://', 'https://ipfs.io/ipfs/')
            }
            this.playerInfo.allNfts.push({
              token_id: result[v].token_id,
              nft_name: result[v].nft_name,

              // ipfs://QmQqzMTavQgT4f4T5v6PWBp7XNKtoPmC9jvn12WPT3gkSE
              // https://ipfs.io/ipfs/QmQqzMTavQgT4f4T5v6PWBp7XNKtoPmC9jvn12WPT3gkSE
              image: image
            })
          }
        }
      })
    },
    async mint () {
      await this.login()

      const _that = this
      if (_that.showInfo.mint) {
        _that.showInfo.mint = false
      } else {
        _that.showInfo.mint = true
      }
      // 添加关闭倒计时
    },
    async realMint () {
      const floorNum = 1
      const floorPrice = ethers.utils.parseEther('0.1')
      console.log('realmint:::', floorNum, floorPrice)

      // All overrides are optional
      const overrides = {
        gasLimit: 23000, // default
        gasPrice: ethers.utils.parseUnits('9.0', 'gwei'), // default
        value: floorPrice
      }
      await this.$Dapp.Bridges.writer.mint(floorNum, overrides).then(function (ret) {
        console.log(ret)
        alert('你得到 NFT 的tokenID是：' + ret.events.MintToken.returnValues.tokenId)
      })
    },
    // closedd
    close () {
      const _that = this
      _that.showInfo.profile = false
    },
    click () {
      const message = {
        source: 'web',
        type: 'updateTitle'
      }
      sendMessage(message)
    },
    async myFloor () {
      this.resetPopWindow() // reset
      this.resetMintFloor() // reset
      console.log('click myFloor')
      await this.login()

      if (this.showInfo.myFloor) {
        this.showInfo.myFloor = false
      } else {
        this.showInfo.myFloor = true
      }

      const address = window.ethereum.selectedAddress
      const contractWriter = this.$Dapp.Bridges.writer
      const playerInfo = this.playerInfo

      await contractWriter.balanceOf(address).then(function (ret) {
        const len = parseInt(ret)
        console.log('call balanceOf:', ret, len)
        if (len === 0) {
          alert('Your have nothing nft')
          return
        }

        for (let i = 0; i < len; i++) {
          contractWriter.tokenOfOwnerByIndex(address, i).then(function (tokenId) {
            console.log('call tokenOfOwnerByIndex:', tokenId)

            contractWriter.getTokenInfo(tokenId).then(function (ret) {
              console.log('call getTokenInfo:', ret)
              playerInfo.mintFloorTokenId.push(parseInt(ret.tokenId))
              playerInfo.mintFloorNumId.push(parseInt(ret.floorNo))
            })
          })
        }
      })

      // this.playerInfo.mintFloorTokenId = mintFloorTokenId
      // this.playerInfo.mintFloorNumId = mintFloorNumId
    },
    async myFollowing () {
      this.resetPopWindow() // reset
      console.log('click myFollowing')
      await this.login()

      const _that = this
      if (_that.showInfo.myFollowing) {
        _that.showInfo.myFollowing = false
      } else {
        _that.showInfo.myFollowing = true
      }

      // 独立出去
      // const result = ajaxGetMyFollower(window.ethereum.selectedAddress)
      // console.log('return result:', result)
      // get all my followering list
      const url = apiServer + '/followerpeople/listbymefollower?from=' + window.ethereum.selectedAddress
      await axios.post(url).then(response => {
        const data = response.data
        console.log('response-2:', data)
        if (data.Code !== 0) {
          console.log('get error, please try again')
        } else {
          for (var v in data.Data) {
            console.log('获取我的关注列表', data.Data[v])
          }

          this.playerInfo.myFollowing = data.Data
        }
      })
    },
    async myFollowed () {
      this.resetPopWindow() // reset
      console.log('click myFollowed')
      await this.login()

      const _that = this
      if (_that.showInfo.myFollowed) {
        _that.showInfo.myFollowed = false
      } else {
        _that.showInfo.myFollowed = true
      }

      // 独立出去
      // const result = ajaxGetMyFollower(window.ethereum.selectedAddress)
      // console.log('return result:', result)
      // get all my followering list
      const url = apiServer + '/followerpeople/listbyfollowerme?from=' + window.ethereum.selectedAddress
      await axios.post(url).then(response => {
        const data = response.data
        console.log('response-2:', data)
        if (data.Code !== 0) {
          console.log('get error, please try again')
        } else {
          for (var v in data.Data) {
            console.log('获取关注我的列表', data.Data[v])
          }

          this.playerInfo.myFollowed = data.Data
        }
      })
    },
    room () {
      alert('room coming soon')
    },
    avatar () {
      alert('avatar coming soon')
    },
    async goto () {
      await this.appContractWriter.getTokenInfo(this.gotoNum).then(function (ret) {
        console.log('call getTokenInfo:', ret)
        const tokenId = parseInt(ret.tokenId)
        console.log('token id:', tokenId)
        if (tokenId === 0) {
          alert('this floor not available(may be you want to mint?), please input the right number')
        } else {
          alert('going to the floor[' + tokenId + '] ...')
          alert('coming soon :)')
        }
      })
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
</style>
