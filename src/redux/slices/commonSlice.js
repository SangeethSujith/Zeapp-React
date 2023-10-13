import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    loaders: [],
};

const commonSlice = createSlice({
    name: 'common',
    initialState,
    reducers: {
        addLoader(state, action) {
            state.loaders = [...state.loaders, action.payload]
        },
        removeLoader(state, action) {
            state.loaders = state.loaders.filter(i => i !== action.payload)
        },
    },
});

export const { addLoader, removeLoader } = commonSlice.actions;
const commonReducer = commonSlice.reducer;
export default commonReducer;
