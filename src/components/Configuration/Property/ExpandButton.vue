<template>
   <button class="h-14 hoverable flexCentered w-full focus-visible:z-10">
      <span class="z-10 pointer-events-none" v-if="title === 'new'">
         <FontAwesomeIcon icon="fa-solid fa-plus" size="2xl" class="font-bold" />
      </span>
      <span v-else class="font-bold text-lg">
         {{ title }}
      </span>
   </button>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
   name: "ExpandButton",
   props: {
      title: {
         type: String,
         required: true
      }
   }
})
</script>

<style scoped>

</style>