import { Ticket } from 'lucide-react';

interface LoadingProps {
  message?: string;
}

export default function Loading({ message = 'Loading...' }: LoadingProps) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center space-y-4">
        <Ticket className="h-12 w-12 text-blue-600 animate-spin" />
        <p className="text-lg text-gray-600">{message}</p>
      </div>
    </div>
  );
}