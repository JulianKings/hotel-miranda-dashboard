import { configureStore } from "@reduxjs/toolkit";
import roomReducer from './slices/roomSlice';
import bookingsReducer from './slices/bookingsSlice';
import userReducer from './slices/userSlice';
import contactReducer from './slices/contactSlice';

export default configureStore({
    reducer: {
       room: roomReducer,
       bookings: bookingsReducer,
       user: userReducer,
       contact: contactReducer,
    }
})