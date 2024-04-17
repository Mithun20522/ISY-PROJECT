import {createSlice} from '@reduxjs/toolkit';

const roomSlice = createSlice({
    name:'room',
    initialState:{
        currentRoom:null,
        loading:false,
        error:null
    },
    reducers:{
        createRoomStart: (state, action) => {
            state.loading = true;
            state.error = null;
        },
        createRoomSuccess: (state, action) => {
            state.currentRoom = action.payload;
            state.loading = false;
            state.error = null;
        },
        createRoomFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        deleteRoomStart: (state, action) => {
            state.loading = true;
            state.error = null;
        },
        deleteRoomSuccess: (state, action) => {
            state.currentRoom = null;
            state.loading = false;
            state.error = null;
        },
        deleteRoomFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        joinRoomStart: (state, action) => {
            state.loading = true;
            state.error = null;
        },
        joinRoomSuccess: (state, action) => {
            state.loading = false;
            state.currentRoom = action.payload;
            state.error = null;
        },
        joinRoomFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        }
    }
});

export const 
{   createRoomStart,
    createRoomSuccess, 
    createRoomFailure, 
    deleteRoomStart,
    deleteRoomSuccess, 
    deleteRoomFailure,
    joinRoomStart,
    joinRoomSuccess,
    joinRoomFailure,
} = roomSlice.actions;

export default roomSlice.reducer;