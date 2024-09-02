import { createSlice } from "@reduxjs/toolkit";
import manageApiCalls from "../../logic/apiManagement";

const [populateBuilder, fetchItems, fetchItemById, postItem, putItem, deleteItem] = manageApiCalls('room');

export const roomSlice = createSlice({
    name: 'room',
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
        updateRooms: (state, action) => {
            state.items = action.payload;
        },
        updateCurrentRoom: (state, action) => {
            state.currentItem = action.payload;
        },
    },
    extraReducers(builder) {
        populateBuilder(builder);
    }
});

export const selectRooms = state => state.room.items;
export const selectCurrentRoom = state => state.room.currentItem;
export const selectFetchRoomStatus = state => state.room.fetchStatus;
export const selectPostRoomStatus = state => state.room.postStatus;
export const selectPutRoomStatus = state => state.room.putStatus;
export const selectDeleteRoomStatus = state => state.room.deleteStatus;
export const selectRoomError = state => state.room.fetchError;

export const fetchRooms = fetchItems;

export const fetchRoomById = fetchItemById

export const postRoom = postItem;

export const putRoom = putItem;

export const deleteRoom = deleteItem;

export const { updateRooms, updateCurrentRoom } = roomSlice.actions

export default roomSlice.reducer;