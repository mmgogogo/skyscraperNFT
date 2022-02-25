import axios from 'axios'
import qs from 'qs'

// 服务器地址
// const serverUrl = '127.0.0.1:9950'
const serverUrl = 'iamxmm.xyz'
// const wsServer = 'ws://' + serverUrl + '/ws'
const apiServer = 'https://' + serverUrl

// 添加关注地址
export async function ajaxAddFollowerPeople (from, to) {
  console.log('[AjaxData] call ajaxAddFollowerPeople:', from, to)

  const url = apiServer + '/followerpeople/add'
  const params = {
    from: from,
    to: to
  }
  await axios.post(url, qs.stringify(params)).then(response => {
    const data = response.data

    // TODO not support more then 100 nft
    console.log('[AjaxData] ajaxAddFollowerPeople response-2:', data)
    if (data.Code !== 0) {
      alert('bind error')
    } else {
      alert('bind success')
    }
  })
}

// 添加关注楼层
export async function ajaxAddFollowerToken (address, tokenId) {
  console.log('[AjaxData] call ajaxAddFollowerToken:', address, tokenId)

  const url = apiServer + '/followertoken/add'
  const params = {
    address: address,
    tokenId: tokenId
  }
  await axios.post(url, qs.stringify(params)).then(response => {
    const data = response.data

    console.log('[AjaxData] ajaxAddFollowerToken response-2:', data)
    if (data.Code !== 0) {
      alert('bind error')
    } else {
      alert('bind success')
    }
  })
}

// 添加关注楼层
export async function ajaxGetHotToken () {
  console.log('[AjaxData] call ajaxGetHotToken:')

  let result = []
  const url = apiServer + '/followertoken/hot'
  await axios.post(url).then(response => {
    const data = response.data

    console.log('[AjaxData] ajaxGetHotToken response-2:', data)
    if (data.Code !== 0) {
      console.log('[AjaxData] ajaxGetHotToken failed,' + data.Msg)
    } else {
      result = data.Data
    }
  })

  return result
}

// 添加楼层留言
export async function ajaxAddTokenInfo (tokenId, remark) {
  console.log('[AjaxData] call ajaxAddTokenInfo:', tokenId, remark)

  const url = apiServer + '/token/add'
  const params = {
    tokenId: tokenId,
    remark: remark
  }
  await axios.post(url, qs.stringify(params)).then(response => {
    const data = response.data

    console.log('[AjaxData] ajaxAddTokenInfo response-2:', data)
    if (data.Code !== 0) {
      alert('bind error')
    } else {
      alert('bind success')
    }
  })
}

// 获取我的关注列表
export async function ajaxGetMyFollower (type, address) {
  console.log('[AjaxData] call ajaxGetMyFollower:', type, address)

  const url = apiServer + '/followerpeople/' + type + '?from=' + address
  let result = []

  await axios.post(url).then(response => {
    const data = response.data

    console.log('[AjaxData] ajaxGetMyFollower response-2:', data)
    if (data.Code !== 0) {
      console.log('[AjaxData] get error, please try again')
    } else {
      for (var v in data.Data) {
        console.log('[AjaxData] 获取我的关注列表', data.Data[v])
      }

      result = data.Data
    }
  })

  return result
}

// 获取个人nft列表
export async function ajaxGetAllNfts (address) {
  const result = []

  // get all my nft list
  const url = apiServer + '/user/getallnft?address=' + address
  await axios.post(url).then(response => {
    const data = response.data.Data

    // TODO not support more then 100 nft
    console.log('[AjaxData] ajaxGetAllNfts response:', data)
    if (data.code === 200) {
      const items = data.data.content
      for (var v in items) {
        // const image = JSON.parse(result[v].nft_json).image
        const imageInfo = JSON.parse(items[v].nft_json)
        let image = imageInfo.image // erc721
        if (image === undefined || image === '') {
          image = imageInfo.image_url // ens
        }
        if (image !== undefined) {
          image = image.replace('ipfs://', 'https://ipfs.io/ipfs/')
        }
        result.push({
          token_id: items[v].token_id,
          nft_name: items[v].nft_name,

          // ipfs://QmQqzMTavQgT4f4T5v6PWBp7XNKtoPmC9jvn12WPT3gkSE
          // https://ipfs.io/ipfs/QmQqzMTavQgT4f4T5v6PWBp7XNKtoPmC9jvn12WPT3gkSE
          image: image
        })
      }
    }
  })

  return result
}
