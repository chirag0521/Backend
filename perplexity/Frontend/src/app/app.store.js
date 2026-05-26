import { configureStore } from 'react-redux'
import authReducer from '../features/auth/auth.slice'


export const store = configureStore({
    reducer: {
        auth: authReducer,
    }
})