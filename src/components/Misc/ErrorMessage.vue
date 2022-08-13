<template>
   <p v-if="showLoginMessage">{{ isLoggedIn ? 'relog and try again' : 'login to modify this resource' }}</p>
   <p v-else-if="isAxiosError">{{ serverMessage }}</p>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapState } from "pinia";
import { useUserStore } from "@/stores/userStore";
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
      ...mapState(useUserStore, ['isLoggedIn']),
      isAxiosError(){
         return axios.isAxiosError(this.error)
      },
      showLoginMessage(){
         return this.isAxiosError && this.error.response?.data.message === 'not authorized'
      }
   }
})
</script>

<style scoped>
p {
   @apply text-center text-red-700 font-semibold
}
</style>