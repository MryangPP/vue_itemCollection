<template>
  <div style="height: 120vh; background-color: red"></div>
  <div class="AirPods">
    <div class="video-wrap">
      <video
        ref="vid"
        src="@/assets/testAirPods/airpods-pro.webm"
        muted
        style="width: 690px; height: 512px"
      ></video>
      <div class="step-1">
        新的
        <span class="green">U1 芯片</span>
        可以让你
        <span class="white">精确查找</span>
        充电盒，帮你准确定位它。你还可使用查找 app 近距离查找 AirPods Pro，看看它藏在了哪里5。
      </div>
      <div class="step-2">
        <span class="line"></span>
        <p>
          <span class="white">挂绳孔</span>
          方便你将充电盒系在背包或手提包上，这样就能随手取用耳机，随时沉浸在美妙的声音里6。
        </p>
      </div>
      <div class="step-3">
        <span class="line"></span>
        <p>
          <span class="white">内置扬声器</span>
          可以播放声音来帮你轻松定位充电盒，还有
          <span class="green">全新的铃音</span>
          ，提示你电池电量低或是配对完成。
        </p>
      </div>
      <div class="step-4">
        <p>
          AirPods Pro 和 MagSafe 充电盒都具备
          <span class="white">IPX4 级别抗汗抗水性能7。</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const vid = ref(null)
const playbackConst = 500

onMounted(() => {
  // 滚动播放函数
  function scrollPlay() {
    const offset = document.querySelector('.AirPods')?.offsetTop || 0 // 获取 AirPods 容器的顶部偏移
    const frameNumber = (window.pageYOffset - offset) / playbackConst // 减去偏移量
    if (vid.value) {
      vid.value.currentTime = Math.max(0, frameNumber) // 确保 currentTime 不为负数
    }
    window.requestAnimationFrame(scrollPlay)
  }
  window.requestAnimationFrame(scrollPlay)

  // 监听视频时间更新，根据 currentTime 控制各步骤的显示
  vid.value.addEventListener('timeupdate', e => {
    const t = e.target.currentTime

    // step-1
    const step1 = document.querySelector('.step-1')
    if (t < 0.2) {
      step1?.classList.add('active')
    } else {
      step1?.classList.remove('active')
    }

    // step-2
    const step2 = document.querySelector('.step-2')
    if (t > 2 && t < 3.2) {
      step2?.classList.add('active')
    } else {
      step2?.classList.remove('active')
    }

    // step-3
    const step3 = document.querySelector('.step-3')
    if (t > 4 && t < 4.8) {
      step3?.classList.add('active')
    } else {
      step3?.classList.remove('active')
    }

    // step-4
    const step4 = document.querySelector('.step-4')
    if (t > 4.8) {
      step4?.classList.add('active')
    } else {
      step4?.classList.remove('active')
    }
  })
})
</script>

<style scoped lang="less">
.AirPods {
  position: sticky;
  top: 0;
  height: 380vh;
  background: #000;
}
.video-wrap {
  position: sticky;
  top: 0;
  width: 980px;
  height: 100vh;
  text-align: center;
  font-size: 21px;
  font-weight: bold;
  color: #6e6e73;
  z-index: 999999;
  & > div {
    transition: all 1s linear;
  }
  span.white {
    color: #fff;
  }
  span.green {
    color: #00ff41;
  }
  .step-1 {
    width: 410px;
    margin: 0 auto;
    text-align: center;
    opacity: 0;
    &.active {
      opacity: 1;
    }
  }
  .step-2 {
    position: absolute;
    top: 354px;
    left: 495px;
    z-index: 2;
    opacity: 0;
    .line {
      display: block;
      height: 1px;
      width: 429px;
      clip-path: inset(0 0 0 100%); // 隐藏
      background-color: #6e6e73;
      transition: all 1s linear;
    }
    p {
      position: relative;
      left: 100px;
      top: 50px;
      width: 325px;
      text-align: left;
      transition: all 1s linear;
    }
    &.active {
      opacity: 1;
      .line {
        clip-path: inset(0 0 0 0); // 全显示
      }
      p {
        top: 0;
      }
    }
  }
  .step-3 {
    position: absolute;
    top: 480px;
    left: 627px;
    z-index: 2;
    opacity: 0;
    .line {
      position: absolute;
      left: 0;
      top: 0;
      display: block;
      height: 1px;
      width: 300px;
      clip-path: inset(0 0 0 100%); // 隐藏
      background-color: #6e6e73;
      transform: rotate(90deg) translateX(-141px);
      transform-origin: left;
      transition: all 0.1s linear;
    }
    p {
      position: relative;
      top: 50px;
      left: 30px;
      width: 323px;
      text-align: left;
    }
    &.active {
      opacity: 1;
      .line {
        clip-path: inset(0 0 0 0); // 全显示
      }
      p {
        top: 0;
      }
    }
  }
  .step-4 {
    position: relative;
    top: -70px;
    width: 390px;
    margin: 0 auto;
    opacity: 0;
    p {
      text-align: center;
    }
    &.active {
      opacity: 1;
    }
  }
}
</style>
