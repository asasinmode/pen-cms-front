<template>
   <main class="flex flex-col items-center">
      <article v-if="!isLoggedIn">
         <h1>login</h1>
         <FilledInput v-model="usernameInput.value" :id="`loginUsername`" :placeholder="'username'"
            :errorMessage="usernameInput.errorMessage" :showError="usernameInput.showErrorMessage"
            @input="usernameInput.showErrorMessage = false"
         />
         <FilledInput v-model="passwordInput.value" :id="`loginPassword`" :placeholder="'password'"
            :errorMessage="passwordInput.errorMessage" :showError="passwordInput.showErrorMessage"
            @input="passwordInput.showErrorMessage = false" type="password"
         />
         <div class="flexCentered flex-row gap-4 text-lg flex-wrap">
            <Button @click="handleRegister" :disabled="isLoading">
               <span class="z-10 pointer-events-none">
                  register
               </span>
            </Button>
            <Button @click="handleLogin" :disabled="isLoading">
               <span class="z-10 pointer-events-none">
                  login
               </span>
            </Button>
         </div>
         <h3 v-if="isErrorInvalidCredentials" class="text-xl text-red-700">
            invalid credentials
         </h3>
      </article>
      <article v-else>
         <h1>logged in as <span class="block md:hidden"></span>{{ username }}</h1>
         <div class="flex flex-row gap-4 text-lg flex-wrap">
            <Button @click="deleteUser" :disabled="isLoading" class="w-44">
               <span class="z-10 pointer-events-none">
                  delete account
               </span>
            </Button>
            <Button @click="logout" :disabled="isLoading" class="w-44">
               <span class="z-10 pointer-events-none">
                  logout
               </span>
            </Button>
         </div>
      </article>
   </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapState, mapActions } from "pinia";
import { useUserStore } from "@/stores/userStore";
import FilledInput from "@/components/Misc/FilledInput.vue";
import Button from "@/components/Misc/Button.vue";

export default defineComponent({
   name: "User",
   components: { FilledInput, Button },
   data() {
      return {
         usernameInput: {
            value: "",
            showErrorMessage: false,
            errorMessage: "username cannot be empty"
         },
         passwordInput: {
            value: "",
            showErrorMessage: false,
            errorMessage: "password cannot be empty"
         },
         isLoading: false,
         requestError: <any> undefined
      }
   },
   methods: {
      ...mapActions(useUserStore, ['login', 'logout']),
      async handleRegister(e: Event){
         const button = e.target as HTMLButtonElement
         const isInputsValid = this.validateInputs(button)
         if(!isInputsValid){ return false }

         this.isLoading = true

         try {
            const { token, name } = await this.$http.post("users", {
               name: this.usernameInput.value,
               password: this.passwordInput.value
            }).then(res => res.data)

            this.login(name, token)
         } catch(err){
            this.requestError = err
            this.$shake(button)
            return
         } finally{
            this.isLoading = false
         }

         this.resetInputs()
      },
      async handleLogin(e: Event){
         const button = e.target as HTMLButtonElement
         const isInputsValid = this.validateInputs(button)
         if(!isInputsValid){ return false }

         this.isLoading = true

         try {
            const { token, name } = await this.$http.post("users/login", {
               name: this.usernameInput.value,
               password: this.passwordInput.value
            }).then(res => res.data)

            this.login(name, token)
         } catch(err){
            this.requestError = err
            this.$shake(button)
            return
         } finally{
            this.isLoading = false
         }

         this.resetInputs()
      },
      async deleteUser(e: Event){
         const button = e.target as HTMLButtonElement

         this.isLoading = true

         try {
            await this.$http.delete(`users/${ this.username }`, {
               headers: { Authorization: `Bearer ${ this.authToken }` }
            }).then(res => res.data)
         } catch(err){
            this.requestError = err
            this.$shake(button)
            return
         } finally{
            this.isLoading = false
         }

         this.requestError = false
         this.logout()
      },
      validateInputs(buttonToShake: HTMLButtonElement): boolean{
         const isUsernameInputValid = this.usernameInput.value !== ""
         const isPasswordInputValid = this.passwordInput.value !== ""

         this.usernameInput.showErrorMessage = !isUsernameInputValid
         this.passwordInput.showErrorMessage = !isPasswordInputValid

         if(!isUsernameInputValid || !isPasswordInputValid){
            this.$shake(buttonToShake)
            return false
         }

         return true
      },
      resetInputs(){
         this.requestError = false
         this.usernameInput.value = ""
         this.passwordInput.value = ""
      }
   },
   computed: {
      ...mapState(useUserStore, ['isLoggedIn', 'authToken', 'username']),
      isErrorInvalidCredentials(){
         return this.requestError ? this.requestError.response.status === 400 : false
      },
      inputValues(){
         return [this.usernameInput.value, this.passwordInput.value]
      }
   }
})
</script>

<style scoped>
article{
   @apply rounded-md flex flex-col mt-40 md:mt-60 gap-2 flexCentered
}
h1{
   @apply text-5xl text-center highlighted mb-4
}
@media (max-height: 32rem) {
   article{
      margin-top: 4rem;
   }
}
</style>