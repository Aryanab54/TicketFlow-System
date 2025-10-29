# TicketFlow - Full Stack Ticketing System

A comprehensive ticketing system built with Spring Boot backend and Next.js frontend for IT support and customer service management.

## 🚀 Features

### ✅ Must-Have Features
- **Authentication & Authorization** - JWT-based auth with role-based access control
- **User Dashboard** - Create, view, and manage tickets with comments
- **Ticket Management** - Complete lifecycle: Open → In Progress → Resolved → Closed
- **Admin Panel** - User management and system-wide ticket control
- **Access Control** - Role-based permissions (USER, SUPPORT_AGENT, ADMIN)

### 🌟 Advanced Features
- **Email Notifications** - SendGrid integration for all ticket events
- **Search & Filter** - Advanced ticket search and filtering capabilities
- **Ticket Prioritization** - Priority levels with visual indicators
- **File Attachments** - Secure file upload and download system
- **Rating System** - 5-star rating system for ticket resolution

## 🛠️ Tech Stack

### Backend
- **Java 17** with **Spring Boot 3.5.7**
- **Spring Security** for authentication
- **Spring Data JPA** with **PostgreSQL**
- **SendGrid** for email notifications
- **Maven** for dependency management

### Frontend
- **Next.js 15** with **React 18**
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **Axios** for API communication

## 🏗️ Project Structure

```
TicketingSystem/
├── ticketing_system_back_end/     # Spring Boot Backend
│   ├── src/main/java/com/orange/ticketing/ticketingsystem/
│   │   ├── config/            # Security & Configuration
│   │   ├── controller/        # REST Controllers
│   │   ├── dto/              # Data Transfer Objects
│   │   ├── entity/           # JPA Entities
│   │   ├── repository/       # Data Repositories
│   │   ├── service/          # Business Logic
│   │   └── TicketingSystemApplication.java
│   └── src/main/resources/
│       └── application.properties
│
└── ticketing_system_front_end/    # Next.js Frontend
    ├── app/                   # Next.js App Router
    ├── components/           # React Components
    ├── contexts/             # React Contexts
    ├── lib/                  # Utilities & API
    └── types/                # TypeScript Types
```

## 🚀 Getting Started

### Prerequisites
- Java 17+
- Node.js 18+
- PostgreSQL 12+
- Maven 3.6+

### Backend Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd TicketingSystem/ticketing_system_back_end
   ```

2. **Configure Database**
   ```bash
   # Create PostgreSQL database
   createdb ticketing_system
   ```

3. **Set Environment Variables**
   ```bash
   export DATABASE_URL=jdbc:postgresql://localhost:5432/ticketing_system
   export DATABASE_USERNAME=postgres
   export DATABASE_PASSWORD=your_password
   export SENDGRID_API_KEY=your_sendgrid_api_key
   export SENDGRID_FROM_EMAIL=your_email@example.com
   export SENDGRID_FROM_NAME=TicketFlow
   ```

4. **Run Backend**
   ```bash
   mvn spring-boot:run
   ```
   Backend runs on: http://localhost:8080

### Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd ../ticketing_system_front_end
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run Frontend**
   ```bash
   npm run dev
   ```
   Frontend runs on: http://localhost:3000

## 👥 Default Users

- **Admin:** admin / admin123
- **Support:** support / support123  
- **User:** user / user123

## 📡 API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `GET /api/auth/profile` - Get user profile

### Tickets
- `GET /api/tickets/my` - Get user's tickets
- `POST /api/tickets` - Create new ticket
- `PUT /api/tickets/{id}/status` - Update ticket status
- `PUT /api/tickets/{id}/assign` - Assign ticket
- `POST /api/tickets/{id}/comments` - Add comment
- `GET /api/tickets/search` - Search tickets

### Admin
- `GET /api/admin/users` - Get all users
- `PUT /api/admin/users/{id}/role` - Update user role
- `GET /api/admin/tickets` - Get all tickets

## 🔒 Security Features

- Session-based authentication
- Role-based access control
- CORS configuration
- SQL injection protection
- Secure file upload/download
- Input validation and sanitization

## 📧 Email Notifications

Automated email notifications for:
- Ticket creation
- Ticket assignment
- Status changes
- Ticket resolution

## 🎨 UI Features

- Modern, responsive design
- Role-based navigation
- Real-time status updates
- File attachment support
- Advanced search and filtering
- Priority-based color coding

## 🚀 Deployment

### Backend Deployment
```bash
mvn clean package
java -jar target/TicketingSystem-0.0.1-SNAPSHOT.jar
```

### Frontend Deployment
```bash
npm run build
npm start
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Author

**Aryan Bhatt**
- Email: bhattaryan789@gmail.com
- GitHub: [Your GitHub Profile]

---

**TicketFlow** - Professional IT Support & Customer Service Management System 🎫✨