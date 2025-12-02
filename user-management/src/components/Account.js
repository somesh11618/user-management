// src/components/AccountManager.js
import React, { useState } from 'react';

const AccountManager = ({ currentUser, handleAccountUpdate }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [name, setName] = useState(currentUser.name);
    const [email, setEmail] = useState(currentUser.email);
    const [updateMessage, setUpdateMessage] = useState('');

    const handleSave = (e) => {
        e.preventDefault();
        setUpdateMessage('');

        // Basic validation
        if (!name || !email) {
            setUpdateMessage({ type: 'danger', text: 'Name and email cannot be empty.' });
            return;
        }

        // Simulate update
        handleAccountUpdate(currentUser.id, name, email);

        setUpdateMessage({ type: 'success', text: 'Account updated successfully!' });
        setIsEditing(false);
    };

    return (
        <div className="container account-card">
            <div className="card shadow">
                <div className="card-header bg-primary text-white">
                    <h3 className="mb-0">My Account Information</h3>
                </div>
                <div className="card-body">
                    {updateMessage && (
                        <div className={`alert alert-${updateMessage.type}`}>{updateMessage.text}</div>
                    )}

                    {!isEditing ? (
                        // View Mode
                        <>
                            <p><strong>Name:</strong> {currentUser.name}</p>
                            <p><strong>Email:</strong> {currentUser.email}</p>
                            <button
                                className="btn btn-warning"
                                onClick={() => setIsEditing(true)}
                            >
                                Edit Profile
                            </button>
                        </>
                    ) : (
                        // Edit Mode
                        <form onSubmit={handleSave}>
                            <div className="mb-3">
                                <label htmlFor="editName" className="form-label">Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="editName"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="editEmail" className="form-label">Email</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    id="editEmail"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <button type="submit" className="btn btn-success me-2">
                                Save Changes
                            </button>
                            <button
                                type="button"
                                className="btn btn-secondary"
                                onClick={() => setIsEditing(false)}
                            >
                                Cancel
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AccountManager;