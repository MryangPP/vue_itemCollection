<template>
  <component :is="layoutComponent" />
</template>

<script setup>
import { computed, defineAsyncComponent } from 'vue'
import { useBreakpoints } from '@vueuse/core'

const breakpoints = useBreakpoints({
  mobile: 768,
  desktop: 1024
})

const isMobile = breakpoints.smaller('mobile')

// 将异步组件定义移到计算属性外部，避免重复创建
const MobileLayout = defineAsyncComponent(() => import('./components/MobileLayout.vue'))
const DesktopLayout = defineAsyncComponent(() => import('./components/DesktopLayout.vue'))

const layoutComponent = computed(() => (isMobile.value ? MobileLayout : DesktopLayout))
</script>
