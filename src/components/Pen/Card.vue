<template>
   <article class="flex flex-col pt-2">
      <h1 class="text-3xl text-center mb-4">
         {{ pen.name }}
      </h1>
      <ImagePreview :showImage="showImage" :src="pen.image" :penName="pen.name" class="mb-6" />
      <div class="h-full flex flex-col text-lg thirds mb-2">
         <div class="flex flex-row items-center">
            <span class="flex justify-end flex-1 pl-2 pr-1">brand:</span>
            <span class="font-semibold flex-1 pr-2 pl-1">{{ pen.properties.brand }}</span>
         </div>
         <div class="flex flex-row items-center w-full">
            <span class="flex justify-end flex-1 pl-2 pr-1">ink color:</span>
            <span class="font-semibold flex-1 pr-2 pl-1">{{ pen.properties['ink color'] }}</span>
         </div>
         <div v-if="showDots" class="flexCentered">
            <FontAwesomeIcon icon="fa-solid fa-ellipsis" size="2x" title="ellipsis" />
         </div>
      </div>
      <div class="flex flex-row w-full mt-auto border-lilac-dark border-t-4 bg-lilac-light">
         <button @click="$emit('deleteMe', $event)" class="flex-1 h-12 font-semibold border-r-2 border-lilac-dark focus-visible:z-10 hoverable">
            delete
         </button>
         <button @click="$emit('editMe', $event)" class="flex-1 h-12 font-semibold border-l-2 border-lilac-dark focus-visible:z-10 hoverable">
            edit
         </button>
      </div>
   </article>
</template>

<script lang="ts">
import { defineComponent, type PropType } from "vue";
import type { ifPen } from "@/typings/pen";
import ImagePreview from "./ImagePreview.vue";

export default defineComponent({
   name: "Card",
   components: { ImagePreview },
   props: {
      pen: {
         type: Object as PropType<ifPen>,
         required: true
      }
   },
   computed: {
      showImage() {
         return this.pen.image !== undefined;
      },
      showDots() {
         return Object.keys(this.pen.properties).length > 2;
      }
   }
})
</script>

<style scoped>
.thirds > div{
   flex: calc(100% / 3) 0 0;
   @apply w-full flex flex-row
}
</style>