import axios from 'axios';
import Cookies from 'js-cookie';
import { User, Ticket, CreateTicketData, LoginData, RegisterData } from '@/types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to ensure credentials are sent
api.interceptors.request.use((config) => {
  config.withCredentials = true;
  return config;
});

// Remove token interceptors since we're using session-based auth
// api.interceptors.request.use((config) => {
//   const token = Cookies.get('token');
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// api.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response?.status === 401) {
//       Cookies.remove('token');
//       window.location.href = '/auth/login';
//     }
//     return Promise.reject(error);
//   }
// );

export const authApi = {
  login: async (data: LoginData) => {
    const response = await api.post('/auth/login', data);
    return response.data;
  },
  register: async (data: RegisterData) => {
    const response = await api.post('/auth/register', data);
    return response.data;
  },
  getProfile: async (): Promise<User> => {
    const response = await api.get('/auth/profile');
    return response.data;
  },
};

export const ticketApi = {
  getTickets: async (): Promise<Ticket[]> => {
    const response = await api.get('/tickets/my');
    return response.data;
  },
  getTicket: async (id: string): Promise<Ticket> => {
    const response = await api.get(`/tickets/${id}`);
    return response.data;
  },
  createTicket: async (data: CreateTicketData): Promise<Ticket> => {
    const response = await api.post('/tickets', data);
    return response.data;
  },
  updateTicketStatus: async (id: string, status: string): Promise<Ticket> => {
    const response = await api.put(`/tickets/${id}/status?status=${status}`);
    return response.data;
  },
  assignTicket: async (id: string, assigneeId: string): Promise<Ticket> => {
    const response = await api.put(`/tickets/${id}/assign?assigneeId=${assigneeId}`);
    return response.data;
  },
  addComment: async (ticketId: string, content: string) => {
    const response = await api.post(`/tickets/${ticketId}/comments`, { content });
    return response.data;
  },
  searchTickets: async (query: string): Promise<Ticket[]> => {
    const response = await api.get(`/tickets/search?q=${encodeURIComponent(query)}`);
    return response.data;
  },
  getTicketsByPriority: async (priority: string): Promise<Ticket[]> => {
    const response = await api.get(`/tickets/priority/${priority}`);
    return response.data;
  },
  uploadAttachment: async (ticketId: string, file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    const response = await api.post(`/tickets/${ticketId}/attachments`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
  },
  rateTicket: async (ticketId: string, rating: number, feedback?: string) => {
    const params = new URLSearchParams({ rating: rating.toString() });
    if (feedback) params.append('feedback', feedback);
    const response = await api.post(`/tickets/${ticketId}/rating?${params}`);
    return response.data;
  },
  getTicketRating: async (ticketId: string) => {
    const response = await api.get(`/tickets/${ticketId}/rating`);
    return response.data;
  },
};

export const adminApi = {
  getAllTickets: async (): Promise<Ticket[]> => {
    const response = await api.get('/admin/tickets');
    return response.data;
  },
  getAllUsers: async (): Promise<User[]> => {
    const response = await api.get('/admin/users');
    return response.data;
  },
  updateUserRole: async (userId: string, role: string): Promise<User> => {
    const response = await api.patch(`/admin/users/${userId}/role`, { role });
    return response.data;
  },
  deleteUser: async (userId: string): Promise<void> => {
    await api.delete(`/admin/users/${userId}`);
  },
};