<template>
  <div class="feature-cards-container">
    <div class="feature-cards-grid">
      <!-- 蓝色卡片 - 本地优惠 -->
      <div class="feature-card feature-card-blue">
        <div class="feature-card-icon">
          <svg
            width="48"
            height="48"
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M36 12H33V9C33 7.34315 31.6569 6 30 6H18C16.3431 6 15 7.34315 15 9V12H12C10.3431 12 9 13.3431 9 15V39C9 40.6569 10.3431 42 12 42H36C37.6569 42 39 40.6569 39 39V15C39 13.3431 37.6569 12 36 12ZM18 9H30V12H18V9ZM36 39H12V15H15V18C15 19.6569 16.3431 21 18 21H30C31.6569 21 33 19.6569 33 18V15H36V39Z"
              fill="white"
            />
            <path d="M24 24H18V30H24V24Z" fill="white" />
            <path d="M30 24H24V30H30V24Z" fill="white" />
            <path d="M24 30H18V36H24V30Z" fill="white" />
            <path d="M30 30H24V36H30V30Z" fill="white" />
          </svg>
        </div>
        <h2 class="feature-card-title">
          本地优惠
          <br />
          照样享。
        </h2>
        <p class="feature-card-description">
          用 iPhone 或 Apple Watch 上的交通卡乘坐公共交通, 你可以享受和实体交通卡相同的优惠*。
        </p>
      </div>

      <!-- 绿色卡片 - 花式卡面 -->
      <div class="feature-card feature-card-green">
        <div class="feature-card-icon">
          <svg
            width="48"
            height="48"
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M24 6L28.2 14.6L37.8 16.2L30.9 22.9L32.8 32.4L24 28L15.2 32.4L17.1 22.9L10.2 16.2L19.8 14.6L24 6Z"
              fill="black"
            />
            <path d="M10 10L12 8M38 10L36 8M24 2L24 0" stroke="black" />
          </svg>
        </div>
        <h2 class="feature-card-title">
          花式卡面，
          <br />
          秀出你个性。
        </h2>
        <p class="feature-card-description">
          卡面不再千篇一律，只需进入指定城市交通卡 app
          中的卡面商城*，就能领取你喜欢的创意卡面，为你的出行添乐趣。
        </p>
      </div>

      <!-- 黑色卡片 - 电池 -->
      <div class="feature-card feature-card-black">
        <div class="feature-card-icon">
          <svg
            width="48"
            height="48"
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect x="8" y="16" width="28" height="16" rx="2" stroke="white" stroke-width="2" />
            <rect x="10" y="18" width="6" height="12" rx="1" fill="#FF3B30" />
            <path
              d="M40 24C40 22.3431 38.6569 21 37 21V27C38.6569 27 40 25.6569 40 24Z"
              fill="white"
            />
          </svg>
        </div>
        <h2 class="feature-card-title">
          没电？
          <br />
          没问题。
        </h2>
        <p class="feature-card-description">
          就算 iPhone 的电量低到自动关机，仍能提供最高达 5 小时的备用电量支持刷公交*，让你继续畅行。
        </p>
      </div>

      <!-- 蓝色卡片 - 自动充值 -->
      <div class="feature-card feature-card-blue">
        <div class="feature-card-icon">
          <svg
            width="48"
            height="48"
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="24" cy="24" r="18" stroke="white" stroke-width="2" />
            <path
              d="M16 24L22 30L32 18"
              stroke="white"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
        <h2 class="feature-card-title">
          自动充值，
          <br />
          随时丝滑畅行。
        </h2>
        <p class="feature-card-description">
          自动充值功能可在余额过低时充入你设定的金额，让你省数又省心。目前已支持北京一卡通及上海、青岛、苏州、长沙、西安、大连、厦门等城市的交通卡*。
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
// 无需额外的逻辑，这是一个纯展示组件
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
}

.feature-cards-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 16px;
}

.feature-cards-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
}

.feature-card {
  padding: 30px;
  height: 30vh;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
}

.feature-card-blue {
  background-color: #0078ff;
  color: white;
}

.feature-card-green {
  background-color: #7ef48a;
  color: black;
}

.feature-card-black {
  background-color: black;
  color: white;
}

.feature-card-icon {
  margin-bottom: 24px;
}

.feature-card-title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 8px;
  line-height: 1.3;
}

.feature-card-description {
  font-size: 14px;
  margin-top: 24px;
  line-height: 1.5;
}

/* 响应式布局 */
@media (min-width: 768px) {
  .feature-cards-grid {
    grid-template-columns: 1fr 1fr;
  }
}
</style>
