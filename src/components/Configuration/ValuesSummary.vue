<template>
   <template v-show="showAdded">
      <h3 class="text-2xl text-center">
         added values
      </h3>
      <div>
         <Value v-for="value in added" :value="value" />
      </div>
   </template>
   <template v-show="showUpdated">
      <h3 class="text-2xl text-center">
         updated values
      </h3>
      <div>
         <Value v-for="value in added" :value="value" />
      </div>
   </template>
   <template v-show="showDeleted">
      <h3 class="text-2xl text-center">
         deleted values
      </h3>
      <div>
         <Value v-for="value in added" :value="value" />
      </div>
   </template>
</template>

<script lang="ts">
import { defineComponent, type PropType } from "vue";
import type { ifSummaryUpdatedValue, ifSummaryDeletedValue } from "@/typings/configuration"
import Value from "./Value.vue"

export default defineComponent({
   name: "ValuesSummary",
   components: { Value },
   props: {
      added: {
         type: Array,
         required: true
      },
      updated: {
         type: Object as PropType<Record<string, ifSummaryUpdatedValue>>,
         required: true
      },
      deleted: {
         type: Object as PropType<Record<string, ifSummaryDeletedValue>>,
         required: true
      },
   },
   computed: {
      showAdded() {
         return Object.keys(this.added).length > 0;
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

</style>