import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {api} from '../services/api'; 
const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (formData.password !== formData.confirmPassword) {
            return setError("Passwords do not match");
        }

        setLoading(true);
        try {
         
            const response = await api.register( {
                username: formData.username,
                email: formData.email,
                password: formData.password
            });

            if (response.status === 201 || response.status === 200) {
                alert("Registration successful! Please login.");
                navigate('/login');
            }
        } catch (err) {
            setError(err.response?.data?.error || 'Registration failed. Try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Create Account</h2>
                
                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4 text-sm">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Username</label>
                        <input
                            name="username"
                            type="text"
                            className="mt-1 w-full border border-gray-300 p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none"
                            placeholder="johndoe"
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email Address</label>
                        <input
                            name="email"
                            type="email"
                            className="mt-1 w-full border border-gray-300 p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none"
                            placeholder="name@company.com"
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            name="password"
                            type="password"
                            className="mt-1 w-full border border-gray-300 p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none"
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
                        <input
                            name="confirmPassword"
                            type="password"
                            className="mt-1 w-full border border-gray-300 p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none"
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full text-white p-2 rounded font-semibold transition ${
                            loading ? 'bg-blue-300 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
                        }`}
                    >
                        {loading ? 'Creating Account...' : 'Register'}
                    </button>
                </form>

                <p className="mt-4 text-center text-sm text-gray-600">
                    Already have an account?
                    <Link to="/login" className="text-blue-600 hover:underline">
                        Login here
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Register;