'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Cookies from 'js-cookie';
import { useAuth } from '@/contexts/AuthContext';
import { authApi } from '@/lib/api';
import { Mail, Lock, Eye, EyeOff, Zap, CheckCircle, Users, BarChart3, User } from 'lucide-react';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      console.log('Attempting login with:', { username, password });
      const response = await authApi.login({ username, password });
      console.log('Login response:', response);
      // Store user data directly since backend doesn't return JWT token
      if (response.user) {
        login(response.user);
        router.push('/dashboard');
      } else {
        setError('Login failed - no user data received');
      }
    } catch (err: any) {
      setError(err.response?.data?.error || err.response?.data?.message || 'Invalid username or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
        <div className="flex flex-col lg:flex-row min-h-[600px]">
          {/* Left Panel */}
          <div className="lg:w-3/5 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full -translate-x-48 -translate-y-48"></div>
              <div className="absolute bottom-0 right-0 w-80 h-80 bg-white rounded-full translate-x-40 translate-y-40"></div>
            </div>
            
            <div className="relative z-10 p-8 lg:p-16 h-full flex flex-col justify-center">
              {/* Logo */}
              <div className="flex items-center mb-12">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mr-4 border border-white/30">
                  <Zap className="w-7 h-7 text-white" />
                </div>
                <h1 className="text-3xl font-bold text-white tracking-tight">TicketFlow</h1>
              </div>
              
              {/* Main Heading */}
              <div className="mb-8">
                <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
                  Welcome back to
                  <span className="block text-blue-200">your workspace</span>
                </h2>
                
                <p className="text-blue-100 text-xl leading-relaxed max-w-md">
                  Streamline your support workflow with our modern ticketing system. 
                  Track, manage, and resolve issues efficiently.
                </p>
              </div>
              
              {/* Features */}
              <div className="space-y-6">
                <div className="flex items-center group">
                  <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mr-4 group-hover:bg-white/30 transition-all duration-300">
                    <CheckCircle className="w-5 h-5 text-blue-200" />
                  </div>
                  <span className="text-blue-100 text-lg font-medium">Real-time ticket tracking</span>
                </div>
                <div className="flex items-center group">
                  <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mr-4 group-hover:bg-white/30 transition-all duration-300">
                    <Users className="w-5 h-5 text-blue-200" />
                  </div>
                  <span className="text-blue-100 text-lg font-medium">Team collaboration tools</span>
                </div>
                <div className="flex items-center group">
                  <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mr-4 group-hover:bg-white/30 transition-all duration-300">
                    <BarChart3 className="w-5 h-5 text-blue-200" />
                  </div>
                  <span className="text-blue-100 text-lg font-medium">Advanced analytics</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Panel - Form */}
          <div className="lg:w-2/5 p-8 lg:p-16 flex items-center">
            <div className="w-full max-w-sm mx-auto">
              {/* Form Header */}
              <div className="text-center mb-10">
                <h3 className="text-3xl font-bold text-gray-900 mb-3">Sign in</h3>
                <p className="text-gray-600 text-lg">Enter your credentials to access your dashboard</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Error Message */}
                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-2xl p-4 animate-shake">
                    <p className="text-red-700 text-sm font-medium">{error}</p>
                  </div>
                )}
                
                {/* Username Field */}
                <div className="space-y-2">
                  <label htmlFor="username" className="block text-sm font-semibold text-gray-800">
                    Username
                  </label>
                  <div className="relative group">
                    <User className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-blue-600 transition-colors" />
                    <input
                      id="username"
                      type="text"
                      required
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 text-gray-900 placeholder-gray-500"
                      placeholder="Enter your username"
                    />
                  </div>
                </div>
                
                {/* Password Field */}
                <div className="space-y-2">
                  <label htmlFor="password" className="block text-sm font-semibold text-gray-800">
                    Password
                  </label>
                  <div className="relative group">
                    <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-blue-600 transition-colors" />
                    <input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-12 pr-14 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 text-gray-900 placeholder-gray-500"
                      placeholder="Enter your password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors p-1"
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 px-6 rounded-2xl font-semibold text-lg hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl"
                >
                  {loading ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-6 w-6 border-2 border-white border-t-transparent mr-3"></div>
                      Signing in...
                    </div>
                  ) : (
                    'Sign in'
                  )}
                </button>
              </form>

              {/* Sign Up Link */}
              <div className="mt-8 text-center">
                <p className="text-gray-600">
                  Don't have an account?{' '}
                  <Link 
                    href="/auth/register" 
                    className="font-semibold text-blue-600 hover:text-blue-700 transition-colors hover:underline"
                  >
                    Sign up here
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}