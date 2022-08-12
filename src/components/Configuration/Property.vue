<template>
   <article class="relative" :class="{ 'bg-lilac-dark': isSelected,
      'after:absolute after:bottom-0 after:w-full after:h-1 after:pointer-events-none after:bg-lilac-dark/100': !isNew }"
   >
      <ExpandButton @click="$emit('expandMe', name)" :title="name" :disabled="isSelected" />
      <div v-show="isSelected" class="flexCentered flex-col md:justify-start p-4 pb-6 gap-4">
         <FilledInput v-model="nameInput.value" :id="`property${ name }`" :placeholder="'name'"
            :errorMessage="nameInput.errorMessage" :showError="nameInput.showErrorMessage" :length="15.25"
            @input="nameInput.showErrorMessage = false"
         />
         <div class="flex flex-row bg-navy-light rounded-md flex-wrap p-1 max-w-[62rem] gap-1">
            <PropertyValue v-for="(value, key) in combinedValuesExistingNew" :key="`${ name }Value${ key }`" :placeholder="!isNew ? key : ''"
               :value="value" @input="updateValue($event.target.value, key)"
               @focusout="deleteIfEmpty(key)" @keydown.prevent.enter="deleteIfEmpty(key)"
               @click.ctrl="toggleValue(key)"
            />
            <PropertyValue :value="newValueInput.value" :show="newValueInput.isActive" ref="newInput"
               @focusout="setNewValue" @keydown.prevent.enter="setNewValue"
            >
               <button v-show="!newValueInput.isActive" class="flexCentered p-2 min-w-[14.75rem] w-full" @click="focusNewInput" @focus="focusNewInput">
                  <span class="z-10 pointer-events-none">
                     <FontAwesomeIcon icon="fa-solid fa-plus" size="lg" />
                  </span>
               </button>
            </PropertyValue>
         </div>
         <ChangeButtons :isNew="isNew" @addMe="changeHandlers().add" @updateMe="changeHandlers().update" @deleteMe="changeHandlers().delete" />
      </div>
   </article>
</template>

<script lang="ts">
import { defineComponent, type PropType } from "vue";
import FilledInput from "@/components/Misc/FilledInput.vue";
import ExpandButton from "./Property/ExpandButton.vue";
import PropertyValue from "./Property/PropertyValue.vue";
import ChangeButtons from "./Property/ChangeButtons.vue";
import type { ifValues, ifUpdatePropertyObject } from "@/typings/configuration"

export default defineComponent({
   name: "Property",
   components: { ExpandButton, FilledInput, PropertyValue, ChangeButtons },
   props: {
      selectedProperty: {
         type: String,
         required: true
      },
      name: {
         type: String,
         required: true
      },
      values: {
         type: Array as PropType<Array<string>>,
         default: []
      }
   },
   data(){
      return {
         nameInput: {
            value: "",
            errorMessage: "name cannot be empty",
            showErrorMessage: false
         },
         valuesInputs: <ifValues> {},
         newValuesInputs: <ifValues> {},
         newValueInput: {
            value: "",
            isActive: false
         }
      }
   },
   mounted(){
      this.nameInput.value = this.isNew ? "" : this.name
      this.valuesInputs = this.values.reduce((previous, current) => ({
         ...previous,
         [current]: current
      }), {})
   },
   methods: {
      updateValue(newValue: string, key: any){
         this.setValue(key, newValue)
      },
      focusNewInput(){
         this.newValueInput.isActive = true
         this.$nextTick(() => {
            this.newInputElement.focus()
         })
      },
      setNewValue(){
         this.newValueInput.isActive = false

         const newValue = this.newInputElement.value
         if(newValue === ""){ return }

         this.newValuesInputs[newValue] = newValue
      },
      deleteIfEmpty(key: any){
         const currentValue = this.combinedValuesExistingNew[key]
         if(currentValue === "" && this.isANewValue(key)){
            delete this.newValuesInputs[key]
         }
      },
      toggleValue(key: any){
         if(this.isANewValue(key)){
            this.newValuesInputs[key] = this.newValuesInputs[key].length > 0 ? "" : key
            return
         }
         this.valuesInputs[key] = this.valuesInputs[key].length > 0 ? "" : key
      },
      changeHandlers(){
         return {
            add: (buttonElement: HTMLButtonElement) => {
               const isValid = this.validateMe(buttonElement)
               if(!isValid){ return }

               this.$emit("createMe", {
                  newPropertyName: this.nameInput.value,
                  values: Object.values(this.combinedValuesExistingNew),
                  button: buttonElement
               })
            },
            update: (buttonElement: HTMLButtonElement) => {
               const isValid = this.validateMe(buttonElement)
               if(!isValid){ return }

               this.$emit("updateMe", {
                  newPropertyName: this.nameInput.value,
                  oldValues: this.valuesInputs,
                  newValues: Object.values(this.newValuesInputs),
                  button: buttonElement
               } as ifUpdatePropertyObject)
            },
            delete: (buttonElement: HTMLButtonElement) => {
               this.$emit("deleteMe", buttonElement)
            }
         }
      },
      validateMe(shakeTarget: HTMLElement){
         if(this.nameInput.value !== ""){ return true }

         this.nameInput.showErrorMessage = true
         this.$shake(shakeTarget)
         return false
      },
      resetMe(){
         this.nameInput.value = ""
         this.valuesInputs = {}
         this.newValuesInputs = {}
         this.newValueInput.value = ""
         this.newValueInput.isActive = false
      },
      setValue(key: string, value: string){
         if(this.isANewValue(key)){
            this.newValuesInputs[key] = value
            return
         }
         this.valuesInputs[key] = value
      },
      isANewValue(key: string){
         return Object.keys(this.newValuesInputs).includes(key)
      }
   },
   computed: {
      isNew(){
         return this.name === "new"
      },
      isSelected(){
         return this.selectedProperty === this.name
      },
      newInputElement(){
         return (this.$refs.newInput as any).$refs.inputElement
      },
      combinedValuesExistingNew(){
         return {
            ...this.valuesInputs,
            ...this.newValuesInputs
         }
      }
   }
})
</script>

<style scoped>
</style>