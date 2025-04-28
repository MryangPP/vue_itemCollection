import { createRouter, createWebHashHistory } from 'vue-router'
import Layout from '@/views/layout/index.vue'
const routerHistory = createWebHashHistory()
const router = createRouter({
  history: routerHistory,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Layout,
      redirect: '/home',
      children: [
        {
          path: '/home',
          name: 'home',
          component: () => import('@/views/home/index.vue')
        },
        {
          path: '/MyEversolo',
          name: 'MyEversolo',
          component: () => import('@/views/MyEversolo/index.vue')
        },
        {
          path: '/description',
          name: 'description',
          component: () => import('@/views/others/description.vue')
        },
        {
          path: '/listenMedia',
          name: 'listenMedia',
          component: () => import('@/views/others/listenMedia.vue')
        },
        {
          path: '/lighting',
          name: 'lighting',
          component: () => import('@/views/others/lighting.vue')
        },
        {
          path: '/ChooseEversolo',
          name: 'ChooseEversolo',
          component: () => import('@/views/others/ChooseEversolo.vue')
        },
        {
          path: '/testPDF',
          name: 'testPDF',
          component: () => import('@/views/others/testPDF.vue')
        },
        {
          path: '/testImage',
          name: 'testImage',
          component: () => import('@/views/others/testImage.vue')
        },
        {
          path: '/testAnimation',
          name: 'testAnimation',
          component: () => import('@/views/test/testAnimation.vue')
        },
        {
          path: '/testBox',
          name: 'testBox',
          component: () => import('@/views/test/testBox.vue')
        },
        {
          path: '/testAirPods',
          name: 'testAirPods',
          component: () => import('@/views/test/testAirPods.vue')
        },
        {
          path: '/AirPodsImage',
          name: 'AirPodsImage',
          component: () => import('@/views/test/AirPodsImage.vue')
        },
        {
          path: '/testKuaduan',
          name: 'testKuaduan',
          component: () => import('@/views/test/testKuaduan.vue')
        },
        {
          path: '/testScrollTrigger',
          name: 'testScrollTrigger',
          component: () => import('@/views/test/testScrollTrigger.vue')
        },
        {
          path: '/featureCards',
          name: 'featureCards',
          component: () => import('@/views/play/featureCards.vue')
        },
        {
          path: '/imageGuide',
          name: 'imageGuide',
          component: () => import('@/views/play/imageGuide.vue')
        },
        {
          path: '/loopPlayback',
          name: 'loopPlayback',
          component: () => import('@/views/play/loopPlayback.vue')
        },
        {
          path: '/loopVideo',
          name: 'loopVideo',
          component: () => import('@/views/play/loopVideo.vue')
        },
        {
          path: '/imgAnimation',
          name: 'imgAnimation',
          component: () => import('@/views/play/imgAnimation.vue')
        }
      ]
    }
  ]
})

export default router
