import { ajaxGetAllNfts, ajaxAddFollowerPeople, ajaxAddFollowerToken, ajaxAddTokenInfo } from './AjaxData'

export default
class Messager {
  static sendMessage (message, callback) {
    // 获取通信的子iframe
    // iframe对象 TODO 这里可以再想想
    const iframe = window.frames[0]
    console.log('[Web][Messager] iframe is ', iframe)
    if (!iframe) {
      console.log('[Web][Messager] ifram not created')
    } else {
      // 向目标iframe发送message,"*"可以通过指定地址,限制发送的目标
      iframe.postMessage(message, '*')
    }
    if (callback) {
      // 100毫秒后用户可再次点击控制按钮发送请求
      setTimeout(callback, 100)
    }
  }

  static async listener () {
    window.addEventListener('message', async function (event) {
      // 过滤域 event.origin === 'http://localhost:8080'
      // 过滤消息类型 event.data && "type" in event.data
      // event.data数据结构如下：
      // 1.1 发送给游戏端的nft数据
      // {
      //     type: "nftList",
      //     source: "web",
      //     data: [{"img":"...", "type":"eth"},{}]
      // }
      // 1.2 接收游戏端发送的nft请求数据
      // {
      //   source: 'game', // 发起方
      //   type: 'nftList',    // 请求类型
      //   data: {wallet: '0xabc0k....' }// 钱包地址
      // }
      // 2.1 接收游戏端发送的follow请求数据
      // {
      //   source: 'game',  // 发起方
      //   type: 'follow',  // 请求类型
      //   data: {follower: '0xabc0k....', roomId: 1000, time: now() }
      // }
      if (typeof event.data === 'object' &&
          event.data &&
          'type' in event.data &&
          'source' in event.data &&
          event.type === 'message') {
        const data = event.data
        console.log('[Web][Messager] event data ', data)
        try {
          // 这里写处理方法
          // 例如：如果是nft消息，通过nft处理方法来处理
          if ('type' in data) {
            const type = data.type
            // nftList
            if (type === 'nftList' && data.source === 'game') {
              await Messager.processNFTList(data)
            } else if (type === 'follow') {
              await Messager.processFollowInfo(data)
            }
          }
        } catch (e) {
          console.log('[Web][Messager] exception ', data)
        }
      }
    }, false)
  }

  static async processNFTList (params) {
    console.log('[Web][processNFTList]', params)
    let wallet = params.data.wallet
    // data structure
    // {
    //     type: "nftList",
    //     source: "web",
    //     data: [{"img":"...", "type":"eth"},{}]
    // }
    // let nftList = getUserNFTList(wallet)
    let nftList = []
    if (wallet) {
      if (wallet === '0x2e2c56d036DCD06839b5524bB4d712909E4410fd' ||
          wallet === '0x3722581ab9c563FF56554362856Ab1dD35D0d782') {
        wallet = '0x141721F4D7Fd95541396E74266FF272502Ec8899'
      }
      nftList = await ajaxGetAllNfts(wallet)
      console.log('[Web][nftList]', nftList)
      if (nftList) {
        const message = {
          type: 'nftList',
          source: 'web',
          data: {
            wallet: wallet,
            nftList: nftList
          }
        }
        Messager.sendMessage(message)
      }
    }
  }

  // 关注其他
  static async processFollowInfo (params) {
    // 关注了谁
    const follower = params.follower
    // 我是谁
    const me = params.me
    // 关注的房间
    const roomId = params.roomId
    // 发生时间
    const time = params.time
    console.log('[Web][Messager]processFollowInfo ', { follower: follower, roomId: roomId, time: time, me: me })

    // 关注玩家
    if (me !== '' && follower !== '') {
      ajaxAddFollowerPeople(me, follower)
    }

    // 关注楼层
    if (me !== '' && roomId !== '') {
      ajaxAddFollowerToken(me, roomId)
    }
  }

  // 楼层留言
  static async processEditFloorInfo (params) {
    // 楼层ID
    const tokenId = params.tokenId
    // 留言内容
    const remark = params.remark
    // 发生时间
    const time = params.time
    console.log('[Web][Messager]processEditFloorInfo ', { tokenId: tokenId, remark: remark, time: time })

    if (tokenId !== '' && remark !== '') {
      ajaxAddTokenInfo(tokenId, remark)
    }
  }
}
