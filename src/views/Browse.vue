<template>
   <main class="flex flex-col w-full gap-2" tabindex="-1">
      <template v-if="!isLoading">
         <div class="w-full min-h-[6rem] flexCentered">
            <input id="skipTarget" v-model="searchFilter" placeholder="search..."
               class="min-w-[15.25rem] w-3/4 p-3 bg-transparent border-navy-dark border-2 rounded-md text-center
               hover:bg-lilac-dark/40 focus:bg-lilac-dark/70"
            >
         </div>
         <ListItem v-for="pen in slicedPens" :key="pen._id" :pen="pen" />
         <Controls :totalNumberOfPages="totalNumberOfPages" :currentPage="currentPage" @moveTo="moveTo" />
      </template>
      <Loading v-else class="w-full h-full" />
   </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import type { ifPen } from "@/typings/pen";
import ListItem from "@/components/Browse/ListItem.vue";
import Loading from "@/components/Misc/Loading.vue";
import Controls from "../components/Browse/Controls.vue";

export default defineComponent({
   name: "Browse",
   components: { ListItem, Loading, Controls },
   data() {
      return {
         pens: <ifPen[]>[],
         isLoading: false,
         searchFilter: "",
         displayedPerPage: 1,
         currentPage: 1
      };
   },
   mounted(){
      this.loadData();
   },
   methods: {
      async loadData() {
         this.isLoading = true
         this.pens = await this.$http.get("pens").then(res => res.data)
         this.isLoading = false
      },
      moveTo(page: number){
         console.log("moving to page", page)
         this.currentPage = page
      }
   },
   computed: {
      mergedTextPens(){
         return this.pens.map(pen => {
            let textContent = ""
            textContent += pen.name.toLowerCase()
            textContent += Object.keys(pen.properties).join().toLowerCase()
            textContent += Object.values(pen.properties).join().toLowerCase()
            return {
               id: pen._id,
               textContent
            }
         })
      },
      splitSearchFilter(){
         return this.searchFilter.toLowerCase().split(' ')
      },
      filteredPens(){
         if(this.searchFilter === ""){ return this.pens }

         const foundIndexes = this.mergedTextPens.filter((textPen) => {
            let rv = true
            this.splitSearchFilter.forEach(word => {
               const mergedTextContainsWord = textPen.textContent.indexOf(word) !== -1
               if(!mergedTextContainsWord){
                  rv = false
               }
            })
            return rv
         }).map(textPen => textPen.id)

         return this.pens.filter(pen => foundIndexes.includes(pen._id))
      },
      totalNumberOfPages(){
         return Math.ceil(this.filteredPens.length / this.displayedPerPage)
      },
      slicedPens(){
         const start = (this.currentPage - 1) * this.displayedPerPage
         const end = start + this.displayedPerPage
         return this.filteredPens.slice(start, end)
      }
   }
})
</script>

<style scoped>
main > *:not(:is(:first-child, :last-child)){
   @apply border-solid border-b-4 border-lilac-dark
}
input:focus-visible{
   outline: none;
}
</style>