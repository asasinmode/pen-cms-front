<template>
   <p v-if="isAxiosError" class="text-center text-red-700 font-semibold">{{ serverMessage }}</p>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import axios from "axios"

export default defineComponent({
   name: "ErrorMessage",
   props: {
      error: {
         type: Object,
         required: true
      }
   },
   data(){
      return {
         serverMessage: ""
      }
   },
   mounted(){
      if(!this.isAxiosError){
         console.error(this.error)
         return
      }
      this.serverMessage = this.error.response?.data.message
   },
   computed: {
      isAxiosError(){
         return axios.isAxiosError(this.error)
      }
   }
})
</script>

<style scoped>

</style>