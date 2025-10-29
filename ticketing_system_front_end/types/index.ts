export interface User {
  id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'USER' | 'ADMIN' | 'SUPPORT_AGENT';
}

export interface Ticket {
  id: string;
  subject: string;
  description: string;
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
  status: 'OPEN' | 'IN_PROGRESS' | 'RESOLVED' | 'CLOSED';
  createdAt: string;
  updatedAt: string;
  resolvedAt?: string;
  createdBy: User;
  assignedTo?: User;
  attachments?: Attachment[];
  rating?: Rating;
}

export interface Attachment {
  id: string;
  fileName: string;
  filePath: string;
  contentType: string;
  fileSize: number;
  uploadedAt: string;
  uploadedBy: User;
}

export interface Rating {
  id: string;
  rating: number;
  feedback?: string;
  createdAt: string;
  createdBy: User;
}

export interface Comment {
  id: string;
  content: string;
  createdAt: string;
  userId: string;
  ticketId: string;
  user: User;
}

export interface CreateTicketData {
  subject: string;
  description: string;
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
}

export interface LoginData {
  username: string;
  password: string;
}

export interface RegisterData {
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}