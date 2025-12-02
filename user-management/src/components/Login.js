// src/components/LoginForm.js
import React, { useState } from 'react';

const LoginForm = ({ handleLogin, setCurrentView }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        setError(''); // Clear previous errors

        // Basic validation (replace with actual authentication logic)
        if (!email || !password) {
            setError('Please fill in all fields.');
            return;
        }

        // Attempt login (Simulated)
        const success = handleLogin(email, password);

        if (!success) {
            setError('Invalid email or password.');
        } else {
            setEmail('');
            setPassword('');
            // Login successful, App.js handles view change
        }
    };

    return (
        <div className="auth-container">
            <h2 className="text-center mb-4">Login</h2>
            <form onSubmit={handleSubmit}>
                {error && <div className="alert alert-danger">{error}</div>}

                <div className="mb-3">
                    <label htmlFor="loginEmail" className="form-label">Email address</label>
                    <input
                        type="email"
                        className="form-control"
                        id="loginEmail"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="loginPassword" className="form-label">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        id="loginPassword"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                <button type="submit" className="btn btn-dark w-100 mb-3">
                    Log In
                </button>

                <p className="text-center">
                    Don't have an account?{' '}
                    <button type="button" className="btn btn-link p-0 align-baseline" onClick={() => setCurrentView('register')}>
                        Register here
                    </button>
                </p>
            </form>
        </div>
    );
};

export default LoginForm;