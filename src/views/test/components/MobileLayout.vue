<template>
  <div>手机端</div>
</template>
<script setup>
import { ref } from 'vue'
</script>

<style scoped>
* {
  box-sizing: border-box;
}
.display {
  display: flex;
  justify-content: center;
  align-items: center;
}

img {
  width: 100%;
  height: auto;
  vertical-align: top;
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
