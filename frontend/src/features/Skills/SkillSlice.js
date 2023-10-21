import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";

const initialState = {
    skills: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ""
};

export const SkillSlice = createSlice({
    name: "skills",
    initialState, 
    reducers: {
        reset: () => initialState
    }
});

export const {reset} = SkillSlice.actions;
export default SkillSlice.reducer;