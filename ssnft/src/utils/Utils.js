export default function sendMessage(message, callback)
{
  // 获取通信的子iframe
  // iframe对象 TODO 这里可以再想想
  const iframe = window.frames[0]

  // 向目标iframe发送message,"*"可以通过指定地址,限制发送的目标
  iframe.postMessage(JSON.stringify(message), "*")
  if (callback) {
    // 100毫秒后用户可再次点击控制按钮发送请求
    setTimeout(callback,100)
  }
}
