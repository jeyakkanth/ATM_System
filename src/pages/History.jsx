import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, History as HistoryIcon, ArrowUpCircle, ArrowDownCircle, ChevronLeft, ChevronRight, Search } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { transactionService } from '../api/api';

const HistoryPage = () => {
    const { user, account } = useAuth();
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate('/login');
        } else {
            fetchHistory();
        }
    }, [user, page]);

    const fetchHistory = async () => {
        setLoading(true);
        try {
            const data = await transactionService.getHistory(account.id, page, 5);
            setHistory(data.content);
            setTotalPages(data.totalPages);
        } catch (err) {
            console.error('Failed to fetch history', err);
        } finally {
            setLoading(false);
        }
    };

    if (!user || !account) return null;

    return (
        <div className="container animate-fade-in">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                <div>
                    <button onClick={() => navigate('/')} className="btn btn-secondary mb-4">
                        <ArrowLeft size={20} />
                        <span>Back to Dashboard</span>
                    </button>
                    <h1 className="text-3xl font-bold flex items-center gap-3">
                        Transaction History <span className="text-2xl">📜</span>
                    </h1>
                    <p className="text-text-secondary mt-1">Track all your deposits and withdrawals in one place.</p>
                </div>
                <div className="w-full md:w-auto glass p-2 flex items-center gap-2">
                    <HistoryIcon size={20} className="text-secondary ml-2" />
                    <span className="text-sm font-medium mr-2">Recent account activities</span>
                </div>
            </div>

            <div className="glass overflow-hidden border border-white/5">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-white/5">
                                <th className="p-6 text-text-secondary font-bold uppercase text-xs tracking-widest">Date & Time</th>
                                <th className="p-6 text-text-secondary font-bold uppercase text-xs tracking-widest">Type</th>
                                <th className="p-6 text-text-secondary font-bold uppercase text-xs tracking-widest text-right">Amount</th>
                                <th className="p-6 text-text-secondary font-bold uppercase text-xs tracking-widest text-center">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {loading ? (
                                <tr>
                                    <td colSpan="4" className="p-20 text-center">
                                        <div className="flex flex-col items-center gap-4">
                                            <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
                                            <p className="text-text-secondary">Processing your request...</p>
                                        </div>
                                    </td>
                                </tr>
                            ) : history.length === 0 ? (
                                <tr>
                                    <td colSpan="4" className="p-20 text-center">
                                        <div className="flex flex-col items-center gap-4">
                                            <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center text-text-secondary">
                                                <Search size={32} />
                                            </div>
                                            <div>
                                                <p className="text-white font-bold text-lg">No transactions yet</p>
                                                <p className="text-text-secondary">Start by making a deposit!</p>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                history.map((tx) => (
                                    <tr key={tx.id} className="hover:bg-white/5 transition-colors">
                                        <td className="p-6 whitespace-nowrap">
                                            <div className="text-sm font-bold text-white">
                                                {new Date(tx.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                                            </div>
                                            <div className="text-xs text-text-secondary">
                                                {new Date(tx.createdAt).toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })}
                                            </div>
                                        </td>
                                        <td className="p-6">
                                            <div className="flex items-center gap-3">
                                                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${tx.type === 'WITHDRAW' ? 'bg-primary/20 text-primary' : 'bg-success/20 text-success'
                                                    }`}>
                                                    {tx.type === 'WITHDRAW' ? <ArrowUpCircle size={18} /> : <ArrowDownCircle size={18} />}
                                                </div>
                                                <span className="text-sm font-bold tracking-tight">{tx.type}</span>
                                            </div>
                                        </td>
                                        <td className={`p-6 text-right font-black text-lg ${tx.type === 'WITHDRAW' ? 'text-primary' : 'text-success'}`}>
                                            {tx.type === 'WITHDRAW' ? '-' : '+'}${Math.abs(tx.amount).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                                        </td>
                                        <td className="p-6 text-center">
                                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-success/10 text-success border border-success/20">
                                                Completed
                                            </span>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                <div className="p-6 border-t border-white/10 flex justify-between items-center bg-black/40">
                    <p className="text-sm text-text-secondary font-medium">
                        Showing page <span className="text-white font-bold">{page}</span> of <span className="text-white font-bold">{totalPages || 1}</span>
                    </p>
                    <div className="flex gap-3">
                        <button
                            onClick={() => setPage(p => Math.max(1, p - 1))}
                            disabled={page === 1 || loading}
                            className="btn btn-secondary px-4 py-2 disabled:opacity-30 disabled:cursor-not-allowed"
                        >
                            <ChevronLeft size={20} />
                            <span>Prev</span>
                        </button>
                        <button
                            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                            disabled={page === totalPages || loading}
                            className="btn btn-secondary px-4 py-2 disabled:opacity-30 disabled:cursor-not-allowed"
                        >
                            <span>Next</span>
                            <ChevronRight size={20} />
                        </button>
                    </div>
                </div>
            </div>

            <div className="mt-12 text-center text-text-secondary text-sm">
                <p>All transactions are securely handled via Spring Boot REST APIs.</p>
            </div>

            <style>{`
                .whitespace-nowrap { white-space: nowrap; }
                .inline-flex { display: inline-flex; }
                .tracking-widest { letter-spacing: 0.1em; }
                .uppercase { text-transform: uppercase; }
                .text-xs { font-size: 0.75rem; }
                .p-20 { padding: 5rem; }
                .text-right { text-align: right; }
                .text-center { text-align: center; }
                .bg-black\\/40 { background-color: rgba(0, 0, 0, 0.4); }
                .divide-y > * + * { border-top-width: 1px; }
                .divide-white\\/5 > * + * { border-color: rgba(255, 255, 255, 0.05); }
                .font-black { font-weight: 900; }
                .animate-spin { animation: spin 1s linear infinite; }
                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
            `}</style>
        </div>
    );
};

export default HistoryPage;
