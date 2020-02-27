import { configureStore } from '@reduxjs/toolkit'
import {game} from './redux/game'

const store = configureStore({
    reducer: {
        game
    }
})

export type AppDispatch = typeof store.dispatch
export type AppState = ReturnType<typeof store.getState>

export default store