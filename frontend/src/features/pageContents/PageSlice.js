import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import PageContentServices from "./PageService";
import authSlice from "../auth/authSlice";
import { clearUserDetails } from "../../helpers/Lookup";

const initialState = {
    pages: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
    statusCode: 0
};

export const PageSlice = createSlice({
    name: "page",
    initialState,
    reducers: {
        reset: (state) => initialState
    },
    extraReducers: (builder) => {
        builder.addCase(SavePageContent.pending, (state) => {
            return { ...state, isLoading: true };
        });

        builder.addCase(SavePageContent.fulfilled, (state, action) => {
            return { ...state, isLoading: false, isSuccess: true, pages: [...state.pages, action.payload] };
        });

        builder.addCase(SavePageContent.rejected, (state, action) => {

            return { ...state, isLoading: false, isError: true, message: action.payload.message, statusCode: action.payload.statusCode };
        });

        builder.addCase(GetPageContent.pending, (state) => {
            return { ...state, isLoading: true };
        });

        builder.addCase(GetPageContent.fulfilled, (state, action) => {
            return { ...state, isLoading: false, isSuccess: true, pages: action.payload };
        });

        builder.addCase(GetPageContent.rejected, (state, action) => {
            console.log(action);
            return { ...state, isLoading: false, isError: true, message: action.payload.message, statusCode: action.payload.statusCode };
        });
    }
});

// export const LoadPages=  createAsyncThunk("page/LoadPages",)


export const SavePageContent = createAsyncThunk("page/savePageContent",
    async (PageContent, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.userToken;
            return await PageContentServices.SavePageContent(PageContent, token);

        } catch (e) {
            console.error(e);
            return thunkAPI.rejectWithValue({ statusCode: e.response.status, message: "There was an error saving page content" });
        }
    })

export const GetPageContent = createAsyncThunk("page/getAll", async (_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.userToken;
        return await PageContentServices.GetPageContents(token);

    } catch (e) {
        console.error(e);
        return thunkAPI.rejectWithValue({ statusCode: e.response.status, message: "There was an error getting page contents" });
    }
})
export const { reset } = PageSlice.actions;
export default PageSlice.reducer;
