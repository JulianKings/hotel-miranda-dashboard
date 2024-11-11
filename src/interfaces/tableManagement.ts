export interface TableSchema {
    id: string;
    type: string;
    name: string;
    sortable: boolean;
}

export interface Sortable {
    id: string;
    type: 'asc' | 'desc';
    mode: 'number' | 'date' | 'string';
}