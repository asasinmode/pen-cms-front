<template>
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
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
   name: "ToggleButtonIcon"
})
</script>

<style scoped>

</style>