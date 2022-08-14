<template>
   <main class="flex flex-row flex-wrap p-4 gap-4 content-start">
      <template v-if="!isLoading">
         <article class="flexCentered w-[15.25rem]">
            <button id="skipTarget" @click="openEditor('new', $event)" ref="newButton" class="hoverable w-full h-full">
               <FontAwesomeIcon icon="fa-solid fa-plus" class="pointer-events-none" size="3x" />
            </button>
         </article>
         <Card v-for="(pen, index) in pens" :key="index + pen.name" :pen="pen"
            @editMe="openEditor(pen, $event)" @deleteMe="deleteModalControllers().open(pen._id, $event)"
         />
         <EditorModal v-if="editor.selectedPen !== undefined" @close="editor.selectedPen = undefined" :pen="editor.selectedPen"
            :closeFocusTarget="editor.modalFocusTarget" :availableProperties="editor.availableProperties"
            @addPen="pushNewPen" @patchPen="patchPen"
         />
         <Modal v-if="deleteModal.show"
            @confirm="deletePen" @close="deleteModalControllers().close" @cancel="deleteModalControllers().close"
            :isLoading="deleteModal.isProcessing" :showError="error !== undefined"
            :closeFocusTarget="deleteModal.closeFocusTarget"
         >
            <template #header>
               delete pen <span class="highlighted">{{ deleteOperationData.penName }}</span>
            </template>
            <template v-if="error !== undefined" #default>
               <ErrorMessage :error="error" />
            </template>
         </Modal>
      </template>
      <template v-else>
         <Loading class="w-full h-full" />
      </template>
   </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useUserStore } from "@/stores/userStore";
import { mapState } from "pinia";
import type { ifPen } from "@/typings/pen";
import type { ifProperty } from "@/typings/configuration";
import Card from "@/components/Pen/Card.vue";
import EditorModal from "@/components/Pen/EditorModal.vue";
import Loading from "@/components/Misc/Loading.vue";
import Modal from "@/components/Misc/Modal.vue";
import ErrorMessage from "@/components/Misc/ErrorMessage.vue";

export default defineComponent({
   name: "Dashboard",
   components: { Card, EditorModal, Loading, Modal, ErrorMessage },
   data() {
      return {
         pens: <ifPen[]> [],
         isLoading: false,
         error: <any> undefined,
         deleteModal: {
            show: false,
            closeFocusTarget: <HTMLElement | undefined> undefined,
            isProcessing: false
         },
         editor: {
            selectedPen: <undefined | ifPen> undefined,
            modalFocusTarget: <undefined | HTMLButtonElement> undefined,
            availableProperties: <ifProperty[]> [],
         },
         deleteOperationData: {
            penID: "",
            penName: ""
         }
      }
   },
   mounted(){
      this.loadData()
   },
   methods: {
      async loadData(){
         this.isLoading = true

         this.editor.availableProperties = await this.$http.get('properties').then(res => res.data)
         this.pens = await this.$http.get('pens').then(res => res.data)

         this.isLoading = false
      },
      openEditor(pen: 'new' | ifPen, e: Event){
         this.editor.modalFocusTarget = e.target as HTMLButtonElement
         this.editor.selectedPen = pen === 'new' ? { _id: 'new', name: "", properties: {} } : JSON.parse(JSON.stringify(pen))
      },
      deleteModalControllers(){
         return {
            open: (id: string, e: Event) => {
               this.deleteOperationData.penID = id
               this.deleteOperationData.penName = (this.pens.find(pen => pen._id === id) as ifPen).name
               this.deleteModal.closeFocusTarget = e.target as HTMLButtonElement
               this.deleteModal.show = true
            },
            close: () => {
               this.deleteModal.show = false
               this.deleteModal.isProcessing = false
               this.error = undefined
               this.deleteOperationData.penID = ""
            }
         }
      },
      async deletePen(){
         this.deleteModal.isProcessing = true

         try {
            await this.$http.delete(`pens/${ this.deleteOperationData.penID }`, {
               headers: { "Authorization": `Bearer: ${ this.authToken }` }
            })
            this.pens.splice(this.pens.findIndex((pen: ifPen) => pen._id === this.deleteOperationData.penID), 1)
         } catch(error){
            this.error = error
            return
         } finally {
            this.deleteModal.isProcessing = false
         }

         this.deleteModal.show = false
      },
      pushNewPen(pen: ifPen){
         this.pens.push(pen)
      },
      patchPen(updated: ifPen){
         const penIndex = this.pens.findIndex((pen: ifPen) => pen._id === updated._id)
         this.pens[penIndex].name = updated.name
         this.pens[penIndex].properties = updated.properties
         this.pens[penIndex].image = updated.image
      }
   },
   computed: {
      ...mapState(useUserStore, ['authToken'])
   }
})
</script>

<style scoped>
article{
   @apply flex border-lilac-dark border-4 rounded-md h-[30.5rem];
   flex: 1 1 15.25rem;
}
</style>