<template>
   <Teleport to="body">
      <div class="fixed w-[100vw] h-[100vh] inset-0 bg-black/40 flex justify-center items-start z-[100]"
         @click.self="close" @keydown.esc="close" @keydown.tab="handleTabNavigation"
      >
         <article class="bg-lilac-light flex flex-col p-4 overflow-y-auto overflow-x-hidden shadow-black/30 shadow-md relative mt-10 md:mt-24 rounded-md"
            ref="contentContainer"
            aria-role="dialog" aria-live="polite" :aria-busy="isLoading" aria-modal="true" aria-labelledby="dialogLabel"
         >
            <Header :showDefault="!isLoading && !showError" :showError="!isLoading && showError">
               <slot name="header" />
            </Header>
            <section v-show="!isLoading" class="flex flex-col gap-3">
               <slot />
            </section>
            <div v-show="isLoading" class="overflow-hidden flex justify-center items-center flex-1">
               <Loading />
            </div>
            <ControlButtons v-if="!isLoading" :showClose="showError" :disable="isLoading" :focusButtons="focusButtons"
               @close="close" @confirm="confirm" @cancel="cancel"
            />
         </article>
      </div>
   </Teleport>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Button from "@/components/Misc/Button.vue";
import Loading from "@/components/Misc/Loading.vue";
import Header from "./Modal/Header.vue";
import ControlButtons from "./Modal/ControlButtons.vue";

export default defineComponent({
   name: "Modal",
   components: { Button, Loading, Header, ControlButtons },
   props: {
      isLoading: {
         type: Boolean,
         default: false
      },
      closeFocusTarget: {
         type: HTMLElement
      },
      showError: {
         type: Boolean,
         default: false
      },
      focusButtons: {
         type: Boolean,
         default: true
      }
   },
   emits: ["close", "confirm", "cancel"],
   methods: {
      close() {
         !this.isLoading && this.$emit("close");
      },
      confirm(){
         this.$emit("confirm")
      },
      cancel(){
         this.$emit("cancel")
      },
      handleTabNavigation(e: KeyboardEvent){
         const focusables: NodeListOf<HTMLButtonElement | HTMLInputElement | HTMLSelectElement> = this.$refs.contentContainer.querySelectorAll("button,input,select")
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
   max-height: calc(100% - 8rem);
}
@media (min-width: 768px){
   article{
      width: 40rem;
      max-height: calc(100% - 12rem);
   }
}
</style>