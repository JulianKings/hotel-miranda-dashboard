import { ActionReducerMapBuilder, createSlice, SerializedError } from "@reduxjs/toolkit";
import manageApiCalls from "../../logic/apiManagement";
import { ApiBookingInterface, NullableApiBookingInterface } from "../../interfaces/apiManagement";
import { RootState } from "../store";
import { AbstractState } from "../../interfaces/reduxManagement";

const [populateBuilder, fetchItems, fetchItemById, postItem, putItem, deleteItem] = manageApiCalls('bookings');


export interface BookingStateInterface extends AbstractState {
    currentItem: NullableApiBookingInterface;
    items: ApiBookingInterface[];
    fetchStatus: "idle" | "rejected" | "fulfilled" | "pending" | null;
    fetchError: SerializedError | null;
    postStatus: "idle" | "rejected" | "fulfilled" | "pending" | null;
    putStatus: "idle" | "rejected" | "fulfilled" | "pending" | null;
    deleteStatus: "idle" | "rejected" | "fulfilled" | "pending" | null;
}

const initialState: BookingStateInterface = {
    currentItem: null,
    items: [],
    fetchStatus: null,
    fetchError: null,
    postStatus: null,
    putStatus: null,
    deleteStatus: null
}

export const bookingsSlice = createSlice({
    name: 'bookings',
    initialState,
    reducers: {
        updateBookings: (state: BookingStateInterface, action) => {
            state.items = action.payload;
        },
        updateCurrentBooking: (state: BookingStateInterface, action) => {
            state.currentItem = action.payload;
        },
    },
    extraReducers(builder: ActionReducerMapBuilder<BookingStateInterface>) {
        populateBuilder(builder);
    }
});

export const selectBookings = (state: RootState) => state.bookings.items;
export const selectCurrentBooking = (state: RootState) => state.bookings.currentItem;
export const selectFetchBookingsStatus = (state: RootState) => state.bookings.fetchStatus;
export const selectPostBookingsStatus = (state: RootState) => state.bookings.postStatus;
export const selectPutBookingsStatus = (state: RootState) => state.bookings.putStatus;
export const selectDeleteBookingsStatus = (state: RootState) => state.bookings.deleteStatus;
export const selectBookingsError = (state: RootState) => state.bookings.fetchError;

export const fetchBookings = fetchItems;

export const fetchBookingById = fetchItemById

export const postBooking = postItem;

export const putBooking = putItem;

export const deleteBooking = deleteItem;

export const { updateBookings, updateCurrentBooking } = bookingsSlice.actions

export default bookingsSlice.reducer;