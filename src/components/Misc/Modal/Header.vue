<template>
   <h1 id="dialogLabel" v-show="showDefault">
      <slot />
   </h1>
   <h1 id="dialogLabel" v-show="showError" class="text-red-700 font-semibold">
      an error has occured
   </h1>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
   name: "Header",
   props: {
      showDefault: {
         type: Boolean,
         default: true
      },
      showError: {
         type: Boolean,
         default: false
      }
   }
})
</script>

<style scoped>
h1{
   @apply text-center text-3xl mb-4
}
</style>