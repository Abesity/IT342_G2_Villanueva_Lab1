import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    // FRS Requirement: Form now captures fullName and email
    const [formData, setFormData] = useState({
        fullName: '',
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
            const response = await axios.post('http://localhost:8080/api/auth/register', formData);
            setMessage('Registration successful! Redirecting...');
            setTimeout(() => navigate('/login'), 2000);
        } catch (error) {
            setMessage('Error: ' + (error.response?.data || "Registration failed"));
        }
    };

    return (
        <div style={{ padding: '20px', maxWidth: '400px', margin: 'auto' }}>
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '10px' }}>
                    <label>Full Name:</label>
                    <input type="text" name="fullName" onChange={handleChange} required style={{ width: '100%', padding: '8px' }} />
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <label>Email:</label>
                    <input type="email" name="email" onChange={handleChange} required style={{ width: '100%', padding: '8px' }} />
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <label>Password:</label>
                    <input type="password" name="password" onChange={handleChange} required style={{ width: '100%', padding: '8px' }} />
                </div>
                <button type="submit" style={{ padding: '10px 20px' }}>Register</button>
            </form>
            {message && <p style={{ color: message.includes('Error') ? 'red' : 'green' }}>{message}</p>}
        </div>
    );
};

export default Register;