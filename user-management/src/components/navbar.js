// src/components/Navbar.js
import React from 'react';

const Navbar = ({ currentUser, handleLogout, setCurrentView }) => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <a className="navbar-brand" href="#home" onClick={() => setCurrentView('home')}>
                    Account Manager
                </a>
                <div className="collapse navbar-collapse justify-content-end">
                    <ul className="navbar-nav">
                        {currentUser ? (
                            <>
                                <li className="nav-item">
                                    <a className="nav-link" href="#account" onClick={() => setCurrentView('account')}>
                                        My Account
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <button className="btn btn-outline-light ms-2" onClick={handleLogout}>
                                        Logout
                                    </button>
                                </li>
                            </>
                        ) : (
                            <>
                                <li className="nav-item">
                                    <a className="nav-link" href="#login" onClick={() => setCurrentView('login')}>
                                        Login
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#register" onClick={() => setCurrentView('register')}>
                                        Register
                                    </a>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;