import {createSlice} from '@reduxjs/toolkit';

const chatSlice = createSlice({
    name:'chat',
    initialState:{
        chatInfo:null,
        loading:false,
        error:null
    },
    reducers:{
        chatStart: (state, action) => {
            state.loading = true;
            state.error = null;
        },
        chatSuccess: (state, action) => {
            state.chatInfo = action.payload;
            state.loading = false;
            state.error = null;
        },
        chatFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        }
    }
})

export const {chatStart, chatSuccess, chatFailure} = chatSlice.actions;

export default chatSlice.reducer;