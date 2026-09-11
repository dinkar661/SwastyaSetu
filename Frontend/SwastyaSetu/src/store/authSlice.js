import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import {
    loginUser,
    registerUser,
    getCurrentUser,
    logoutUser,
    googleLogin,
} from "../services/authService";


// LOGIN
export const login = createAsyncThunk(
    "auth/login",
    async (data, { rejectWithValue }) => {
        try {
            const response = await loginUser(data);
            return response;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Login failed"
            );
        }
    }
);


// REGISTER
export const register = createAsyncThunk(
    "auth/register",
    async (data, { rejectWithValue }) => {
        try {
            const response = await registerUser(data);
            return response;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Registration failed"
            );
        }
    }
);


// CHECK LOGIN AFTER REFRESH
export const checkAuth = createAsyncThunk(
    "auth/checkAuth",
    async (_, { rejectWithValue }) => {
        try {
            const response = await getCurrentUser();
            return response;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Not authenticated"
            );
        }
    }
);


// LOGOUT
export const logout = createAsyncThunk(
    "auth/logout",
    async (_, { rejectWithValue }) => {
        try {
            const response = await logoutUser();
            return response;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Logout failed"
            );
        }
    }
);


// GOOGLE LOGIN
export const googleLoginThunk = createAsyncThunk(
    "auth/googleLogin",
    async (data, { rejectWithValue }) => {
        try {
            const response = await googleLogin(data);
            return response;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Google login failed"
            );
        }
    }
);


const initialState = {
    user: null,
    isAuthenticated: false,

    loading: false,

    // VERY IMPORTANT
    initializing: true,

    error: null,
};


const authSlice = createSlice({
    name: "auth",

    initialState,

    reducers: {
        clearError: (state) => {
            state.error = null;
        },
    },

    extraReducers: (builder) => {

        // =========================
        // LOGIN
        // =========================

        builder
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            .addCase(login.fulfilled, (state, action) => {
                state.loading = false;

                state.user = action.payload.user;

                state.isAuthenticated = true;

                state.error = null;
            })

            .addCase(login.rejected, (state, action) => {
                state.loading = false;

                state.user = null;

                state.isAuthenticated = false;

                state.error = action.payload;
            });


        // =========================
        // REGISTER
        // =========================

        builder
            .addCase(register.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            .addCase(register.fulfilled, (state, action) => {
                state.loading = false;

                state.user = action.payload.user;

                state.isAuthenticated = true;

                state.error = null;
            })

            .addCase(register.rejected, (state, action) => {
                state.loading = false;

                state.error = action.payload;
            });


        // =========================
        // CHECK AUTH
        // =========================

        builder
            .addCase(checkAuth.pending, (state) => {
                state.initializing = true;
            })

            .addCase(checkAuth.fulfilled, (state, action) => {
                state.initializing = false;

                state.user = action.payload.user;

                state.isAuthenticated = true;

                state.error = null;
            })

            .addCase(checkAuth.rejected, (state) => {
                state.initializing = false;

                state.user = null;

                state.isAuthenticated = false;
            });


        // =========================
        // LOGOUT
        // =========================

        builder
            .addCase(logout.pending, (state) => {
                state.loading = true;
            })

            .addCase(logout.fulfilled, (state) => {
                state.loading = false;

                state.user = null;

                state.isAuthenticated = false;

                state.error = null;
            })

            .addCase(logout.rejected, (state) => {
                state.loading = false;

                // Even if backend logout fails,
                // remove user from frontend.
                state.user = null;

                state.isAuthenticated = false;
            });


        // =========================
        // GOOGLE LOGIN
        // =========================

        builder
            .addCase(googleLoginThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            .addCase(googleLoginThunk.fulfilled, (state, action) => {
                state.loading = false;

                state.user = action.payload.user;

                state.isAuthenticated = true;

                state.error = null;
            })

            .addCase(googleLoginThunk.rejected, (state, action) => {
                state.loading = false;

                state.error = action.payload;
            });
    },
});


export const { clearError } = authSlice.actions;

export default authSlice.reducer;