import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8088',
    headers: {
        'Content-Type': 'application/json',
    },
});

export const authService = {
    login: async (credentials) => {
        const response = await api.post('/authentication', credentials);
        return response.data;
    },
    getUserByEmail: async (email) => {
        const response = await api.get(`/transaction/user?email=${email}`);
        return response.data;
    },
};

export const transactionService = {
    getBalance: async (userId) => {
        const response = await api.get(`/transaction/balance/${userId}`);
        return response.data;
    },
    deposit: async (accountId, amount) => {
        const response = await api.post(`/transaction/deposit/${accountId}`, {
            amount,
            type: 'DEPOSIT',
        });
        return response.data;
    },
    withdraw: async (accountId, amount) => {
        const response = await api.post(`/transaction/withdrawal/${accountId}`, {
            amount,
            type: 'WITHDRAW',
        });
        return response.data;
    },
    getHistory: async (accountId, pageNo = 1, pageSize = 10) => {
        const response = await api.get(`/transaction/history/${accountId}`, {
            params: { pageNo, pageSize },
        });
        return response.data;
    },
};

export default api;
