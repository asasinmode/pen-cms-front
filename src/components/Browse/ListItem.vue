<template>
   <div class="flexCentered flex-col py-4">
      <div class="flex flexCentered w-full">
         <ImagePreview :showImage="showImage" :src="pen.image" :alt="pen.name" class="mb-6 min-w-[12rem]" />
      </div>
      <div class="flex flex-col w-full">
         <h1 class="text-3xl text-center mb-2">
            {{ pen.name }}
         </h1>
         <div class="w-full flex flex-col">
            <div v-for="(value, property) in pen.properties" class="w-full min-h-[2.5rem] flex flex-row text-lg items-center">
               <span class="flex justify-end pr-1 pl-6 flex-1">
                  {{ property }}:
               </span>
               <span class="font-semibold pl-2 pr-6 flex-1">
                  {{ value }}
               </span>
            </div>
         </div>
      </div>
   </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from "vue";
import type { ifPen } from "@/typings/pen";
import ImagePreview from "@/components/Pen/ImagePreview.vue";

export default defineComponent({
   name: "ListItem",
   components: { ImagePreview },
   props: {
      pen: {
         type: Object as PropType<ifPen>,
         required: true
      }
   },
   computed: {
      showImage(){
         return this.pen.image !== undefined
      }
   }
})
</script>

<style scoped>

</style>