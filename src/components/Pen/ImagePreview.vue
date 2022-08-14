<template>
   <div class="flexCentered min-h-[12rem] max-h-[12rem]">
      <img v-if="showImage" :src="src" title="" :alt="`${ penName } image preview`"
         class="shadow-md shadow-black/80 rounded-md h-[12rem] max-w-full max-h-[15rem]"
      />
      <FontAwesomeIcon v-else icon="fa-solid fa-pen-clip" class="highlighted" size="5x" />
   </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
   name: "ImagePreview",
   props: {
      showImage: {
         type: Boolean,
         default: false
      },
      src: {
         type: String,
         default: ''
      },
      penName: {
         type: String,
         default: 'pen'
      }
   }
})
</script>

<style scoped>

</style>