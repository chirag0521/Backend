import React, { useState } from 'react'
import { Link } from 'react-router'

const Login = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const submitForm = (e) => {
        e.preventDefault()

        //this is the data which we are going to send to backend
        const payload = {
            email,password
        }

        console.log('Login payload:', payload);
        
    }

    return (
        <section className='min-h-screen bg-zinc-950 px-4 py-10 text-zinc-100 sm:px-6 lg:px-8'>
            <div className='mx-auto flex min-h-[85vh] w-full max-w-5xl items-center justify-center'>
                <div className='w-full max-w-md rounded-2xl border border-[#31b8c6]/40 bg-zinc-900/70 p-8 shadow-2xl shadow-black/50 backdrop-blur'>
                    <h1 className='text-3xl font-bold text-[#31b8c6]'>Welcome Back</h1>
                    <p className=' mt-2 text-sm text-zinc-300'>Sign in with your email and password.</p>

                    <form onSubmit={submitForm} className='mt-8 space-y-5'>

                        <div>
                            <label htmlFor="email" className='mb-2 text-sm font-medium text-zinc-200'>Email</label>
                            <input
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                type="text"
                                id='email'
                                placeholder='you@example.com'
                                required
                                className='w-full rounded-lg border border-zinc-700 bg-zinc-950/80 px-4 py-1.5 text-zinc-100 outline-none  transition focus:border-[#31b8c6] focus:shadow-[0_0_0_3px_rgba(49,184,198,0.25)]' />
                        </div>

                        <div>
                            <label htmlFor="password" className='mb-2 text-sm font-medium text-zinc-200'>Password</label>
                            <input 
                            value={password}
                            onChange={(e)=>setPassword(e.target.value)}
                            type="password" 
                            id='password' 
                            placeholder='password' 
                            required 
                            className='w-full rounded-lg border border-zinc-700 bg-zinc-950/80 px-4 py-1.5 text-zinc-100 outline-none  transition focus:border-[#31b8c6] focus:shadow-[0_0_0_3px_rgba(49,184,198,0.25)]' />
                        </div>

                        <button type='submit' className='w-full rounded-lg bg-[#31b8c6] px-4 py-3 font-semibold text-zinc-950 transition hover:bg-[#45c7d4] focus:oultine-none focus:shadow-[0_0_0_3px_rgba(49,184,198,0.35)]'>Login</button>

                    </form>

                    <p className='mt-6 text-center text-sm text-zinc-300'>Don't have an account? <Link to='/register' className='font-semibold text-[#31b8c6] transition hover:text-[#45c7d4]'>Register</Link></p>
                </div>

            </div>
        </section>
    )
}

export default Login