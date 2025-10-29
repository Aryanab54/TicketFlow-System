# TicketFlow System - Manual Testing Guide

**Project:** Full-Stack Ticketing System  
**Author:** Aryan Bhatt  
**Email:** bhattaryan789@gmail.com  
**GitHub:** https://github.com/Aryanab54/TicketFlow-System  
**Date:** October 2025  

---

## 📋 Table of Contents

1. [System Requirements](#system-requirements)
2. [Installation & Setup](#installation--setup)
3. [Default Test Credentials](#default-test-credentials)
4. [Testing Scenarios](#testing-scenarios)
5. [Feature Testing Checklist](#feature-testing-checklist)
6. [API Testing](#api-testing)
7. [Troubleshooting](#troubleshooting)

---

## 🖥️ System Requirements

### Prerequisites
- **Java:** 17 or higher
- **Node.js:** 18 or higher
- **PostgreSQL:** 12 or higher
- **Maven:** 3.6 or higher
- **Git:** Latest version

### Hardware Requirements
- **RAM:** Minimum 8GB (16GB recommended)
- **Storage:** 2GB free space
- **Network:** Internet connection for dependencies

---

## 🚀 Installation & Setup

### Step 1: Clone Repository
```bash
git clone https://github.com/Aryanab54/TicketFlow-System.git
cd TicketFlow-System
```

### Step 2: Database Setup
```bash
# Install PostgreSQL (if not installed)
# Create database
createdb ticketing_system

# Or using psql
psql -U postgres
CREATE DATABASE ticketing_system;
\q
```

### Step 3: Backend Setup
```bash
cd ticketing_system_back_end

# Set environment variables (Optional - defaults provided)
export DATABASE_URL=jdbc:postgresql://localhost:5432/ticketing_system
export DATABASE_USERNAME=postgres
export DATABASE_PASSWORD=1234

# Run backend
mvn spring-boot:run
```
**Backend URL:** http://localhost:8080

### Step 4: Frontend Setup
```bash
# Open new terminal
cd ticketing_system_front_end

# Install dependencies
npm install

# Run frontend
npm run dev
```
**Frontend URL:** http://localhost:3000

---

## 🔐 Default Test Credentials

### Pre-configured Users

| Role | Username | Password | Email | Description |
|------|----------|----------|-------|-------------|
| **ADMIN** | admin | admin123 | admin@ticketing.com | Full system access |
| **SUPPORT_AGENT** | support | support123 | support@ticketing.com | Ticket management |
| **USER** | user | user123 | user@ticketing.com | Basic user access |

### Additional Test Users
| Username | Password | Role | Email |
|----------|----------|------|-------|
| aryan789 | password123 | USER | bhattaryan789@gmail.com |
| agent1 | agent123 | SUPPORT_AGENT | agent1@ticketing.com |
| testuser | test123 | USER | testuser@ticketing.com |

---

## 🧪 Testing Scenarios

### Scenario 1: User Registration & Login

#### Test Case 1.1: New User Registration
1. Navigate to http://localhost:3000
2. Click "Sign Up" or go to `/auth/register`
3. Fill registration form:
   - **First Name:** Test
   - **Last Name:** User
   - **Username:** testuser2025
   - **Email:** testuser2025@example.com
   - **Password:** password123
4. Click "Create Account"
5. **Expected:** Success message and redirect to login

#### Test Case 1.2: User Login
1. Go to `/auth/login`
2. Enter credentials: `admin` / `admin123`
3. Click "Sign In"
4. **Expected:** Redirect to dashboard with admin privileges

### Scenario 2: Ticket Management (User Role)

#### Test Case 2.1: Create New Ticket
1. Login as user: `user` / `user123`
2. Click "Create New Ticket"
3. Fill form:
   - **Subject:** "Login Issue - Cannot access dashboard"
   - **Description:** "I'm unable to login to my account. Getting error message."
   - **Priority:** HIGH
4. Click "Create Ticket"
5. **Expected:** Ticket created with ID, status OPEN

#### Test Case 2.2: View Ticket Details
1. From dashboard, click on created ticket
2. **Expected:** 
   - Ticket details displayed
   - Comment section available
   - Status history visible

#### Test Case 2.3: Add Comment to Ticket
1. In ticket details page
2. Add comment: "I tried clearing browser cache but issue persists"
3. Click "Add Comment"
4. **Expected:** Comment added with timestamp

### Scenario 3: Admin Panel Testing

#### Test Case 3.1: User Management
1. Login as admin: `admin` / `admin123`
2. Navigate to Admin Panel
3. **Expected:** 
   - List of all users
   - Role assignment options
   - User statistics

#### Test Case 3.2: Assign User Role
1. In Admin Panel → Users
2. Find user "testuser2025"
3. Change role to "SUPPORT_AGENT"
4. **Expected:** Role updated successfully

#### Test Case 3.3: View All Tickets
1. In Admin Panel → Tickets
2. **Expected:**
   - All system tickets visible
   - Filter and search options
   - Ticket assignment capabilities

### Scenario 4: Support Agent Workflow

#### Test Case 4.1: Ticket Assignment
1. Login as admin: `admin` / `admin123`
2. Go to ticket created in Test Case 2.1
3. Assign to support agent: `support`
4. **Expected:** 
   - Ticket assigned successfully
   - Email notification sent (if configured)

#### Test Case 4.2: Status Updates
1. Login as support: `support` / `support123`
2. Open assigned ticket
3. Update status: OPEN → IN_PROGRESS
4. Add comment: "Investigating the issue"
5. **Expected:** Status updated, comment added

#### Test Case 4.3: Resolve Ticket
1. Continue as support agent
2. Update status to RESOLVED
3. Add resolution comment: "Password reset link sent to user email"
4. **Expected:** 
   - Status changed to RESOLVED
   - Resolution timestamp recorded

### Scenario 5: Advanced Features Testing

#### Test Case 5.1: File Attachment
1. Login as any user
2. Create or open existing ticket
3. Upload file (image/document < 10MB)
4. **Expected:** File uploaded and downloadable

#### Test Case 5.2: Ticket Rating
1. Login as ticket creator
2. Open RESOLVED ticket
3. Rate ticket (1-5 stars)
4. Add feedback: "Quick resolution, very helpful"
5. **Expected:** Rating saved successfully

#### Test Case 5.3: Search & Filter
1. Login as any user with tickets
2. Use search: "login issue"
3. Filter by status: OPEN
4. Filter by priority: HIGH
5. **Expected:** Results filtered correctly

---

## ✅ Feature Testing Checklist

### Authentication & Authorization
- [ ] User registration works
- [ ] User login/logout works
- [ ] Role-based access control enforced
- [ ] Session management working
- [ ] Unauthorized access blocked

### User Dashboard
- [ ] Ticket creation form functional
- [ ] User can view own tickets only
- [ ] Ticket status display correct
- [ ] Comment system working
- [ ] File upload functional

### Admin Panel
- [ ] User management accessible
- [ ] Role assignment working
- [ ] All tickets visible
- [ ] System statistics displayed
- [ ] Ticket reassignment functional

### Ticket Lifecycle
- [ ] Status progression: OPEN → IN_PROGRESS → RESOLVED → CLOSED
- [ ] Status updates save correctly
- [ ] Timestamp tracking accurate
- [ ] Comment threading works
- [ ] Assignment functionality works

### Advanced Features
- [ ] Search functionality works
- [ ] Filter options functional
- [ ] Priority system working
- [ ] File attachments work
- [ ] Rating system functional
- [ ] Email notifications (if configured)

---

## 🔧 API Testing

### Authentication Endpoints
```bash
# Login
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin123"}' \
  -c cookies.txt

# Get Profile
curl -X GET http://localhost:8080/api/auth/profile \
  -b cookies.txt
```

### Ticket Endpoints
```bash
# Create Ticket
curl -X POST http://localhost:8080/api/tickets \
  -H "Content-Type: application/json" \
  -b cookies.txt \
  -d '{"subject":"API Test","description":"Testing via API","priority":"MEDIUM"}'

# Get User Tickets
curl -X GET http://localhost:8080/api/tickets/my \
  -b cookies.txt

# Update Ticket Status
curl -X PUT "http://localhost:8080/api/tickets/1/status?status=IN_PROGRESS" \
  -b cookies.txt
```

### Admin Endpoints
```bash
# Get All Users (Admin only)
curl -X GET http://localhost:8080/api/admin/users \
  -b cookies.txt

# Get All Tickets (Admin only)
curl -X GET http://localhost:8080/api/admin/tickets \
  -b cookies.txt
```

---

## 🐛 Troubleshooting

### Common Issues & Solutions

#### Backend Won't Start
**Issue:** Port 8080 already in use
**Solution:** 
```bash
# Kill process on port 8080
lsof -ti:8080 | xargs kill -9
# Or change port in application.properties
server.port=8081
```

#### Database Connection Error
**Issue:** Cannot connect to PostgreSQL
**Solution:**
1. Ensure PostgreSQL is running: `brew services start postgresql`
2. Check database exists: `psql -U postgres -l`
3. Verify credentials in application.properties

#### Frontend Build Errors
**Issue:** npm install fails
**Solution:**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm cache clean --force
npm install
```

#### CORS Errors
**Issue:** Frontend can't connect to backend
**Solution:** Ensure backend CORS is configured for http://localhost:3000

#### Email Notifications Not Working
**Issue:** SendGrid emails not sending
**Solution:** 
1. Check SendGrid API key is valid
2. Verify sender email is verified in SendGrid
3. Check network connectivity

### Performance Testing
- **Concurrent Users:** Test with 10+ simultaneous logins
- **Large Files:** Upload files up to 10MB limit
- **Database Load:** Create 100+ tickets for performance testing

---

## 📊 Test Results Template

### Test Execution Summary
| Test Case | Status | Notes |
|-----------|--------|-------|
| User Registration | ✅ PASS | |
| User Login | ✅ PASS | |
| Ticket Creation | ✅ PASS | |
| Admin Panel Access | ✅ PASS | |
| File Upload | ✅ PASS | |
| Rating System | ✅ PASS | |

### Environment Details
- **OS:** macOS/Windows/Linux
- **Browser:** Chrome/Firefox/Safari
- **Java Version:** 17.x.x
- **Node Version:** 18.x.x
- **Database:** PostgreSQL 12+

---

## 📞 Support Information

**Developer:** Aryan Bhatt  
**Email:** bhattaryan789@gmail.com  
**GitHub Issues:** https://github.com/Aryanab54/TicketFlow-System/issues  

For any testing issues or questions, please create an issue on GitHub or contact the developer directly.

---

**© 2025 TicketFlow System - Manual Testing Guide**