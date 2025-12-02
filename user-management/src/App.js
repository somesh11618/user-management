import React, { useState, useEffect } from 'react';
import Navbar from './components/navbar';
import LoginForm from './components/Login';
import RegistrationForm from './components/Register';
import AccountManager from './components/Account';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
const getInitialUsers = () => {
  const savedUsers = localStorage.getItem('appUsers');
  return savedUsers ? JSON.parse(savedUsers) : [];
};

const saveUsers = (users) => {
  localStorage.setItem('appUsers', JSON.stringify(users));
};


function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [users, setUsers] = useState(getInitialUsers);
  const [currentView, setCurrentView] = useState('home'); // 'home', 'login', 'register', 'account'

  // Update localStorage whenever 'users' changes
  useEffect(() => {
    saveUsers(users);
  }, [users]);

  // Try to load user from session/storage on initial load
  useEffect(() => {
    const savedUser = localStorage.getItem('loggedInUser');
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
      setCurrentView('account'); // Redirect to account if already logged in
    } else {
      setCurrentView('login');
    }
  }, []);

  const handleLogin = (email, password) => {
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
      setCurrentUser(user);
      localStorage.setItem('loggedInUser', JSON.stringify(user));
      setCurrentView('account');
      return true;
    }
    return false;
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('loggedInUser');
    setCurrentView('login');
  };

  const handleRegister = (name, email, password) => {
    if (users.some(u => u.email === email)) {
      return { success: false, message: 'Email already exists.' };
    }

    const newUser = {
      id: Date.now(), // Unique ID
      name,
      email,
      password,
    };

    setUsers([...users, newUser]);
    return { success: true };
  };

  const handleAccountUpdate = (userId, newName, newEmail) => {
    const updatedUsers = users.map(user =>
      user.id === userId ? { ...user, name: newName, email: newEmail } : user
    );
    setUsers(updatedUsers);

    // Update the currently logged-in user state and localStorage
    const updatedCurrentUser = updatedUsers.find(u => u.id === userId);
    setCurrentUser(updatedCurrentUser);
    localStorage.setItem('loggedInUser', JSON.stringify(updatedCurrentUser));
  };

  const renderContent = () => {
    if (currentUser) {
      // Logged In Views
      if (currentView === 'account') {
        return <AccountManager currentUser={currentUser} handleAccountUpdate={handleAccountUpdate} />;
      }
      // Fallback for logged-in users
      return <div className="container mt-5 text-center"><h2>Welcome back, {currentUser.name}!</h2><p>Use the **My Account** link to manage your profile.</p></div>;

    } else {
      // Public Views
      if (currentView === 'register') {
        return <RegistrationForm handleRegister={handleRegister} setCurrentView={setCurrentView} />;
      }
      // Default/Login view
      return <LoginForm handleLogin={handleLogin} setCurrentView={setCurrentView} />;
    }
  };

  return (
    <>
      <Navbar
        currentUser={currentUser}
        handleLogout={handleLogout}
        setCurrentView={setCurrentView}
      />
      <main className="container-fluid">
        {renderContent()}
      </main>
    </>
  );
}

export default App;