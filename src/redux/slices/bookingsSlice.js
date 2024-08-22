import { createSlice } from "@reduxjs/toolkit";
import manageApiCalls from "../../logic/apiManagement";

const [populateBuilder, fetchItems, fetchItemById, postItem, putItem, deleteItem] = manageApiCalls('bookings');

export const bookingsSlice = createSlice({
    name: 'bookings',
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
        updateBookings: (state, action) => {
            state.items = action.payload;
        },
        updateCurrentBooking: (state, action) => {
            state.currentItem = action.payload;
        },
    },
    extraReducers(builder) {
        populateBuilder(builder);
    }
});

export const selectBookings = state => state.bookings.items;
export const selectCurrentBooking = state => state.bookings.currentItem;
export const selectFetchBookingsStatus = state => state.bookings.fetchStatus;
export const selectPostBookingsStatus = state => state.bookings.postStatus;
export const selectPutBookingsStatus = state => state.bookings.putStatus;
export const selectDeleteBookingsStatus = state => state.bookings.deleteStatus;
export const selectBookingsError = state => state.bookings.fetchError;

export const fetchBookings = fetchItems;

export const fetchBookingById = fetchItemById

export const postBooking = postItem;

export const putBooking = putItem;

export const deleteBooking = deleteItem;

export const { updateBookings, updateCurrentBooking } = bookingsSlice.actions

export default bookingsSlice.reducer;