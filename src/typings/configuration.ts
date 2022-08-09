export interface ifValues {
   [key: string]: string
}

export interface ifUpdateObject {
   newName: string;
   values: ifValues;
   button: HTMLButtonElement;
}

export enum enModalOperationType {
   add = "add",
   update = "update",
   delete = "delete"
}

export interface ifOperationData {
   type: enModalOperationType;
   added: ifValues;
   updated: ifValues;
   deleted: ifValues;
}