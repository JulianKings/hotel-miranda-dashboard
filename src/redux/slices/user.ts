import { createSlice } from "@reduxjs/toolkit";
import manageApiCalls from "../../logic/apiManagement";

const [populateBuilder, fetchItems, fetchItemById, postItem, putItem, deleteItem] = manageApiCalls('user');

export const userSlice = createSlice({
    name: 'user',
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
        updateUsers: (state, action) => {
            state.items = action.payload;
        },
        updateCurrentUser: (state, action) => {
            state.currentItem = action.payload;
        },
    },
    extraReducers(builder) {
        populateBuilder(builder);
    }
});

export const selectUsers = state => state.user.items;
export const selectCurrentUser = state => state.user.currentItem;
export const selectFetchUserStatus = state => state.user.fetchStatus;
export const selectPostUserStatus = state => state.user.postStatus;
export const selectPutUserStatus = state => state.user.putStatus;
export const selectDeleteUserStatus = state => state.user.deleteStatus;
export const selectUserError = state => state.user.fetchError;

export const fetchUsers = fetchItems;

export const fetchUserById = fetchItemById

export const postUser = postItem;

export const putUser = putItem;

export const deleteUser = deleteItem;

export const { updateUsers, updateCurrentUser } = userSlice.actions

export default userSlice.reducer;