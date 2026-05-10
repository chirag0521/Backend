import React from 'react'
import "../style/login.scss"
import FormGroup from '../components/FormGroup'
import { Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

const Login = () => {
    
    const { loading, handleLogin } = useAuth()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")



    async function handleSubmit(e){
        e.preventDefault()

    }
    return (
        <main className='login-page'>
            <div className="form-container">
                <h1>Login</h1>
                <form onSubmit={handleSubmit}>
                    <FormGroup label="Email" placeholder="Enter your eamil" />
                    <FormGroup label="Password" placeholder="Enter your password" />
                    <button className='button' type='submit'>Login</button>
                </form>
                <p>Don't have an account? <Link to="/register">Register here</Link></p>
            </div>
        </main>
    )
}

export default Login