<template>
   <main class="flex flex-col">
      <Property v-for="property in testProperties" :key="property.name" @expandMe="expandProperty"
         :selectedProperty="selectedProperty" :name="property.name" :values="property.values"
         @updateMe="emitHandlers().update(property.name, $event)" @deleteMe="emitHandlers().delete(property.name, $event)"
      />
      <Property :selectedProperty="selectedProperty" :name="'new'" @expandMe="expandProperty" @createMe="emitHandlers().create" />
      <Modal v-if="modal.show"
         @confirm="processChanges" @close="modalControllers().close" @cancel="modalControllers().close"
         :isLoading="modal.isProcessing" :header="operationData.type"
         :showError="modalComputed.showError"
         :closeFocusTarget="modal.closeFocusTarget"
      >
         uwu
      </Modal>
   </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Property from "@/components/Configuration/Property.vue";
import { type ifUpdateObject, enModalOperationType, type ifOperationData } from "@/typings/configuration";
import Modal from "@/components/Misc/Modal.vue";

export default defineComponent({
   name: "Configuration",
   components: { Property, Modal },
   data(){
      return {
         selectedProperty: "",
         modal: {
            show: false,
            closeFocusTarget: <HTMLElement | undefined> undefined,
            isDelete: false,
            isProcessing: false,
         },
         testProperties: [
            {
               name: "brand",
               values: ["penS", "penful"]
            },
            {
               name: "ink color",
               values: ["black", "blue", "red", "green", "one", "two", "three", "four", "five", "six", "seven", "eight", "ninth"]
            },
            {
               name: "material",
               values: ["plastic", "metal", "ultra omega very long too long even", "fourth", "fifth", "sixth"]
            },
            {
               name: "test",
               values: ["test"]
            },
         ],
         operationData: <ifOperationData> {
            type: enModalOperationType.add,
            added: {},
            updated: {},
            deleted: {}
         },
         error: <any> undefined
      }
   },
   methods: {
      expandProperty(property: string){
         this.clearRipples()
         this.selectedProperty = property
      },
      clearRipples(){
         document.querySelector(".ripple")?.remove()
      },
      resetOperationData(){
         this.operationData.added = {}
         this.operationData.updated = {}
         this.operationData.deleted = {}
      },
      emitHandlers(){
         return {
            create: ({ newName, values, button }: ifUpdateObject) => {
               console.log("preparing data for create modal", newName, "with values", values)

               this.operationData.type = enModalOperationType.add

               this.modalControllers().open(false, button)
            },
            update: (propertyName: string, { newName, values, button }: ifUpdateObject) => {
               console.log("preparing data for update modal", propertyName)

               this.operationData.type = enModalOperationType.update

               this.modalControllers().open(false, button)
            },
            delete: (name: string, closeFocusTarget: HTMLButtonElement) => {
               console.log("preparing data for delete modal", name)

               this.operationData.type = enModalOperationType.delete

               this.modalControllers().open(true, closeFocusTarget)
            }
         }
      },
      modalControllers(){
         return {
            open: (isDelete: boolean, closeFocusTarget: HTMLButtonElement) => {
               this.modal.closeFocusTarget = closeFocusTarget
               this.modal.isDelete = isDelete
               this.modal.show = true

               isDelete && this.updateAffectedByChangeData()
            },
            close: () => {
               this.modal.show = false
               this.error = undefined
               this.modalControllers().reset()
               this.resetOperationData()
            },
            reset: () => {
               this.modal.isDelete = false
               this.modal.isProcessing = false
            }
         }
      },
      updateAffectedByChangeData(){
         console.log("getting update info")
      },
      processChanges(){

      }
   },
   computed: {
      modalComputed(){
         return {
            showError: this.error !== undefined
         }
      }
   }
})
</script>

<style scoped>

</style>