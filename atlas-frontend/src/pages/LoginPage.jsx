import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export function LoginPage() {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const user = await login(email, password);
            if (user) {
                // User role is now normalized to Title Case by AuthContext (e.g., 'Super Admin')
                const role = user.role;

                const dashboardMap = {
                    'Super Admin': '/admin/dashboard',
                    'Admin': '/admin/dashboard',
                    'Seller': '/seller/dashboard',
                    'Call Center Agent': '/call-center/dashboard',
                    'Call Center Manager': '/manager/dashboard',
                    'Stock Keeper': '/stock/dashboard',
                    'Packaging Agent': '/packaging/dashboard',
                    'Delivery Agent': '/delivery/dashboard'
                };

                const targetPath = dashboardMap[role];

                if (targetPath) {
                    navigate(targetPath);
                } else {
                    console.warn(`No dashboard found for role: ${role}`);
                    navigate('/admin/dashboard'); // Safe fallback
                }
            }
        } catch (err) {
            setError(err.message || 'Invalid email or password');
        }
    };

    return (
        <div className="min-h-screen flex bg-gray-50 font-sans">
            {/* Left Section with Image */}
            <div className="hidden lg:flex lg:w-1/2 items-center justify-center p-12 relative overflow-hidden bg-white">
                <div className="max-w-md text-center z-10 relative">
                    <img
                        src="https://i.ibb.co/YT4Ny4L1/10.png"
                        alt="Atlas Service"
                        className="h-32 w-auto mx-auto mb-8 drop-shadow-xl hover:scale-105 transition-transform duration-300"
                    />
                    <h2 className="text-3xl font-bold text-slate-900 mb-6 tracking-tight">Atlas Fulfillment</h2>
                    <h1 className="text-5xl font-extrabold text-slate-900 mb-6 leading-tight tracking-tight">
                        YOUR TRUSTED <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-yellow-600">PARTNER</span><br />
                        FROM SOURCING TO<br />
                        SEAMLESS DELIVERY
                    </h1>
                </div>

                {/* Background Pattern */}
                <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-40"></div>
                <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-yellow-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
                <div className="absolute -top-24 -right-24 w-64 h-64 bg-indigo-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
            </div>

            {/* Right Section with Form */}
            <div className="flex-1 flex items-center justify-center p-4 sm:p-8 bg-white lg:bg-transparent">
                <div className="max-w-md w-full space-y-8 bg-white/80 lg:bg-transparent lg:p-0 p-8 rounded-2xl shadow-xl lg:shadow-none backdrop-blur-sm">
                    {/* Mobile Header */}
                    <div className="lg:hidden text-center mb-8">
                        <img src="https://i.ibb.co/YT4Ny4L1/10.png" alt="Atlas Service" className="h-20 w-auto mx-auto mb-4" />
                        <h2 className="text-xl font-bold text-gray-900 mb-2">Atlas Fulfillment</h2>
                    </div>

                    <div>
                        <h2 className="text-center text-3xl font-extrabold text-gray-900 tracking-tight">
                            Sign in to your account
                        </h2>
                        <p className="mt-2 text-center text-sm text-gray-600">
                            Welcome back! Please enter your credentials
                        </p>
                        {error && (
                            <div className="mt-4 p-3 rounded-lg bg-red-50 border border-red-200 text-red-600 text-sm text-center">
                                {error}
                            </div>
                        )}
                    </div>

                    <form className="mt-8 space-y-6" onSubmit={handleSubmit} autoComplete="off">
                        {/* Hidden dummy inputs to absorb browser autofill */}
                        <input type="text" style={{ display: 'none' }} aria-hidden="true" />
                        <input type="password" style={{ display: 'none' }} aria-hidden="true" />
                        <div className="space-y-6">
                            <div className="relative group">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="peer w-full px-0 py-3 text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-yellow-500 placeholder-transparent text-sm transition-colors"
                                    placeholder="Email address"
                                    autoComplete="off"
                                />
                                <label
                                    htmlFor="email"
                                    className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-yellow-600 peer-focus:text-sm font-medium"
                                >
                                    Email address
                                </label>
                            </div>

                            <div className="relative group">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="peer w-full px-0 py-3 text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-yellow-500 placeholder-transparent text-sm transition-colors"
                                    placeholder="Password"
                                    autoComplete="new-password"
                                />
                                <label
                                    htmlFor="password"
                                    className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-yellow-600 peer-focus:text-sm font-medium"
                                >
                                    Password
                                </label>
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input
                                    id="remember_me"
                                    name="remember_me"
                                    type="checkbox"
                                    className="h-4 w-4 text-yellow-600 focus:ring-yellow-500 border-gray-300 rounded cursor-pointer"
                                />
                                <label htmlFor="remember_me" className="ml-2 block text-sm text-gray-700 cursor-pointer select-none">
                                    Remember me
                                </label>
                            </div>

                            <div className="text-sm">
                                <a href="#" className="font-medium text-yellow-700 hover:text-yellow-600 transition-colors">
                                    Forgot your password?
                                </a>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-3.5 px-4 border border-transparent text-sm font-bold rounded-xl text-white bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 transition-all duration-200 transform hover:scale-[1.02] shadow-lg shadow-yellow-500/30"
                        >
                            <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                                <svg className="h-5 w-5 text-yellow-200 group-hover:text-yellow-100 transition-colors" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                                </svg>
                            </span>
                            Sign in
                        </button>
                    </form>

                    {/* Demo Credentials Section */}
                    <div className="mt-8 rounded-xl bg-blue-50/50 border border-blue-100 p-5 backdrop-blur-sm">
                        <div className="flex items-start">
                            <div className="flex-shrink-0">
                                <svg className="h-5 w-5 text-blue-500 mt-0.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <div className="ml-3 flex-1">
                                <h3 className="text-sm font-bold text-blue-900">
                                    Demo Login Credentials
                                </h3>
                                <div className="mt-3 text-xs text-blue-700 space-y-2">
                                    <p className="font-semibold mb-2">Try the platform with these accounts:</p>
                                    <div className="grid grid-cols-1 gap-2">
                                        {[
                                            { role: 'Super Admin', creds: 'superadmin@atlas.com / 123456' },
                                            { role: 'Admin', creds: 'admin@atlas.com / 123456' },
                                            { role: 'Seller', creds: 'seller@atlas.com / 123456' },
                                            { role: 'Call Center', creds: 'agent@atlas.com / 123456' },
                                            { role: 'Manager', creds: 'manager@atlas.com / 123456' },
                                            { role: 'Stock Keeper', creds: 'stock@atlas.com / 123456' },
                                            { role: 'Packaging Agent', creds: 'packaging@atlas.com / 123456' },
                                            { role: 'Delivery', creds: 'delivery@atlas.com / 123456' },
                                        ].map((item, idx) => (
                                            <div
                                                key={idx}
                                                onClick={() => {
                                                    const [e, p] = item.creds.split(' / ');
                                                    setEmail(e);
                                                    setPassword(p);
                                                }}
                                                className="flex justify-between items-center bg-white/60 rounded-lg px-3 py-2 border border-blue-100/50 hover:bg-blue-100/50 hover:border-blue-200 cursor-pointer transition-all active:scale-[0.98] group/item"
                                            >
                                                <span className="font-medium group-hover/item:text-blue-900">{item.role}:</span>
                                                <span className="font-mono text-blue-600 bg-blue-50 px-2 py-0.5 rounded group-hover/item:bg-white group-hover/item:shadow-sm">{item.creds}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="text-center mt-6">
                        <p className="text-sm text-gray-600">
                            Don't have an account?
                            <a href="#" className="font-semibold text-yellow-700 hover:text-yellow-600 transition-colors ml-1 hover:underline">
                                Register here
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
