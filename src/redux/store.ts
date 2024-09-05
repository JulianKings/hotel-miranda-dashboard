import { configureStore } from "@reduxjs/toolkit";
import roomReducer from './slices/room';
import bookingsReducer from './slices/bookings';
import userReducer from './slices/user';
import contactReducer from './slices/contact';
import { useDispatch, useSelector } from "react-redux";

const store = configureStore({
    reducer: {
       room: roomReducer,
       bookings: bookingsReducer,
       user: userReducer,
       contact: contactReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>
export type ApiDispatch = typeof store.dispatch
export const useApiDispatch = useDispatch.withTypes<ApiDispatch>() // Export a hook that can be reused to resolve types
export const useApiSelector = useSelector.withTypes<RootState>()

export default store;