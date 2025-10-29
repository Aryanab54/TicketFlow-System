# TicketFlow - Quick Start Guide

## 🚀 5-Minute Setup

### 1. Prerequisites Check
```bash
java -version    # Should be 17+
node -v         # Should be 18+
psql --version  # Should be 12+
```

### 2. Database Setup
```bash
# Create database
createdb ticketing_system
```

### 3. Start Backend
```bash
cd ticketing_system_back_end
mvn spring-boot:run
```
Wait for: "Started TicketingSystemApplication"

### 4. Start Frontend (New Terminal)
```bash
cd ticketing_system_front_end
npm install
npm run dev
```

### 5. Test Access
- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:8080/api/auth/profile

## 🔐 Test Credentials

| Role | Username | Password |
|------|----------|----------|
| Admin | admin | admin123 |
| Support | support | support123 |
| User | user | user123 |

## ✅ Quick Test Checklist

1. [ ] Login as admin → Access admin panel
2. [ ] Login as user → Create ticket
3. [ ] Login as support → View all tickets
4. [ ] Upload file to ticket
5. [ ] Rate resolved ticket

## 🐛 Common Issues

**Port 8080 in use:** `lsof -ti:8080 | xargs kill -9`  
**Database error:** Check PostgreSQL is running  
**CORS error:** Ensure both servers are running  

---
**Ready to test!** 🎉