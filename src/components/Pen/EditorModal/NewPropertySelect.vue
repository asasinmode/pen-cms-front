<template>
   <div class="flex flex-row gap-1 bg-navy-light rounded-md p-1 w-[15.25rem]">
      <div class="bg-lilac-dark flex-1 hover:bg-lilac-dark/70 focus-within:bg-lilac-dark/70">
         <select class="w-full h-full p-2 bg-transparent cursor-pointer" v-model="selectedValue">
            <option v-for="(value, index) in values" :key="`newPropertyOption${ value }`"
               :value="value"
            >
               {{ value }}
            </option>
         </select>
      </div>
      <button class="w-10 h-10 bg-green-600/40 hover:bg-green-600 focus-visible:bg-green-600"
         title="add property" @click="addNewProperty"
      >
         <FontAwesomeIcon icon="fa-solid fa-plus" />
      </button>
   </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from "vue";

export default defineComponent({
   name: "NewPropertySelect",
   props: {
      values: {
         type: Object as PropType<string[]>,
         required: true
      }
   },
   data(){
      return {
         sacredProperties: ['brand', 'ink color'],
         selectedValue: <string | undefined> undefined
      }
   },
   mounted(){
      this.setSelectedToFirst()
   },
   methods: {
      addNewProperty(){
         if(this.selectedValue === undefined){ return }
         this.$emit('addNew', this.selectedValue)
      },
      setSelectedToFirst(){
         this.$nextTick(() => {
            this.selectedValue = this.values[0] || undefined
         })
      }
   }
})
</script>

<style scoped>
</style>