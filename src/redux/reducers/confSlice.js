import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    configurationItems : 'hi',
    configurationSettings: []
}

const confSlice = createSlice({
    name: 'conf',
    initialState,
    reducers: {
        setConfigurationItems: (state, action) => {
            state.configurationItems = action.payload
        },
        setConfigurationSettings: (state, action) => {
            state.configurationSettings = action.payload
        }
    }
})

export const { setConfigurationItems, setConfigurationSettings } = confSlice.actions

export default confSlice.reducer