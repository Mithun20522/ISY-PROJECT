import {createSlice} from '@reduxjs/toolkit';

const roomSlice = createSlice({
    name:'room',
    initialState:{
        roomInfo:null
    },
    reducers:{
        createRoom: (state, action) => {
            state.roomInfo = action.payload;
        }
    }
})

export const {createRoom} = roomSlice.actions;

export default roomSlice.reducer;