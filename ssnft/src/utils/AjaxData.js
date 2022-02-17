import axios from 'axios'

// 服务器地址
const serverUrl = '127.0.0.1:9950'
// const wsServer = 'ws://' + serverUrl + '/ws'
const apiServer = 'http://' + serverUrl

// 获取我的关注列表
export function ajaxGetMyFollower (address) {
  console.log('call ajaxGetMyFollower:', address)
  const url = apiServer + '/followerpeople/listbyaddress?from=' + address
  axios.post(url).then(response => {
    const data = response.data

    // TODO not support more then 100 nft
    console.log('response-2:', data)
    if (data.Code !== 0) {
      console.log('get error, please try again')
    } else {
      for (var v in data.Data) {
        console.log('获取我的关注列表', data.Data[v])
      }

      return data.Data
    }
  })

  return []
}

// 获取个人nft列表
export async function ajaxGetAllNfts (address) {
  let result = []

  // get all my nft list
  const url = apiServer + '/user/getallnft?address=' + address
  axios.post(url).then(response => {
    const data = response.data.Data

    // TODO not support more then 100 nft
    console.log('response:', data.data)
    if (data.code !== 200) {
      alert('get error, please try again')
    } else {
      result = data.data.content
    }
  })

  return result
}

export default {
  ajaxGetMyFollower,
  ajaxGetAllNfts
}
