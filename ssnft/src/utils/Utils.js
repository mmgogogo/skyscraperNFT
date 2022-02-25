export default function sendMessage (message, callback) {
  // 获取通信的子iframe
  // iframe对象 TODO 这里可以再想想
  const iframe = window.frames[0]
  console.log('iframe is ', iframe)
  if (!iframe) {
    console.log('[global] ifram not created')
  } else {
    // 向目标iframe发送message,"*"可以通过指定地址,限制发送的目标
    iframe.postMessage(message, '*')
  }
  if (callback) {
    // 100毫秒后用户可再次点击控制按钮发送请求
    setTimeout(callback, 100)
  }
}

window.addEventListener('message', function (event) {
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
    console.log('[Main] event data ', data)
    try {
      // 这里写处理方法
      // 例如：如果是nft消息，通过nft处理方法来处理
      if ('type' in data) {
        const type = data.type
        // nftList
        if (type === 'nftList' && data.source === 'game') {
          processNFTList(data)
        } else if (type === 'follow') {
          processFollowInfo(data)
        }
      }
    } catch (e) {
      console.log('[Main] exception is ', e)
    }
  }
}, false)

function processNFTList (params) {
  const wallet = params.wallet
  // todo data
  // data structure
  // {
  //     type: "nftList",
  //     source: "web",
  //     data: [{"img":"...", "type":"eth"},{}]
  // }
  // let nftList = getUserNFTList(wallet)
  const message = {
    type: 'nftList',
    source: 'web',
    data: {
      wallet: wallet,
      nftList: [] // nftList
    }
  }
  sendMessage(message)
}

function processFollowInfo (params) {
  // 关注了谁
  const follower = params.follower
  // 我是谁
  const me = ''
  // 关注的房间
  const roomId = params.roomId
  // 发生时间
  const time = params.time
  console.log('[Web] [Utils] ', { follower: follower, roomId: roomId, time: time, me: me })
  // todo data
  // data structure
  // 我关注了谁
  // {
  //   'from':me,
  //   'roomId': 0,
  //   'time': now,
  //   'to': follower
  // }
  // 谁关注了我
  // {
  //   'from':me,
  //   'roomId': 0,
  //   'time': now,
  //   'to': follower
  // }
  // let followingInfo = {'follower':'', 'roomId': 0, 'time': now, 'me': ''}
  // saveFollowInfo(followingInfo)
}
