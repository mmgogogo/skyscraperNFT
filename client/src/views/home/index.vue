<template>
  <div class="page flex-col">
    <div class="section1 flex-col">
      <div class="main1 flex-col align-center">
        <div class="outer1 flex-col">
          <div class="bd1 flex-col">
            <div class="outer2 flex-col justify-between">
              <span class="info1">Total&nbsp;Floor</span>
              <div class="box1 flex-row justify-between">
                <img
                  class="icon1"
                  referrerpolicy="no-referrer"
                  src="./assets/img/SketchPng22daa5ba3213dc66b69225f304e370a7664e45caaa785a77341fdc41eb1286e3.png"
                />
                <span class="txt1">12</span>
              </div>
            </div>
          </div>
          <div class="bd2 flex-row justify-between">
            <div class="section2 flex-col">
              <div class="section3 flex-row justify-between">
                <div class="outer3 flex-col"></div>
                <div class="outer4">
                  <span class="info2">search</span>
                  <span class="word1">…</span>
                </div>
              </div>
            </div>
            <div class="section4 flex-col align-center"><span class="txt2">GO</span></div>
          </div>
          <div class="bd3 flex-row justify-between">
            <div class="layer1 flex-col"></div>
            <span class="word2">My&nbsp;Floor</span>
          </div>
          <div class="bd4 flex-row justify-between">
            <div class="bd5 flex-col"></div>
            <span class="info3">Following</span>
          </div>
          <div class="bd6 flex-row justify-between">
            <img
              class="label1"
              referrerpolicy="no-referrer"
              src="./assets/img/SketchPngb5825691ad512702214a1ac2306a2a3856324bb54e8ef9f1f3eb48cc2f8ac308.png"
            />
            <span class="word3">Followed</span>
          </div>
          <div class="bd7 flex-row justify-between">
            <div class="group1 flex-col"></div>
            <router-link to="/building/hot">Hot</router-link>
            <!-- <span class="info4">Hot</span> -->
          </div>
          <div class="bd8 flex-row justify-between">
            <div class="layer2 flex-col align-center">
              <div class="layer3 flex-col justify-between">
                <div class="layer4 flex-col"></div>
                <span class="txt3">
                  <router-link to="/building/mint">Mint</router-link>
                </span>
              </div>
            </div>
            <div class="layer5 flex-col align-center">
              <div class="group2 flex-col justify-between">
                <img
                  class="label2"
                  referrerpolicy="no-referrer"
                  src="./assets/img/SketchPng761b6545dec0faf9196ceabe44734f37945c18d76dcd24495b1dfc2be778eb39.png"
                />
                <!-- <span class="word4">Room</span> -->
                <router-link to="/building/room">Room</router-link>
              </div>
            </div>
          </div>
          <div class="bd9 flex-row justify-between">
            <div class="group3 flex-col">
              <div class="box2 flex-col justify-between">
                <div class="mod1 flex-col"></div>
                <span class="word5">Avatar</span>
              </div>
            </div>
            <div class="group4 flex-col">
              <span class="paragraph1">
                Not&nbsp;
                <br />
                open
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <router-view />
    <router-view name="helper" />

    <div class="section5 flex-col justify-center">
      <div class="bd10 flex-row">
        <div class="layer6 flex-col"></div>
        <div class="layer7 flex-col"></div>
        <div class="layer8 flex-col"></div>
      </div>
    </div>
    <img
      class="img1"
      referrerpolicy="no-referrer"
      src="./assets/img/SketchPng2cd17253aeaaf9bc07ee691bdec4276b99b0a80e1ad4ec89e4cd4d5719fae573.png"
    />
    <div class="section6 flex-col align-center">
      <div class="bd11 flex-col justify-between">
        <img
          class="label3"
          referrerpolicy="no-referrer"
          src="./assets/img/SketchPng03d5cb3b1c3c9a06e9d51b1869c6e27f9d428a133060bd5c4c2328c0816aeb47.png"
        />
        <div class="section7 flex-col">
          <div class="group5 flex-col justify-between">
            <span class="info5">Bob：Can&nbsp;you&nbsp;help&nbsp;me?</span>
            <span class="word6">Lisa：No,&nbsp;I&nbsp;can’t.</span>
          </div>
        </div>
      </div>
      <div class="bd12 flex-col"></div>
      <div class="bd13 flex-col justify-center"><span class="info6">Chat：</span></div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      constants: {}
    };
  },
  methods: {}
};
</script>
<style scoped lang="css" src="./assets/index.css" />