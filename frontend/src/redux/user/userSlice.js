import {createSlice} from '@reduxjs/toolkit';

const userSlice = createSlice({
    name:'user',
    initialState:{
        currentUser:null,
        loading:false,
        error:null
    },
    reducers:{
        loginInStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        loginInSuccess: (state, action) => {
            state.currentUser = action.payload;
            state.loading = false;
            state.error = null;
        },
        loginInFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        logoutSuccess: (state, action) => {
            state.currentUser = null;
            state.loading = false;
            state.error = null;
        }
    }
});

export const {loginInStart, loginInSuccess, loginInFail, logoutSuccess} = userSlice.actions;

export default userSlice.reducer;