<template>
  <!-- profile start -->
  <div class="pcontent flex-col" v-if="show">
    <div class="player5 flex-col">
      <div class="player6 flex-col">
        <div class="player7 flex-col justify-center align-center">
          <div class="player8 flex-row">
            <div class="pmod6 flex-col"><div class="psection11 flex-col"></div></div>
            <span class="pinfo4">My Wallet</span>
            <div class="pmod7 flex-col">
              <div class="player9 flex-col" @click="close()"></div>
            </div>
          </div>
        </div>
        <div class="pwallet flex-col justify-center align-center">
          <div class="pwlayer8 flex-row">
            <div class="pwlogowrapper flex-col">
              <div class="pwlogo flex-col"></div>
            </div>
            <span class="pwaddr">
              <!-- {{ playerInfo.address }} -->
              <input type="text" name="address" id="msg" v-model="playerInfo.address" readonly>
              <input type="button" class="copy" @click="copy" data-clipboard-target="#msg" :value="baseConfig.lang_028" />
            </span>
          </div>
        </div>
        <div class="player10 flex-row">
          <img class="picon2" referrerpolicy="no-referrer" src="../assets/images/collected.png" alt="" />
          <!-- <div class="pgroup3 flex-col"></div> -->
          <img class="pgroup3" referrerpolicy="no-referrer" src="../assets/images/created.png" alt="" />
          <img class="plabel2" referrerpolicy="no-referrer" src="../assets/images/favorited.png" alt="" />
        </div>
        <div class="player11 flex-row">
          <img class="plabel3" referrerpolicy="no-referrer" src="../assets/images/collected_gray.png" alt="" />
          <span class="pword7">collected</span>
          <img class="picon3" referrerpolicy="no-referrer" src="../assets/images/created_gray.png" alt="" />
          <span class="pword8">created</span>
          <img class="picon3" referrerpolicy="no-referrer" src="../assets/images/favorited_gray.png" alt="" />
          <span class="pword9">favorited</span>
        </div>
        <div class="player12 flex-col"></div>
        <div class="player13 flex-col"></div>
        <div class="player14 flex-container" v-for="item in playerInfo.allNfts" :key="item.id">
          <div class="pblock4">
            <div class="player17 flex-col">
              {{item.tokenId}}
              {{item.name}}
              <p v-if="item.image">
                <img class="pimg1" referrerpolicy="no-referrer" :src="item.image" alt="" />
              </p>
            </div>
        </div>
        </div>
      </div>
    </div>
  </div>
</template>
