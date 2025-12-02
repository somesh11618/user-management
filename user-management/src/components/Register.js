// src/components/RegistrationForm.js
import React, { useState } from 'react';

const RegistrationForm = ({ handleRegister, setCurrentView }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        // Basic validation
        if (!name || !email || !password) {
            setError('Please fill in all fields.');
            return;
        }

        // Attempt registration (Simulated)
        const result = handleRegister(name, email, password);

        if (result.success) {
            setSuccess('Registration successful! You can now log in.');
            setName('');
            setEmail('');
            setPassword('');
        } else {
            setError(result.message); // e.g., 'Email already exists'
        }
    };

    return (
        <div className="auth-container">
            <h2 className="text-center mb-4">Register</h2>
            <form onSubmit={handleSubmit}>
                {error && <div className="alert alert-danger">{error}</div>}
                {success && <div className="alert alert-success">{success}</div>}

                <div className="mb-3">
                    <label htmlFor="regName" className="form-label">Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="regName"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="regEmail" className="form-label">Email address</label>
                    <input
                        type="email"
                        className="form-control"
                        id="regEmail"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="regPassword" className="form-label">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        id="regPassword"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                <button type="submit" className="btn btn-success w-100 mb-3">
                    Register
                </button>

                <p className="text-center">
                    Already have an account?{' '}
                    <button type="button" className="btn btn-link p-0 align-baseline" onClick={() => setCurrentView('login')}>
                        Log In
                    </button>
                </p>
            </form>
        </div>
    );
};

export default RegistrationForm;