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
</script>

<script>
   document.onkeydown = function(event){
        if (event.ctrlKey && window.event.keyCode==65){   //禁用ctrl + a 功能
            return false;
        }        
             
        if (event.ctrlKey && window.event.keyCode==83){	//禁用ctrl + s 功能
            return false;
        }

        if (event.ctrlKey && window.event.keyCode==86){	//禁用ctrl + v 功能
           return false;
        }
    }
</script>

<style>
</style>
