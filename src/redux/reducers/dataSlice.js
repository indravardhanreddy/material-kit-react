import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    dataItems: [],
    dataSettings: []
}

const dataSlice = createSlice({
    name: 'data',
    initialState,
    reducers: {
        setDataItems: (state, action) => {
            state.dataItems = action.payload
        },
        setDataSettings: (state, action) => {
            state.dataSettings = action.payload
        }
    }

})

export const { setDataItems,setDataSettings } = dataSlice.actions

export default dataSlice.reducer