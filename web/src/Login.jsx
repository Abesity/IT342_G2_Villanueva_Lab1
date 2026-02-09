import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Check if we are logging in (this connects to backend)
            const response = await axios.post('http://localhost:8080/api/auth/login', formData);
            setMessage('Login successful!');

            // Save a dummy token so Dashboard lets us in
            localStorage.setItem('token', 'dummy-token');

            // Redirect to Dashboard after 1 second
            setTimeout(() => navigate('/dashboard'), 1000);
        } catch (error) {
            setMessage('Invalid email or password');
        }
    };

    return (
        <div style={{ padding: '20px', maxWidth: '400px', margin: 'auto' }}>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '10px' }}>
                    <label>Email:</label>
                    <input type="email" name="email" onChange={handleChange} required style={{ width: '100%', padding: '8px' }} />
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <label>Password:</label>
                    <input type="password" name="password" onChange={handleChange} required style={{ width: '100%', padding: '8px' }} />
                </div>
                <button type="submit" style={{ padding: '10px 20px' }}>Login</button>
            </form>
            {message && <p style={{ marginTop: '10px', color: message.includes('Invalid') ? 'red' : 'green' }}>{message}</p>}
        </div>
    );
};

export default Login;