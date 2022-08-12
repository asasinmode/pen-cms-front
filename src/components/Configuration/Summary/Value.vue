<template>
   <tr v-if="hasNewName && hasAffectedCount">
      <td>{{ name }}</td>
      <td>{{ (value as any).newName }}</td>
      <td>{{ (value as any).affectedCount }}</td>
   </tr>
   <tr v-else-if="hasAffectedCount">
      <td>{{ name }}</td>
      <td>{{ value }}</td>
   </tr>
   <div v-else
      class="bg-lilac-dark text-center flexCentered addedValue"
   >
      {{ name }}
   </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
   name: "Value",
   props: {
      name: {
         type: String,
         required: true
      },
      hasAffectedCount: {
         type: Boolean,
         default: false
      },
      hasNewName: {
         type: Boolean,
         default: false
      },
      value: {
         type: [Object, Number],
         default: {}
      }
   },
})
</script>

<style scoped>
.addedValue{
   flex: calc((100% - 0.75rem) / 2) 1 0;
   @apply py-1
}
td{
   @apply border-navy-light border-r-[1px] last:border-r-0 border-b-[1px] p-1 text-center
}
tr{
   @apply even:bg-navy-light/30
}
tr:last-child > td{
   @apply border-b-0
}
@media screen and (min-width: 768px){
   .addedValue{
      flex: calc((100% - 1rem) / 3) 1 0;
   }
}
</style>