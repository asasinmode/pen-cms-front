<template>
   <div>
      i'm a value
   </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from "vue";
import type { ifSummaryValue } from "@/typings/configuration"

type ifValue = string | ifSummaryValue

export default defineComponent({
   name: "Value",
   props: {
      isComparison: {
         type: Boolean,
         default: false
      },
      value: {
         type: Object as PropType<ifValue>,
         required: true
      }
   },
   computed: {

   }
})
</script>

<style scoped>

</style>