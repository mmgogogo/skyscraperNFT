import Vue from 'vue'

let loading
let needLoadingRequestCount = 0
function startLoading (targetdq) {
  loading = Vue.prototype.$loading({
    lock: true,
    text: '努力加载中...',
    background: 'rgba(255,255,255,.4)',
    target: document.querySelector(targetdq)
  })
}

function endLoading () {
  loading.close()
}
export function showFullScreenLoading (targetdq) {
  if (needLoadingRequestCount === 0) {
    startLoading(targetdq)
  }
  needLoadingRequestCount++
}
export function hideFullScreenLoading () {
  if (needLoadingRequestCount <= 0) return
  needLoadingRequestCount--
  if (needLoadingRequestCount === 0) {
    endLoading()
  }
}

export default {
  showFullScreenLoading,
  hideFullScreenLoading
}
