<template>
<div class="hidden logoContainer flex-col w-[6.5rem] h-14 text-4xl" title="logo">  <!-- make stand out -->
   <span class="absolute -translate-x-full translate-y-2 top-0">🛠️</span>
   <span class="absolute -translate-x-full -translate-y-2 bottom-0">🖊️</span>
</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
   name: "Logo"
})
</script>

<style scoped>
span:first-child{
   left: calc(50% - 1rem);
}
span:last-child{
   left: calc(50% + 1rem);
}
</style>