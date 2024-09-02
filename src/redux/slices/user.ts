import { createSlice, SerializedError } from "@reduxjs/toolkit";
import manageApiCalls from "../../logic/apiManagement";
import { ApiUserInterface } from "../../interfaces/apiManagement";
import { RootState } from "../store";

const [populateBuilder, fetchItems, fetchItemById, postItem, putItem, deleteItem] = manageApiCalls('user');

export interface UserStateInterface {
    currentItem: ApiUserInterface | null;
    items: ApiUserInterface[];
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
} satisfies UserStateInterface as UserStateInterface

export const userSlice = createSlice({
    name: 'user',
    initialState,
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

export const selectUsers = (state: RootState) => state.user.items;
export const selectCurrentUser = (state: RootState) => state.user.currentItem;
export const selectFetchUserStatus = (state: RootState) => state.user.fetchStatus;
export const selectPostUserStatus = (state: RootState) => state.user.postStatus;
export const selectPutUserStatus = (state: RootState) => state.user.putStatus;
export const selectDeleteUserStatus = (state: RootState) => state.user.deleteStatus;
export const selectUserError = (state: RootState) => state.user.fetchError;

export const fetchUsers = fetchItems;

export const fetchUserById = fetchItemById

export const postUser = postItem;

export const putUser = putItem;

export const deleteUser = deleteItem;

export const { updateUsers, updateCurrentUser } = userSlice.actions

export default userSlice.reducer;