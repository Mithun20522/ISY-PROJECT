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
        addMemberAnonymousStart: (state, action) => {
            state.loading = true;
            state.error = null
        },
        addMemberAnonymousSuccess: (state, action) => {
            state.member = action.payload;
            state.loading = false;
        },
        addMemberAnonymousFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        }

    }
})

export const {addMemberStart, addMemberSuccess, addMemberFailure,
addMemberAnonymousStart, addMemberAnonymousSuccess, addMemberAnonymousFailure} = memberSlice.actions;

export default memberSlice.reducer;