<template>
   <article class="relative" :class="{ 'bg-lilac-dark': isSelected,
      'after:absolute after:bottom-0 after:w-full after:h-1 after:pointer-events-none after:bg-lilac-dark/100': !isNew }"
   >
      <ExpandButton @click="$emit('expandMe', name)" :title="name" :disabled="isSelected" />
      <div v-show="isSelected" class="flexCentered flex-col md:justify-start p-4 pb-6 gap-4">
         <FilledInput :modelValue="nameInput.value" :id="`property${ name }`" :placeholder="'name'"
            :errorMessage="nameInput.errorMessage" :showError="nameInput.showErrorMessage" :length="15.25"
         />
         <div class="flex flex-row bg-navy-light rounded-md flex-wrap p-1 max-w-[62rem] gap-1">
            <PropertyValue v-for="(value, key) in valuesInputs" :key="`${ name }Value${ key }`" :placeholder="key"
               :value="value" @input="updateValue($event.target.value, key)"
               @focusout="deleteIfEmpty(key)" @keydown.prevent.enter="deleteIfEmpty(key)"
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
         valuesInputs: <{ [key: string]: string }> {},
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
         this.valuesInputs[key] = newValue
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
         this.valuesInputs[newValue] = newValue
      },
      deleteIfEmpty(key: any){
         if(!this.isNew){ return }
         const currentValue = this.valuesInputs[key]
         if(currentValue === ""){
            delete this.valuesInputs[key]
         }
      },
      changeHandlers(){
         return {
            add: (buttonElement: HTMLButtonElement) => {
               console.log("adding new")
            },
            update: (buttonElement: HTMLButtonElement) => {
               this.$shake(buttonElement)
               console.log("updating")
            },
            delete: (buttonElement: HTMLButtonElement) => {
               console.log("deletting")
            }
         }
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
      }
   }
})
</script>

<style scoped>
</style>