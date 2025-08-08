import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export type TUser = {
    userId: string;
    role: string;
    iat: number;
    exp: number;
};

type TAuthState = {
    user: TUser | null;
    token: string | null;
};

const initialState: TAuthState = {
    user: null,
    token: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser(state, action: PayloadAction<{ user: TUser; token: string }>) {
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        logout(state) {
            state.user = null;
            state.token = null;
        },
    },
});

export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;
