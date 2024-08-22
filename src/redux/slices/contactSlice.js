import { createSlice } from "@reduxjs/toolkit";
import manageApiCalls from "../../logic/apiManagement";

const [populateBuilder, fetchItems, fetchItemById, postItem, putItem, deleteItem] = manageApiCalls('contact');

export const contactSlice = createSlice({
    name: 'contact',
    initialState: {
        currentItem: null,
        items: [],
        fetchStatus: null,
        fetchError: null,
        postStatus: null,
        putStatus: null,
        deleteStatus: null
    },
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

export const selectContacts = state => state.contact.items;
export const selectCurrentContact = state => state.contact.currentItem;
export const selectFetchContactStatus = state => state.contact.fetchStatus;
export const selectPostContactStatus = state => state.contact.postStatus;
export const selectPutContactStatus = state => state.contact.putStatus;
export const selectDeleteContactStatus = state => state.contact.deleteStatus;
export const selectContactError = state => state.contact.fetchError;

export const fetchContacts = fetchItems;

export const fetchContactById = fetchItemById;

export const postContact = postItem;

export const putContact = putItem;

export const deleteContact = deleteItem;

export const { updateContacts, updateCurrentContact } = contactSlice.actions

export default contactSlice.reducer;