'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ticketApi } from '@/lib/api';
import { ArrowLeft, Send, AlertCircle, FileText, Flag } from 'lucide-react';
import Link from 'next/link';

const priorityOptions = [
  { value: 'LOW', label: 'Low Priority', color: 'text-green-600', bg: 'bg-green-50', icon: '🟢' },
  { value: 'MEDIUM', label: 'Medium Priority', color: 'text-yellow-600', bg: 'bg-yellow-50', icon: '🟡' },
  { value: 'HIGH', label: 'High Priority', color: 'text-orange-600', bg: 'bg-orange-50', icon: '🟠' },
  { value: 'URGENT', label: 'Urgent', color: 'text-red-600', bg: 'bg-red-50', icon: '🔴' },
];

export default function CreateTicketPage() {
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT'>('MEDIUM');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('=== FRONTEND DEBUG START ===');
    console.log('Form submitted with:', { subject, description, priority });
    setLoading(true);
    setError('');

    try {
      console.log('Calling ticketApi.createTicket...');
      const ticket = await ticketApi.createTicket({
        subject,
        description,
        priority,
      });
      console.log('Ticket created successfully:', ticket);
      router.push(`/dashboard/tickets/${ticket.id}`);
    } catch (err: any) {
      console.error('Error creating ticket:', err);
      setError(err.response?.data?.message || 'Failed to create ticket');
    } finally {
      setLoading(false);
      console.log('=== FRONTEND DEBUG END ===');
    }
  };

  const selectedPriority = priorityOptions.find(p => p.value === priority);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="mb-8">
          <Link
            href="/dashboard"
            className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            <span className="font-medium">Back to Dashboard</span>
          </Link>
          <div className="text-center mb-8">
            <div className="inline-flex p-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl mb-4">
              <FileText className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">Create New Ticket</h1>
            <p className="text-gray-600 text-lg">Submit a detailed support request to get help quickly</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-6 py-4 rounded-xl flex items-center space-x-3">
                <AlertCircle className="h-5 w-5 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <div>
              <label htmlFor="subject" className="block text-sm font-semibold text-gray-700 mb-3">
                <FileText className="h-4 w-4 inline mr-2" />
                Subject *
              </label>
              <input
                type="text"
                id="subject"
                required
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                placeholder="Brief, clear description of your issue"
              />
              <p className="text-sm text-gray-500 mt-2">Be specific and concise (e.g., "Unable to login to dashboard")</p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                <Flag className="h-4 w-4 inline mr-2" />
                Priority Level *
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {priorityOptions.map((option) => (
                  <label
                    key={option.value}
                    className={`relative cursor-pointer rounded-xl border-2 p-4 transition-all duration-300 ${
                      priority === option.value
                        ? 'border-blue-500 bg-blue-50 shadow-md'
                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="priority"
                      value={option.value}
                      checked={priority === option.value}
                      onChange={(e) => setPriority(e.target.value as any)}
                      className="sr-only"
                    />
                    <div className="text-center">
                      <div className="text-2xl mb-2">{option.icon}</div>
                      <div className={`font-medium ${priority === option.value ? 'text-blue-700' : 'text-gray-700'}`}>
                        {option.label}
                      </div>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-semibold text-gray-700 mb-3">
                <FileText className="h-4 w-4 inline mr-2" />
                Detailed Description *
              </label>
              <textarea
                id="description"
                required
                rows={8}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 resize-none"
                placeholder="Please provide a detailed description including:
• What you were trying to do
• What happened instead
• Steps to reproduce the issue
• Any error messages you saw
• When this started happening"
              />
              <p className="text-sm text-gray-500 mt-2">
                The more details you provide, the faster we can help resolve your issue
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <Link href="/dashboard" className="flex-1 text-center px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all duration-300 font-medium">
                Cancel
              </Link>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 font-medium"
              >
                <Send className="h-5 w-5" />
                <span>{loading ? 'Creating Ticket...' : 'Create Ticket'}</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}