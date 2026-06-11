import { useDispatch } from "react-redux"
import { login, register, getMe } from "../services/auth.api.js"
import { setUser, setLoading, setError } from "../auth.slice.js"

export function useAuth() {

    const dispatch = useDispatch()

    async function handleRegister({ email, username, password }) {
        try {
            dispatch(setLoading(true))
            // eslint-disable-next-line no-unused-vars
            const data = await register({ email, username, password })
            //yaha pe data nhi ayega because humne email verification use kiya hai
        }
        catch (error) {
            dispatch(setError(error.response?.data?.message || "Registration failed"))
        }
        finally {
            dispatch(setLoading(false))
        }
    }

    async function handleLogin({ email, password }) {
        console.log("handleLogin called")
        try {
            dispatch(setLoading(true))
            const data = await login({ email, password })
            dispatch(setUser(data.user))
        }
        catch (error) {
            dispatch(setError(error.response?.data?.message || "Login failed"))
        }
        finally {
            dispatch(setLoading(false))
        }
    }

    async function handleGetMe() {
        try {
            dispatch(setLoading(true))
            const data = await getMe()
            dispatch(setUser(data.user))
        }
        catch (error) {
            dispatch(setError(error.response?.data?.message || "Failed to fetch user data"))
        }
        finally {
            dispatch(setLoading(false))
        }
    }

    return {
        handleRegister, handleLogin, handleGetMe
    }
}