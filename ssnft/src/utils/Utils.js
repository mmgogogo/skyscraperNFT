// 获取当前时间戳
export function curTimeSe () {
  return parseInt((new Date()).valueOf() / 1000)
}

/**
 * 缓存格式是个JSON，前面是data，后面是过期时间
 * @param {integer} key
 * @param {string} value
 * @param {integer} sec 过期时间，秒为单位
 */
export function addLocalStorage (key, value, sec) {
  if (sec === undefined) {
    sec = 60 * 60
  }
  localStorage.setItem(key, JSON.stringify({ data: value, expire: curTimeSe() + sec }))
}

export function getLocalStorage (key) {
  let data = localStorage.getItem(key)
  data = JSON.parse(data)
  console.log('[Utils] getLocalStorage', data)
  if (data === null || data.expire < curTimeSe()) {
    return null
  } else {
    return data.data
  }
}
