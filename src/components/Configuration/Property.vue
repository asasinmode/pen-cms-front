<template>
   <article class="relative" :class="{ 'bg-lilac-dark': isSelected,
      'after:absolute after:bottom-0 after:w-full after:h-1 after:pointer-events-none after:bg-lilac-dark/100': !isNew }"
   >
      <ExpandButton @click="$emit('expandMe', name)" :title="name" :disabled="isSelected" />
      <div v-show="isSelected" class="flexCentered flex-col md:flex-row md:items-start md:space-x-4 space-y-4 md:space-y-0 p-4 pb-8">
         expanded
      </div>
   </article>
</template>

<script lang="ts">
import { defineComponent, type PropType } from "vue";
import Button from "@/components/Misc/Button.vue";
import ExpandButton from "./Property/ExpandButton.vue";

export default defineComponent({
   name: "Property",
   components: { Button, ExpandButton },
   props: {
      selectedProperty: {
         type: String,
         required: true
      },
      name: {
         type: String,
         required: true
      },
      values: {
         type: Array as PropType<Array<string>>,
      }
   },
   data(){
      return {
      }
   },
   methods: {
      createNewProperty(){
         console.log("creating new pen property")
      }
   },
   computed: {
      isNew(){
         return this.name === "new"
      },
      isSelected(){
         return this.selectedProperty === this.name
      }
   }
})
</script>

<style scoped>
</style>