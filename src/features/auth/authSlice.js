import {createSlice,createAsyncThunk} from "@reduxjs/toolkit"
import authService from "./authService";
import {toast} from "react-toastify"

const getUserfromLocalStorage = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;

const initialState = {
    user : getUserfromLocalStorage,
    orders : [],
    isError: false,
    isLoading:false,
    isSuccess : false,
    message:"",
};

export const login = createAsyncThunk(
    "auth/admin-login",
    async(user,thunkAPI)=>{
        try{
            return await authService.login(user);
        } catch(error){
           return thunkAPI.rejectWithValue(error);
        }
    }
)
export const getOrders = createAsyncThunk(
    "order/get-orders",
    async (thunkAPI) => {
      try {
        return await authService.getOrders();
      } catch (error) {
        return thunkAPI.rejectWithValue(error);
      }
    }
  );

export const updateAOrder = createAsyncThunk(
    "order/update-order",
    async (data,thunkAPI) => {
      try {
        return await authService.updateOrder(data);
      } catch (error) {
        return thunkAPI.rejectWithValue(error);
      }
    }
  );

  export const getMonthlyData = createAsyncThunk(
    "order/monthly-orders",
    async (thunkAPI) => {
      try {
        return await authService.getMonthlyOrders();
      } catch (error) {
        return thunkAPI.rejectWithValue(error);
      }
    }
  );

  export const getYearlyData = createAsyncThunk(
    "order/yearly-orders",
    async (thunkAPI) => {
      try {
        return await authService.getYearlyOrders();
      } catch (error) {
        return thunkAPI.rejectWithValue(error);
      }
    }
  );

  export const forgotPasswordToken= createAsyncThunk(
    "auth-admin/forgot-password",
    async(data,thunkAPI)=>{
        try{
            return await authService.forgotPassword(data);
        } catch(error){
           return thunkAPI.rejectWithValue(error);
        }
    }
)

export const resetPassword= createAsyncThunk(
  "auth-admin/reset-password",
  async(data,thunkAPI)=>{
      try{
          return await authService.resetPassword(data);
      } catch(error){
         return thunkAPI.rejectWithValue(error);
      }
  }
)


export const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(login.pending,(state) =>{
           state.isLoading = true;
        })
        .addCase(login.fulfilled,(state,action) =>{
           state.isLoading = false;
           state.isSuccess=true;
           state.isError = false;
           state.user = action.payload;
        })
        .addCase(login.rejected,(state,action) =>{
           state.isLoading = false;
           state.isError = true;
           state.isSuccess = false;
           state.user = null;
        })

        .addCase(getOrders.pending, (state) => {
            state.isLoading = true;
          })
          .addCase(getOrders.fulfilled, (state, action) => {
            state.isError = false;
            state.isLoading = false;
            state.isSuccess = true;
            state.orders = action.payload;
            state.message = "success";
          })
          .addCase(getOrders.rejected, (state, action) => {
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
            state.isLoading = false;
          })

        .addCase(getMonthlyData.pending, (state) => {
            state.isLoading = true;
          })
          .addCase(getMonthlyData.fulfilled, (state, action) => {
            state.isError = false;
            state.isLoading = false;
            state.isSuccess = true;
            state.monthlyData = action.payload;
            state.message = "success";
          })
          .addCase(getMonthlyData.rejected, (state, action) => {
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
            state.isLoading = false;
          })
        .addCase(getYearlyData.pending, (state) => {
            state.isLoading = true;
          })
          .addCase(getYearlyData.fulfilled, (state, action) => {
            state.isError = false;
            state.isLoading = false;
            state.isSuccess = true;
            state.yearlyData = action.payload;
            state.message = "success";
          })
          .addCase(getYearlyData.rejected, (state, action) => {
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
            state.isLoading = false;
          })
        .addCase(updateAOrder.pending, (state) => {
            state.isLoading = true;
          })
          .addCase(updateAOrder.fulfilled, (state, action) => {
            state.isError = false;
            state.isLoading = false;
            state.isSuccess = true;
            state.updatedOrder = action.payload;
            state.message = "success";
          })
          .addCase(updateAOrder.rejected, (state, action) => {
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
            state.isLoading = false;
          })

          .addCase(forgotPasswordToken.pending,(state) =>{
            state.isLoading = true;
         })
         .addCase(forgotPasswordToken.fulfilled,(state,action) =>{
            state.isLoading = false;
            state.isSuccess=true;
            state.isError = false;
            state.token = action.payload;
            if(state.isSuccess ===true)
            {
                  toast.info("Check Your Email,Forgot password link has been sent")
            }
         })
         .addCase(forgotPasswordToken.rejected,(state,action) =>{
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            if(state.isError === true)
            {
                toast.info("Something went wrong");
            }
         })

         .addCase(resetPassword.pending,(state) =>{
          state.isLoading = true;
       })
       .addCase(resetPassword.fulfilled,(state,action) =>{
          state.isLoading = false;
          state.isSuccess=true;
          state.isError = false;
          state.password = action.payload;
          if(state.isSuccess ===true)
          {
                toast.info("Password has been updated");
          }
       })
       .addCase(resetPassword.rejected,(state,action) =>{
          state.isLoading = false;
          state.isError = true;
          state.isSuccess = false;
          if(state.isError === true)
          {
              toast.info("Something went wrong");
          }
       })
       
    },
})

export default authSlice.reducer;