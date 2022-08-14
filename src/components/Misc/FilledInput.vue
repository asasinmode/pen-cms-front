<template>
   <div :style="`width: ${ length }rem`" class="flex h-14 rounded-t-[4px] relative
      bg-navy-dark/10 hover:bg-navy-dark/[0.125] focus-within:!bg-navy-dark/[0.175]
      after:absolute after:left-1/2 after:right-1/2 after:bottom-0 after:h-[2px] focus-within:after:left-0 focus-within:after:right-0
      after:bg-navy-dark"
      :class="{
         '!mb-5': helperMessage.length || errorMessage.length,
         'after:bg-red-700': isInvalid
      }"
   >
      <input :id="id" :type="type" placeholder=" " :value="modelValue" @input="inputHandler" :pattern="pattern.source" ref="inputElement" v-bind="$attrs"
         class="bg-transparent w-full h-full pl-4 pr-3 pt-2 peer border-b-[1px]
            border-black/40 hover:border-black focus:border-black"
         :class="{ '!border-red-700': isInvalid }"
      >
      <label :for="id" class="absolute left-4 top-4 origin-top-left pointer-events-none
      text-black/50 peer-focus:text-navy-dark"
         :class="{ '!text-red-700': isInvalid }"
      >
         {{ placeholder }}
      </label>
      <span v-show="!isInvalid" class="flex pointer-events-none text-[0.75em] absolute left-4 bottom-0 translate-y-full text-black/50">
         {{ helperMessage }}
      </span>
      <span v-show="isInvalid" class="flex pointer-events-none text-[0.75em] absolute left-4 bottom-0 translate-y-full text-red-700">
         {{ errorMessage }}
      </span>
   </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
   name: 'FilledInput',
   inheritAttrs: false,
   props: {
      type: {
         type: String,
         default: "text"
      },
      id: {
         type: String,
         default: ""
      },
      placeholder: String,
      modelValue: {
         type: String,
         required: true
      },
      length: {
         type: Number,
         default: 16
      },
      pattern: {
         type: RegExp,
         default: /./g
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
      },
      focusOnMounted: {
         type: Boolean,
         default: false
      }
   },
   mounted(){
      this.focusOnMounted && this.focusMe()
   },
   methods: {
      inputHandler(event: Event){
         this.$emit('update:modelValue', (event.target as HTMLInputElement).value)
      },
      focusMe(){
         this.$nextTick(() => {
            this.$refs.inputElement.focus()   
         })
      }
   },
   computed: {
      isInvalid(){
         return this.showError || this.modelValue.replace(this.pattern, '') != ""
      }
   }
})
</script>

<style scoped>
input:focus{
   outline: none;
}
input:focus ~ label, input:not(:placeholder-shown) ~ label{
   transform: translateY(-65%);
   font-size: 0.8em;
}
</style>