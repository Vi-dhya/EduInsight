# Student Details - Table Format Visual Guide

## Certificates Table Layout

### Full Desktop View
```
┌─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│                                                                                                                     │
│  My Details                                                                    [Upload Certificate]                 │
│                                                                                                                     │
│  Certifications Tab │ Internships Tab                                                                              │
│                                                                                                                     │
│  ┌─────────────────────────────────────────────────────────────────────────────────────────────────────────────┐  │
│  │ Student Name │ Roll No │ Certificate Name │ Issuer │ Date Obtained │ Upload Date │ Status │ Remarks │ File │  │
│  ├─────────────────────────────────────────────────────────────────────────────────────────────────────────────┤  │
│  │ Raj Kumar    │ 23102060│ AWS Certified    │ Amazon │ 2024-01-15    │ 2024-01-10  │ ✓ Acc  │ Valid  │ PDF  │  │
│  │              │         │ Solutions Arch   │ Web    │               │             │        │        │      │  │
│  ├─────────────────────────────────────────────────────────────────────────────────────────────────────────────┤  │
│  │ Raj Kumar    │ 23102060│ Google Cloud     │ Google │ 2024-01-20    │ 2024-01-18  │ ⚠ Pend │ Under  │ -    │  │
│  │              │         │ Associate        │ Cloud  │               │             │        │ review │      │  │
│  ├─────────────────────────────────────────────────────────────────────────────────────────────────────────────┤  │
│  │ Raj Kumar    │ 23102060│ Microsoft Azure  │ Micro  │ 2024-02-01    │ 2024-01-28  │ ✗ Rej  │ Doc    │ -    │  │
│  │              │         │ Fundamentals     │ soft   │               │             │        │ unclear│      │  │
│  └─────────────────────────────────────────────────────────────────────────────────────────────────────────────┘  │
│                                                                                                                     │
└─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┘
```

### Header Row
```
┌──────────────┬──────────┬──────────────────┬────────┬───────────────┬─────────────┬────────┬─────────┬──────┐
│ Student Name │ Roll No  │ Certificate Name │ Issuer │ Date Obtained │ Upload Date │ Status │ Remarks │ File │
├──────────────┼──────────┼──────────────────┼────────┼───────────────┼─────────────┼────────┼─────────┼──────┤
│ (Purple-Blue Gradient Background)                                                                        │
└──────────────┴──────────┴──────────────────┴────────┴───────────────┴─────────────┴────────┴─────────┴──────┘
```

### Data Row (Accepted)
```
┌──────────────┬──────────┬──────────────────┬────────┬───────────────┬─────────────┬────────┬─────────┬──────┐
│ Raj Kumar    │ 23102060 │ AWS Certified    │ Amazon │ 2024-01-15    │ 2024-01-10  │ ✓ Acc  │ Valid  │ PDF  │
│ (White)      │ (White)  │ (Gray)           │ (Gray) │ (Gray)        │ (Gray)      │ (Green)│ (Gray) │ (Pur)│
└──────────────┴──────────┴──────────────────┴────────┴───────────────┴─────────────┴────────┴─────────┴──────┘
```

### Data Row (Pending)
```
┌──────────────┬──────────┬──────────────────┬────────┬───────────────┬─────────────┬────────┬─────────┬──────┐
│ Raj Kumar    │ 23102060 │ Google Cloud     │ Google │ 2024-01-20    │ 2024-01-18  │ ⚠ Pend │ Under  │ -    │
│ (White)      │ (White)  │ (Gray)           │ (Gray) │ (Gray)        │ (Gray)      │(Yellow)│ (Gray) │      │
└──────────────┴──────────┴──────────────────┴────────┴───────────────┴─────────────┴────────┴─────────┴──────┘
```

### Data Row (Rejected)
```
┌──────────────┬──────────┬──────────────────┬────────┬───────────────┬─────────────┬────────┬─────────┬──────┐
│ Raj Kumar    │ 23102060 │ Microsoft Azure  │ Micro  │ 2024-02-01    │ 2024-01-28  │ ✗ Rej  │ Doc    │ -    │
│ (White)      │ (White)  │ (Gray)           │ (Gray) │ (Gray)        │ (Gray)      │ (Red)  │ (Gray) │      │
└──────────────┴──────────┴──────────────────┴────────┴───────────────┴─────────────┴────────┴─────────┴──────┘
```

---

## Internships Table Layout

### Full Desktop View
```
┌──────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│                                                                                                                      │
│  My Details                                                                                                          │
│                                                                                                                      │
│  Certifications Tab │ Internships Tab                                                                               │
│                                                                                                                      │
│  ┌────────────────────────────────────────────────────────────────────────────────────────────────────────────────┐ │
│  │ Student │ Roll │ Company │ Type │ Reason │ Duration │ Status │ Remarks │ Parent Phone │ Action │              │ │
│  │ Name    │ No   │         │      │        │          │        │         │              │        │              │ │
│  ├────────────────────────────────────────────────────────────────────────────────────────────────────────────────┤ │
│  │ Raj K.  │ 2310 │ Google  │ Sum  │ Skill  │ 2024-01  │ ✓ Comp │ Excell  │ ☎ 9876543200│ [Sent] │              │ │
│  │         │ 2060 │         │ mer  │ dev    │ to 03-31 │        │ perf    │             │        │              │ │
│  ├────────────────────────────────────────────────────────────────────────────────────────────────────────────────┤ │
│  │ Raj K.  │ 2310 │ Micro   │ Win  │ Hands  │ 2024-02  │ ⟳ Ongo │ In prog │ ☎ 9876543200│ [Send] │              │ │
│  │         │ 2060 │ soft    │ ter  │ on exp │ to 05-15 │        │ ress    │             │        │              │ │
│  └────────────────────────────────────────────────────────────────────────────────────────────────────────────────┘ │
│                                                                                                                      │
└──────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┘
```

### Header Row
```
┌──────────────┬──────────┬─────────┬──────┬────────┬──────────┬────────┬─────────┬──────────────┬────────┐
│ Student Name │ Roll No  │ Company │ Type │ Reason │ Duration │ Status │ Remarks │ Parent Phone │ Action │
├──────────────┼──────────┼─────────┼──────┼────────┼──────────┼────────┼─────────┼──────────────┼────────┤
│ (Purple-Blue Gradient Background)                                                                    │
└──────────────┴──────────┴─────────┴──────┴────────┴──────────┴────────┴─────────┴──────────────┴────────┘
```

### Data Row (Completed)
```
┌──────────────┬──────────┬─────────┬──────┬────────┬──────────┬────────┬─────────┬──────────────┬────────┐
│ Raj Kumar    │ 23102060 │ Google  │ Sum  │ Skill  │ 2024-01  │ ✓ Comp │ Excell  │ ☎ 9876543200│ [Sent] │
│ (White)      │ (White)  │ (Gray)  │(Gray)│ (Gray) │ (Gray)   │(Green) │ (Gray)  │ (Purple)    │(Green) │
└──────────────┴──────────┴─────────┴──────┴────────┴──────────┴────────┴─────────┴──────────────┴────────┘
```

### Data Row (Ongoing)
```
┌──────────────┬──────────┬─────────┬──────┬────────┬──────────┬────────┬─────────┬──────────────┬────────┐
│ Raj Kumar    │ 23102060 │ Micro   │ Win  │ Hands  │ 2024-02  │ ⟳ Ongo │ In prog │ ☎ 9876543200│ [Send] │
│ (White)      │ (White)  │ (Gray)  │(Gray)│ (Gray) │ (Gray)   │ (Blue) │ (Gray)  │ (Purple)    │ (Blue) │
└──────────────┴──────────┴─────────┴──────┴────────┴──────────┴────────┴─────────┴──────────────┴────────┘
```

---

## Status Badge Styles

### Accepted/Completed Badge
```
┌──────────────────┐
│ ✓ Accepted       │
│ (Green Badge)    │
│ bg-green-900     │
│ text-green-200   │
└──────────────────┘
```

### Rejected Badge
```
┌──────────────────┐
│ ✗ Rejected       │
│ (Red Badge)      │
│ bg-red-900       │
│ text-red-200     │
└──────────────────┘
```

### Pending Badge
```
┌──────────────────┐
│ ⚠ Pending        │
│ (Yellow Badge)   │
│ bg-yellow-900    │
│ text-yellow-200  │
└──────────────────┘
```

### Ongoing Badge
```
┌──────────────────┐
│ ⟳ Ongoing        │
│ (Blue Badge)     │
│ bg-blue-900      │
│ text-blue-200    │
└──────────────────┘
```

---

## Action Buttons

### Send Button (Not Sent)
```
┌──────────────────┐
│ [Send]           │
│ bg-blue-600      │
│ hover:bg-blue-700│
│ text-white       │
│ text-xs          │
└──────────────────┘
```

### Sent Status (Already Sent)
```
┌──────────────────┐
│ ✓ Sent           │
│ text-green-400   │
│ text-xs          │
│ (Button disabled)│
└──────────────────┘
```

---

## Mobile View (< 768px)

### Certificates Table
```
┌─────────────────────────────────────┐
│ My Details  [Upload Certificate]    │
├─────────────────────────────────────┤
│ Certs │ Internships                 │
├─────────────────────────────────────┤
│ ← Horizontal Scroll →               │
│ ┌───────────────────────────────┐   │
│ │ Student │ Roll │ Cert │ Issuer│   │
│ │ Name    │ No   │ Name │       │   │
│ ├───────────────────────────────┤   │
│ │ Raj K.  │ 2310 │ AWS  │ Amazon│   │
│ │         │ 2060 │ Cert │ Web   │   │
│ ├───────────────────────────────┤   │
│ │ Raj K.  │ 2310 │ Goog │ Google│   │
│ │         │ 2060 │ Cloud│ Cloud │   │
│ └───────────────────────────────┘   │
│                                     │
└─────────────────────────────────────┘
```

### Internships Table
```
┌─────────────────────────────────────┐
│ My Details                          │
├─────────────────────────────────────┤
│ Certs │ Internships                 │
├─────────────────────────────────────┤
│ ← Horizontal Scroll →               │
│ ┌───────────────────────────────┐   │
│ │ Student │ Roll │ Company │ Type│   │
│ │ Name    │ No   │         │    │   │
│ ├───────────────────────────────┤   │
│ │ Raj K.  │ 2310 │ Google  │ Sum│   │
│ │         │ 2060 │         │ mer│   │
│ ├───────────────────────────────┤   │
│ │ Raj K.  │ 2310 │ Micro   │ Win│   │
│ │         │ 2060 │ soft    │ ter│   │
│ └───────────────────────────────┘   │
│                                     │
└─────────────────────────────────────┘
```

---

## Tablet View (768px - 1024px)

### Certificates Table
```
┌──────────────────────────────────────────────────────┐
│ My Details                  [Upload Certificate]     │
├──────────────────────────────────────────────────────┤
│ Certifications Tab │ Internships Tab                 │
├──────────────────────────────────────────────────────┤
│ ← Horizontal Scroll →                                │
│ ┌────────────────────────────────────────────────┐   │
│ │ Student │ Roll │ Cert │ Issuer │ Date │ Status│   │
│ │ Name    │ No   │ Name │        │      │       │   │
│ ├────────────────────────────────────────────────┤   │
│ │ Raj K.  │ 2310 │ AWS  │ Amazon │ 2024 │ ✓ Acc │   │
│ │         │ 2060 │ Cert │ Web    │ 01   │       │   │
│ ├────────────────────────────────────────────────┤   │
│ │ Raj K.  │ 2310 │ Goog │ Google │ 2024 │ ⚠ Pend│   │
│ │         │ 2060 │ Cloud│ Cloud  │ 01   │       │   │
│ └────────────────────────────────────────────────┘   │
│                                                      │
└──────────────────────────────────────────────────────┘
```

---

## Row Styling

### Even Row (Index 0, 2, 4...)
```
┌─────────────────────────────────────────────────────┐
│ bg-gray-800                                         │
│ border-t border-gray-700                            │
│ hover:bg-gray-700 transition                        │
└─────────────────────────────────────────────────────┘
```

### Odd Row (Index 1, 3, 5...)
```
┌─────────────────────────────────────────────────────┐
│ bg-gray-750                                         │
│ border-t border-gray-700                            │
│ hover:bg-gray-700 transition                        │
└─────────────────────────────────────────────────────┘
```

---

## Column Alignment

### Left-Aligned Columns
- Student Name
- Roll No
- Certificate Name
- Company
- Type
- Reason
- Issuer
- Remarks

### Center-Aligned Columns
- Status
- Action

### Right-Aligned Columns
- Dates
- File
- Parent Phone

---

## Interaction States

### Button States

**Normal State**
```
[Send]
bg-blue-600
text-white
cursor-pointer
```

**Hover State**
```
[Send]
bg-blue-700
text-white
cursor-pointer
```

**Disabled State (Sent)**
```
✓ Sent
text-green-400
cursor-default
```

### Row Hover State
```
bg-gray-700 (from bg-gray-800 or bg-gray-750)
transition smooth
```

---

## Accessibility Features

### Semantic Structure
```html
<table>
  <thead>
    <tr>
      <th>Column Header</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Data Cell</td>
    </tr>
  </tbody>
</table>
```

### Color Contrast
- Text on background: WCAG AA compliant
- Status badges: High contrast
- Buttons: Clear visual distinction

### Keyboard Navigation
- Tab through table cells
- Tab through buttons
- Enter to activate buttons

---

## Summary

The table format provides:
- ✓ Clean, organized data display
- ✓ Professional appearance
- ✓ Easy to scan information
- ✓ Responsive on all devices
- ✓ Accessible interface
- ✓ Efficient use of space
- ✓ Clear visual hierarchy
- ✓ Intuitive interactions
