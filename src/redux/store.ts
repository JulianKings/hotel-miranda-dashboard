import { configureStore } from "@reduxjs/toolkit";
import roomReducer from './slices/room';
import bookingsReducer from './slices/bookings';
import userReducer from './slices/user';
import contactReducer from './slices/contact';

export default configureStore({
    reducer: {
       room: roomReducer,
       bookings: bookingsReducer,
       user: userReducer,
       contact: contactReducer,
    }
})