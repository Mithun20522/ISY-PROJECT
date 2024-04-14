import {createSlice} from '@reduxjs/toolkit';

const userSlice = createSlice({
    name:'user',
    initialState:{
        user:null,
        loading:null,
        error:null
    },
    reducers:{
        loginInStart: (state, action) => {
            state.loading = true;
        },
        loginInSuccess: (state, action) => {
            state.user = action.payload;
            state.loading = false;
            state.error = false
        },
        loginInFail: (state, action) => {
            state.loading = true;
            state.error = action.payload;
        }
    }
});

export const {loginInStart, loginInSuccess, loginInFail} = userSlice.actions;

export default userSlice.reducer;