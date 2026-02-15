import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem('atm_user');
        return savedUser ? JSON.parse(savedUser) : null;
    });

    const [account, setAccount] = useState(() => {
        const savedAccount = localStorage.getItem('atm_account');
        return savedAccount ? JSON.parse(savedAccount) : null;
    });

    const login = (userData, accountData) => {
        setUser(userData);
        setAccount(accountData);
        localStorage.setItem('atm_user', JSON.stringify(userData));
        localStorage.setItem('atm_account', JSON.stringify(accountData));
    };

    const logout = () => {
        setUser(null);
        setAccount(null);
        localStorage.removeItem('atm_user');
        localStorage.removeItem('atm_account');
    };

    const updateAccount = (accountData) => {
        setAccount(accountData);
        localStorage.setItem('atm_account', JSON.stringify(accountData));
    };

    return (
        <AuthContext.Provider value={{ user, account, login, logout, updateAccount }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
