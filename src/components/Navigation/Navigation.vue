<template>
   <nav class="fixed h-full flex flex-col w-[4.5rem] text-xl font-semibold bg-gray-600" :data-is-expanded="isExpanded">
      <a href="#skipTarget" class="flex flex-row items-center text-lg hoverable justify-center h-[4.5rem] w-[4.5rem] p-2
         peer -translate-y-full focus-visible:translate-y-0"
      >
         skip to content
      </a>
      <Button @click="toggleMenu" class="flex flex-row -translate-y-full peer-focus-visible:translate-y-0 h-[4.5rem] items-center pl-4" title="toggle menu button">
         <Logo />
         <span class="z-10 pointer-events-none w-[4.5rem] h-[4.5rem] flex items-center justify-center text-main-dark iconBars
            absolute right-0 scale-100 rotate-0 opacity-100"
         >
            <FontAwesomeIcon icon="fa-solid fa-bars" size="2xl" />
         </span>
         <span class="z-10 pointer-events-none w-[4.5rem] h-[4.5rem] flex items-center justify-center text-main-dark iconAngles
            absolute right-0 scale-50 -rotate-180 opacity-0"
         >
            <FontAwesomeIcon icon="fa-solid fa-angles-left" size="2xl" />
         </span>
      </Button>
      <RouterLink v-for="route in routes" :to="route.path" class="flex flex-row items-center hoverable h-[4.5rem] -translate-y-full peer-focus-visible:translate-y-0 overflow-hidden">
         <span class="w-[4.5rem] h-[4.5rem] min-w-[4.5rem] flex items-center justify-center text-main-dark">
            <FontAwesomeIcon :icon="['fas', getIcon(route.name)]" size="2xl" />
         </span>
         <span class="pb-[2px] hidden">
            {{ route.name }}
         </span>
      </RouterLink>
   </nav>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Button from "@/components/Misc/Button.vue";
import Logo from "@/components/Navigation/Logo.vue";

export default defineComponent({
   name: "Navigation",
   components: { Button, Logo },
   data() {
      return {
         icons: {
            dashboard: "house",
            manage: "wrench",
            browse: "pen-clip",
            users: "user"
         },
         isExpanded: true
      };
   },
   beforeMount() {
      window.onresize = () => {
         if(window.innerWidth >= 768 && this.isExpanded){ this.toggleMenu() }
      }
   },
   methods: {
      getIcon(routeName: string) {
         return this.icons[routeName as keyof typeof this.icons];
      },
      toggleMenu(){
         this.isExpanded = !this.isExpanded
      }
   },
   computed: {
      routes() {
         return this.$router.getRoutes().map(route => ({ path: route.path, name: route.name as string }));
      },
   },
})
</script>

<style>
nav {
   transition: width 150ms ease;
}
.iconAngles, .iconBars{
   transition: opacity 150ms ease, transform 150ms ease;
}
nav[data-is-expanded='true']{
   width: 12rem;
}
nav[data-is-expanded='true'] > a:first-child{
   width: 100% !important;
}
nav[data-is-expanded='true'] > a:not(:first-child) > span:last-child, nav[data-is-expanded='true'] .logoContainer{
   display: flex;
}
nav[data-is-expanded='true'] .iconAngles{
   transform: rotate(0deg) scale(1);
   opacity: 1;
}
nav[data-is-expanded='true'] .iconBars{
   transform: rotate(180deg) scale(0.5);
   opacity: 0;
}
</style>