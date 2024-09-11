import { SerializedError } from "@reduxjs/toolkit";
import { ApiAbstractInterface } from "./apiManagement";

export interface AbstractState {
    currentItem: ApiAbstractInterface | null;
    items: ApiAbstractInterface[];
    fetchStatus: "idle" | "rejected" | "fulfilled" | "pending" | null;
    fetchError: SerializedError | null;
    postStatus: "idle" | "rejected" | "fulfilled" | "pending" | null;
    putStatus: "idle" | "rejected" | "fulfilled" | "pending" | null;
    deleteStatus: "idle" | "rejected" | "fulfilled" | "pending" | null;
}