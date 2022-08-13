<template>
   <div v-if="showAdded">
      <h3 class="text-2xl text-center">
         added values
      </h3>
      <div class="flex flex-row bg-navy-light rounded-md flex-wrap p-[2px] max-w-[62rem] gap-[2px]">
         <Value v-for="value in added" :key="value" :name="value" />
      </div>
   </div>
   <div v-if="showUpdated">
      <h3 class="text-2xl text-center">
         updated values
      </h3>
      <table class="w-full">
         <tr>
            <th class="w-2/5 max-w-[40%]">old name</th>
            <th class="w-2/5 max-w-[40%]">new name</th>
            <th class="w-1/5 max-w-[20%]">affected count</th>
         </tr>
         <Value v-for="(value, key) in updated" :key="key" :name="key" :value="value" :hasAffectedCount="true" :hasNewName="true" />
      </table>
   </div>
   <div v-if="showDeleted" class="flex flex-col items-center">
      <h3 class="text-2xl text-center">
         deleted values
      </h3>
      <table class="max-w-[24rem]">
         <tr>
            <th class="w-3/4">name</th>
            <th class="w-1/4">affected count</th>
         </tr>
         <Value v-for="(value, key) in deleted" :key="key" :name="key" :value="value" :hasAffectedCount="true" />
      </table>
   </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from "vue";
import type { ifSummaryUpdateValue } from "@/typings/configuration"
import Value from "./Value.vue"

export default defineComponent({
   name: "ValuesSummary",
   components: { Value },
   props: {
      added: {
         type: Object as PropType<string[]>,
         required: true
      },
      updated: {
         type: Object as PropType<Record<string, ifSummaryUpdateValue>>,
         required: true
      },
      deleted: {
         type: Object as PropType<Record<string, number>>,
         required: true
      },
   },
   computed: {
      showAdded() {
         return this.added.length > 0;
      },
      showUpdated() {
         return Object.keys(this.updated).length > 0;
      },
      showDeleted() {
         return Object.keys(this.deleted).length > 0;
      }
   },
})
</script>

<style scoped>
table{
   @apply bg-lilac-dark rounded-md border-2 border-navy-light border-separate border-spacing-0
}
th{
   @apply border-navy-light border-r-[1px] border-b-[1px] last:border-r-0 py-1 px-1
}
tr:last-child > th{
   @apply border-b-0
}
</style>