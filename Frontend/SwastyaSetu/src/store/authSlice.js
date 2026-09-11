import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import {
    loginUser as loginAPI,
    getCurrentUser,
    logoutUser as logoutAPI,
    registerUser as registerAPI,
} from "../services/authService";


// ============================================
// LOGIN
// ============================================

export const loginUser = createAsyncThunk(
    "auth/loginUser",

    async (data, { rejectWithValue }) => {

        try {

            const response =
                await loginAPI(data);

            return response;

        } catch (error) {

            return rejectWithValue(
                error.response?.data?.message ||
                "Login failed"
            );
        }
    }
);


// ============================================
// CHECK CURRENT USER
// ============================================

export const checkAuth = createAsyncThunk(
    "auth/checkAuth",

    async (_, { rejectWithValue }) => {

        try {

            const response =
                await getCurrentUser();

            return response;

        } catch (error) {

            return rejectWithValue(
                error.response?.data?.message ||
                "Not authenticated"
            );
        }
    }
);


// ============================================
// LOGOUT
// ============================================

export const logoutUser = createAsyncThunk(
    "auth/logoutUser",

    async (_, { rejectWithValue }) => {

        try {

            const response =
                await logoutAPI();

            return response;

        } catch (error) {

            return rejectWithValue(
                error.response?.data?.message ||
                "Logout failed"
            );
        }
    }
);


// ============================================
// REGISTER
// ============================================

export const registerUser = createAsyncThunk(
    "auth/registerUser",

    async (data, { rejectWithValue }) => {

        try {

            const response =
                await registerAPI(data);

            return response;

        } catch (error) {

            return rejectWithValue(
                error.response?.data?.message ||
                "Registration failed"
            );
        }
    }
);


// ============================================
// INITIAL STATE
// ============================================

const initialState = {

    user: null,

    isAuthenticated: false,

    loading: false,

    initializing: true,

    error: null,
};


// ============================================
// SLICE
// ============================================

const authSlice = createSlice({

    name: "auth",

    initialState,

    reducers: {

        clearError: (state) => {
            state.error = null;
        },

        resetAuth: (state) => {
            state.user = null;
            state.isAuthenticated = false;
            state.loading = false;
            state.initializing = false;
        },
    },


    extraReducers: (builder) => {

        // ====================================
        // LOGIN
        // ====================================

        builder

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

                    state.initializing = false;
                }
            )

            .addCase(
                loginUser.rejected,
                (state, action) => {

                    state.loading = false;

                    state.error =
                        action.payload;

                    state.isAuthenticated = false;

                    state.user = null;

                    state.initializing = false;
                }
            );


        // ====================================
        // CHECK AUTH
        // ====================================

        builder

            .addCase(
                checkAuth.pending,
                (state) => {

                    state.initializing = true;
                }
            )

            .addCase(
                checkAuth.fulfilled,
                (state, action) => {

                    state.user =
                        action.payload.user;

                    state.isAuthenticated = true;

                    state.initializing = false;

                    state.error = null;
                }
            )

            .addCase(
                checkAuth.rejected,
                (state) => {

                    state.user = null;

                    state.isAuthenticated = false;

                    state.initializing = false;
                }
            );


        // ====================================
        // LOGOUT
        // ====================================

        builder

            .addCase(
                logoutUser.fulfilled,
                (state) => {

                    state.user = null;

                    state.isAuthenticated = false;

                    state.loading = false;

                    state.initializing = false;
                }
            )

            .addCase(
                logoutUser.rejected,
                (state) => {

                    // Even if backend logout fails,
                    // remove user from frontend state.

                    state.user = null;

                    state.isAuthenticated = false;

                    state.loading = false;

                    state.initializing = false;
                }
            );


        // ====================================
        // REGISTER
        // ====================================

        builder

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

                    if (action.payload.user) {

                        state.user =
                            action.payload.user;

                        state.isAuthenticated = true;
                    }

                    state.initializing = false;
                }
            )

            .addCase(
                registerUser.rejected,
                (state, action) => {

                    state.loading = false;

                    state.error =
                        action.payload;

                    state.initializing = false;
                }
            );
    },
});


export const {
    clearError,
    resetAuth,
} = authSlice.actions;


export default authSlice.reducer;