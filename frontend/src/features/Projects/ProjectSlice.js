import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";

const initialState = {
    projects: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ""
};

export const ProjectSlice = createSlice({
    name: "projects",
    initialState, 
    reducers: {
        reset: () => initialState
    }
});

export const {reset} = ProjectSlice.actions;
export default ProjectSlice.reducer;