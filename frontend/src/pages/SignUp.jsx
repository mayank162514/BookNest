import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { useAuthStore } from '../store/authStore.js'
import toast from 'react-hot-toast'

const SignUp = () => {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmpassword, setConfirmPassword] = useState('')

    const { signup, isLoading, error } = useAuthStore()
    const navigate = useNavigate()

    const handleSignup = async (e) => {
        e.preventDefault()
        if (password !== confirmpassword) {
            toast.error('Passwords do not match')
            return
        }

        try {
            await signup(username, email, password)
            toast.success('Account created successfully!')
            navigate('/')
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='min-h-screen flex items-center justify-center bg-gradient-to-r from-[#f5f5f5] to-[#eaeaea] px-4'>
            <div className='w-full max-w-md bg-white shadow-lg rounded-lg p-8 border border-gray-200'>
                <h2 className='text-center font-bold text-3xl text-[#403D39]'>Create an Account</h2>
                <p className='text-center text-gray-600 mt-1'>Sign up to get started</p>

                <form onSubmit={handleSignup} className='flex flex-col space-y-5 mt-6'>
                    <div className='flex flex-col'>
                        <label className='text-lg font-medium text-gray-700'>Username</label>
                        <input 
                            value={username} 
                            onChange={(e) => setUsername(e.target.value)} 
                            className='w-full px-4 py-2 text-gray-900 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#403D39]' 
                            type="text" 
                            placeholder="Enter your username"
                        />
                    </div>

                    <div className='flex flex-col'>
                        <label className='text-lg font-medium text-gray-700'>Email</label>
                        <input 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            className='w-full px-4 py-2 text-gray-900 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#403D39]' 
                            type="email" 
                            placeholder="Enter your email"
                        />
                    </div>

                    <div className='flex flex-col'>
                        <label className='text-lg font-medium text-gray-700'>Password</label>
                        <input 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            className='w-full px-4 py-2 text-gray-900 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#403D39]' 
                            type="password" 
                            placeholder="Enter your password"
                        />
                    </div>

                    <div className='flex flex-col'>
                        <label className='text-lg font-medium text-gray-700'>Confirm Password</label>
                        <input 
                            value={confirmpassword} 
                            onChange={(e) => setConfirmPassword(e.target.value)} 
                            className='w-full px-4 py-2 text-gray-900 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#403D39]' 
                            type="password" 
                            placeholder="Confirm your password"
                        />
                    </div>

                    {error && <p className='text-red-500 text-sm text-center'>{error}</p>}

                    <button 
                        type='submit' 
                        disabled={isLoading} 
                        className='w-full bg-[#403D39] text-white py-2 font-semibold rounded-lg hover:bg-[#322F2C] transition duration-300'>
                        {isLoading ? 'Signing up...' : 'Sign Up'}
                    </button>

                    <p className='text-center text-gray-600'>Already have an account? <Link to={'/login'} className='text-[#944424] font-medium hover:underline'>Login</Link></p>
                </form>
            </div>
        </div>
    )
}

export default SignUp
