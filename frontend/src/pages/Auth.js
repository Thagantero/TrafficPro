import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/Card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/Tabs';
import { Mail, Lock, User, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Auth = () => {
  const { login, register, currentUser, loading } = useAuth();
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [registerForm, setRegisterForm] = useState({ 
    name: '', 
    email: '', 
    password: '', 
    confirmPassword: '' 
  });
  const [loginError, setLoginError] = useState(null);
  const [registerError, setRegisterError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [activeTab, setActiveTab] = useState('login');
  const navigate = useNavigate();

  // Redirect if already logged in
  useEffect(() => {
    if (currentUser) {
      navigate('/dashboard');
    }
  }, [currentUser, navigate]);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoginError(null);
    
    if (!loginForm.email || !loginForm.password) {
      setLoginError('Please fill in all fields');
      return;
    }
    
    try {
      await login(loginForm.email, loginForm.password);
      setSuccessMessage('Login successful! Redirecting...');
    } catch (err) {
      setLoginError(err.message || 'Failed to log in. Please try again.');
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setRegisterError(null);
    
    if (!registerForm.name || !registerForm.email || !registerForm.password || !registerForm.confirmPassword) {
      setRegisterError('Please fill in all fields');
      return;
    }
    
    if (registerForm.password.length < 6) {
      setRegisterError('Password must be at least 6 characters');
      return;
    }
    
    if (registerForm.password !== registerForm.confirmPassword) {
      setRegisterError('Passwords do not match');
      return;
    }
    
    try {
      await register(registerForm.name, registerForm.email, registerForm.password);
      setSuccessMessage('Registration successful! Please log in.');
      setActiveTab('login');
      setRegisterForm({ name: '', email: '', password: '', confirmPassword: '' });
    } catch (err) {
      setRegisterError(err.message || 'Registration failed. Please try again.');
    }
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setLoginError(null);
    setRegisterError(null);
    setSuccessMessage(null);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow flex items-center justify-center bg-gray-100 p-4">
        <Card className="w-full max-w-md p-6">
          <CardHeader>
            <CardTitle>Authentication</CardTitle>
            <CardDescription>
              {activeTab === 'login' 
                ? 'Log in to access your account' 
                : 'Create a new account to get started'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {successMessage && (
              <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-md flex items-center">
                <CheckCircle className="h-5 w-5 mr-2" />
                <span>{successMessage}</span>
              </div>
            )}
            
            <Tabs value={activeTab} onValueChange={handleTabChange}>
              <TabsList className="grid grid-cols-2">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="register">Register</TabsTrigger>
              </TabsList>

              <TabsContent value="login">
                <form onSubmit={handleLoginSubmit} className="space-y-4">
                  {loginError && (
                    <div className="p-3 bg-red-100 text-red-700 rounded-md flex items-center">
                      <AlertCircle className="h-5 w-5 mr-2" />
                      <span>{loginError}</span>
                    </div>
                  )}
                  
                  <div className="space-y-2">
                    <label htmlFor="login-email" className="text-sm font-medium">Email</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <Input
                        id="login-email"
                        type="email"
                        placeholder="you@example.com"
                        className="pl-10"
                        value={loginForm.email}
                        onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                        disabled={loading}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="login-password" className="text-sm font-medium">Password</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <Input
                        id="login-password"
                        type="password"
                        placeholder="••••••••"
                        className="pl-10"
                        value={loginForm.password}
                        onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                        disabled={loading}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <Link to="/forgot-password" className="text-sm text-blue-600 hover:underline">
                      Forgot password?
                    </Link>
                  </div>
                  
                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : 'Login'}
                  </Button>
                  
                  <p className="text-center text-sm text-gray-600">
                    Don't have an account?{' '}
                    <button 
                      type="button" 
                      className="text-blue-600 hover:underline"
                      onClick={() => handleTabChange('register')}
                    >
                      Register
                    </button>
                  </p>
                </form>
              </TabsContent>

              <TabsContent value="register">
                <form onSubmit={handleRegisterSubmit} className="space-y-4">
                  {registerError && (
                    <div className="p-3 bg-red-100 text-red-700 rounded-md flex items-center">
                      <AlertCircle className="h-5 w-5 mr-2" />
                      <span>{registerError}</span>
                    </div>
                  )}
                  
                  <div className="space-y-2">
                    <label htmlFor="register-name" className="text-sm font-medium">Full Name</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <Input
                        id="register-name"
                        type="text"
                        placeholder="John Doe"
                        className="pl-10"
                        value={registerForm.name}
                        onChange={(e) => setRegisterForm({ ...registerForm, name: e.target.value })}
                        disabled={loading}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="register-email" className="text-sm font-medium">Email</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <Input
                        id="register-email"
                        type="email"
                        placeholder="you@example.com"
                        className="pl-10"
                        value={registerForm.email}
                        onChange={(e) => setRegisterForm({ ...registerForm, email: e.target.value })}
                        disabled={loading}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="register-password" className="text-sm font-medium">Password</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <Input
                        id="register-password"
                        type="password"
                        placeholder="••••••••"
                        className="pl-10"
                        value={registerForm.password}
                        onChange={(e) => setRegisterForm({ ...registerForm, password: e.target.value })}
                        disabled={loading}
                        required
                      />
                    </div>
                    <p className="text-xs text-gray-500">Minimum 6 characters</p>
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="register-confirm-password" className="text-sm font-medium">Confirm Password</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <Input
                        id="register-confirm-password"
                        type="password"
                        placeholder="••••••••"
                        className="pl-10"
                        value={registerForm.confirmPassword}
                        onChange={(e) => setRegisterForm({ ...registerForm, confirmPassword: e.target.value })}
                        disabled={loading}
                        required
                      />
                    </div>
                  </div>
                  
                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : 'Register'}
                  </Button>
                  
                  <p className="text-center text-sm text-gray-600">
                    Already have an account?{' '}
                    <button 
                      type="button" 
                      className="text-blue-600 hover:underline"
                      onClick={() => handleTabChange('login')}
                    >
                      Login
                    </button>
                  </p>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default Auth;