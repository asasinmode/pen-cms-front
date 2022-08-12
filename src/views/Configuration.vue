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
            <template #default>
               <ValuesSummary v-if="!operationData.affectedByDelete"
                  :added="operationData.added"
                  :updated="operationData.updated"
                  :deleted="operationData.deleted"
               />
               <div v-else>
                  deleting stuff, affected {{ operationData.affectedByDelete }}
               </div>
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
import ValuesSummary from "../components/Configuration/ValuesSummary.vue";
import Loading from "../components/Misc/Loading.vue";

interface ifAffected {
   updated: Record<string, number>;
   deleted: Record<string, number>;
}

export default defineComponent({
   name: "Configuration",
   components: { Property, Modal, ValuesSummary, Loading },
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
      this.refreshData()
   },
   methods: {
      refreshData(){
         this.isLoading = true
         this.$http.get('properties').then(res => {
            this.properties = res.data
            this.isLoading = false
         })
      },
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
            update: async (propertyName: string, { newPropertyName, values, button }: ifUpdatePropertyObject) => {
               this.modal.isProcessing = true
               this.modalControllers().open(button)

               this.operationData.type = enModalOperationType.update
               this.operationData.propertyName = propertyName
               if(newPropertyName !== propertyName){
                  this.operationData.newName = newPropertyName
               }

               try {
                  const changedValues = this.filterChangedValues(values)
                  const { updated: numberOfAffectedByUpdate, deleted: numberOfAffectedByDelete } = await this.affectedByUpdate(propertyName, changedValues)

                  this.operationData.updated = Object.keys(numberOfAffectedByUpdate).reduce((previous, current) => ({
                     ...previous,
                     [current]: {
                        newName: values[current],
                        number: numberOfAffectedByUpdate[current]
                     }
                  }), {})
                  this.operationData.deleted = Object.keys(numberOfAffectedByDelete).reduce((previous, current) => ({
                     ...previous,
                     [current]: {
                        number: numberOfAffectedByDelete[current]
                     }
                  }), {})
               } catch(e){
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
                  this.operationData.affectedByDelete = await this.affectedByDeletion(name)
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
      affectedByUpdate(propertyName: string, values: ifValues): Promise<ifAffected>{
         return new Promise((resolve, reject) => setTimeout(() => {
            // const affected = this.testProperties.find(property => property.name === propertyName)
            // console.log("apiiing deletion of", propertyName, affected)

            resolve({
               updated: {},
               deleted: {}
            })
         }, 100))
      },
      affectedByDeletion(propertyName: string): Promise<number>{
         return new Promise((resolve, reject) => setTimeout(() => {
            // const affected = this.testProperties.find(property => property.name === propertyName)
            // console.log("apiiing deletion of", propertyName, affected)

            resolve(12)
         }, 100))
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
               await this.requests().update()
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
               console.log("updating", this.operationData.updated)
               return this.$http.patch("/properties", {
                  name: this.operationData.propertyName,
                  added: this.operationData.added,
                  updated: this.operationData.updated,
                  deleted: this.operationData.deleted
               }, { headers: {
                     "Content-Type": "application/json"
                  }}
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
      }
   }
})
</script>

<style scoped>

</style>