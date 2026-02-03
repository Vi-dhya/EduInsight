# Quick Start - Notice Board Fix

## The Issue
Student notice board was showing "No notice available yet" because there were no notices in the database with the correct type and department.

## The Fix
Updated the seed data to create notices with `type: 'general'` and `department: 'AI&DS'` so they match the student's query.

## How to Apply

### Step 1: Run the Seed Script
Open terminal in the project root and run:
```bash
cd dashboard-backend
npm run seed
```

This will populate the database with test notices that students can see.

### Step 2: Refresh the Student Notice Board
1. Log in as a student
2. Navigate to Notice Board
3. You should now see 7 notices from faculty

### Step 3: Test Faculty Posting
1. Log in as faculty
2. Navigate to Notice Board
3. Click "Add Notice"
4. Fill in the form and click "Post Notice"
5. Log back in as student
6. The new notice should appear immediately

## What Notices Will Show Up
After running the seed script, students will see:
1. Semester Exam Schedule Released (High Priority)
2. Certificate Upload Deadline Extended (Medium Priority)
3. Internship Opportunities Available (Medium Priority)
4. Important: Hall Assignment Released (High Priority)
5. Marks Update Notification (Low Priority)
6. AI&DS Department Time Table Updated (High Priority)
7. Department Seminar - Machine Learning Applications (Medium Priority)

## Troubleshooting

### Still Showing "No notice available yet"?
1. Make sure the backend server is running
2. Check browser console for API errors
3. Verify the token is being sent with the request
4. Check that the database connection is working

### Notices not appearing after faculty posts?
1. Make sure you're logged in as faculty
2. Check that the form is filled correctly
3. Look for success message after posting
4. Refresh the student page to see new notices

## Files Changed
- `dashboard-backend/scripts/seedData.js` - Updated to create notices with correct type

## System Architecture
```
Faculty Dashboard
    ↓ (posts notice)
Backend API (/api/notices)
    ↓ (saves to MongoDB)
MongoDB Database
    ↓ (fetches notices)
Student Dashboard
    ↓ (displays notices)
Student sees notice board
```

## Key Points
- Notices are stored in MongoDB with timestamps
- Faculty can post notices through the UI
- Students see notices immediately
- HOD sees notices in dashboard
- All data is persistent across page refreshes
