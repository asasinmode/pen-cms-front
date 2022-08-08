<template>
<div class="logoContainer w-[7.5rem] h-14 text-4xl flexCentered" title="logo">  <!-- make stand out -->
   <span>🛠️</span>
   <span>🖊️</span>
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
   transform: translate(0.5rem, -0.45rem);
}
span:last-child{
   transform: translate(-0.5rem, 0.45rem);
}
</style>