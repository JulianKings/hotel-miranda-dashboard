import { ApiAbstractInterface } from "./apiManagement";
import { Sortable, TableSchema } from "./tableManagement";

export interface TableModuleProp {
    tableType: string;
    tableDataSchema: TableSchema[];
    tableContent: ApiAbstractInterface[];
    updateSortFilter: Function;
    currentSortFilter: Sortable;
}