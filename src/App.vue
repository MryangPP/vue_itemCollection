<template>
  <div class="app no-scroll">
    <router-view></router-view>
  </div>
</template>
<script setup></script>
<style>
.app {
  width: 100%;
  min-height: 100vh;
}
body {
  margin: 0;
  padding: 0;
}
.display {
  display: flex;
  align-items: center;
  justify-content: center;
}
.el-drawer__body {
  padding: 0;
}
</style>
