<template>
   <Modal @confirm="handleConfirm" @close="$emit('close')" @cancel="$emit('close')"
      :isLoading="isLoading" :showError="error !== undefined"
      :closeFocusTarget="closeFocusTarget"
   >
      <template #header>
         {{ headerText }}
      </template>
      <template v-if="error === undefined" #default>
         <Editor :pen="pen" @updatePen="updatePenData" @imageInput="uploadNewImage" ref="editor" :availableProperties="availableProperties" />
      </template>
      <template v-else #default>
         <ErrorMessage :error="error" />
      </template>
   </Modal>
</template>

<script lang="ts">
import { defineComponent, type PropType } from "vue";
import { useUserStore } from "@/stores/userStore";
import { mapState } from "pinia";
import type { ifPen } from "@/typings/pen";
import type { ifProperty } from "@/typings/configuration";
import Modal from "@/components/Misc/Modal.vue";
import Editor from "./EditorModal/Editor.vue"
import ErrorMessage from "../Misc/ErrorMessage.vue";

export default defineComponent({
   name: "EditorModal",
   components: { Modal, Editor, ErrorMessage },
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
   emits: ['addPen', 'patchPen', 'close', 'cancel', 'close'],
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
         }
         this.updatePen()
      },
      updatePenData(pen: Partial<ifPen>){
         this.penData = pen
      },
      uploadNewImage(file: File | undefined = undefined){
         this.newImage = file
      },
      async createPen(){
         this.isLoading = true

         try {
            const saveResults = await this.$http.post("pens", this.presentableToApiPen(), {
               headers: { "Authorization": `Bearer: ${ this.authToken }` }
            }).then(res => res.data)
            this.$emit('addPen', saveResults)
         } catch(e){
            this.error = e
            return
         } finally {
            this.isLoading = false
         }

         this.$emit('close')
      },
      async updatePen(){
         this.isLoading = true

         try {
            const saveResults = await this.$http.patch(`pens/${ this.pen._id }`, this.presentableToApiPen()).then(res => res.data)
            this.$emit('patchPen', saveResults)
         } catch(e){
            this.error = e
            return
         } finally {
            this.isLoading = false
         }

         this.$emit('close')
      },
      presentableToApiPen(){
         const rv = new FormData()

         if(this.isNew){
            rv.append("name", this.penData.name || "")
            rv.append("properties", JSON.stringify(this.nullifiedUndefineds(this.penData.properties)))
            if(this.newImage !== undefined){
               rv.append("image", this.newImage)
            }
            return rv
         }

         if(this.pen.name !== this.penData.name){
            rv.append("name", this.penData.name || "")
         }
         if(Object.keys(this.penData.properties || {}).length > 0){
            rv.append("properties", JSON.stringify(this.nullifiedUndefineds(this.penData.properties)))
         }
         if(this.newImage !== undefined){
            rv.append("image", this.newImage)
         }

         return rv
      },
      nullifiedUndefineds(objectToNullify: any){
         if(!objectToNullify){ return {} }
         return Object.keys(objectToNullify).reduce((previous, current) => ({
            ...previous,
            [current]: objectToNullify[current] || null
         }), {})
      }
   },
   computed: {
      ...mapState(useUserStore, ['authToken']),
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