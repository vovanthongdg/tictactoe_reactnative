import { configureStore } from '@reduxjs/toolkit'
import soundReducer from './reducer/soundReducer'
import backgroundReducer from './reducer/backgroundReducer'

export const store = configureStore({
  reducer: {
    SoundReducer: soundReducer, 
    BackgroundReducer: backgroundReducer},
})

