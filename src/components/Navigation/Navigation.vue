<template>
   <nav class="absolute p-2 md:w-1/12 h-full bg-pink-400 flex flex-col">
      <a href="#skipTarget" class="hidden">skip to content</a>
      <RouterLink v-for="route in routes" :to="route.path" class="flex flex-row items-center">
         <FontAwesomeIcon :icon="['fas', getIcon(route.name as string)]" size="2x" fixed-width />
         <span class="pb-1">
            {{ route.name }}
         </span>
      </RouterLink>
   </nav>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
   name: "Navigation",
   data(){
      return {
         icons: {
            dashboard: "palette",
            manage: "pen",
            browse: "eye",
            users: "user"
         }
      }
   },
   methods: {
      getIcon(routeName: string){
         return this.icons[routeName as keyof typeof this.icons]
      }
   },
   computed: {
      routes() {
         return this.$router.getRoutes().map(route => ({ path: route.path, name: route.name }));
      }
   }
})
</script>

<style scoped>

</style>