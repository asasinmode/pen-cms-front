<template>
   <div class="bg-lilac-dark cursor-pointer hoverable min-w-[14.75rem] w-full hover:bg-lilac-dark/70 focus-visible:bg-lilac-dark/70 focus-within:!bg-lilac-dark/50"
      :class="{ '!bg-red-500/70': highlightRed }"
   >
      <slot />
      <input v-bind="$attrs" :value="value" v-show="show" ref="inputElement"
         class="bg-transparent text-center p-2 cursor-pointer focus:!cursor-text w-full text-ellipsis
         placeholder:text-lilac-light placeholder:font-semibold focus:placeholder:text-navy-dark"
      >
   </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
   name: "PropertyValue",
   inheritAttrs: false,
   props: {
      value: {
         type: String,
         required: true
      },
      show: {
         type: Boolean,
         default: true
      }
   },
   computed: {
      highlightRed(){
         return this.value.length === 0 && this.show
      }
   }
})
</script>

<style scoped>
input:focus{
   outline: none;
}
div:only-child{
   @apply rounded-sm
}
@media (min-width: 768px){
   div{
      flex: 20% 1 0;
   }
}
</style>