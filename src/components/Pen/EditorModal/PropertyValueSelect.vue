<template>
   <div class="flex flex-row gap-1">
      <div class="bg-lilac-dark w-1/2 font-semibold text-center p-2">
         {{ name }}
      </div>
      <div class="bg-lilac-dark w-1/2 hover:bg-lilac-dark/70 focus-within:bg-lilac-dark/70 flexCentered"
         :class="{ 'wider': !showDelete }"
      >
         <select v-if="values.length > 0" class="w-full h-full p-2 bg-transparent cursor-pointer" @input="handleInput">
            <option v-for="value in values" :value="value" :key="`${ name }option${ value }`" :selected="value === selected">
               {{ value }}
            </option>
         </select>
         <span v-else>
            {{ selected || 'unknown' }}
         </span>
      </div>
      <button v-if="showDelete" class="w-10 h-10 bg-red-500/70 hover:bg-red-500 focus-visible:bg-red-500"
         title="remove property" @click="$emit('deleteMe')"
      >
         <FontAwesomeIcon icon="fa-solid fa-minus" />
      </button>
   </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
   inheritAttrs: false,
   name: "PropertyValueSelect",
   props: {
      name: {
         type: String,
         required: true
      },
      values: {
         type: Array<String>,
         required: true
      },
      selected: {
         type: String,
         default: ""
      }
   },
   data(){
      return {
         sacredProperties: ['brand', 'ink color']
      }
   },
   methods: {
      handleInput(e: Event){
         const value = (e.target as HTMLSelectElement).value
         this.$emit('input', value)
      }
   },
   computed: {
      showDelete(){
         return !this.sacredProperties.includes(this.name)
      }
   }
})
</script>

<style scoped>
.wider{
   width: calc(50% + 2.8rem);
}
</style>