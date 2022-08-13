import { defineStore } from 'pinia';

export const useUserStore = defineStore({
   id: "userStore",
   state: () => ({
      isLoggedIn: false,
      authToken: <undefined | string> undefined,
      username: <undefined | string> undefined
   }),
   actions: {
      login(username: string, token: string){
         this.isLoggedIn = true
         this.username = username
         this.authToken = token
      },
      logout(){
         this.isLoggedIn = false
         this.authToken = undefined
         this.username = undefined
      }
   }
})
