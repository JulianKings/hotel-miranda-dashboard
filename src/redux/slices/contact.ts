import { createSlice, SerializedError } from "@reduxjs/toolkit";
import manageApiCalls from "../../logic/apiManagement";
import { ApiContactInterface } from "../../interfaces/apiManagement";
import { RootState } from "../store";

const [populateBuilder, fetchItems, putItem] = manageApiCalls('contact');

interface ContactStateInterface {
    currentItem: ApiContactInterface | null;
    items: ApiContactInterface[];
    fetchStatus: string | null;
    fetchError: SerializedError | null;
    postStatus: string | null;
    putStatus: string | null;
    deleteStatus: string | null;
}

const initialState = {
    currentItem: null,
    items: [],
    fetchStatus: null,
    fetchError: null,
    postStatus: null,
    putStatus: null,
    deleteStatus: null
} satisfies ContactStateInterface as ContactStateInterface

export const contactSlice = createSlice({
    name: 'contact',
    initialState,
    reducers: {
        updateContacts: (state, action) => {
            state.items = action.payload;
        },
        updateCurrentContact: (state, action) => {
            state.currentItem = action.payload;
        },
    },
    extraReducers(builder) {
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