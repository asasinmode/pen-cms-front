<template>
   <div v-if="showClose" class="flexCentered mt-4">
      <Button @click="$emit('close')" :focusOnMounted="true" :disabled="disable" id="modalCloseButton">
         <span class="z-10 pointer-events-none">
            close
         </span>
      </Button>
   </div>
   <div v-else class="flexCentered flex-row mt-4 gap-2">
      <Button @click="$emit('cancel')" :focusOnMounted="true" :disabled="disable" id="modalCancelButton">
         <span class="z-10 pointer-events-none">
            cancel
         </span>
      </Button>
      <Button @click="$emit('confirm')" :disabled="disable" id="modalConfirmButton">
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