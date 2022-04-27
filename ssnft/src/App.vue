<template>
  <router-view></router-view>
</template>

<script>
export default {
  name: 'App',
  created () {
    console.log('[App] created start!')
  }
}
// document.oncontextmenu = function () {
//   return false
// }
// 禁用右键

document.onkeydown = () => {
// 禁用F12
  if (window.event && window.event.keyCode === 123) {
    return false
  // 禁用ctrl+shift+i,
  } else if (window.event.ctrlKey && window.event.keyCode === 65) {
    return false
    // 屏蔽Shift+F10
  } else if (window.event.shiftKey && window.event.keyCode === 121) {
    return false
  }
}
</script>

<style>
</style>
