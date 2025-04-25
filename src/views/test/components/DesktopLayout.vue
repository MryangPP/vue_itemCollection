<template>
  <div class="gradient-border"><span>Gradient Coding</span></div>
  <div class="gradient-shadow"><span>Gradient Coding</span></div>
</template>

<script setup></script>

<style scoped lang="scss">
.gradient-border {
  --gradient-color: linear-gradient(115deg, #4fcf70, #fad648, #a767e5, #12bcfe, #44ce7b);
  width: 200px;
  position: relative;
  border-radius: 10px;
  display: block;
  z-index: 1;
  padding: 3px;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 200%;
    height: 100%;
    background: var(--gradient-color);
    background-size: 50% 100%;
  }

  &:hover {
    &::before {
      animation: slide 1s linear infinite;
    }
  }
  span {
    display: block;
    text-align: center;
    position: relative;
    z-index: 2;
    font-size: 18px;
    padding: 10px 0;
    font-size: 18px;
    background: #000;
    border-radius: 8px;
  }
}

@keyframes slide {
  to {
    transform: translateX(-50%);
  }
}
.gradient-shadow {
  --gradient-color: linear-gradient(115deg, #4fcf70, #fad648, #a767e5, #12bcfe, #44ce7b);
  width: 200px;
  position: relative;

  display: block;
  z-index: 2;
  padding: 3px;

  // 去除注释，可以加上边框
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: var(--gradient-color);
    border-radius: 10px;
  }

  &::after {
    position: absolute;
    content: '';
    top: 10px;
    left: -20%;
    right: 0;
    z-index: 1;
    height: 100%;
    width: 140%;
    margin: 0 auto;
    transform: scale(0.8);
    filter: blur(30px);
    background-image: var(--gradient-color);
    opacity: 0.5;
    transition: opacity 1s;
  }
  &:hover {
    &::after {
      animation: breath 2.5s linear infinite;
    }
  }

  span {
    display: block;
    text-align: center;
    position: relative;
    z-index: 2;
    padding: 10px 0;
    font-size: 18px;
    background: #000;
    border-radius: 8px;
    color: #fff;
  }
}

@keyframes breath {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}
</style>
