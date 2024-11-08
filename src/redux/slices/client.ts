import { ActionReducerMapBuilder, createSlice, SerializedError } from "@reduxjs/toolkit";
import manageApiCalls from "../../logic/apiManagement";
import { ApiClientInterface, NullableApiClientInterface } from "../../interfaces/apiManagement";
import { RootState } from "../store";
import { AbstractState } from "../../interfaces/reduxManagement";

const [populateBuilder, fetchItems, fetchItemById, postItem, putItem, deleteItem] = manageApiCalls('client');


export interface ClientStateInterface extends AbstractState {
    currentItem: NullableApiClientInterface;
    items: ApiClientInterface[];
    fetchStatus: "idle" | "rejected" | "fulfilled" | "pending" | null;
    fetchError: SerializedError | null;
    postStatus: "idle" | "rejected" | "fulfilled" | "pending" | null;
    putStatus: "idle" | "rejected" | "fulfilled" | "pending" | null;
    deleteStatus: "idle" | "rejected" | "fulfilled" | "pending" | null;
}

const initialState: ClientStateInterface = {
    currentItem: null,
    items: [],
    fetchStatus: null,
    fetchError: null,
    postStatus: null,
    putStatus: null,
    deleteStatus: null
}

export const clientSlice = createSlice({
    name: 'client',
    initialState,
    reducers: {
        updateClients: (state: ClientStateInterface, action) => {
            state.items = action.payload;
        },
        updateCurrentClient: (state: ClientStateInterface, action) => {
            state.currentItem = action.payload;
        },
    },
    extraReducers(builder: ActionReducerMapBuilder<ClientStateInterface>) {
        populateBuilder(builder);
    }
});

export const selectClients = (state: RootState) => state.client.items;
export const selectCurrentClient = (state: RootState) => state.client.currentItem;
export const selectFetchClientStatus = (state: RootState) => state.client.fetchStatus;
export const selectPostClientStatus = (state: RootState) => state.client.postStatus;
export const selectPutClientStatus = (state: RootState) => state.client.putStatus;
export const selectDeleteClientStatus = (state: RootState) => state.client.deleteStatus;
export const selectClientError = (state: RootState) => state.client.fetchError;

export const fetchClients = fetchItems;

export const fetchClientById = fetchItemById

export const postClient = postItem;

export const putClient = putItem;

export const deleteClient = deleteItem;

export const { updateClients, updateCurrentClient } = clientSlice.actions

export default clientSlice.reducer;