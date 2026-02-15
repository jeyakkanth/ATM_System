import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Wallet, ArrowDownCircle, ArrowUpCircle, History, LogOut, User as UserIcon } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { transactionService } from '../api/api';

const Home = () => {
    const { user, account, logout, updateAccount } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate('/login');
        } else {
            refreshBalance();
        }
    }, [user]);

    const refreshBalance = async () => {
        try {
            const accountDto = await transactionService.getBalance(user.id);
            updateAccount(accountDto);
        } catch (err) {
            console.error('Failed to refresh balance', err);
        }
    };

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    if (!user || !account) return null;

    return (
        <div className="container animate-fade-in">
            <header className="flex justify-between items-center mb-10">
                <div className="flex items-center gap-4">
                    <div className="w-14 h-14 glass flex items-center justify-center text-primary rounded-2xl">
                        <UserIcon size={28} />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold">Welcome Back 👋</h2>
                        <p className="text-text-secondary text-sm">Access your account balance and perform quick ATM operations.</p>
                    </div>
                </div>
                <button onClick={handleLogout} className="btn btn-secondary text-error hover:bg-error/10 border-error/20">
                    <LogOut size={20} />
                    <span>Logout</span>
                </button>
            </header>

            <div className="max-w-4xl mx-auto">
                <div className="glass p-12 flex flex-col items-center justify-center relative overflow-hidden mb-12 text-center">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/10 rounded-full -ml-32 -mb-32 blur-3xl"></div>

                    <Wallet className="text-primary mb-6" size={56} />
                    <h3 className="text-text-secondary font-medium text-lg mb-2">Total Balance</h3>
                    <div className="text-6xl font-bold text-white mb-6 tracking-tight">
                        ${account.balance.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </div>

                    <div className="flex flex-col items-center gap-4">
                        <button onClick={refreshBalance} className="btn btn-secondary text-sm py-2 px-4">
                            Refresh Balance
                        </button>
                        <p className="text-success text-sm font-medium bg-success/10 px-4 py-2 rounded-full">
                            "Your account is safe and ready for transactions."
                        </p>
                    </div>
                </div>

                <div className="mb-8">
                    <h3 className="text-xl font-bold mb-2">Choose an action below:</h3>
                    <p className="text-text-secondary">Manage your account securely and perform transactions easily.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <button
                        onClick={() => navigate('/deposit')}
                        className="glass p-8 flex flex-col items-center gap-4 hover:bg-white/5 transition-all group border-success/10"
                    >
                        <div className="w-16 h-16 bg-success/20 rounded-2xl flex items-center justify-center text-success group-hover:scale-110 transition-transform">
                            <ArrowDownCircle size={36} />
                        </div>
                        <div className="text-center">
                            <h4 className="text-lg font-bold">Deposit Money</h4>
                            <p className="text-text-secondary text-xs mt-1">Add funds to your account</p>
                        </div>
                    </button>

                    <button
                        onClick={() => navigate('/withdraw')}
                        className="glass p-8 flex flex-col items-center gap-4 hover:bg-white/5 transition-all group border-primary/10"
                    >
                        <div className="w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                            <ArrowUpCircle size={36} />
                        </div>
                        <div className="text-center">
                            <h4 className="text-lg font-bold">Withdraw Cash</h4>
                            <p className="text-text-secondary text-xs mt-1">Take cash out safely</p>
                        </div>
                    </button>

                    <button
                        onClick={() => navigate('/history')}
                        className="glass p-8 flex flex-col items-center gap-4 hover:bg-white/5 transition-all group border-secondary/10"
                    >
                        <div className="w-16 h-16 bg-secondary/20 rounded-2xl flex items-center justify-center text-secondary group-hover:scale-110 transition-transform">
                            <History size={36} />
                        </div>
                        <div className="text-center">
                            <h4 className="text-lg font-bold">Transaction History</h4>
                            <p className="text-text-secondary text-xs mt-1">View your recent activity</p>
                        </div>
                    </button>
                </div>

                <div className="mt-16 text-center">
                    <p className="text-text-secondary text-sm flex items-center justify-center gap-2">
                        <span className="w-2 h-2 bg-success rounded-full animate-pulse"></span>
                        All transactions are securely handled via Spring Boot REST APIs.
                    </p>
                </div>
            </div>

            <style>{`
                .grid { display: grid; }
                .grid-cols-1 { grid-template-columns: repeat(1, minmax(0, 1fr)); }
                .gap-4 { gap: 1rem; }
                .gap-6 { gap: 1.5rem; }
                .mb-10 { margin-bottom: 2.5rem; }
                .mb-12 { margin-bottom: 3rem; }
                .mt-16 { margin-top: 4rem; }
                .text-center { text-align: center; }
                .text-2xl { font-size: 1.5rem; line-height: 2rem; }
                .text-6xl { font-size: 3.75rem; line-height: 1; }
                .tracking-tight { letter-spacing: -0.025em; }
                .max-w-4xl { max-width: 56rem; }
                .mx-auto { margin-left: auto; margin-right: auto; }
                @media (min-width: 768px) {
                    .md\\:grid-cols-3 { grid-template-columns: repeat(3, minmax(0, 1fr)); }
                }
            `}</style>
        </div>
    );
};

export default Home;
