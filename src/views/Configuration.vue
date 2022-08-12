<template>
   <main class="flex flex-col">
      <template v-if="!isLoading">
         <Property v-for="property in properties" :key="property.name" @expandMe="expandProperty"
         :selectedProperty="selectedProperty" :name="property.name" :values="property.values"
         @updateMe="emitHandlers().update(property.name, $event)" @deleteMe="emitHandlers().delete(property.name, $event)"
         />
         <Property :selectedProperty="selectedProperty" :name="'new'" @expandMe="expandProperty" @createMe="emitHandlers().create" ref="newProperty" />
         <Modal v-if="modal.show"
            @confirm="processChanges" @close="modalControllers().close" @cancel="modalControllers().close"
            :isLoading="modal.isProcessing" :showError="modalComputed.showError"
            :closeFocusTarget="modal.closeFocusTarget"
         >
            <template v-slot:header>
               {{ modalComputed.headerPrefix }} <span class="highlighted">{{ operationData.propertyName }}</span>
            </template>
            <template v-if="error === undefined" #default>
               <SummaryNewName v-if="operationData.newName" :name="operationData.newName" :affectedCount="operationData.affectedCount" />
               <SummaryValues v-if="operationData.type !== 'delete'"
                  :added="operationData.added"
                  :updated="operationData.updated"
                  :deleted="operationData.deleted"
               />
               <h3 v-else-if="operationData.type === 'delete'" class="text-2xl text-center">
                  <span class="highlighted">{{ operationData.affectedCount }}</span> pen{{ isAffectedNumberPlural ? "s are" : " is" }} are going to be affected
               </h3>
            </template>
            <template v-else #default>
               <ErrorMessage v-if="error !== undefined" :error="error" />
            </template>
         </Modal>
      </template>
      <template v-else>
         <Loading />
      </template>
   </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { enModalOperationType } from "@/typings/configuration";
import type { ifOperationData, ifUpdatePropertyObject, ifCreatePropertyObject, ifValues, ifProperty } from "@/typings/configuration";
import Property from "@/components/Configuration/Property.vue";
import Modal from "@/components/Misc/Modal.vue";
import SummaryValues from "@/components/Configuration/Summary/Values.vue";
import SummaryNewName from "@/components/Configuration/Summary/NewName.vue"
import Loading from "../components/Misc/Loading.vue";
import ErrorMessage from "@/components/Misc/ErrorMessage.vue";

export default defineComponent({
   name: "Configuration",
   components: { Property, Modal, SummaryValues, Loading, ErrorMessage, SummaryNewName },
   data(){
      return {
         selectedProperty: "",
         properties: <ifProperty[]> [],
         modal: {
            show: false,
            closeFocusTarget: <HTMLElement | undefined> undefined,
            isProcessing: false,
         },
         operationData: <ifOperationData> {
            type: enModalOperationType.add,
            propertyName: <string> "",
            added: {},
            updated: {},
            deleted: {}
         },
         error: <any> undefined,
         isLoading: false
      }
   },
   mounted(){
      this.isLoading = true
         this.$http.get('properties').then(res => {
            this.properties = res.data
            this.isLoading = false
         })
   },
   methods: {
      expandProperty(property: string){
         this.clearRipples()
         this.selectedProperty = property
      },
      clearRipples(){
         document.querySelector(".ripple")?.remove()
      },
      resetOperationData(){
         this.operationData = {
            type: enModalOperationType.add,
            propertyName: "",
            added: [],
            updated: {},
            deleted: {}
         }
      },
      emitHandlers(){
         return {
            create: ({ newPropertyName, values, button }: ifCreatePropertyObject) => {
               this.operationData.type = enModalOperationType.add
               this.operationData.propertyName = newPropertyName
               this.operationData.added = values

               this.modalControllers().open(button)
            },
            update: async (propertyName: string, { newPropertyName, oldValues, newValues, button }: ifUpdatePropertyObject) => {
               this.modal.isProcessing = true
               this.modalControllers().open(button)

               this.operationData.type = enModalOperationType.update
               this.operationData.propertyName = propertyName
               if(newPropertyName !== propertyName){
                  this.operationData.newName = newPropertyName
                  console.log("setting new name", this.operationData.newName)
               }

               try {
                  const changedValues = this.filterChangedValues(oldValues)
                  const { updated: numberOfAffectedByUpdate, deleted: numberOfAffectedByDelete } = await this.affectedByUpdate(propertyName, changedValues).then(res => res.data)
                  this.operationData.affectedCount = await this.getAffectedCount(propertyName).then(res => res.data[propertyName])

                  this.operationData.added = newValues
                  this.operationData.updated = numberOfAffectedByUpdate ?
                     Object.keys(numberOfAffectedByUpdate).reduce((previous, current) => ({
                        ...previous,
                        [current]: {
                           newName: oldValues[current],
                           affectedCount: numberOfAffectedByUpdate[current]
                        }
                     }), {})
                     : {}
                  this.operationData.deleted = numberOfAffectedByDelete ? 
                     Object.keys(numberOfAffectedByDelete).reduce((previous, current) => ({
                        ...previous,
                        [current]: numberOfAffectedByDelete[current]
                     }), {})
                     : {}
               } catch(e){
                  console.error(e)
                  this.error = e
                  this.modal.isProcessing = false
                  return
               }

               this.modal.isProcessing = false
            },
            delete: async (name: string, closeFocusTarget: HTMLButtonElement) => {
               this.modal.isProcessing = true
               this.modalControllers().open(closeFocusTarget)

               this.operationData.type = enModalOperationType.delete
               this.operationData.propertyName = name

               try {
                  this.operationData.affectedCount = await this.getAffectedCount(name).then(res => res.data[name])
               } catch(e){
                  this.error = e
                  this.modal.isProcessing = false
                  return
               }

               this.modal.isProcessing = false
            }
         }
      },
      modalControllers(){
         return {
            open: (closeFocusTarget: HTMLButtonElement) => {
               this.modal.closeFocusTarget = closeFocusTarget
               this.modal.show = true
            },
            close: () => {
               this.modal.show = false
               this.modal.isProcessing = false
               this.error = undefined
               this.resetOperationData()
            }
         }
      },
      affectedByUpdate(propertyName: string, values: ifValues){
         const deleted = Object.keys(values).filter(key => values[key] === "")
         const updated = Object.keys(values).filter(key => key !== values[key]).filter(key => values[key] !== "")

         return this.$http("affectedBy/update", {
            params: {
               property: propertyName,
               updated: updated.join(),
               deleted: deleted.join()
            }
         })
      },
      getAffectedCount(propertyName: string){
         return this.$http("affectedBy/delete", {
            params: {
               property: propertyName
            }
         })
      },
      async processChanges(){
         this.modal.isProcessing = true
         const propertyName = this.operationData.propertyName

         try {
            if(this.operationData.type === enModalOperationType.add){
               const newProperty = await this.requests().create().then(res => res.data)

               this.properties.push({
                  name: newProperty.name,
                  values: newProperty.values
               });

               (this.$refs.newProperty as any).resetMe()
            } else if(this.operationData.type === enModalOperationType.update){
               const updatedProperty = await this.requests().update().then(res => res.data)

               this.properties.splice(this.properties.findIndex((property: ifProperty) => property.name === updatedProperty.name), 1)
               this.$nextTick(() => {
                  this.properties.push({
                     name: updatedProperty.name,
                     values: updatedProperty.values
                  })
               })
            } else{
               await this.requests().delete()
               this.properties.splice(this.properties.findIndex((property: ifProperty) => property.name === propertyName), 1)
            }
         } catch (error: any){
            this.error = error
            this.modal.isProcessing = false
            return
         }

         this.modalControllers().close()
      },
      requests(){
         return {
            create: () => {
               return this.$http.post("/properties", {
                  name: this.operationData.propertyName,
                  values: Object.values(this.operationData.added)
               }, {
                  headers: { "Content-Type": "application/json" }
               })
            },
            update: () => {
               const updated = Object.keys(this.operationData.updated).reduce((previous, current) => ({
                  ...previous,
                  [current]: this.operationData.updated[current].newName
               }), {})
               const deleted = Object.keys(this.operationData.deleted)

               const updateObject: any = {
                  values: {}
               }

               if(this.operationData.added.length > 0) updateObject.values.added = this.operationData.added
               if(Object.keys(updated).length > 0) updateObject.values.updated = updated
               if(deleted.length > 0) updateObject.values.deleted = deleted
               if(this.operationData.newName) updateObject.newName = this.operationData.newName

               return this.$http.patch(`/properties/${ this.operationData.propertyName }`,
                  updateObject,
                  {
                     headers: { "Content-Type": "application/json" }
                  }
               )
            },
            delete: () => {
               return this.$http.delete(`/properties/${ this.operationData.propertyName }`)
            }
         }
      },
      filterChangedValues(values: ifValues): ifValues{
         return Object.keys(values)
            .filter((originalName) => originalName !== values[originalName])
            .reduce((previous, current) => ({
               ...previous,
               [current]: values[current]
            }), {})
      }
   },
   computed: {
      modalComputed(){
         const headerPrefix = this.operationData.type === enModalOperationType.add ?
            "adding new"
            : this.operationData.type === enModalOperationType.update ?
            "updating"
            : "deleting"

         return {
            showError: this.error !== undefined,
            headerPrefix: `${ headerPrefix } property`
         }
      },
      isAffectedNumberPlural(){
         return this.operationData.affectedCount ? this.operationData.affectedCount > 1 ? true : false : false
      }
   }
})
</script>

<style scoped>

</style>