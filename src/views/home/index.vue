<template>
  <div class="box">
    <el-button type="primary" @click="$router.push('/myeversolo')">MyEversolo</el-button>
    <el-button type="primary" @click="$router.push('/description')">description</el-button>
    <el-button type="primary" @click="$router.push('/listenMedia')">listenMedia</el-button>
    <el-button type="primary" @click="$router.push('/lighting')">lighting</el-button>
    <el-button type="primary" @click="$router.push('/ChooseEversolo')">ChooseEversolo</el-button>
    <el-button type="primary" @click="$router.push('/testPDF')">testPDF</el-button>
    <el-button type="primary" @click="$router.push('/testImage')">testImage</el-button>
    <el-button type="primary" @click="$router.push('/testKuaduan')">testKuaduan</el-button>

    <div class="appleBox">
      <el-card>
        <h1>apple动画dome</h1>
        <el-button type="primary" @click="$router.push('/testAnimation')">testAnimation</el-button>
        <el-button type="primary" @click="$router.push('/testBox')">testBox</el-button>
        <el-button type="primary" @click="$router.push('/testAirPods')">testAirPods</el-button>
        <el-button type="primary" @click="$router.push('/AirPodsImage')">AirPodsImage</el-button>
        <el-button type="primary" @click="$router.push('/testScrollTrigger')">
          testScrollTrigger
        </el-button>
      </el-card>
      <br />
      <el-card>
        <h1>play页面dome</h1>
        <el-button type="primary" @click="$router.push('/featureCards')">featureCards</el-button>
        <el-button type="primary" @click="$router.push('/imageGuide')">imageGuide</el-button>
        <el-button type="primary" @click="$router.push('/loopPlayback')">loopPlayback</el-button>
        <el-button type="primary" @click="$router.push('/loopVideo')">loopVideo</el-button>
        <el-button type="primary" @click="$router.push('/imgAnimation')">imgAnimation</el-button>
        <el-button type="primary" @click="$router.push('/selectColor')">selectColor</el-button>
      </el-card>
      <el-card>
        <h1>小游戏dome</h1>
        <el-button type="primary" @click="$router.push('/EatingSnakes')">EatingSnakes</el-button>
        <el-button type="primary" @click="$router.push('/Mineclearance')">Mineclearance</el-button>
        <el-button type="primary" @click="$router.push('/tetris')">tetris</el-button>
      </el-card>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue'
</script>
<style scoped>
* {
  box-sizing: border-box;
}

img {
  width: 100%;
  height: auto;
  vertical-align: top; /* 添加这一行 */
}
.box {
  padding-top: 1vw;
  padding-left: 1vw;
}
:deep(button.el-button.el-button--primary) {
  margin: 10px 10px;
}
@media (max-width: 768px) {
  /* 手机端 */
  .desktop {
    display: none;
  }
}

@media (min-width: 769px) {
  /* 电脑端 */
  .mobile {
    display: none;
  }
}
</style>
