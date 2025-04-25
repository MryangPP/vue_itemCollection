<template>
  <div class="ChooseEversolo display">
    <div class="chooseInfo">
      <span>DMP-A10</span>
      <a
        href="https://qta15w83zeotf9g6-11691502.shopifypreview.com/products_preview?preview_key=b751246cccdfd0812df4b7e2d6f22101"
      >
        Learn more
      </a>
      <img
        src="https://shop.zidoo.tv/cdn/shop/files/A10button_08763fc0-070e-4e27-a68c-5bba74900461.png?v=1731307716"
        alt=""
      />
    </div>
    <div class="chooseInfo twoChange">
      <span>AMP-F10</span>
      <a
        href="https://qta15w83zeotf9g6-11691502.shopifypreview.com/products_preview?preview_key=5c1126da83783999aa7f739dfd083eed"
      >
        Learn more
      </a>
      <img src="https://shop.zidoo.tv/cdn/shop/files/f10button.png?v=1731307812" alt="" />
    </div>
    <div class="chooseInfo">
      <span>DMP-A6</span>
      <a
        href="https://shop.zidoo.tv/products/eversolo-dmp-a6-streamers-network-player-music-service-and-streaming-mqa-full-decode-dac-dsd512-pcm768khz-32bit-bluetooth-5-0-aptx-hd-6-hd-touchscreen-exclusive-app"
      >
        Learn more
      </a>
      <img src="https://shop.zidoo.tv/cdn/shop/files/a6button.png?v=1731307909" alt="" />
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue'
const foo = 'bar'
console.log(foo)
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

.ChooseEversolo {
  margin: 0 auto;
  width: 1374px;
  justify-content: space-between;
}

.chooseInfo {
  position: relative;
  width: calc(100% / 3);
  transition: all 0.3s ease-in-out 0s;
  font-family: 'Manrope', sans-serif;
}

.twoChange {
  margin: 0 20px;
}

.chooseInfo:hover {
  transform: translate3d(0, -5px, 0);
}

.chooseInfo span {
  position: absolute;
  top: 75%;
  left: 10%;
  color: #000;
  font-size: 16px;
  padding: 13px 20px;
  /* background-color: #fff; */
  text-transform: none;
  text-decoration: none;
  font-weight: 500;
  /* border: 2px solid #fff; */
  border-radius: 5px;
  letter-spacing: 0.5px;
  text-align: center;
  line-height: 1;
}

.chooseInfo a {
  position: absolute;
  top: 75%;
  right: 10%;
  color: #000;
  font-size: 16px;
  padding: 13px 20px;
  background-color: #fff;
  text-transform: none;
  text-decoration: none;
  font-weight: 500;
  border: 2px solid #fff;
  border-radius: 5px;
  letter-spacing: 0.5px;
  text-align: center;
  line-height: 1;
}

.chooseInfo a:hover {
  color: #fff;
  background-color: #262626;
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

  .ChooseEversolo {
    flex-direction: column-reverse;
    width: 100%;
  }

  .chooseInfo {
    width: 100%;
  }

  .chooseInfo:hover {
    transform: translate3d(0, 0, 0);
  }
}

@media (min-width: 769px) {
  /* 电脑端 */
  .mobile {
    display: none;
  }
}
</style>
