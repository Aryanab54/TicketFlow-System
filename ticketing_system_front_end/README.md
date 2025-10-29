# Ticketing System Frontend

A modern ticketing system frontend built with Next.js, TypeScript, and Tailwind CSS.

## Features

### Authentication & Authorization
- Login and logout functionality
- Role-based access control (User, Admin, Support Agent)
- Protected routes with middleware

### User Dashboard
- Create new tickets with subject, description, and priority
- View personal tickets with status tracking
- Search and filter tickets by status and priority
- Add comments to tickets
- View ticket history

### Ticket Management
- Complete ticket lifecycle: Open → In Progress → Resolved → Closed
- Comment threads with timestamps and user information
- Status updates based on user role
- Priority levels: Low, Medium, High, Urgent

### Admin Panel
- User management (add/remove users, assign roles)
- View all tickets across the system
- Override ticket assignments and statuses
- Role-based access control

## Tech Stack

- **Framework**: Next.js 16 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **HTTP Client**: Axios
- **Authentication**: JWT with js-cookie

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Backend API running on port 8080

### Installation

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
```bash
cp .env.local.example .env.local
```

Update `.env.local` with your backend API URL:
```
NEXT_PUBLIC_API_URL=http://localhost:8080/api
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
app/
├── auth/
│   ├── login/          # Login page
│   └── register/       # Registration page
├── dashboard/
│   ├── create/         # Create ticket page
│   ├── tickets/[id]/   # Ticket detail page
│   └── page.tsx        # Dashboard home
├── admin/              # Admin panel
├── globals.css         # Global styles
├── layout.tsx          # Root layout
└── page.tsx            # Home page

components/
├── Navbar.tsx          # Navigation component
└── TicketCard.tsx      # Ticket display component

contexts/
└── AuthContext.tsx     # Authentication context

lib/
└── api.ts              # API service layer

types/
└── index.ts            # TypeScript interfaces
```

## API Integration

The frontend expects the following API endpoints:

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `GET /api/auth/profile` - Get user profile

### Tickets
- `GET /api/tickets` - Get user tickets
- `GET /api/tickets/:id` - Get ticket details
- `POST /api/tickets` - Create new ticket
- `PATCH /api/tickets/:id/status` - Update ticket status
- `PATCH /api/tickets/:id/assign` - Assign ticket
- `POST /api/tickets/:id/comments` - Add comment

### Admin
- `GET /api/admin/tickets` - Get all tickets
- `GET /api/admin/users` - Get all users
- `PATCH /api/admin/users/:id/role` - Update user role
- `DELETE /api/admin/users/:id` - Delete user

## User Roles

### User
- Create and manage own tickets
- Add comments to own tickets
- View ticket status and history

### Support Agent
- View assigned tickets
- Update ticket status
- Add comments to any ticket
- Reassign tickets

### Admin
- Full access to all features
- User management
- System-wide ticket management
- Role assignment

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Code Style

- TypeScript for type safety
- ESLint for code quality
- Tailwind CSS for styling
- Component-based architecture

## Deployment

The application can be deployed on Vercel, Netlify, or any platform supporting Next.js.

1. Build the application:
```bash
npm run build
```

2. Set environment variables in your deployment platform
3. Deploy the built application

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request
