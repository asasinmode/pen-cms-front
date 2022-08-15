<template>
   <div class="flex flex-row w-full h-10 justify-center items-center gap-2 mt-auto mb-3 pt-2">
      <button class="ml-2 text-navy-dark/50 hover:text-navy-dark disabled:hover:!text-navy-dark/40" :disabled="isPreviousDisabled" @click="moveTo(true)">
         <FontAwesomeIcon icon="fa-solid fa-angle-left" size="lg" />
      </button>
      <input id="currentPageInput" v-model="inputValue" @input="handleInput" @focusout="moveFromInput" @keydown.enter="moveFromInput"
         class="rounded-full w-12 pl-2 pr-[0.6rem] py-1 text-center bg-transparent border-navy-dark/40 border-2
         hover:bg-lilac-dark/40 focus:bg-lilac-dark/70 hover:border-navy-dark/50 focus:border-navy-dark/60"
      >
      <button class="mr-2 text-navy-dark/40 hover:text-navy-dark disabled:hover:!text-navy-dark/40" :disabled="isNextDisabled" @click="moveTo(false)">
         <FontAwesomeIcon icon="fa-solid fa-angle-right" size="lg" />
      </button>
   </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
   name: "Controls",
   props: {
      totalNumberOfPages: {
         type: Number,
         required: true
      },
      currentPage: {
         type: Number,
         default: 1
      }
   },
   emits: ['moveTo'],
   data(){
      return {
         inputValue: <string> '1'
      }
   },
   mounted(){
      this.inputValue = this.currentPage.toString()
   },
   methods: {
      handleInput(e: Event){
         const value = (e.target as HTMLInputElement).value
         const filteredValue = value.replace(/[^0-9]/g, "")

         this.inputValue = filteredValue
      },
      moveFromInput(){
         if(this.inputValue === ""){
            this.inputValue = this.currentPage.toString()
            return
         }
         this.setLimitedValue(parseInt(this.inputValue) as number)
      },
      moveTo(previous: boolean){
         if(previous){
            this.setLimitedValue(parseInt(this.inputValue) - 1)
            return
         }
         this.setLimitedValue(parseInt(this.inputValue) + 1)
      },
      setLimitedValue(target: number){
         const limitedValue = target < 1 ? 1 : target > this.totalNumberOfPages ? this.totalNumberOfPages : target

         console.log("settin inputValue to", limitedValue)
         this.inputValue = limitedValue.toString()
         this.$emit('moveTo', limitedValue)
      }
   },
   computed: {
      isPreviousDisabled(){
         return this.currentPage === 1
      },
      isNextDisabled(){
         console.log(this.currentPage, this.totalNumberOfPages)
         return this.currentPage === this.totalNumberOfPages
      }
   }
})
</script>

<style scoped>
input:focus{
   outline: none;
}
</style>