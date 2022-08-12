export type ifValues = Record<string, string>

export interface ifSummaryUpdateValue {
   newName: string,
   affectedCount: number
}

export interface ifUpdatePropertyObject {
   newPropertyName: string;
   oldValues: ifValues;
   newValues: string[];
   button: HTMLButtonElement;
}
export interface ifCreatePropertyObject {
   newPropertyName: string;
   values: string[];
   button: HTMLButtonElement
}

export enum enModalOperationType {
   add = "add",
   update = "update",
   delete = "delete"
}

export interface ifOperationData {
   type: enModalOperationType;
   propertyName: string;
   newName?: string;
   added: string[];
   updated: Record<string, ifSummaryUpdateValue>;
   deleted: Record<string, number>;
   affectedByDelete?: number;
}

export interface ifProperty {
   name: string,
   values: string[]
}