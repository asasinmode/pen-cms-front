<template>
   <div>
      <h3 class="text-2xl text-center">
         changing name to <span class="highlighted">{{ name }}</span>
      </h3>
      <span class="text-base flexCentered gap-1"><span class="highlighted">{{ affectedCount }}</span> pen{{ isPlural ? "s are" : " is" }} going to be affected</span>
   </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
   name: "NewName",
   props: {
      name: String,
      affectedCount: Number
   },
   computed: {
      isPlural(){
         return this.affectedCount! > 1
      }
   }
})
</script>

<style scoped>

</style>