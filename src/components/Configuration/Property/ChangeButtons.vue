<template>
   <div v-if="isNew" class="">
      <Button :title="'confirm'" @click="$emit('addMe', $event.target)" class="button">
         <span class="z-10 pointer-events-none">
            add
         </span>
      </Button>
   </div>
   <div v-else class="flex flex-row gap-3">
      <Button :title="'save'" @click="$emit('updateMe', $event.target)" class="button">
         <span class="z-10 pointer-events-none">
            save
         </span>
      </Button>
      <Button :title="'delete'" @click="$emit('deleteMe', $event.target)" class="button">
         <span class="z-10 pointer-events-none">
            delete
         </span>
      </Button>
   </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Button from "@/components/Misc/Button.vue"

export default defineComponent({
   name: "ChangeButtons",
   components: { Button },
   props: {
      isNew: {
         type: Boolean,
         default: false
      }
   }
})
</script>

<style scoped>
.button{
   @apply flexCentered p-4 bg-navy-light w-28 rounded-[4px] mt-5 hover:bg-navy-light/70 focus-visible:bg-navy-light/70
}
</style>