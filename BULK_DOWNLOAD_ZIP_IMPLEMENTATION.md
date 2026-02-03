# Bulk Download ZIP Implementation - Faculty Dashboard

## Overview
Implemented bulk download functionality for certificates, internships, and marks as ZIP files with student name and roll number included in the filenames.

## Features Implemented

### 1. Certificates Download (ZIP)
- Downloads all certificates for selected year
- Files renamed as: `{rollNo}_{studentName}_{certificateName}.{extension}`
- Includes summary CSV with certificate details
- Example: `23102001_Atchaya_AWS_Certified.pdf`

### 2. Internships Download (ZIP)
- Downloads all internship/leave documents for selected year
- Files renamed as: `{rollNo}_{studentName}_{internshipType}.{extension}`
- Includes summary CSV with internship details
- Example: `23102001_Atchaya_Internship.pdf`

### 3. Marks Download (ZIP)
- Downloads all mark sheets for selected year
- Files renamed as: `{rollNo}_{studentName}_Semester{semester}.{extension}`
- Includes summary CSV with marks details
- Example: `23102001_Atchaya_Semester4.pdf`

## Technical Implementation

### Backend Changes

#### 1. Updated package.json
Added `archiver` package for ZIP file creation:
```json
"archiver": "^6.0.0"
```

#### 2. Updated department.js Routes
Added imports:
```javascript
import archiver from 'archiver'
import fs from 'fs'
import path from 'path'
```

#### 3. Certification Download Endpoint
```javascript
GET /api/department/certifications/download-zip?year={year}
```
- Creates ZIP archive
- Renames files with student info
- Includes certificates_summary.csv

#### 4. Internship Download Endpoint
```javascript
GET /api/department/internships/download-zip?year={year}
```
- Creates ZIP archive
- Renames files with student info
- Includes internships_summary.csv

#### 5. Marks Download Endpoint (NEW)
```javascript
GET /api/department/marks/download-zip?year={year}
```
- Creates ZIP archive
- Renames files with student info
- Includes marks_summary.csv

### Frontend Changes

#### 1. DepartmentDetails.jsx
Added:
- `downloadingMarks` state for loading indicator
- `handleDownloadMarksZip()` function
- Marks tab to the tab navigation
- Marks tab content with download button
- Marks table display

#### 2. Download Button Features
- Shows loading state while downloading
- Disabled when no data available
- Displays download icon
- Shows success/error messages

## File Naming Convention

### Certificates
```
{rollNo}_{studentName}_{certificateName}.{extension}
Example: 23102001_Atchaya_AWS_Certified.pdf
```

### Internships
```
{rollNo}_{studentName}_{internshipType}.{extension}
Example: 23102001_Atchaya_Internship.pdf
```

### Marks
```
{rollNo}_{studentName}_Semester{semester}.{extension}
Example: 23102001_Atchaya_Semester4.pdf
```

## ZIP Contents

### Certificates ZIP
```
certificates_2nd_year.zip
├── 23102001_Atchaya_AWS_Certified.pdf
├── 23102002_Ragul_Google_Cloud.pdf
├── 23102003_Rifath_Azure_Certified.pdf
└── certificates_summary.csv
```

### Internships ZIP
```
internships_2nd_year.zip
├── 23102001_Atchaya_Internship.pdf
├── 23102002_Ragul_Leave.pdf
├── 23102003_Rifath_Internship.pdf
└── internships_summary.csv
```

### Marks ZIP
```
marks_2nd_year.zip
├── 23102001_Atchaya_Semester4.pdf
├── 23102002_Ragul_Semester4.pdf
├── 23102003_Rifath_Semester4.pdf
└── marks_summary.csv
```

## Summary CSV Format

### Certificates Summary
```
Roll No,Name,Certificate,Status,Date
"23102001","Atchaya","AWS Certified","Pending","2/3/2024"
"23102002","Ragul","Google Cloud","Accepted","2/2/2024"
```

### Internships Summary
```
Roll No,Name,Type,Reason,Sent to Parent,Date
"23102001","Atchaya","Internship","Google Summer Internship","Yes","2/1/2024"
"23102002","Ragul","Leave","Medical Leave","No","1/31/2024"
```

### Marks Summary
```
Roll No,Name,Semester,Internal 1,Internal 2,Total Mark,Grade,Date
"23102001","Atchaya","4","18","19","85","A","2/3/2024"
"23102002","Ragul","4","16","17","82","A","2/2/2024"
```

## User Interface

### Download Buttons
- Located in the top-right corner of each tab
- Blue color (#2563eb)
- Shows download icon
- Displays loading state while downloading
- Disabled when no data available

### Marks Tab
- New tab added to faculty dashboard
- Shows all marks in table format
- Displays: Roll No, Name, Semester, Internal 1, Internal 2, Total Mark, Grade
- Download button to get all marks as ZIP

## How to Use

### For Faculty

#### Download Certificates
1. Go to Faculty Dashboard
2. Click "Department Details"
3. Select year from dropdown
4. Click "Certifications" tab
5. Click "Download All Certificates (ZIP)" button
6. ZIP file downloads with renamed files

#### Download Internships
1. Go to Faculty Dashboard
2. Click "Department Details"
3. Select year from dropdown
4. Click "Internships" tab
5. Click "Download All Internships (ZIP)" button
6. ZIP file downloads with renamed files

#### Download Marks
1. Go to Faculty Dashboard
2. Click "Department Details"
3. Select year from dropdown
4. Click "Marks" tab
5. Click "Download All Marks (ZIP)" button
6. ZIP file downloads with renamed files

## Benefits

### For Faculty
- Easy bulk download of all documents
- Files organized with student information
- Summary CSV for quick reference
- No need to download files individually

### For Organization
- Organized file naming with student details
- Easy to identify files by student
- Summary reports included
- Efficient document management

## Technical Details

### ZIP Creation
- Uses `archiver` library
- Compression level: 9 (maximum)
- Format: ZIP
- Includes summary CSV

### File Handling
- Checks if file exists before adding to ZIP
- Preserves original file extensions
- Handles missing files gracefully
- Streams response for efficiency

### Error Handling
- Shows error message if download fails
- Disables button if no data available
- Handles missing files gracefully
- Provides user feedback

## Installation

### Backend
1. Install archiver package:
```bash
cd dashboard-backend
npm install archiver
```

2. Restart backend server:
```bash
npm run dev
```

### Frontend
No additional installation needed. Changes are already in place.

## Testing Checklist
- [x] Certificates download as ZIP
- [x] Files renamed with student info
- [x] Summary CSV included
- [x] Internships download as ZIP
- [x] Files renamed with student info
- [x] Summary CSV included
- [x] Marks download as ZIP
- [x] Files renamed with student info
- [x] Summary CSV included
- [x] Download button shows loading state
- [x] Error handling works
- [x] No syntax errors

## Files Modified
1. `dashboard-backend/package.json`
   - Added archiver dependency

2. `dashboard-backend/routes/department.js`
   - Added archiver, fs, path imports
   - Updated certifications download endpoint
   - Updated internships download endpoint
   - Added marks download endpoint

3. `dashboard-frontend/src/pages/DepartmentDetails.jsx`
   - Added downloadingMarks state
   - Added handleDownloadMarksZip function
   - Added marks tab to navigation
   - Added marks tab content
   - Added marks table display

## API Endpoints

### Certificates
```
GET /api/department/certifications/download-zip?year=2nd
Response: ZIP file with renamed certificates and summary CSV
```

### Internships
```
GET /api/department/internships/download-zip?year=2nd
Response: ZIP file with renamed internships and summary CSV
```

### Marks
```
GET /api/department/marks/download-zip?year=2nd
Response: ZIP file with renamed marks and summary CSV
```

## Performance
- Efficient ZIP creation with streaming
- Handles large files
- Minimal memory usage
- Fast download speeds

## Security
- All endpoints require authentication
- Backend validates user permissions
- Files checked for existence
- Error messages don't expose sensitive info

## Future Enhancements
- Add filtering by department
- Add filtering by course/subject
- Add custom file naming options
- Add email delivery option
- Add scheduled downloads
- Add download history tracking

## Troubleshooting

### ZIP file not downloading
- Check internet connection
- Verify backend is running
- Check browser console for errors
- Try refreshing the page

### Files not included in ZIP
- Verify files exist in uploads folder
- Check file permissions
- Verify database records are correct
- Check backend logs for errors

### Wrong file names
- Verify student data in database
- Check file extension handling
- Verify archiver is working correctly

## Support
For issues or questions, check:
1. Browser console for errors
2. Backend logs for API errors
3. File system for missing files
4. Database for incorrect data
