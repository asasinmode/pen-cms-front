import * as runtimeCore from "@vue/runtime-core"

declare module '@vue/runtime-core' {
   interface ComponentCustomProperties {
      $refs: {
         [key: string]: HTMLElement,
         editor: any,
         newPropertySelect: any
      }
   }
}