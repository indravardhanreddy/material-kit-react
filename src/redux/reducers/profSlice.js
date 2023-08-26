import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    profileItems : {},
}

const profSlice = createSlice({
    name: 'prof',
    initialState,
    reducers: {
        setProfileItems: (state, action) => {
            state.profileItems = action.payload
        }
    }
})

export const { setProfileItems } = profSlice.actions

export default profSlice.reducer