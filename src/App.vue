<template>
   <Navigation />
   <main class="flex-1">
      <RouterView />
   </main>
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
