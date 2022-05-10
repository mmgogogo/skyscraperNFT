<template>
  <Main />
</template>

<script>
import Main from '@/components/Main.vue'

export default {
  name: 'Home',
  components: {
    Main
  }
  // methods: {
  //   handleEvent (event) {
  //     if ((event.ctrlKey && event.keyCode === 67) ||
  //         (event.metaKey && event.keyCode === 65)) {
  //       event.preventDefault()
  //     }
  //   }
  // },
  // mounted () {
  //   window.addEventListener('keydown', this.handleEvent)
  // },
  // beforeUnmount () {
  //   window.removeEventListener('keydown', this.handleEvent)
  // }
}
</script>
