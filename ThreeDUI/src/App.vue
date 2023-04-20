<template>
  <div>
    <ThreeD_UI v-if="visiableRouter.includes($route.name)"></ThreeD_UI>
    <router-view />
  </div>
</template>

<script>
import ThreeD_UI from './components/ThreeD_UI.vue'

export default {
  data: () => ({
    visiableRouter: ['test']
  }),
  name: 'App',
  components: { ThreeD_UI }
}
</script>

<style></style>
