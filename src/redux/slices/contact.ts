import { ActionReducerMapBuilder, createSlice, SerializedError } from "@reduxjs/toolkit";
import manageApiCalls from "../../logic/apiManagement";
import { ApiContactInterface, NullableApiContactInterface } from "../../interfaces/apiManagement";
import { RootState } from "../store";
import { AbstractState } from "../../interfaces/reduxManagement";

const [populateBuilder, fetchItems, fetchItemById, postItem, putItem, deleteItem] = manageApiCalls('contact');

interface ContactStateInterface extends AbstractState {
    currentItem: NullableApiContactInterface;
    items: ApiContactInterface[];
    fetchStatus: "idle" | "rejected" | "fulfilled" | "pending" | null;
    fetchError: SerializedError | null;
    postStatus: "idle" | "rejected" | "fulfilled" | "pending" | null;
    putStatus: "idle" | "rejected" | "fulfilled" | "pending" | null;
    deleteStatus: "idle" | "rejected" | "fulfilled" | "pending" | null;
}

const initialState: ContactStateInterface = {
    currentItem: null,
    items: [],
    fetchStatus: null,
    fetchError: null,
    postStatus: null,
    putStatus: null,
    deleteStatus: null
}

export const contactSlice = createSlice({
    name: 'contact',
    initialState,
    reducers: {
        updateContacts: (state: ContactStateInterface, action) => {
            state.items = action.payload;
        },
        updateCurrentContact: (state: ContactStateInterface, action) => {
            state.currentItem = action.payload;
        },
    },
    extraReducers(builder: ActionReducerMapBuilder<ContactStateInterface>) {
        populateBuilder(builder);
    }
});

export const selectContacts = (state: RootState) => state.contact.items;
export const selectCurrentContact = (state: RootState) => state.contact.currentItem;
export const selectFetchContactStatus = (state: RootState) => state.contact.fetchStatus;
export const selectPostContactStatus = (state: RootState) => state.contact.postStatus;
export const selectPutContactStatus = (state: RootState) => state.contact.putStatus;
export const selectDeleteContactStatus = (state: RootState) => state.contact.deleteStatus;
export const selectContactError = (state: RootState) => state.contact.fetchError;

export const fetchContacts = fetchItems;

export const putContact = putItem;

export const { updateContacts, updateCurrentContact } = contactSlice.actions

export default contactSlice.reducer;