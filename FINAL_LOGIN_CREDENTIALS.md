# Final Login Credentials

## Email & Password Validation

### Student Email Format
- Format: `student[8-digits]@college.edu`
- Example: `student23102060@college.edu`

### Faculty Email Format
- Format: `faculty[name]@college.edu`
- Example: `facultyrajesh@college.edu`

### Password Requirements
- Minimum 8 characters
- Can be any combination of letters, numbers, special characters
- No specific character type requirements

---

## Student Credentials

| Email | Password | Roll No | Year |
|-------|----------|---------|------|
| student23102060@college.edu | password1 | 23102060 | 2nd |
| student23102061@college.edu | password2 | 23102061 | 3rd |
| student23102062@college.edu | password3 | 23102062 | 4th |

---

## Faculty Credentials

| Email | Password | Name | Department |
|-------|----------|------|------------|
| facultyrajesh@college.edu | faculty123 | Dr. Rajesh Kumar | AI&DS |
| facultypriya@college.edu | faculty456 | Dr. Priya Sharma | CSE |
| facultyvikram@college.edu | faculty789 | Dr. Vikram Singh | EC |

---

## How to Login

1. Open browser: **http://localhost:3006**
2. Enter email from above
3. Enter password from above
4. Click Login

---

## Validation Rules

### Email Validation
- ✅ Student: Must match `student[8-digits]@college.edu`
- ✅ Faculty: Must match `faculty[name]@college.edu`
- ❌ Invalid: Wrong format will show error

### Password Validation
- ✅ Must be at least 8 characters
- ✅ Can contain: letters, numbers, special characters
- ✅ Any combination is allowed
- ❌ Less than 8 characters will show error

---

## Server Status

- Backend: http://localhost:5005 ✅
- Frontend: http://localhost:3006 ✅
- Database: MongoDB ✅

---

## Example Login

**Student Login:**
- Email: `student23102060@college.edu`
- Password: `password1`
- Result: Redirects to Student Dashboard

**Faculty Login:**
- Email: `facultyrajesh@college.edu`
- Password: `faculty123`
- Result: Redirects to Faculty Dashboard
