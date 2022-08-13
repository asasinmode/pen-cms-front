<template>
   <article>
      i'm a card
      <button @click="$emit('editMe', $event)">edit</button>
   </article>
</template>

<script lang="ts">
import { defineComponent, type PropType } from "vue";
import type { ifPen } from "@/typings/pen";

export default defineComponent({
   name: "Card",
   props: {
      pen: {
         type: Object as PropType<ifPen>
      }
   }
})
</script>

<style scoped>

</style>