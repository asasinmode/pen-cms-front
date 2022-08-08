<template>
   <Navigation />
   <RouterView class="flex-1 overflow-x-hidden overflow-y-auto z-0" />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Navigation from '@/components/Navigation/Navigation.vue';

export default defineComponent({
   name: "App",
   components: {
      Navigation,
   }
})
</script>

<style scoped>
</style>
