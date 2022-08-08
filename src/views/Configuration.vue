<template>
   <main class="flex flex-col">
      <Property v-for="property in testProperties" :key="property.name" @expandMe="expandProperty"
         :selectedProperty="selectedProperty" :name="property.name" :values="property.values"
      />
      <Property :selectedProperty="selectedProperty" :name="'new'" @expandMe="expandProperty" />
   </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Property from "@/components/Configuration/Property.vue";

export default defineComponent({
   name: "Configuration",
   components: { Property },
   data(){
      return {
         selectedProperty: "",
         testProperties: [
            {
               name: "brand",
               values: ["penS", "penful"]
            },
            {
               name: "ink color",
               values: ["black", "blue", "red", "green"]
            },
            {
               name: "material",
               values: ["plastic", "metal"]
            }
         ]
      }
   },
   methods: {
      expandProperty(property: string){
         this.selectedProperty = property
      }
   }
})
</script>

<style scoped>

</style>