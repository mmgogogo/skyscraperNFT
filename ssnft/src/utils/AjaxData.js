import axios from 'axios'
import qs from 'qs'

// 服务器地址
const serverUrl = '127.0.0.1:9950'
// const wsServer = 'ws://' + serverUrl + '/ws'
const apiServer = 'http://' + serverUrl

// 添加关注地址
export async function ajaxAddFollowerPeople (from, to) {
  console.log('call ajaxAddFollowerPeople:', from, to)

  const url = apiServer + '/followerpeople/add'
  const params = {
    from: from,
    to: to
  }
  await axios.post(url, qs.stringify(params)).then(response => {
    const data = response.data

    // TODO not support more then 100 nft
    console.log('ajaxAddFollowerPeople response-2:', data)
    if (data.Code !== 0) {
      alert('bind error')
    } else {
      alert('bind success')
    }
  })
}

// 添加关注楼层
export async function ajaxAddFollowerToken (address, tokenId) {
  console.log('call ajaxAddFollowerToken:', address, tokenId)

  const url = apiServer + '/followertoken/add'
  const params = {
    address: address,
    tokenId: tokenId
  }
  await axios.post(url, qs.stringify(params)).then(response => {
    const data = response.data

    console.log('ajaxAddFollowerToken response-2:', data)
    if (data.Code !== 0) {
      alert('bind error')
    } else {
      alert('bind success')
    }
  })
}

// 添加关注楼层
export async function ajaxGetHotToken () {
  console.log('call ajaxGetHotToken:')

  let result = []
  const url = apiServer + '/followertoken/hot'
  await axios.post(url).then(response => {
    const data = response.data

    console.log('ajaxGetHotToken response-2:', data)
    if (data.Code !== 0) {
      console.log('ajaxGetHotToken failed,' + data.Msg)
    } else {
      result = data.Data
    }
  })

  return result
}

// 添加楼层留言
export async function ajaxAddTokenInfo (tokenId, remark) {
  console.log('call ajaxAddTokenInfo:', tokenId, remark)

  const url = apiServer + '/token/add'
  const params = {
    tokenId: tokenId,
    remark: remark
  }
  await axios.post(url, qs.stringify(params)).then(response => {
    const data = response.data

    console.log('ajaxAddTokenInfo response-2:', data)
    if (data.Code !== 0) {
      alert('bind error')
    } else {
      alert('bind success')
    }
  })
}

// 获取我的关注列表
export function ajaxGetMyFollower (address) {
  console.log('call ajaxGetMyFollower:', address)
  const url = apiServer + '/followerpeople/listbyaddress?from=' + address
  axios.post(url).then(response => {
    const data = response.data

    console.log('ajaxGetMyFollower response-2:', data)
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
    console.log('ajaxGetAllNfts response:', data.data)
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
