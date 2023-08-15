import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    fromDate: '2015/01/01',
    toDate: '2023/08/11',
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