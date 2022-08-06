import { createSlice } from '@reduxjs/toolkit';
const initialState = {
    statusSound: "off",
}
  
export const soundSlice = createSlice({
    name: 'sound',
    initialState,
    reducers: {
    turnOnSound: (state) => {
        // Redux Toolkit allows us to write "mutating" logic in reducers. It
        // doesn't actually mutate the state because it uses the Immer library,
        // which detects changes to a "draft state" and produces a brand new
        // immutable state based off those changes
        state.statusSound = "on"
    },
    turnOffSound: (state) => {
        // Redux Toolkit allows us to write "mutating" logic in reducers. It
        // doesn't actually mutate the state because it uses the Immer library,
        // which detects changes to a "draft state" and produces a brand new
        // immutable state based off those changes
        state.statusSound = "off"
    },
    },
})
// Action creators are generated for each case reducer function
export const { turnOnSound, turnOffSound} = soundSlice.actions

export default soundSlice.reducer