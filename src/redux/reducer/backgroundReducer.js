import { createSlice } from '@reduxjs/toolkit';
const initialState = {
    backgroundCurrent: "1",
}
export const backgroundSlice = createSlice({
    name: 'sound',
    initialState,
    reducers: {
    setBackground: (state,action) => {
        // Redux Toolkit allows us to write "mutating" logic in reducers. It
        // doesn't actually mutate the state because it uses the Immer library,
        // which detects changes to a "draft state" and produces a brand new
        // immutable state based off those changes
        state.backgroundCurrent = action.payload
    },
    },
})
// Action creators are generated for each case reducer function
export const { setBackground } = backgroundSlice.actions

export default backgroundSlice.reducer