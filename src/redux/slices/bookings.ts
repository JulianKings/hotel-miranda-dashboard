import { ActionReducerMapBuilder, createSlice, SerializedError } from "@reduxjs/toolkit";
import manageApiCalls from "../../logic/apiManagement";
import { ApiAbstractInterface, ApiBookingInterface } from "../../interfaces/apiManagement";
import { RootState } from "../store";
import { AbstractState } from "../../interfaces/reduxManagement";

const [populateBuilder, fetchItems, fetchItemById, postItem, putItem, deleteItem] = manageApiCalls('bookings');

export interface BookingStateInterface extends AbstractState {
    currentItem: ApiBookingInterface | null;
    items: ApiBookingInterface[];
    fetchStatus: string | null;
    fetchError: SerializedError | null;
    postStatus: string | null;
    putStatus: string | null;
    deleteStatus: string | null;
}

const initialState = {
    currentItem: null,
    items: [],
    fetchStatus: null,
    fetchError: null,
    postStatus: null,
    putStatus: null,
    deleteStatus: null
} satisfies BookingStateInterface as BookingStateInterface

export const bookingsSlice = createSlice({
    name: 'bookings',
    initialState,
    reducers: {
        updateBookings: (state: AbstractState, action) => {
            state.items = action.payload;
        },
        updateCurrentBooking: (state: AbstractState, action) => {
            state.currentItem = action.payload;
        },
    },
    extraReducers(builder: ActionReducerMapBuilder<AbstractState>) {
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