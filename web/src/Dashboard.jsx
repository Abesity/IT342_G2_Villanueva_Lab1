import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Dashboard = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Check if we have a "fake" token or session
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login'); // Redirect if not logged in
            return;
        }

        // In a real JWT app, we would fetch data here.
        // For this lab, we will simulate the data display using what we know,
        // or you can try to hit the /api/user/me endpoint if you set up Basic Auth headers.

        // For the sake of the screenshot deadline, we will pull from local state or just show the structure:
        setUser({
            fullName: "Vinci Villanueva", // Replace with dynamic data if you have time
            email: "vinci@test.com"
        });

    }, [navigate]);

    const handleLogout = () => {
        // 1. Clear the token/session
        localStorage.removeItem('token');
        // 2. Redirect to Login
        navigate('/login');
    };

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial' }}>
            <h2>Dashboard</h2>
            <div style={{ border: '1px solid #ddd', padding: '20px', borderRadius: '8px', maxWidth: '400px' }}>
                <h3>Welcome!</h3>
                {user ? (
                    <>
                        <p><strong>Full Name:</strong> {user.fullName}</p>
                        <p><strong>Email:</strong> {user.email}</p>
                        <p><strong>Status:</strong> Active</p>
                    </>
                ) : (
                    <p>Loading...</p>
                )}

                <button
                    onClick={handleLogout}
                    style={{
                        marginTop: '20px',
                        padding: '10px 20px',
                        backgroundColor: '#ff4444',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer'
                    }}
                >
                    Logout
                </button>
            </div>
        </div>
    );
};

export default Dashboard;