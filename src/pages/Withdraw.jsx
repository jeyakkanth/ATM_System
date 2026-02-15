import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowUpCircle, DollarSign, AlertCircle, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { transactionService } from '../api/api';

const Withdraw = () => {
    const { user, account, updateAccount } = useAuth();
    const [amount, setAmount] = useState('');
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState({ type: '', message: '' });
    const navigate = useNavigate();

    if (!user || !account) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        const val = parseFloat(amount);

        if (isNaN(val) || val <= 0) {
            setStatus({ type: 'error', message: 'Please enter a valid amount greater than 0.' });
            return;
        }

        if (val > account.balance) {
            setStatus({ type: 'error', message: "Sorry, you don't have enough balance for this withdrawal." });
            return;
        }

        setLoading(true);
        setStatus({ type: '', message: '' });

        try {
            await transactionService.withdraw(account.id, val);
            const updatedAccount = await transactionService.getBalance(user.id);
            updateAccount(updatedAccount);
            setStatus({ type: 'success', message: 'Withdrawal completed successfully. Please collect your cash.' });
            setAmount('');
            setTimeout(() => navigate('/'), 2000);
        } catch (err) {
            setStatus({ type: 'error', message: err.response?.data?.message || 'Transaction failed' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container animate-fade-in">
            <button onClick={() => navigate('/')} className="btn btn-secondary mb-8">
                <ArrowLeft size={20} />
                <span>Back to Dashboard</span>
            </button>

            <div className="max-w-xl mx-auto">
                <div className="glass p-8 relative overflow-hidden">
                    <div className="flex items-center gap-4 mb-2">
                        <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center text-primary">
                            <ArrowUpCircle size={24} />
                        </div>
                        <h2 className="text-2xl font-bold">Withdraw Funds</h2>
                    </div>
                    <p className="text-text-secondary mb-8">Enter the amount you want to withdraw from your balance.</p>

                    <div className="bg-white/5 p-6 rounded-2xl mb-8 flex flex-col items-center border border-white/5">
                        <span className="text-text-secondary text-sm mb-1">Available Balance</span>
                        <span className="text-3xl font-bold text-white">${account.balance.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                    </div>

                    {status.message && (
                        <div className={`p-4 rounded-xl mb-6 flex items-center gap-3 animate-fade-in ${status.type === 'success' ? 'bg-success/10 text-success border border-success/20' : 'bg-error/10 text-error border border-error/20'
                            }`}>
                            {status.type === 'success' ? <CheckCircle2 size={20} /> : <AlertCircle size={20} />}
                            <span className="font-medium">{status.message}</span>
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>
                        <div className="input-group">
                            <label className="text-white font-medium mb-2 block">Withdraw Money 🏧</label>
                            <p className="text-text-secondary text-xs mb-3">Please enter the amount you wish to withdraw.</p>
                            <div className="relative">
                                <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-primary" size={20} />
                                <input
                                    type="number"
                                    step="0.01"
                                    className="input-field pl-12 py-4 text-xl font-bold bg-black/40 border-white/10"
                                    placeholder="0.00"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                    disabled={loading}
                                    required
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-3 gap-3 mb-8">
                            {[20, 50, 100, 200, 500, 1000].map((amt) => (
                                <button
                                    key={amt}
                                    type="button"
                                    onClick={() => setAmount(amt.toString())}
                                    className="btn btn-secondary text-sm py-3 hover:border-primary/50 transition-all font-medium"
                                    disabled={loading}
                                >
                                    ${amt.toLocaleString()}
                                </button>
                            ))}
                        </div>

                        <div className="flex gap-4">
                            <button
                                type="button"
                                onClick={() => navigate('/')}
                                className="btn btn-secondary flex-1 py-4 text-lg"
                                disabled={loading}
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="btn btn-primary flex-[2] py-4 text-lg shadow-lg shadow-primary/20"
                                disabled={loading || !amount}
                            >
                                {loading ? 'Processing your transaction...' : 'Confirm Withdrawal'}
                            </button>
                        </div>
                    </form>
                </div>

                <p className="mt-8 text-center text-text-secondary text-sm">
                    All transactions are securely handled via Spring Boot REST APIs.
                </p>
            </div>
            <style>{`
                .mx-auto { margin-left: auto; margin-right: auto; }
                .max-w-xl { max-width: 36rem; }
                .grid-cols-3 { grid-template-columns: repeat(3, minmax(0, 1fr)); }
                .py-4 { padding-top: 1rem; padding-bottom: 1rem; }
                .flex-1 { flex: 1; }
                .flex-[2] { flex: 2; }
                .bg-black\\/40 { background-color: rgba(0, 0, 0, 0.4); }
                .border-white\\/10 { border-color: rgba(255, 255, 255, 0.1); }
                .text-3xl { font-size: 1.875rem; line-height: 2.25rem; }
                .font-bold { font-weight: 700; }
                .-translate-y-1/2 { transform: translateY(-50%); }
                .top-1/2 { top: 50%; }
                .left-4 { left: 1rem; }
                .pl-12 { padding-left: 3rem; }
            `}</style>
        </div>
    );
};

export default Withdraw;
