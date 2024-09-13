import { ActionReducerMapBuilder, createSlice, SerializedError } from "@reduxjs/toolkit";
import manageApiCalls from "../../logic/apiManagement";
import { ApiUserInterface, NullableApiUserInterface } from "../../interfaces/apiManagement";
import { RootState } from "../store";
import { AbstractState } from "../../interfaces/reduxManagement";

const [populateBuilder, fetchItems, fetchItemById, postItem, putItem, deleteItem] = manageApiCalls('user');

export interface UserStateInterface extends AbstractState {
    currentItem: NullableApiUserInterface;
    items: ApiUserInterface[];
    fetchStatus: "idle" | "rejected" | "fulfilled" | "pending" | null;
    fetchError: SerializedError | null;
    postStatus: "idle" | "rejected" | "fulfilled" | "pending" | null;
    putStatus: "idle" | "rejected" | "fulfilled" | "pending" | null;
    deleteStatus: "idle" | "rejected" | "fulfilled" | "pending" | null;
}

const initialState: UserStateInterface = {
    currentItem: null,
    items: [],
    fetchStatus: null,
    fetchError: null,
    postStatus: null,
    putStatus: null,
    deleteStatus: null
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        updateUsers: (state: UserStateInterface, action) => {
            state.items = action.payload;
        },
        updateCurrentUser: (state: UserStateInterface, action) => {
            state.currentItem = action.payload;
        },
    },
    extraReducers(builder: ActionReducerMapBuilder<UserStateInterface>) {
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