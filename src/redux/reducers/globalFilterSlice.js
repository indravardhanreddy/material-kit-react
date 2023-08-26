import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    fromDate: 'Sat Aug 19 2023 00:00:00 GMT+0530 (India Standard Time)',
    toDate: 'Fri Aug 25 2023 00:00:00 GMT+0530 (India Standard Time)',
    globalFilter: []
}

const globalFilterSlice = createSlice({
    name: 'globalFilter',
    initialState,
    reducers: {
        setFromDate: (state, action) => {
            state.fromDate = action.payload
        },
        setToDate: (state, action) => {
            state.toDate = action.payload
        },
        setGlobalFilter: (state, action) => {
            state.globalFilter = action.payload
        }
    }
})

export const { setFromDate, setToDate, setGlobalFilter } = globalFilterSlice.actions
export default globalFilterSlice.reducer