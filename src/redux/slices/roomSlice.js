import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const roomSlice = createSlice({
    name: 'room',
    initialState: {
        currentRoom: null,
        rooms: [],
        fetchStatus: null,
        roomError: null
    },
    reducers: {
        updateRooms: (state, action) => {
            state.rooms = action.payload;
        },
        updateCurrentRoom: (state, action) => {
            state.currentRoom = action.payload;
        },
    },
    extraReducers(builder) {
        builder
        .addCase(fetchRooms.pending, (state) => {
            state.fetchStatus = 'pending';            
        })
        .addCase(fetchRooms.fulfilled, (state, action) => {
            state.fetchStatus = 'fulfilled';
            state.rooms = action.payload;
            state.roomError = null;
        })
        .addCase(fetchRooms.rejected, (state, action) => {
            state.searchStatus = 'rejected';
            state.roomError = action.error.message;            
        })
    }
});

export const selectRooms = state => state.room.rooms;
export const selectCurrentRoom = state => state.room.currentRoom;
export const selectFetchRoomStatus = state => state.room.fetchStatus;
export const selectRoomError = state => state.roomError;

export const fetchRooms = createAsyncThunk('room/fetchRooms', async () => {
    
    const response = await fetch( 
        'http://localhost:3000/room', 
        {                
        headers: {
            'Content-Type': 'application/json'
        },
        mode: "cors",
        dataType: 'json',
    })
    .then((response) => {
        if (response.status >= 400) {
            throw new Error("Could not reach server: " + response.status);
        }

        return response.json();
    })
    .catch((error) => {
        throw new Error(error);
    });

    return response;
})

export const { updateRooms, updateCurrentRoom } = roomSlice.actions

export default roomSlice.reducer;