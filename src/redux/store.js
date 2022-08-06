import { configureStore } from '@reduxjs/toolkit'
import soundReducer from './reducer/soundReducer'

export const store = configureStore({
  reducer: {soundReducer},
})

