<template>
  <router-view></router-view>
</template>

<script>
export default {
  name: 'App',
  created () {
    console.log('[App] created start!')
    const _that = this
    console.log('[App] _that is ', _that.$Dapp)
  }
}
</script>
<style>
</style>
