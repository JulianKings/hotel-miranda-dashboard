import { ActionReducerMapBuilder, createSlice, SerializedError } from "@reduxjs/toolkit";
import manageApiCalls from "../../logic/apiManagement";
import { ApiAbstractInterface, ApiBookingInterface, NullableApiBookingInterface } from "../../interfaces/apiManagement";
import { RootState } from "../store";
import { AbstractState } from "../../interfaces/reduxManagement";

const [populateBuilder, fetchItems, fetchItemById, postItem, putItem, deleteItem] = manageApiCalls('bookings');


export interface BookingStateInterface extends AbstractState {
    currentItem: NullableApiBookingInterface;
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

export const fetchBookings: Promise<ApiBookingInterface[]> = fetchItems;

export const fetchBookingById: Promise<ApiBookingInterface> = fetchItemById

export const postBooking: Promise<ApiBookingInterface> = postItem;

export const putBooking: Promise<ApiBookingInterface> = putItem;

export const deleteBooking: Promise<ApiBookingInterface> = deleteItem;

export const { updateBookings, updateCurrentBooking } = bookingsSlice.actions

export default bookingsSlice.reducer;