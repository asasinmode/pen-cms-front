export type ifValues = Record<string, string>

export interface ifSummaryDeletedValue {
   number: number;
}
export interface ifSummaryUpdatedValue extends ifSummaryDeletedValue {
   newName: string
}

export type ifSummaryValue = ifSummaryDeletedValue | ifSummaryUpdatedValue

export interface ifUpdatePropertyObject {
   newPropertyName: string;
   values: ifValues;
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
   updated: Record<string, ifSummaryUpdatedValue>;
   deleted: Record<string, ifSummaryDeletedValue>;
   affectedByDelete?: number;
}

export interface ifProperty {
   name: string,
   values: string[]
}