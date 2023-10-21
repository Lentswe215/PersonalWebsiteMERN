import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";

const initialState = {
    messages: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ""
};

export const MessageSlice = createSlice({
    name: "messages",
    initialState, 
    reducers: {
        reset: () => initialState
    }
});

export const {reset} = MessageSlice.actions;
export default MessageSlice.reducer;