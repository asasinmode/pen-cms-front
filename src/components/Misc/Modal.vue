<template>
   <Teleport to="body">
      <div class="fixed w-[100vw] h-[100vh] inset-0 bg-black/40 flex justify-center items-start z-[100]"
         @click.self="closeMe" @keydown.esc="closeMe" @keydown.tab="handleTabNavigation"
      >
         <article class="bg-lilac-light flex flex-col p-4 overflow-y-auto overflow-x-hidden shadow-black/30 shadow-md relative mt-10 md:mt-24 rounded-md"
            ref="contentContainer"
            aria-role="dialog" aria-live="polite" :aria-busy="isLoading" aria-modal="true" aria-labelledby="dialogLabel"
         >
            <h1 id="dialogLabel" v-show="headerText.length && !isLoading" class="text-center text-3xl mb-4" :class="{ 'error': showError }">
               {{ headerText }}
            </h1>
            <section v-if="!isLoading" class="flex flex-col">
               <slot />
            </section>
            <div v-show="isLoading" class="overflow-hidden flex justify-center items-center flex-1">
               <Loading />
            </div>
            <div v-if="showError && !isLoading" class="flex flex-col">
               <Button @click="closeMe" :focusOnMounted="true">
                  <span class="z-10 pointer-events-none">
                     close
                  </span>
               </Button>
            </div>
            <div class="flexCentered flex-row mt-4 gap-2" v-if="isConfirm && !isLoading && !showError">
               <Button @click="closeMe" :disabled="isLoading" :focusOnMounted="true">
                  <span class="z-10 pointer-events-none">
                     cancel
                  </span>
               </Button>
               <Button @click="confirm" :disabled="isLoading">
                  <span class="z-10 pointer-events-none">
                     confirm
                  </span>
               </Button>
            </div>
         </article>
      </div>
   </Teleport>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Button from "@/components/Misc/Button.vue";
import Loading from "@/components/Misc/Loading.vue";

export default defineComponent({
   name: "Modal",
   components: { Button, Loading },
   props: {
      isConfirm: {
         type: Boolean,
         default: true
      },
      isLoading: {
         type: Boolean,
         default: false
      },
      header: {
         type: String,
         default: ""
      },
      closeFocusTarget: {
         type: HTMLElement
      },
      showError: {
         type: Boolean,
         default: false
      }
   },
   emits: ["close", "confirm", "cancel"],
   methods: {
      closeMe() {
         !this.isLoading && this.$emit("close");
      },
      confirm(){
         this.$emit("confirm")
      },
      cancel(){
         this.$emit("cancel")
      },
      handleTabNavigation(e: KeyboardEvent){
         const focusables = this.$refs.contentContainer.querySelectorAll("button")
         if(e.shiftKey && document.activeElement === focusables[0]){
            focusables[focusables.length - 1].focus()
            e.preventDefault()
            return
         }
         if(document.activeElement === focusables[focusables.length - 1]){
            focusables[0].focus()
            e.preventDefault()
            return
         }
      }
   },
   computed: {
      headerText(){
         return this.showError ? "an error has occurred" : this.header
      }
   },
   mounted(){
      document.body.style.overflow = "hidden"
   },
   unmounted(){
      document.body.style.overflow = "unset"
      this.closeFocusTarget?.focus()
   }
})
</script>

<style scoped>
article{
   width: calc(100% - 4rem);
   max-width: calc(100% - 4rem);
   max-height: calc(100% - 7rem);
}
@media (min-width: 768px){
   article{
      width: 40rem;
   }
}
</style>