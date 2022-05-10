import { ajaxGetAllNfts, ajaxAddFollowerPeople, ajaxAddFollowerToken, ajaxAddTokenInfo } from './AjaxData'

export default
class Messager {
  static sendMessage (message, callback) {
    // Get subiframe
    // iframe object TODO think more
    const iframe = window.frames[0]
    console.log('[Web][Messager] sendMessage iframe is ', iframe, message)
    if (!iframe) {
      console.log('[Web][Messager] sendMessage ifram not created')
    } else {
      // Send message to object iframe,"*" for all can limit send origin object by a special url
      iframe.postMessage(message, '*')
    }
    if (callback) {
      // 100 limit send more frequence
      setTimeout(callback, 100)
    }
  }

  static async listener () {
    window.addEventListener('message', async function (event) {
      // Filt origin, event.origin === 'http://localhost:8080'
      // Filt event type, event.data && "type" in event.data
      // event.data Data Structure as follow：
      // 1.1 Send nft data to Game
      // {
      //     type: "nftList",
      //     source: "web",
      //     data: [{"img":"...", "type":"eth"},{}]
      // }
      // 1.2 Receive nft request message sent by Game
      // {
      //   source: 'game', // from
      //   type: 'nftList',    // request type
      //   data: {wallet: '0xabc0k....' } // wallet address
      // }
      // 2.1 Receive follow request message send by Game
      // {
      //   source: 'game',  // from
      //   type: 'follow',  // request type
      //   data: {follower: '0xabc0k....', roomId: 1000, time: now() }
      // }
      // 2.2 Receive unfollow request data sent by Game
      // {
      //   source: 'game',  // from
      //   type: 'unfollow',  // request type
      //   data: {follower: '0xabc0k....', roomId: 1000, time: now() } // follower:follower address, roomId:follower floorId
      // }
      // 3.1 Fetch followed info
      // {
      //   source: 'game',  // from
      //   type: 'followingList',  // request type
      //   data: {address:0xabcdd...} // address:user wallet address
      // }
      // return [{address:被关注者,roomId:被关注楼层,createTime:followed time}, ...]
      // 3.2 Fetch following info
      // {
      //   source: 'game',  // from
      //   type: 'followedList',  // request type
      //   data: {address: '0xabc0k....', roomId: 1000 } // address: user wallet address, roomId: floorId
      // }
      // return [{address:关注者,createTime:关注时间}, ...]
      if (typeof event.data === 'object' &&
          event.data &&
          'type' in event.data &&
          'source' in event.data &&
          event.type === 'message') {
        const data = event.data
        console.log('[Web][Messager] received event data ', data)
        try {
          // Event process function here
          // e.g. If it is nft event message, use NftProcessFunc to process it
          if ('type' in data) {
            const type = data.type
            // nftList
            if (type === 'nftList' && data.source === 'game') {
              await Messager.processNFTList(data)
            } else if (type === 'follow') {
              await Messager.processFollowInfo(data)
            } else if (type === 'followingList') {
              // listbymefollower
              // await Messager.getFollowingList(data)
            } else if (type === 'followedList') {
              // listbyfollowerme
              // await Messager.getFollowedList(data)
            } else if (type === 'remark') {
              await Messager.processEditFloorInfo(data)
            }
          }
        } catch (e) {
          console.log('[Web][Messager] received exception ', data)
        }
      }
    }, false)
  }

  // data structure
  // {
  //     type: "nftList",
  //     source: "web",
  //     data: [{"img":"...", "type":"eth"},{}]
  // }
  // let nftList = getUserNFTList(wallet)
  static async processNFTList (params) {
    console.log('[Web][processNFTList]', params)
    let wallet = params.data.wallet
    let nftList = []
    if (wallet) {
      if (wallet === '0x2e2c56d036DCD06839b5524bB4d712909E4410fd'.toLowerCase() ||
          wallet === '0x3722581ab9c563FF56554362856Ab1dD35D0d782'.toLowerCase()) {
        wallet = '0x141721F4D7Fd95541396E74266FF272502Ec8899'.toLowerCase()
      }
      nftList = await ajaxGetAllNfts(wallet)
      console.log('[Web][nftList]', nftList)
      if (nftList) {
        const message = {
          type: 'nftList',
          source: 'web',
          data: {
            wallet: params.data.wallet,
            nftList: nftList
          }
        }
        Messager.sendMessage(message)
      }
    }
  }

  // process follow info
  static async processFollowInfo (data) {
    if (!data.data) {
      return
    }
    const params = data.data
    // followed someone address
    const follower = params.follower
    // Who is me? my address
    const me = params.me
    // followed roomId
    const roomId = params.roomId
    // create time
    const time = params.time
    console.log('[Web][Messager]processFollowInfo ', { follower: follower, roomId: roomId, time: time, me: me })

    // followed address
    if (me !== '' && follower !== '') {
      await ajaxAddFollowerPeople(me, follower)
    }

    // floor id
    if (me !== '' && roomId !== '') {
      await ajaxAddFollowerToken(me, roomId)
    }
  }

  // AddressFrom: "0x3722581ab9c563ff56554362856ab1dd35d0d782"
  // AddressTo: "6829"
  // CreateTime: 1645525956
  // Deleted: 0
  // Id: 7
  static async getFollowingList (params) {

  }

  // AddressFrom: "4266"
  // AddressTo: "0x3722581ab9c563ff56554362856ab1dd35d0d782"
  // CreateTime: 1645530942
  // Deleted: 0
  // Id: 10
  static async getFollowedList (params) {

  }

  // floor message
  static async processEditFloorInfo (data) {
    if (!data.data) {
      return
    }
    const params = data.data
    const tokenId = params.tokenId
    const remark = params.remark
    const time = params.time
    console.log('[Web][Messager]processEditFloorInfo ', { tokenId: tokenId, remark: remark, time: time })

    if (tokenId !== '' && remark !== '') {
      ajaxAddTokenInfo(tokenId, remark)
    }
  }
}
