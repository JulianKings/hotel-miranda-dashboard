import { SerializedError } from "@reduxjs/toolkit";
import { ApiAbstractInterface } from "./apiManagement";

export interface AbstractState {
    currentItem: ApiAbstractInterface | null;
    items: ApiAbstractInterface[];
    fetchStatus: string | null;
    fetchError: SerializedError | null;
    postStatus: string | null;
    putStatus: string | null;
    deleteStatus: string | null;
}