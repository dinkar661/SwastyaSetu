import {
    createSlice,
    createAsyncThunk
} from "@reduxjs/toolkit";

import authService from "../services/authService";


// Login
export const loginUser = createAsyncThunk(
    "auth/login",
    async (credentials, thunkAPI) => {

        try {

            return await authService.login(
                credentials
            );

        } catch (error) {

            return thunkAPI.rejectWithValue(
                error.response?.data?.message ||
                "Login failed"
            );
        }
    }
);


// Register
export const registerUser = createAsyncThunk(
    "auth/register",
    async (userData, thunkAPI) => {

        try {

            return await authService.register(
                userData
            );

        } catch (error) {

            return thunkAPI.rejectWithValue(
                error.response?.data?.message ||
                "Registration failed"
            );
        }
    }
);


// Logout
export const logoutUser = createAsyncThunk(
    "auth/logout",
    async (_, thunkAPI) => {

        try {

            await authService.logout();

            return true;

        } catch (error) {

            return thunkAPI.rejectWithValue(
                "Logout failed"
            );
        }
    }
);


const initialState = {
    user: null,
    loading: false,
    error: null,
    isAuthenticated: false
};


const authSlice = createSlice({

    name: "auth",

    initialState,

    reducers: {

        clearError: (state) => {
            state.error = null;
        }

    },

    extraReducers: (builder) => {

        builder

            // LOGIN
            .addCase(
                loginUser.pending,
                (state) => {
                    state.loading = true;
                    state.error = null;
                }
            )

            .addCase(
                loginUser.fulfilled,
                (state, action) => {

                    state.loading = false;

                    state.user =
                        action.payload.user;

                    state.isAuthenticated = true;
                }
            )

            .addCase(
                loginUser.rejected,
                (state, action) => {

                    state.loading = false;

                    state.error =
                        action.payload;
                }
            )


            // REGISTER
            .addCase(
                registerUser.pending,
                (state) => {
                    state.loading = true;
                    state.error = null;
                }
            )

            .addCase(
                registerUser.fulfilled,
                (state, action) => {

                    state.loading = false;

                    state.user =
                        action.payload.user;

                    state.isAuthenticated = true;
                }
            )

            .addCase(
                registerUser.rejected,
                (state, action) => {

                    state.loading = false;

                    state.error =
                        action.payload;
                }
            )


            // LOGOUT
            .addCase(
                logoutUser.fulfilled,
                (state) => {

                    state.user = null;

                    state.isAuthenticated =
                        false;

                    state.loading = false;
                }
            );
    }
});


export const {
    clearError
} = authSlice.actions;


export default authSlice.reducer;