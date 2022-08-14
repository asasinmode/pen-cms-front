<template>
   <article class="flex flex-col pt-2">
      <h1 class="text-3xl text-center mb-4">
         {{ pen.name }}
      </h1>
      <div class="w-full flexCentered min-h-[12rem] max-h-[12rem] mb-6">
         <img v-if="showImage" :src="pen.image" title="" :alt="`${ pen.name } image preview`"
            class="shadow-md shadow-black/80 rounded-md h-[12rem] max-w-full max-h-[15rem]"
         />
         <FontAwesomeIcon v-else icon="fa-solid fa-pen-clip" class="highlighted" size="5x" />
      </div>
      <div class="h-full flex flex-col text-lg thirds mb-2">
         <div class="flex flex-row items-center">
            <span class="flex justify-end w-1/2 pr-1">brand:</span>
            <span class="font-semibold pl-2">{{ pen.properties.brand }}</span>
         </div>
         <div class="flex flex-row items-center">
            <span class="flex justify-end w-1/2 pr-1">ink color:</span>
            <span class="font-semibold pl-2">{{ pen.properties['ink color'] }}</span>
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

export default defineComponent({
   name: "Card",
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