# Bulk Download ZIP - Quick Start Guide

## What's New
Faculty can now download all certificates, internships, and marks as ZIP files with student name and roll number in the filenames.

## Installation

### Step 1: Install Archiver Package
```bash
cd dashboard-backend
npm install archiver
```

### Step 2: Restart Backend
```bash
npm run dev
```

### Step 3: Done!
Frontend changes are already in place.

## How to Use

### Download Certificates
1. Faculty Dashboard → Department Details
2. Select year from dropdown
3. Click "Certifications" tab
4. Click "Download All Certificates (ZIP)"
5. ZIP file downloads with files named: `{rollNo}_{name}_{cert}.pdf`

### Download Internships
1. Faculty Dashboard → Department Details
2. Select year from dropdown
3. Click "Internships" tab
4. Click "Download All Internships (ZIP)"
5. ZIP file downloads with files named: `{rollNo}_{name}_{type}.pdf`

### Download Marks
1. Faculty Dashboard → Department Details
2. Select year from dropdown
3. Click "Marks" tab
4. Click "Download All Marks (ZIP)"
5. ZIP file downloads with files named: `{rollNo}_{name}_Semester{sem}.pdf`

## File Naming Examples

### Certificates
- `23102001_Atchaya_AWS_Certified.pdf`
- `23102002_Ragul_Google_Cloud.pdf`
- `23102003_Rifath_Azure_Certified.pdf`

### Internships
- `23102001_Atchaya_Internship.pdf`
- `23102002_Ragul_Leave.pdf`
- `23102003_Rifath_Internship.pdf`

### Marks
- `23102001_Atchaya_Semester4.pdf`
- `23102002_Ragul_Semester4.pdf`
- `23102003_Rifath_Semester4.pdf`

## ZIP Contents
Each ZIP file includes:
- All renamed files for the selected year
- `{type}_summary.csv` with details

Example:
```
certificates_2nd_year.zip
├── 23102001_Atchaya_AWS_Certified.pdf
├── 23102002_Ragul_Google_Cloud.pdf
├── certificates_summary.csv
```

## Features
- ✅ Files renamed with student info
- ✅ Summary CSV included
- ✅ Download button shows loading state
- ✅ Works for all years
- ✅ Error handling
- ✅ Efficient ZIP compression

## Troubleshooting

### ZIP not downloading?
- Check internet connection
- Verify backend is running
- Check browser console for errors

### Files not in ZIP?
- Verify files exist in uploads folder
- Check database records
- Check backend logs

### Wrong file names?
- Verify student data in database
- Check file extensions

## That's It!
Faculty can now easily download all documents with organized file names.
