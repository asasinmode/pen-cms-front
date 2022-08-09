<template>
   <main class="flex flex-col">
      <Property v-for="property in testProperties" :key="property.name" @expandMe="expandProperty"
         :selectedProperty="selectedProperty" :name="property.name" :values="property.values"
         @updateMe="handleUpdate(property.name, $event)" @deleteMe="handleDelete"
      />
      <Property :selectedProperty="selectedProperty" :name="'new'" @expandMe="expandProperty" @createMe="handleCreate" />
   </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Property from "@/components/Configuration/Property.vue";
import type { ifUpdateObject } from "@/typings/configuration";

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
               values: ["black", "blue", "red", "green", "one", "two", "three", "four", "five", "six", "seven", "eight", "ninth"]
            },
            {
               name: "material",
               values: ["plastic", "metal", "ultra omega very long too long even", "fourth", "fifth", "sixth"]
            },
            {
               name: "test",
               values: ["test"]
            },
         ]
      }
   },
   methods: {
      expandProperty(property: string){
         this.clearRipples()
         this.selectedProperty = property
      },
      clearRipples(){
         document.querySelector(".ripple")?.remove()
      },
      handleCreate({ name, values }: {name: string, values: any}){
         console.log("creating", name, "with values", values)
      },
      handleUpdate(propertyName: string, { newName, values }: ifUpdateObject){
         console.log("update", propertyName)
      },
      handleDelete(name: string){
         console.log("deletting", name)
      }
   }
})
</script>

<style scoped>

</style>