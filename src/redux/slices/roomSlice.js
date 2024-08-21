import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const roomSlice = createSlice({
    name: 'room',
    initialState: {
        currentRoom: null,
        rooms: [],
        fetchStatus: null,
        roomError: null,
        postStatus: null,
        putStatus: null,
        deleteStatus: null
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
            state.fetchStatus = 'rejected';
            state.roomError = action.error.message;            
        })
        .addCase(fetchRoomById.pending, (state) => {
            state.fetchStatus = 'pending';            
        })
        .addCase(fetchRoomById.fulfilled, (state, action) => {
            state.fetchStatus = 'fulfilled';
            state.currentRoom = action.payload;
            state.roomError = null;
        })
        .addCase(fetchRoomById.rejected, (state, action) => {
            state.fetchStatus = 'rejected';
            state.roomError = action.error.message;            
        })
        .addCase(postRoom.pending, (state) => {
            state.postStatus = 'pending';            
        })
        .addCase(postRoom.fulfilled, (state, action) => {
            state.postStatus = 'fulfilled';
            const updatedRooms = [...state.rooms];
            updatedRooms.push(action.payload);
            state.rooms = updatedRooms;
            state.roomError = null;
        })
        .addCase(postRoom.rejected, (state, action) => {
            state.postStatus = 'rejected';
            state.roomError = action.error.message;            
        })
        .addCase(putRoom.pending, (state) => {
            state.putStatus = 'pending';            
        })
        .addCase(putRoom.fulfilled, (state, action) => {
            state.putStatus = 'fulfilled';
            const updateObject = action.payload;
            if(updateObject.id)
            {
                const updatedRooms = [...state.rooms];
                const putIndex = updatedRooms.findIndex((room) => room.id === updateObject.id);
                if(putIndex !== -1)
                {
                    updatedRooms.splice(putIndex, 1, updateObject);
                    state.rooms = updatedRooms;
                }
            }
            state.roomError = null;
        })
        .addCase(putRoom.rejected, (state, action) => {
            state.putStatus = 'rejected';
            state.roomError = action.error.message;            
        })
        .addCase(deleteRoom.pending, (state) => {
            state.deleteStatus = 'pending';            
        })
        .addCase(deleteRoom.fulfilled, (state, action) => {
            state.deleteStatus = 'fulfilled';
            const updateObject = action.payload;
            if(updateObject.id)
            {
                const updatedRooms = [...state.rooms];
                const putIndex = updatedRooms.findIndex((room) => room.id === updateObject.id);
                if(putIndex !== -1)
                {
                    updatedRooms.splice(putIndex, 1);
                    state.rooms = updatedRooms;
                }
            }
            state.roomError = null;
        })
        .addCase(deleteRoom.rejected, (state, action) => {
            state.deleteStatus = 'rejected';
            state.roomError = action.error.message;            
        })
    }
});

export const selectRooms = state => state.room.rooms;
export const selectCurrentRoom = state => state.room.currentRoom;
export const selectFetchRoomStatus = state => state.room.fetchStatus;
export const selectPostRoomStatus = state => state.room.postStatus;
export const selectPutRoomStatus = state => state.room.putStatus;
export const selectDeleteRoomStatus = state => state.room.deleteStatus;
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

export const fetchRoomById = createAsyncThunk('room/fetchRoomById', async (roomId) => {
    
    const response = await fetch( 
        'http://localhost:3000/room/' + roomId, 
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
});

export const postRoom = createAsyncThunk('room/postRoom', async (roomObject) => {
    
    const response = await fetch( 
        'http://localhost:3000/room', 
        {          
            method: 'POST',      
            headers: {
                'Content-Type': 'application/json'
            },
            mode: "cors",
            dataType: 'json',
            body: JSON.stringify(roomObject)
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

export const putRoom = createAsyncThunk('room/putRoom', async (roomObject) => {
    
    const response = await fetch( 
        'http://localhost:3000/room/' + roomObject.id, 
        {          
            method: 'PUT',      
            headers: {
                'Content-Type': 'application/json'
            },
            mode: "cors",
            dataType: 'json',
            body: JSON.stringify(roomObject)
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

export const deleteRoom = createAsyncThunk('room/deleteRoom', async (roomObject) => {
    
    const response = await fetch( 
        'http://localhost:3000/room/' + roomObject.id, 
        {          
            method: 'DELETE',      
            headers: {
                'Content-Type': 'application/json'
            },
            mode: "cors",
            dataType: 'json',
            body: JSON.stringify(roomObject)
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