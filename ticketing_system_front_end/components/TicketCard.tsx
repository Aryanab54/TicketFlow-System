import Link from 'next/link';
import { Ticket } from '@/types';
import { Clock, User, AlertCircle, ArrowRight } from 'lucide-react';

interface TicketCardProps {
  ticket: Ticket;
}

const priorityConfig = {
  LOW: { bg: 'bg-emerald-100', text: 'text-emerald-700', dot: 'bg-emerald-500' },
  MEDIUM: { bg: 'bg-amber-100', text: 'text-amber-700', dot: 'bg-amber-500' },
  HIGH: { bg: 'bg-orange-100', text: 'text-orange-700', dot: 'bg-orange-500' },
  URGENT: { bg: 'bg-red-100', text: 'text-red-700', dot: 'bg-red-500' },
};

const statusConfig = {
  OPEN: { bg: 'bg-blue-100', text: 'text-blue-700', dot: 'bg-blue-500' },
  IN_PROGRESS: { bg: 'bg-purple-100', text: 'text-purple-700', dot: 'bg-purple-500' },
  RESOLVED: { bg: 'bg-green-100', text: 'text-green-700', dot: 'bg-green-500' },
  CLOSED: { bg: 'bg-gray-100', text: 'text-gray-700', dot: 'bg-gray-500' },
};

export default function TicketCard({ ticket }: TicketCardProps) {
  const priority = priorityConfig[ticket.priority];
  const status = statusConfig[ticket.status];

  return (
    <Link href={`/dashboard/tickets/${ticket.id}`} className="group block">
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 group-hover:scale-[1.02] transition-all duration-300">
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-gray-900 truncate group-hover:text-blue-600 transition-colors">
              {ticket.subject}
            </h3>
            <p className="text-gray-600 text-sm mt-1 line-clamp-2">{ticket.description}</p>
          </div>
          <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all duration-300 ml-4 flex-shrink-0" />
        </div>
        
        <div className="flex flex-wrap gap-2 mb-4">
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${priority.bg} ${priority.text}`}>
            <div className={`w-2 h-2 rounded-full ${priority.dot} mr-2`}></div>
            {ticket.priority}
          </span>
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${status.bg} ${status.text}`}>
            <div className={`w-2 h-2 rounded-full ${status.dot} mr-2`}></div>
            {ticket.status.replace('_', ' ')}
          </span>
        </div>
        
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-xs font-semibold">
                {ticket.createdBy.firstName.charAt(0).toUpperCase()}
              </div>
              <span className="text-gray-700">{ticket.createdBy.firstName} {ticket.createdBy.lastName}</span>
            </div>
            {ticket.assignedTo && (
              <div className="flex items-center space-x-1 text-xs">
                <AlertCircle className="h-3 w-3" />
                <span>→ {ticket.assignedTo.firstName} {ticket.assignedTo.lastName}</span>
              </div>
            )}
          </div>
          <div className="flex items-center space-x-1 text-xs">
            <Clock className="h-3 w-3" />
            <span>{new Date(ticket.createdAt).toLocaleDateString()}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}