<template>
  <div>
    <div class="desktop">
      <iframe
        src="https://music.eversolo.com/dmp/instruction/EVERSOLO-DMP-A6-Gen2-User-Manual-v1.0.pdf"
        width="100%"
        style="height: 100vh"
      ></iframe>
    </div>
    <div class="mobile">
      <a
        href="https://music.eversolo.com/dmp/instruction/EVERSOLO-DMP-A8-User-Manual-v1.0.pdf"
        target="_blank"
        rel="noopener"
        >https://music.eversolo.com/dmp/instruction/EVERSOLO-DMP-A8-User-Manual-v1.0.pdf</a
      >
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
