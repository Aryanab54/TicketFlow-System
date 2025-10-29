'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { ticketApi, adminApi } from '@/lib/api';
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api',
  withCredentials: true,
});
import { Ticket, Comment } from '@/types';
import { ArrowLeft, Clock, User, MessageCircle, Send } from 'lucide-react';

const priorityColors = {
  LOW: 'bg-green-100 text-green-800',
  MEDIUM: 'bg-yellow-100 text-yellow-800',
  HIGH: 'bg-orange-100 text-orange-800',
  URGENT: 'bg-red-100 text-red-800',
};

const statusColors = {
  OPEN: 'bg-blue-100 text-blue-800',
  IN_PROGRESS: 'bg-purple-100 text-purple-800',
  RESOLVED: 'bg-green-100 text-green-800',
  CLOSED: 'bg-gray-100 text-gray-800',
};

export default function TicketDetailPage() {
  const { user } = useAuth();
  const params = useParams();
  const router = useRouter();
  const [ticket, setTicket] = useState<Ticket | null>(null);
  const [loading, setLoading] = useState(true);
  const [comment, setComment] = useState('');
  const [submittingComment, setSubmittingComment] = useState(false);
  const [users, setUsers] = useState([]);
  const [assigneeId, setAssigneeId] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [showRating, setShowRating] = useState(false);

  useEffect(() => {
    if (params.id && user) {
      loadTicket();
      if (user.role === 'ADMIN' || user.role === 'SUPPORT_AGENT') {
        loadUsers();
      }
    }
  }, [params.id, user]);

  const loadTicket = async () => {
    try {
      const data = await ticketApi.getTicket(params.id as string);
      setTicket(data);
    } catch (error) {
      console.error('Failed to load ticket:', error);
      router.push('/dashboard');
    } finally {
      setLoading(false);
    }
  };

  const handleAddComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return;

    setSubmittingComment(true);
    try {
      await ticketApi.addComment(params.id as string, comment);
      setComment('');
      loadTicket(); // Reload to get updated comments
    } catch (error) {
      console.error('Failed to add comment:', error);
    } finally {
      setSubmittingComment(false);
    }
  };

  const loadUsers = async () => {
    try {
      if (user?.role === 'ADMIN') {
        const data = await adminApi.getAllUsers();
        setUsers(data.filter(u => u.role === 'SUPPORT_AGENT' || u.role === 'ADMIN'));
      } else {
        const response = await api.get('/admin/support-agents');
        setUsers(response.data);
      }
    } catch (error) {
      console.error('Failed to load users:', error);
    }
  };

  const handleStatusChange = async (newStatus: string) => {
    if (!ticket) return;
    
    try {
      await ticketApi.updateTicketStatus(ticket.id, newStatus);
      loadTicket();
    } catch (error) {
      console.error('Failed to update status:', error);
    }
  };

  const handleAssignTicket = async () => {
    if (!ticket || !assigneeId) return;
    
    try {
      await ticketApi.assignTicket(ticket.id, assigneeId);
      loadTicket();
      setAssigneeId('');
    } catch (error) {
      console.error('Failed to assign ticket:', error);
    }
  };

  const handleFileUpload = async () => {
    if (!selectedFile || !ticket) return;
    
    try {
      await ticketApi.uploadAttachment(ticket.id, selectedFile);
      setSelectedFile(null);
      loadTicket();
    } catch (error) {
      console.error('Failed to upload file:', error);
    }
  };

  const handleRating = async () => {
    if (!ticket || rating === 0) return;
    
    try {
      await ticketApi.rateTicket(ticket.id, rating, feedback);
      setShowRating(false);
      loadTicket();
    } catch (error) {
      console.error('Failed to rate ticket:', error);
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (!ticket || !user) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <p>Ticket not found</p>
      </div>
    );
  }

  const canUpdateStatus = user.role === 'ADMIN' || user.role === 'SUPPORT_AGENT' || user.id === ticket.createdBy?.id;
  const canAssign = user.role === 'ADMIN' || user.role === 'SUPPORT_AGENT';

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <Link
          href="/dashboard"
          className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Dashboard
        </Link>
      </div>

      <div className="bg-white shadow-sm rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{ticket.subject}</h1>
              <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
                <div className="flex items-center space-x-1">
                  <User className="h-4 w-4" />
                  <span>{ticket.createdBy.firstName} {ticket.createdBy.lastName}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="h-4 w-4" />
                  <span>{new Date(ticket.createdAt).toLocaleString()}</span>
                </div>
              </div>
            </div>
            <div className="flex space-x-2">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${priorityColors[ticket.priority]}`}>
                {ticket.priority}
              </span>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors[ticket.status]}`}>
                {ticket.status.replace('_', ' ')}
              </span>
            </div>
          </div>
        </div>

        <div className="px-6 py-4">
          <h3 className="text-lg font-medium text-gray-900 mb-2">Description</h3>
          <p className="text-gray-700 whitespace-pre-wrap">{ticket.description}</p>
        </div>

        {canUpdateStatus && (
          <div className="px-6 py-4 border-t border-gray-200">
            <h3 className="text-lg font-medium text-gray-900 mb-3">Update Status</h3>
            <div className="flex space-x-2">
              {['OPEN', 'IN_PROGRESS', 'RESOLVED', 'CLOSED'].map((status) => (
                <button
                  key={status}
                  onClick={() => handleStatusChange(status)}
                  disabled={ticket.status === status}
                  className={`px-3 py-1 rounded text-sm font-medium ${
                    ticket.status === status
                      ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                      : 'bg-blue-100 text-blue-800 hover:bg-blue-200'
                  }`}
                >
                  {status.replace('_', ' ')}
                </button>
              ))}
            </div>
          </div>
        )}

        {canAssign && (
          <div className="px-6 py-4 border-t border-gray-200">
            <h3 className="text-lg font-medium text-gray-900 mb-3">Assign Ticket</h3>
            <div className="flex space-x-2">
              <select
                value={assigneeId}
                onChange={(e) => setAssigneeId(e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md"
              >
                <option value="">Select assignee...</option>
                {users.map((u: any) => (
                  <option key={u.id} value={u.id}>
                    {u.firstName} {u.lastName} ({u.role})
                  </option>
                ))}
              </select>
              <button
                onClick={handleAssignTicket}
                disabled={!assigneeId}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
              >
                Assign
              </button>
            </div>
            {ticket.assignedTo && (
              <p className="text-sm text-gray-600 mt-2">
                Currently assigned to: {ticket.assignedTo.firstName} {ticket.assignedTo.lastName}
              </p>
            )}
          </div>
        )}

        <div className="px-6 py-4 border-t border-gray-200">
          <h3 className="text-lg font-medium text-gray-900 mb-3">Attachments</h3>
          <div className="space-y-2">
            {ticket.attachments?.map((attachment) => (
              <div key={attachment.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                <span className="text-sm">{attachment.fileName}</span>
                <a href={`http://localhost:8080/api/tickets/${ticket.id}/attachments/${attachment.id}/download`} 
                   className="text-blue-600 hover:text-blue-800 text-sm">Download</a>
              </div>
            ))}
            <div className="flex space-x-2 mt-3">
              <input
                type="file"
                onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                className="flex-1 text-sm"
              />
              <button
                onClick={handleFileUpload}
                disabled={!selectedFile}
                className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50 text-sm"
              >
                Upload
              </button>
            </div>
          </div>
        </div>

        {(ticket.status === 'RESOLVED' || ticket.status === 'CLOSED') && user?.id === ticket.createdBy?.id && !ticket.rating && (
          <div className="px-6 py-4 border-t border-gray-200">
            <h3 className="text-lg font-medium text-gray-900 mb-3">Rate Resolution</h3>
            {!showRating ? (
              <button
                onClick={() => setShowRating(true)}
                className="px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700"
              >
                Rate This Ticket
              </button>
            ) : (
              <div className="space-y-3">
                <div className="flex space-x-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => setRating(star)}
                      className={`text-2xl ${star <= rating ? 'text-yellow-400' : 'text-gray-300'}`}
                    >
                      ★
                    </button>
                  ))}
                </div>
                <textarea
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  placeholder="Optional feedback..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  rows={3}
                />
                <div className="flex space-x-2">
                  <button
                    onClick={handleRating}
                    disabled={rating === 0}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
                  >
                    Submit Rating
                  </button>
                  <button
                    onClick={() => setShowRating(false)}
                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {ticket.rating && (
          <div className="px-6 py-4 border-t border-gray-200">
            <h3 className="text-lg font-medium text-gray-900 mb-3">Rating</h3>
            <div className="flex items-center space-x-2">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span key={star} className={`text-xl ${star <= ticket.rating!.rating ? 'text-yellow-400' : 'text-gray-300'}`}>
                    ★
                  </span>
                ))}
              </div>
              <span className="text-sm text-gray-600">({ticket.rating.rating}/5)</span>
            </div>
            {ticket.rating.feedback && (
              <p className="text-sm text-gray-700 mt-2">{ticket.rating.feedback}</p>
            )}
          </div>
        )}

        <div className="px-6 py-4 border-t border-gray-200">
          <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
            <MessageCircle className="h-5 w-5 mr-2" />
            Comments ({ticket.comments?.length || 0})
          </h3>
          
          <div className="space-y-4 mb-6">
            {ticket.comments?.map((comment) => (
              <div key={comment.id} className="bg-gray-50 rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <span className="font-medium text-gray-900">{comment.createdBy?.firstName} {comment.createdBy?.lastName}</span>
                  <span className="text-sm text-gray-500">
                    {new Date(comment.createdAt).toLocaleString()}
                  </span>
                </div>
                <p className="text-gray-700 whitespace-pre-wrap">{comment.content}</p>
              </div>
            )) || []}
          </div>

          <form onSubmit={handleAddComment} className="space-y-4">
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Add a comment..."
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={submittingComment || !comment.trim()}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
              >
                <Send className="h-4 w-4 mr-2" />
                {submittingComment ? 'Adding...' : 'Add Comment'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}