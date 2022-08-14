<template>
   <div class="flex flex-col md:flex-row-reverse flexCentered gap-6 md:gap-0">
      <div class="w-full md:w-1/2 flexCentered flex-col gap-1">
         <FilledInput v-model="nameInput.value" :id="`penName`" :placeholder="'name'"
            :errorMessage="nameInput.errorMessage" :showError="nameInput.showErrorMessage" :length="15.25"
            @input="nameInput.showErrorMessage = false"
         />
         <NewPropertySelect v-if="computedAvailableProperties.length > 0" :values="computedAvailableProperties"
            @addNew="addNewPropertyValue" ref="newPropertySelect"
         />
      </div>
      <div class="w-[15.25rem] md:w-1/2 flex flex-col">
         <div v-if="showImage" class="w-full mb-2 flexCentered">
            <img :src="imageSrc" class="shadow-md shadow-black/80 rounded-md max-w-full max-h-[15rem]" title="pen image preview" alt="pen image preview">
         </div>
         <FileInput :id="'penImage'" :acceptedTypes="imageInput.acceptedTypes" @input="handleImageInput"
            :helperMessage="imageInput.helperMessage" :errorMessage="imageInput.errorMessage"
         />
      </div>
   </div>
   <div v-if="showPropertiesSelect" class="flex flex-col bg-navy-light rounded-md p-1 gap-1">
      <PropertySelect v-for="(value, property) in propertiesInputs" :key="`propertySelect${ property }`" :name="property" :selected="value" :values="getAvailableValuesForProperty(property)"
         @deleteMe="deleteProperty(property)" @input="setPropertyValue(property, $event)"
      />
   </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from "vue";
import type { ifPen } from "@/typings/pen";
import type { ifProperty } from "@/typings/configuration";
import FilledInput from "@/components/Misc/FilledInput.vue";
import FileInput from "@/components/Misc/FileInput.vue";
import PropertySelect from "./PropertyValueSelect.vue";
import NewPropertySelect from "./NewPropertySelect.vue";

export default defineComponent({
   name: "Editor",
   components: { FilledInput, FileInput, PropertySelect, NewPropertySelect },
   props: {
      pen: {
         type: Object as PropType<Partial<ifPen>>,
         required: true
      },
      availableProperties: {
         type: Object as PropType<ifProperty[]>,
         default: []
      }
   },
   emits: ['updatePen', 'imageInput'],
   data() {
      return {
         nameInput: {
            value: "",
            showErrorMessage: false,
            errorMessage: "name cannot be empty"
         },
         imageInput: {
            value: <File | undefined> undefined,
            uploadedFileURL: "",
            acceptedTypes: ["image/jpeg", "image/png", "image/webp"],
            helperMessage: ".jpg .png .webp",
            errorMessage: "invalid file type"
         },
         propertiesInputs: <Record<string, string>>{}
      }
   },
   mounted() {
      this.nameInput.value = this.pen.name || ""
      this.propertiesInputs = this.pen.properties || {}

      if(!Object.keys(this.propertiesInputs).includes('brand')){
         this.propertiesInputs.brand = this.availableProperties?.find(property => property.name === 'brand')?.values[0] || ""
      }
      if(!Object.keys(this.propertiesInputs).includes('ink color')){
         this.propertiesInputs["ink color"] = this.availableProperties?.find(property => property.name === 'ink color')?.values[0] || ""
      }
   },
   methods: {
      handleImageInput(files: FileList){
         this.imageInput.value = files.item(0) as File

         if(this.isImageInputInvalid()){ return }

         this.imageInput.uploadedFileURL = URL.createObjectURL(this.imageInput.value)
         this.$emit('imageInput', this.imageInput.value)
      },
      isImageInputInvalid(){
         return this.imageInput.value ? !this.imageInput.acceptedTypes.includes(this.imageInput.value.type) : false
      },
      validateInputs(){
         const isNameInputValid = this.nameInput.value !== ""
         if(!isNameInputValid){
            this.nameInput.showErrorMessage = true
         }

         const isImageInputValid = !this.isImageInputInvalid()

         return isNameInputValid && isImageInputValid
      },
      getAvailableValuesForProperty(propertyName: string){
         const foundProperty = this.availableProperties.find(property => property.name === propertyName)
         return foundProperty ? foundProperty.values : []
      },
      deleteProperty(propertyName: string){
         delete this.propertiesInputs[propertyName]
      },
      setPropertyValue(propertyName: string, value: string){
         this.propertiesInputs[propertyName] = value
      },
      addNewPropertyValue(propertyName: string){
         const foundProperty = this.availableProperties.find(property => property.name === propertyName)
         this.propertiesInputs[propertyName] = foundProperty ? foundProperty.values[0] : ""
         this.$refs.newPropertySelect.setSelectedToFirst()
      }
   },
   computed: {
      imageSrc(){
         if(this.imageInput.value !== undefined && this.imageInput.uploadedFileURL !== ""){
            return this.imageInput.uploadedFileURL
         }
         return this.pen.image || ""
      },
      showImage(){
         return this.imageSrc.length > 0
      },
      showPropertiesSelect(){
         return Object.keys(this.propertiesInputs).length > 0
      },
      computedAvailableProperties(){
         return this.availableProperties.map(property => property.name)
            .filter(property => !Object.keys(this.propertiesInputs).includes(property))
      },
      watchableInputs(){
         return [this.nameInput.value, this.propertiesInputs]
      }
   },
   watch: {
      watchableInputs: {
         handler(){
            this.$emit("updatePen", {
               name: this.nameInput.value,
               properties: this.propertiesInputs
            })
         },
         deep: true
      }
   }
})
</script>

<style scoped>

</style>