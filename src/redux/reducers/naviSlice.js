import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    navigationItems: [],
    navigationSettings: {}
}

const naviSlice = createSlice({
    name: 'navi',
    initialState,
    reducers: {
        setNavigationItems(state, action) {
            state.navigationItems = action.payload
        },
        setNavigationSettings(state, action) {
            state.navigationSettings = action.payload
        }
    }   
})

export const { setNavigationItems, setNavigationSettings } = naviSlice.actions

export default naviSlice.reducer