<template>
  <div class="display">
    <div class="typeArea">
      <div class="info_leftC"></div>
      <div class="info_ritghtC">
        <div @click="infoRitghtM"></div>
        <div @click="infoRitghtM"></div>
        <div @click="infoRitghtM"></div>
        <div @click="infoRitghtM"></div>
        <div @click="infoRitghtM"></div>
        <div @click="infoRitghtM"></div>
      </div>
    </div>
  </div>

  <el-dialog v-model="centerDialogVisible" width="1313" show-header="false" align-center>
    <div class="dialogC">
      <div class="dialogCleft"></div>
      <div class="dialogCright"></div>
    </div>
  </el-dialog>
</template>
<script setup>
import { ref } from 'vue'
const centerDialogVisible = ref(true)
const infoRitghtM = () => {
  console.log('infoRitghtM')
}
</script>
<style>
/* 弹窗样式 */
.el-dialog {
  padding: 0;
}
.el-dialog__header {
  display: none;
}
</style>
<style scoped>
* {
  box-sizing: border-box;
}
.display {
  display: flex;
  justify-content: center;
  align-items: center;
}
.typeArea {
  display: flex;
  width: 1374px;
  height: 50vh;
}
img {
  width: 100%;
  height: auto;
  vertical-align: top; /* 添加这一行 */
}
.info_leftC {
  width: 40%;
  height: 100%;
  background-color: blue;
}
.info_ritghtC {
  display: flex;
  justify-content: space-between;
  align-content: space-between;
  flex-wrap: wrap;
  width: 60%;
  height: 100%;
  /* background-color: red; */
  padding-left: 0.9vw;
}
.info_ritghtC div {
  width: 32.3%;
  height: 49%;
  background-color: #f60;
}
.dialogC {
  width: 1313px;
  height: 850px;
}
.dialogCleft {
  width: 60%;
  height: 100%;
  background-color: #f60;
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
