<template>
   <div class="flex w-full h-14 relative" :class="{'!mb-5': helperMessage.length || errorMessage.length}">
      <Button @click="clickInput" title="upload file" @drop.prevent="handleDrop" @dragover.prevent="isDraggedOver = true" @dragleave="isDraggedOver = false"
         class="pt-0 pb-0 border-dashed border-2 border-navy-dark/50 rounded flex-1 !bg-navy-dark/10 hover:!bg-navy-dark/[0.15] focus:!bg-navy-dark/[0.15]"
         :class="{ 'border-red-700': isInvalid }"
      >
         <label v-show="!isDraggedOver" :for="`${ id }FileInput`" class="w-full h-full flex flex-row items-center justify-between z-10 pointer-events-none" >
            <input ref="fileInput" :id="`${ id }FileInput`" :multiple="isMultiple" type="file" @input="handleInput" :accept="acceptedTypesString" class="w-[12rem]" tabindex="-1" />
            <FontAwesomeIcon icon="upload" size="lg" class="text-navy-dark/50" :class="{ '!text-red-700': isInvalid }" />
         </label>
         <FontAwesomeIcon v-show="isDraggedOver" icon="plus" size="lg" class="mt-[2px] text-navy-dark/50 pointer-events-none" />
      </Button>
      <span v-show="!isInvalid" class="pointer-events-none text-black/50 text-[0.75em] absolute left-4 bottom-0 translate-y-full">
         {{ helperMessage }}
      </span>
      <span v-show="isInvalid" class="pointer-events-none text-red-700 text-[0.75em] absolute left-4 bottom-0 translate-y-full">
         {{ errorMessage }}
      </span>
   </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Button from "@/components/Misc/Button.vue"

export default defineComponent({
   name: 'FileInput',
   inheritAttrs: false,
   components: { Button },
   props: {
      id: {
         type: String,
         required: true
      },
      isMultiple: {
         type: Boolean,
         default: false
      },
      acceptedTypes: {
         type: Array<String>,
         default: []
      },
      helperMessage: {
         type: String,
         default: ""
      },
      errorMessage: {
         type: String,
         default: ""
      },
      showError: {
         type: Boolean,
         default: false
      }
   },
   data(){
      return {
         uploadedFiles: <FileList | undefined> undefined,
         isDraggedOver: false,
         areUploadedFilesInvalid: false
      }
   },
   methods: {
      clickInput(){
         this.$refs.fileInput.click()
      },
      handleDrop(e: DragEvent){
         this.isDraggedOver = false

         if(!e.dataTransfer){ return }

         (this.$refs.fileInput as HTMLInputElement).files = e.dataTransfer.files
         this.handleInput()
      },
      handleInput(){
         const files = (this.$refs.fileInput as HTMLInputElement).files;
         const filesLength = files?.length;

         if(!filesLength){ return }

         this.uploadedFiles = files
         this.areUploadedFilesInvalid = this.invalidCheck()

         this.$emit('input', this.uploadedFiles)
      },
      invalidCheck(){
         if(this.showError){ return true }
         if(this.uploadedFiles === undefined){ return false }

         if(this.acceptedTypes.length > 0){
            for(let i = 0; i < this.uploadedFiles.length; i++){
               if(!this.acceptedTypes.includes(this.uploadedFiles[i].type)){
                  return true
               }
            }
         }

         return false
      }
   },
   computed: {
      acceptedTypesString(){
         return this.acceptedTypes.join()
      },
      isInvalid(){
         return this.showError || this.areUploadedFilesInvalid
      }
   }
})
</script>

<style scoped>
input[type=file]::file-selector-button, input[type=file]::-webkit-file-upload-button{
   display: none;
}
</style>