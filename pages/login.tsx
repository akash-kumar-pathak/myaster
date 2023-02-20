import Link from 'next/link'
import router from 'next/router'
import React from 'react'
import { useState } from 'react'

const Login = () => {

    const [email, setEmail] = useState<string>('');

    const [password, setPassword] = useState<string>('');

    const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.name == 'email') {
            setEmail(e.target.value)
        }
        else if (e.target.name == 'password') {
            setPassword(e.target.value)
        }
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const data = {email, password }


        let res = await fetch('http://localhost:3000/api/login', {
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        let response = await res.json()
        console.log(response)

        //setEmail('')
        //setPassword('')
        if(response.success){
            localStorage.setItem('token',response.token)
            router.push('http://localhost:3000')
        }

    }

        return (
            <body className="antialiased bg-slate-200">
                <div className="max-w-lg mx-auto my-10 bg-white p-8 rounded-xl shadow shadow-slate-300">
                    <h1 className="text-4xl font-medium">Login</h1>
                    <p className="text-slate-500">Hi, Welcome back 👋</p>

                    <form onSubmit={handleSubmit} className="my-10" method="POST" >
                        <div className="flex flex-col space-y-5">
                            <label htmlFor="email">
                                <p className="font-medium text-slate-700 pb-2">Email address</p>
                                <input value={email} onChange={handleChange} id="email" name="email" type="email" className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow" placeholder="Enter email address" />
                            </label>
                            <label htmlFor="password">
                                <p className="font-medium text-slate-700 pb-2">Password</p>
                                <input value={password} onChange={handleChange} id="password" name="password" type="password" className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow" placeholder="Enter your password" />
                            </label>
                            <div className="flex flex-row justify-between">
                                <div>
                                    <label htmlFor="remember" className="remember">
                                        <input type="checkbox" id="remember" className="w-4 h-4 border-slate-200 focus:bg-indigo-600" />
                                        Remember me
                                    </label>
                                </div>
                                <div>
                                    <Link href="/forgot" className="font-medium text-indigo-600">Forgot Password?</Link>
                                </div>
                            </div>
                            <button className="w-full py-3 font-medium text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg border-indigo-500 hover:shadow inline-flex space-x-2 items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                                </svg>
                                <span>Login</span>
                            </button>
                            <p className="text-center">Not registered yet? <Link href="/signup" className="text-indigo-600 font-medium inline-flex space-x-1 items-center"><span>Register now </span><span><svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg></span></Link></p>
                        </div>
                    </form>
                </div>

            </body>
        )
    }
export default Login