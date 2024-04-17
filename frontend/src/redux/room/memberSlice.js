import {createSlice} from '@reduxjs/toolkit';

const memberSlice = createSlice({
    name:'member',
    initialState:{
        member:null,
        loading:false,
        error:null
    },
    reducers:{
        addMemberStart: (state, action) => {
            state.loading = true;
            state.error = null
        },
        addMemberSuccess: (state, action) => {
            state.member = action.payload;
            state.loading = false;
        },
        addMemberFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        removeMemberStart: (state, action) => {
            state.loading = true;
            state.error = null
        },
        removeMemberSuccess: (state, action) => {
            state.member = null;
            state.loading = false;
        },
        removeMemberFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },

    }
})

export const {addMemberStart, addMemberSuccess, addMemberFailure} = memberSlice.actions;

export default memberSlice.reducer;