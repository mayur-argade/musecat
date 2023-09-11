import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    event: null
};

export const eventSlice = createSlice({
    name: "event",
    initialState,
    reducers: {
        setEvent: (state, action) => {
            const { eventDetails } = action.payload;
            state.event = eventDetails;
        }
    },
});

// Action creators are generated for each case reducer function
export const { setEvent } = eventSlice.actions;

export default eventSlice.reducer;
