<template>
   <button @click="handleClick" class="flex relative overflow-hidden" ref="me">
      <slot />
   </button>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
   name: "Button",
   props: {
      focusOnMounted: {
         type: Boolean,
         default: false
      }
   },
   mounted(){
      this.focusOnMounted && this.focusMe()
   },
   methods: {
      handleClick(e: MouseEvent){
         const buttonElement = e.currentTarget as HTMLButtonElement
         const boundingRectangle = buttonElement.getBoundingClientRect()
         const circle = document.createElement("span")
         const diameter = Math.max(buttonElement.clientWidth, buttonElement.clientHeight)
         const radius = diameter / 2

         circle.style.width = circle.style.height = `${diameter}px`
         circle.style.left = e.clientX != 0 ? `${e.clientX - boundingRectangle.left - radius}px` : `calc(50% - ${radius})`
         circle.style.top = e.clientY != 0 ? `${e.clientY - boundingRectangle.top - radius}px` : `calc(50% - ${radius})`
         circle.classList.add("ripple")

         document.querySelector(".ripple")?.remove()

         buttonElement.insertAdjacentElement("afterbegin", circle)
      },
      focusMe(){
         this.$nextTick(() => {
            this.$refs.me.focus()
         })
      }
   }
})
</script>

<style>
span.ripple{
   border-radius: 50%;
   transform: scale(0);
   animation: ripple 275ms linear;
   animation-iteration-count: 1;
}
@keyframes ripple{
   to{
      transform: scale(3);
      opacity: 1;
   }
}
</style>