export default function sendMessage (message, callback) {
  // 获取通信的子iframe
  // iframe对象 TODO 这里可以再想想
  const iframe = window.frames[0]
  console.log('iframe is ', iframe)

  // 向目标iframe发送message,"*"可以通过指定地址,限制发送的目标
  iframe.postMessage(message, '*')
  if (callback) {
    // 100毫秒后用户可再次点击控制按钮发送请求
    setTimeout(callback, 100)
  }
}

window.addEventListener('message', function (event) {
  // 过滤域 event.origin === 'http://localhost:8080'
  // 过滤消息类型 event.data && "type" in event.data
  // event.data数据结构如下：
  // 1. nft数据
  // {
  //     type: "nftList",
  //     source: "web",
  //     data: [{"img":"...", "type":"eth"},{}]
  // }
  console.log('[Main] exception is ', event)
  if (event.data && 'type' in event.data && 'source' in event.data && event.type === 'message') {
    const data = event.data
    console.log('[Main] data ', data)
    try {
      // 这里写处理方法
      // 例如：如果是nft消息，通过nft处理方法来处理
    } catch (e) {
      console.log('[Main] exception is ', e)
    }
  }
}, false)
