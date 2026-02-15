import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogIn, Mail, Lock, User as UserIcon } from 'lucide-react';
import { authService, transactionService } from '../api/api';
import { useAuth } from '../context/AuthContext';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const result = await authService.login({ email, password });
            if (result === 'Login Successfully..!') {
                // Get user info
                const userDto = await authService.getUserByEmail(email);
                // Get account info
                const accountDto = await transactionService.getBalance(userDto.id);

                login({ email: userDto.email, id: userDto.id, username: userDto.username }, accountDto);
                navigate('/');
            } else {
                setError('Invalid credentials');
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="page-center">
            <div className="glass p-8 w-full max-w-md animate-fade-in">
                <div className="flex flex-col items-center mb-8">
                    <div className="w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center mb-4">
                        <LogIn className="text-primary" size={32} />
                    </div>
                    <h1 className="text-3xl font-bold">ATM System</h1>
                    <p className="text-text-secondary mt-2">Secure access to your funds</p>
                </div>

                {error && (
                    <div className="bg-error/10 border border-error/20 text-error p-3 rounded-lg mb-6 text-sm">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label>Email Address</label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-3 text-text-secondary" size={18} />
                            <input
                                type="email"
                                className="input-field pl-10"
                                placeholder="name@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div className="input-group">
                        <label>Password</label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-3 text-text-secondary" size={18} />
                            <input
                                type="password"
                                className="input-field pl-10"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="btn btn-primary w-full mt-4"
                        disabled={loading}
                    >
                        {loading ? 'Authenticating...' : 'Sign In'}
                    </button>
                </form>

                <div className="mt-8 text-center text-xs text-text-secondary">
                    <p className="mb-2">All transactions are securely handled via Spring Boot REST APIs.</p>
                    <p>© 2026 Premium ATM Services</p>
                </div>
            </div>
            <style>{`
        .relative { position: relative; }
        .absolute { position: absolute; }
        .left-3 { left: 0.75rem; }
        .top-3 { top: 0.75rem; }
        .pl-10 { padding-left: 2.5rem; }
        .text-3xl { font-size: 1.875rem; line-height: 2.25rem; }
        .mb-8 { margin-bottom: 2rem; }
        .mb-4 { margin-bottom: 1rem; }
        .mt-2 { margin-top: 0.5rem; }
        .mt-4 { margin-top: 1rem; }
        .mt-8 { margin-top: 2rem; }
        .text-center { text-align: center; }
        .text-sm { font-size: 0.875rem; }
        .font-bold { font-weight: 700; }
        .flex { display: flex; }
        .flex-col { flex-direction: column; }
        .items-center { align-items: center; }
        .justify-center { justify-content: center; }
        .p-8 { padding: 2rem; }
        .w-full { width: 100%; }
        .max-w-md { max-width: 28rem; }
        .p-3 { padding: 0.75rem; }
        .rounded-lg { border-radius: 0.5rem; }
        .mb-6 { margin-bottom: 1.5rem; }
        .rounded-2xl { border-radius: 1rem; }
        .bg-primary\\/20 { background-color: rgba(99, 102, 241, 0.2); }
        .bg-error\\/10 { background-color: rgba(239, 68, 68, 0.1); }
        .border-error\\/20 { border-color: rgba(239, 68, 68, 0.2); }
        .text-error { color: #ef4444; }
      `}</style>
        </div>
    );
};

export default Login;
