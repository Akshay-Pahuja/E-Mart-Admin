import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import pCategoryService from "./pcategoryService"
import { createAction } from '@reduxjs/toolkit'

export const getProductCategories = createAsyncThunk(
    "pcategory/get-pcategories",
    async (thunkAPI) => {
      try {
        return await pCategoryService.getProductCategories();
      } catch (error) {
        return thunkAPI.rejectWithValue(error);
      }
    }
  );

  export const createCategory = createAsyncThunk(
    "category/create-category",
    async (categoryData, thunkAPI) => {
      try {
        return await pCategoryService.createCategory(categoryData);
      } catch (error) {
        return thunkAPI.rejectWithValue(error);
      }
    }
  );

  export const getAProductCategory = createAsyncThunk(
    "category/get-category",
    async (id,thunkAPI) => {
      try {
        return await pCategoryService.getProductCategory(id);
      } catch (error) {
        return thunkAPI.rejectWithValue(error);
      }
    }
  );

  export const updateAProductCategory = createAsyncThunk(
    "brand/update-brand",
    async (category, thunkAPI) => {
      try {
        return await pCategoryService.updateProductCategory(category);
      } catch (error) {
        return thunkAPI.rejectWithValue(error);
      }
    }
  );

  export const deleteAProductCategory = createAsyncThunk(
    "category/delete-category",
    async (id, thunkAPI) => {
      try {
        return await pCategoryService.deleteProductCategory(id);
      } catch (error) {
        return thunkAPI.rejectWithValue(error);
      }
    }
  );

  export const resetState = createAction("Reset_all");

  const initialState = {
    pCategories: [],
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: "",
  };

  export const pcategorySlice = createSlice({
    name: "pCategories",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(getProductCategories.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(getProductCategories.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isError = false;
          state.isSuccess = true;
          state.pCategories = action.payload;
        })
        .addCase(getProductCategories.rejected, (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.isSuccess = false;
          state.message = action.error;
        })
        .addCase(createCategory.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(createCategory.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isError = false;
          state.isSuccess = true;
          state.createdCategory = action.payload;
        })
        .addCase(createCategory.rejected, (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.isSuccess = false;
          state.message = action.error;
        })
        .addCase(getAProductCategory.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(getAProductCategory.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isError = false;
          state.isSuccess = true;
          state.categoryName = action.payload.title;
        })
        .addCase(getAProductCategory.rejected, (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.isSuccess = false;
          state.message = action.error;
        })
        .addCase(updateAProductCategory.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(updateAProductCategory.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isError = false;
          state.isSuccess = true;
          state.updatedProductCategory = action.payload;
        })
        .addCase(updateAProductCategory.rejected, (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.isSuccess = false;
          state.message = action.error;
        })
        .addCase(deleteAProductCategory.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(deleteAProductCategory.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isError = false;
          state.isSuccess = true;
          state.deletedBrand = action.payload;
        })
        .addCase(deleteAProductCategory.rejected, (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.isSuccess = false;
          state.message = action.error;
        })
        .addCase(resetState, () => initialState);

    },
  });
  export default pcategorySlice.reducer;


