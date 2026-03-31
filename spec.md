# LG-9 Student Club Management

## Current State
No existing frontend files. Building from scratch.

## Requested Changes (Diff)

### Add
- Full React + TypeScript frontend with React Router
- Simulated auth with role-based access (admin/student)
- Shared global state via React Context for clubs, students, requests, notifications
- Admin pages: Dashboard stats, Student Approval, Club Join Requests, Create/Delete Club
- Student pages: View Clubs (join/leave), My Clubs, Event Registration, Profile
- Notification system with dropdown
- Dark mode toggle
- Search and filter for clubs
- Status badges (Pending=Yellow, Approved=Green, Rejected=Red)
- Toast notifications on key actions

### Modify
- N/A

### Remove
- N/A

## Implementation Plan
1. AppContext.tsx - shared state: clubs, students, joinRequests, notifications, events, currentUser
2. App.tsx - React Router setup with role-based route guards
3. Layout components: Sidebar, Topbar with dark mode and notifications
4. Login page with admin/student login simulation
5. Admin pages: Dashboard, Students (/admin/students), Requests (/admin/requests), Clubs management
6. Student pages: /dashboard, /clubs, /my-clubs, /profile
7. Fully wired state - every button updates context state, UI reflects instantly
