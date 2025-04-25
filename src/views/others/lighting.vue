<template>
  <div class="display vueLighting">
    <div class="vueLightingInfo">
      <h1>Streamers in eversolo</h1>
      <div class="lighting">
        <div class="lightingBox">
          <div class="lightingBoxText">
            <h3>Amazon Music</h3>
            <p>
              Amazon's music streaming service, offering a wide music library and high-quality audio
              options.
            </p>
          </div>
          <img
            src="https://cdn.shopify.com/s/files/1/1169/1502/files/lighting_08.png?v=1741573905"
            loading="lazy"
            alt=""
          />
          <div class="mask"></div>
        </div>
        <div class="lightingBox">
          <div class="lightingBoxText">
            <h3>Calm Radio</h3>
            <p>
              Specializes in light music, meditation music, and natural sounds to help with
              relaxation and meditation.
            </p>
          </div>
          <img
            src="https://cdn.shopify.com/s/files/1/1169/1502/files/lighting_16.png?v=1741573938"
            loading="lazy"
            alt=""
          />
          <div class="mask"></div>
        </div>
        <div class="lightingBox">
          <div class="lightingBoxText">
            <h3>TIDAL</h3>
            <p>
              A music platform known for its high-fidelity sound quality and exclusive content,
              loved by audiophiles.
            </p>
          </div>
          <img
            src="https://cdn.shopify.com/s/files/1/1169/1502/files/lighting_11.png?v=1741573938"
            loading="lazy"
            alt=""
          />
          <div class="mask"></div>
        </div>
        <div class="lightingBox">
          <div class="lightingBoxText">
            <h3>Qobuz</h3>
            <p>
              Provides high-resolution music streaming services, focusing on sound quality and
              in-depth music exploration.
            </p>
          </div>
          <img
            src="https://cdn.shopify.com/s/files/1/1169/1502/files/lighting_02.png?v=1741573938"
            loading="lazy"
            alt=""
          />
          <div class="mask"></div>
        </div>
        <div class="lightingBox">
          <div class="lightingBoxText">
            <h3>TuneIn Radio</h3>
            <p>
              Provides global radio stations and online radio shows, supporting various music genres
              and news.
            </p>
          </div>
          <img
            src="https://cdn.shopify.com/s/files/1/1169/1502/files/lighting_15.png?v=1741573938"
            loading="lazy"
            alt=""
          />
          <div class="mask"></div>
        </div>
        <!-- 第二列 -->
        <div class="lightingBox">
          <div class="lightingBoxText">
            <h3>HIGHRESAUDIO</h3>
            <p>
              A platform focused on high-resolution audio, offering lossless music and streaming
              services, ideal for audiophiles seeking the ultimate sound quality.
            </p>
          </div>
          <img
            src="https://cdn.shopify.com/s/files/1/1169/1502/files/lighting_02.jpg?v=1741573938"
            loading="lazy"
            alt=""
          />
          <div class="mask"></div>
        </div>
        <div class="lightingBox">
          <div class="lightingBoxText">
            <h3>Deezer</h3>
            <p>
              A global streaming music service with a rich library and personalized recommendation
              features.
            </p>
          </div>
          <img
            src="https://cdn.shopify.com/s/files/1/1169/1502/files/lighting_03.png?v=1741573938"
            loading="lazy"
            alt=""
          />
          <div class="mask"></div>
        </div>
        <div class="lightingBox">
          <div class="lightingBoxText">
            <h3>IDAGIO</h3>
            <p>
              A streaming platform designed for classical music lovers, offering high-quality audio
              and precise categorization.
            </p>
          </div>
          <img
            src="https://cdn.shopify.com/s/files/1/1169/1502/files/lighting_14.png?v=1741573938"
            loading="lazy"
            alt=""
          />
          <div class="mask"></div>
        </div>
        <div class="lightingBox">
          <div class="lightingBoxText">
            <h3>Radio Paradise</h3>
            <p>
              An internet radio station offering a curated selection of music streams, focusing on
              sound quality and user experience.
            </p>
          </div>
          <img
            src="https://cdn.shopify.com/s/files/1/1169/1502/files/lighting_05.png?v=1741573938"
            loading="lazy"
            alt=""
          />
          <div class="mask"></div>
        </div>
        <div class="lightingBox">
          <div class="lightingBoxText">
            <h3>SoundCloud</h3>
            <p>
              An open platform that allows users to upload, share, and discover a variety of music,
              especially featuring independent artists.
            </p>
          </div>
          <img
            src="https://cdn.shopify.com/s/files/1/1169/1502/files/lighting_13.png?v=1741573938"
            loading="lazy"
            alt=""
          />
          <div class="mask"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()
</script>
<style scoped>
.vueLighting h1 {
  padding: 50px 15px;
}
.vueLighting {
  width: 100%;
}
.lighting {
  display: flex;
  flex-wrap: wrap;
  /* height: 1152px; */
  width: 1374px;
  padding: 0 15px;
}
.lightingBox {
  position: relative;
  box-sizing: content-box;
  width: 20%;
  overflow: hidden;
  padding-bottom: 20%;
}
.lightingBox img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.mask {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  /* background-color: rgba(0, 0, 0, 0.5); */
  transition: opacity 0.5s;
}

.lightingBox:hover .mask {
  background-color: rgba(189, 155, 84, 1);
}

.lightingText {
  padding-top: 2.5vw;
  padding-bottom: 5vw;
  padding-left: 5vw;
  padding-right: 5vw;
}

.lightingText p {
  font-size: 16px;
  padding-bottom: 0.2vw;
  color: #86868b;
}
.lightingBox .lightingBoxText {
  width: 60%;
  position: absolute;
  color: #fff;
  top: 60%;
  left: 50%;
  transform: translate(-50%, -50%);
  opacity: 0;
  z-index: 999;
  transition: all 0.5s;
}
.lightingBoxText h3 {
  font-size: 24px;
}
.lightingBoxText p {
  padding-top: 10px;
  font-size: 14px;
  color: #fff;
}
.lightingBox:hover .lightingBoxText {
  opacity: 1;
  top: 50%;
  left: 50%;
}
@media (max-width: 768px) {
  /* 手机端 */
  .desktop {
    display: none;
  }
  .vueLightingInfo {
    width: 100%;
  }
  .vueLightingInfo h1 {
    text-align: center;
  }
  .lighting {
    width: 100%;
  }
  .lightingBox {
    width: 50%;
    padding-bottom: 50%;
  }
  .lightingBox .lightingBoxText {
    width: 70%;
  }
  .lightingBoxText h3 {
    font-size: 4vw;
    margin: 0;
  }
}

@media (min-width: 769px) {
  /* 电脑端 */
  .mobile {
    display: none;
  }
}
</style>
