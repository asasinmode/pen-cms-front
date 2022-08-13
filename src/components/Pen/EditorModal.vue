<template>
   <Modal @confirm="handleConfirm" @close="$emit('close')" @cancel="$emit('close')"
      :isLoading="isLoading" :showError="error !== undefined"
      :closeFocusTarget="closeFocusTarget" :focusButtons="false"
   >
      <template #header>
         {{ headerText }}
      </template>
      <template v-if="error !== undefined" #default>
         <Editor :pen="pen" @updatePen="updatePenData" @imageInput="uploadNewImage" ref="editor" :availableProperties="availableProperties" />
      </template>
      <template v-else #default>
         <ErrorMessage :error="error" />
      </template>
   </Modal>
</template>

<script lang="ts">
import { defineComponent, type PropType } from "vue";
import type { ifPen } from "@/typings/pen";
import type { ifProperty } from "@/typings/configuration";
import Modal from "@/components/Misc/Modal.vue";
import Editor from "./EditorModal/Editor.vue"

export default defineComponent({
   name: "EditorModal",
   components: { Modal, Editor },
   props: {
      pen: {
         type: Object as PropType<ifPen>,
         required: true
      },
      closeFocusTarget: {
         type: Object as PropType<undefined | HTMLButtonElement>,
         required: true
      },
      availableProperties: {
         type: Object as PropType<ifProperty[]>
      }
   },
   data(){
      return {
         isLoading: false,
         isNew: false,
         error: <any> undefined,
         penData: <Partial<ifPen>> {},
         newImage: <File | undefined> undefined,
      }
   },
   mounted(){
      if(this.pen._id !== 'new'){
         this.penData = this.pen
         return
      }

      this.penData = {
         name: "",
         properties: {}
      }
      this.isNew = true
   },
   methods: {
      handleConfirm(){
         const isInputsValid = this.$refs.editor.validateInputs()
         if(!isInputsValid){
            this.$shake(this.confirmModalButton)
            return
         }

         if(this.isNew){
            this.createPen()
            return
         } else{
            this.updatePen()
         }
      },
      updatePenData(pen: Partial<ifPen>){
         this.penData = pen
      },
      uploadNewImage(file: File | undefined = undefined){
         this.newImage = file
      },
      createPen(){
         console.log("creating pen")
      },
      updatePen(){
         console.log("updating pen")
      }
   },
   computed: {
      headerText(){
         return this.isNew ? `add new pen` : `edit pen`
      },
      confirmModalButton(){
         return document.querySelector("#modalConfirmButton") as HTMLButtonElement
      }
   }
})
</script>

<style scoped>

</style>