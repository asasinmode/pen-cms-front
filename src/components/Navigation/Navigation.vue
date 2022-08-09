<template>
   <nav :data-is-expanded="isExpanded" class="h-full flex flex-col text-xl font-semibold bg-navy-dark w-52 fixed md:w-[4.5rem] md:static z-10 text-white"
      @keydown.tab="handleTabNavigation" ref="nav"
   >
      <a href="#skipTarget" class="flex flex-row items-center text-lg darkHoverable justify-center h-[4.5rem] w-[4.5rem] p-2
         peer -translate-y-full focus-visible:translate-y-0" @focus="expandMenuWhenFocused" ref="skipLink"
      >
         skip to content
      </a>
      <button @click="toggleMenu" title="toggle menu button" class="toggleButton relative overflow-hidden flex flex-row h-[4.5rem] min-h[4.5rem] items-center darkHoverable
         pl-4 -translate-y-full peer-focus-visible:translate-y-0"
      >
         <Logo class="absolute right-[4.5rem] top-1/2 -translate-y-1/2 pointer-events-none" />
         <ToggleButtonIcon />
      </button>
      <RouterLink v-for="route in routes" :to="route.path" class="flex flex-row items-center darkHoverable h-[4.5rem] overflow-hidden
         -translate-y-full peer-focus-visible:translate-y-0"
         @click="collapseMenu"
      >
         <span class="w-[4.5rem] h-[4.5rem] min-w-[4.5rem] flex items-center justify-center text-lilac-light">
            <FontAwesomeIcon :icon="['fas', getIcon(route.name)]" size="2xl"/>
         </span>
         <span class="pb-[2px]">
            {{ route.name }}
         </span>
      </RouterLink>
      <button title="toggle menu button" @click="toggleMenu" ref="secondToggleButton" tabindex="-1"
         class="secondToggleButton flex justify-start items-start fixed -right-3 top-3 translate-x-full rounded-full bg-inherit shadow-md shadow-black/40 md:hidden"
      >
         <span class="w-[4.5rem] h-[4.5rem] min-w-[4.5rem] flex items-center justify-center text-lilac-light rounded-full darkHoverable">
            <FontAwesomeIcon icon="fa-solid fa-bars" size="2xl" />
         </span>
      </button>
   </nav>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Logo from "@/components/Navigation/Logo.vue";
import Button from "@/components/Misc/Button.vue";
import ToggleButtonIcon from "./ToggleButtonIcon.vue";

export default defineComponent({
   name: "Navigation",
   components: { Button, Logo, ToggleButtonIcon },
   data() {
      return {
         icons: {
            dashboard: "house",
            configuration: "wrench",
            browse: "pen-clip"
         },
         isExpanded: false,
      };
   },
   mounted(){
      this.lastLink.addEventListener("focus", this.expandMenuWhenFocused)
      this.isExpanded = window.innerWidth > 768
   },
   methods: {
      getIcon(routeName: string) {
         return this.icons[routeName as keyof typeof this.icons];
      },
      toggleMenu(){
         this.isExpanded = !this.isExpanded
      },
      collapseMenu(){
         if(window.innerWidth > 768){ return }
         this.isExpanded = false
      },
      handleTabNavigation(e: KeyboardEvent){
         if(window.innerWidth > 768){ return }
         this.isExpanded = true
         if(document.activeElement === this.$refs.skipLink && e.shiftKey){ // close when shift tabbing from skip link
            this.isExpanded = false
            return
         }

         if(document.activeElement === this.lastLink && !e.shiftKey){   // close when tabbing from last link
            this.isExpanded = false
            return
         }
      },
      expandMenuWhenFocused(e: FocusEvent){  // expands menu when element is focused from outside
         if(e.relatedTarget !== this.lastLink && e.relatedTarget !== this.firstButton){
            if(window.innerWidth > 768 && e.target === this.lastLink){ return }  // don't open if focusing last link from outside on desktop
            this.isExpanded = true
         }
      }
   },
   computed: {
      routes(){
         return this.$router.getRoutes().map(route => ({ path: route.path, name: route.name as string }));
      },
      lastLink(){
         return this.$refs.nav.querySelector("a[href='/browse']") as HTMLLinkElement
      },
      firstButton(){
         return this.$refs.nav.querySelector(".toggleButton") as HTMLButtonElement
      }
   },
})
</script>

<style>
.darkHoverable{
   @apply hover:!bg-white/10 focus-visible:!bg-white/10 hover:disabled:!bg-transparent focus-visible:disabled:!bg-transparent
}
nav {
   transition: width 150ms ease, transform 150ms ease;
   transform: translateX(-100%);
}
nav[data-is-expanded='true']{
   transform: translateX(0);
   @apply shadow-md shadow-black md:shadow-none
}
.iconAngles, .iconBars, .secondToggleButton{
   transition: opacity 150ms ease, transform 150ms ease;
}
nav[data-is-expanded='true'] .iconAngles{
   transform: rotate(0deg) scale(1);
   opacity: 1;
}
nav[data-is-expanded='true'] .iconBars{
   transform: rotate(180deg) scale(.5);
   opacity: 0;
}
nav[data-is-expanded='true'] > a:first-child{
   width: 100% !important;
}
nav[data-is-expanded='true'] .secondToggleButton{
   width: 100vw;
   height: 100vh;
   background: hsla(0, 0%, 0%, 0.4);
   border-radius: 0;
   top: 0;
   right: 0;
   box-shadow: none;
   cursor: default;
}
nav[data-is-expanded='true'] .secondToggleButton > span{
   display: none;
}
@media(min-width: 768px){
   nav{
      transform: translateX(0);
      box-shadow: unset;
   }
   nav[data-is-expanded='true']{
      width: 13rem;
   }
}
.router-link-active > span:first-child{
   @apply text-navy-light
}
/* nav[data-is-expanded='true'] .router-link-active{
   @apply relative before:absolute before:left-0 before:w-2 before:h-full before:bg-navy-light
} */
</style>