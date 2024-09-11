import { ActionReducerMapBuilder, createSlice, SerializedError } from "@reduxjs/toolkit";
import manageApiCalls from "../../logic/apiManagement";
import { ApiRoomInterface, NullableApiRoomInterface } from "../../interfaces/apiManagement";
import { RootState } from "../store";
import { AbstractState } from "../../interfaces/reduxManagement";

const [populateBuilder, fetchItems, fetchItemById, postItem, putItem, deleteItem] = manageApiCalls('room');

export interface RoomStateInterface extends AbstractState {
    currentItem: NullableApiRoomInterface;
    items: ApiRoomInterface[];
    fetchStatus: "idle" | "rejected" | "fulfilled" | "pending" | null;
    fetchError: SerializedError | null;
    postStatus: "idle" | "rejected" | "fulfilled" | "pending" | null;
    putStatus: "idle" | "rejected" | "fulfilled" | "pending" | null;
    deleteStatus: "idle" | "rejected" | "fulfilled" | "pending" | null;
}

const initialState: RoomStateInterface = {
    currentItem: null,
    items: [],
    fetchStatus: null,
    fetchError: null,
    postStatus: null,
    putStatus: null,
    deleteStatus: null
} satisfies RoomStateInterface as RoomStateInterface

export const roomSlice = createSlice({
    name: 'room',
    initialState,
    reducers: {
        updateRooms: (state: RoomStateInterface, action) => {
            state.items = action.payload;
        },
        updateCurrentRoom: (state: RoomStateInterface, action) => {
            state.currentItem = action.payload;
        },
    },
    extraReducers(builder: ActionReducerMapBuilder<RoomStateInterface>) {
        populateBuilder(builder);
    }
});

export const selectRooms = (state: RootState) => state.room.items;
export const selectCurrentRoom = (state: RootState) => state.room.currentItem;
export const selectFetchRoomStatus = (state: RootState) => state.room.fetchStatus;
export const selectPostRoomStatus = (state: RootState) => state.room.postStatus;
export const selectPutRoomStatus = (state: RootState) => state.room.putStatus;
export const selectDeleteRoomStatus = (state: RootState) => state.room.deleteStatus;
export const selectRoomError = (state: RootState) => state.room.fetchError;

export const fetchRooms = fetchItems;

export const fetchRoomById = fetchItemById

export const postRoom = postItem;

export const putRoom = putItem;

export const deleteRoom = deleteItem;

export const { updateRooms, updateCurrentRoom } = roomSlice.actions

export default roomSlice.reducer;