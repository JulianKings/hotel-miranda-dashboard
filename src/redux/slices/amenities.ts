import { ActionReducerMapBuilder, createSlice, SerializedError } from "@reduxjs/toolkit";
import manageApiCalls from "../../logic/apiManagement";
import { ApiAmenitiesInterface, NullableApiAmenitiesInterface } from "../../interfaces/apiManagement";
import { RootState } from "../store";
import { AbstractState } from "../../interfaces/reduxManagement";

const [populateBuilder, fetchItems, fetchItemById, postItem, putItem, deleteItem] = manageApiCalls('amenities');


export interface AmenitiesStateInterface extends AbstractState {
    currentItem: NullableApiAmenitiesInterface;
    items: ApiAmenitiesInterface[];
    fetchStatus: "idle" | "rejected" | "fulfilled" | "pending" | null;
    fetchError: SerializedError | null;
    postStatus: "idle" | "rejected" | "fulfilled" | "pending" | null;
    putStatus: "idle" | "rejected" | "fulfilled" | "pending" | null;
    deleteStatus: "idle" | "rejected" | "fulfilled" | "pending" | null;
}

const initialState: AmenitiesStateInterface = {
    currentItem: null,
    items: [],
    fetchStatus: null,
    fetchError: null,
    postStatus: null,
    putStatus: null,
    deleteStatus: null
}

export const amenitiesSlice = createSlice({
    name: 'amenities',
    initialState,
    reducers: {
        updateAmenities: (state: AmenitiesStateInterface, action) => {
            state.items = action.payload;
        },
        updateCurrentAmenity: (state: AmenitiesStateInterface, action) => {
            state.currentItem = action.payload;
        },
    },
    extraReducers(builder: ActionReducerMapBuilder<AmenitiesStateInterface>) {
        populateBuilder(builder);
    }
});

export const selectAmenities = (state: RootState) => state.amenities.items;
export const selectCurrentAmenity = (state: RootState) => state.amenities.currentItem;
export const selectFetchAmenityStatus = (state: RootState) => state.amenities.fetchStatus;
export const selectPostAmenityStatus = (state: RootState) => state.amenities.postStatus;
export const selectPutAmenityStatus = (state: RootState) => state.amenities.putStatus;
export const selectDeleteAmenityStatus = (state: RootState) => state.amenities.deleteStatus;
export const selectAmenitiesError = (state: RootState) => state.amenities.fetchError;

export const fetchAmenities = fetchItems;

export const fetchAmenityById = fetchItemById

export const postAmenity = postItem;

export const putAmenity = putItem;

export const deleteAmenity = deleteItem;

export const { updateAmenities, updateCurrentAmenity } = amenitiesSlice.actions

export default amenitiesSlice.reducer;