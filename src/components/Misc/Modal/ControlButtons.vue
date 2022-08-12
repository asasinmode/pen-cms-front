<template>
   <div v-if="showClose" class="flex flex-col">
      <Button @click="$emit('close')" :disabled="disable" :focusOnMounted="true">
         <span class="z-10 pointer-events-none">
            close
         </span>
      </Button>
   </div>
   <div v-else class="flexCentered flex-row mt-4 gap-2">
      <Button @click="$emit('cancel')" :disabled="disable" :focusOnMounted="true">
         <span class="z-10 pointer-events-none">
            cancel
         </span>
      </Button>
      <Button @click="$emit('confirm')" :disabled="disable">
         <span class="z-10 pointer-events-none">
            confirm
         </span>
      </Button>
   </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Button from "@/components/Misc/Button.vue";

export default defineComponent({
   name: "ControButtons",
   components: { Button },
   props: {
      showClose: {
         type: Boolean,
         default: false
      },
      disable: {
         type: Boolean,
         default: false
      }
   }
})
</script>

<style scoped>

</style>