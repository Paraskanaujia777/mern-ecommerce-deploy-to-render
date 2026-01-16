import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

let initialState = {
  isAuthenticated: false,
  isLoading: true,
  user: null,
}

export const registerUser = createAsyncThunk('/auth/register',
  async (formData) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/register`,
        formData,
        {
          withCredentials: true,
        });

      return response.data;

    }
    catch (error) {
      console.log(error);
    }

  }
)

export const loginUser = createAsyncThunk('/auth/login',
  async (formData) => {

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/login`,
        formData,
        {
          withCredentials: true,
        });
      return response.data;      // this becomes data.payload

    } catch (error) {
      console.error(error);
      // return rejectWithValue(error.response?.data || { success: false });
    }
  }
)

export const logoutUser = createAsyncThunk('/auth/logout',
  async () => {

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/logout`, {},

        {
          withCredentials: true,
        });
      return response.data;      // this becomes data.payload

    } catch (error) {
      console.error(error);
      // return rejectWithValue(error.response?.data || { success: false });
    }
  }
)

export const checkAuth = createAsyncThunk('/auth/checkauth',
  async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/auth/check-auth`,
        {
          withCredentials: true,
          headers: {
            'Cache-Control': 'no-store , no-cache , must-revalidate , proxy-revalidate',

          }

        });

      return response.data;

    }
    catch (error) {
      console.log(error);
      // return rejectWithValue(error.response?.data || { success: false });
    }

  }
)

const authSlice = createSlice({
  name: 'auth',
  initialState,

  reducers: {
    setUser: (state, action) => {
      state.user = action.payload
      state.isAuthenticated = !!action.payload
    },



  },
  extraReducers: (builder) => {
    builder.addCase(registerUser.pending, (state) => {
      state.isLoading = true
    }).addCase(registerUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = null;
      state.isAuthenticated = false
    }).addCase(registerUser.rejected, (state, action) => {
      state.isLoading = false;
      state.user = null;
      state.isAuthenticated = false;
    })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true
      }).addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.success ? action.payload.user : null;
        state.isAuthenticated = action.payload.success;
      }).addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(checkAuth.pending, (state) => {
        state.isLoading = true
      }).addCase(checkAuth.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.success ? action.payload.user : null;
        state.isAuthenticated = action.payload.success;
      }).addCase(checkAuth.rejected, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      }).addCase(logoutUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(logoutUser.rejected, (state) => {
        state.isLoading = false;
      })
  }
})

export const { setUser, setLoading, logout } = authSlice.actions;
export default authSlice.reducer;