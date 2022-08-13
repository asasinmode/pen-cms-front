<template>
   <main class="flex flex-row p-4 gap-4">
      <template v-if="!isLoading">
         <Card v-for="(pen, index) in pens" :key="index + pen.name" :pen="pen" @editMe="openEditor(pen, $event)" />
         <article class="flexCentered">
            <button @click="openEditor('new', $event)" ref="newButton" class="hoverable w-full h-full">
               <FontAwesomeIcon icon="fa-solid fa-plus" class="pointer-events-none" size=2xl />
            </button>
         </article>
         <EditorModal v-if="selectedPen !== undefined" @close="selectedPen = undefined" :pen="selectedPen"
            :closeFocusTarget="modalFocusTarget" :availableProperties="availableProperties"
         />
      </template>
      <template v-else>
         <Loading class="w-full h-full" />
      </template>
   </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import type { ifPen } from "@/typings/pen";
import type { ifProperty } from "@/typings/configuration";
import Card from "@/components/Pen/Card.vue";
import EditorModal from "@/components/Pen/EditorModal.vue";
import Loading from "../components/Misc/Loading.vue";

export default defineComponent({
   name: "Dashboard",
   components: { Card, EditorModal, Loading },
   data() {
      return {
         pens: <ifPen[]> [],
         selectedPen: <undefined | ifPen> undefined,
         modalFocusTarget: <undefined | HTMLButtonElement> undefined,
         availableProperties: <ifProperty[]> [],
         isLoading: false,
      }
   },
   mounted(){
      this.loadData()
   },
   methods: {
      async loadData(){
         this.isLoading = true

         this.availableProperties = await this.$http.get('properties').then(res => res.data)
         this.pens = [
            {_id: 'id1', name: 'one', properties: {'brand': 'penS', 'ink color': 'black'}},
            {_id: 'id2', name: 'two', properties: {'brand': 'penful', 'ink color': 'red'}, image: 'https://picsum.photos/1200/600'}
         ]

         this.isLoading = false
      },
      openEditor(pen: 'new' | ifPen, e: Event){
         this.selectedPen = pen === 'new' ? { _id: 'new', name: "", properties: {} } : JSON.parse(JSON.stringify(pen))
         this.modalFocusTarget = e.target as HTMLButtonElement
      }
   }
})
</script>

<style scoped>
article{
   @apply flex border-lilac-dark border-4 rounded-md
}
</style>