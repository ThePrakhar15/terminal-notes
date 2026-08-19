# High-Level Design (HLD)

## 1. System Architecture

User
↓
React Frontend
↓
Axios (HTTP Requests)
↓
Express Backend
↓
JWT Middleware
↓
Controllers
↓
Services
↓
Models (Mongoose)
↓
MongoDB

---

## 2. Request Flow

User
↓
React UI
↓
Axios Request
↓
Express Route
↓
JWT Authentication
↓
Controller
↓
Service
↓
Model
↓
MongoDB
↓
Response
↓
React UI

---

## 3. Frontend Architecture

App
├── Layout
│   ├── Navbar
│   ├── Sidebar
│   └── Main Content
├── Pages
│   ├── Login
│   ├── Register
│   └── Dashboard
└── Components
    ├── NoteCard
    ├── NoteEditor
    ├── SearchBar
    └── FolderList

---

## 4. Backend Architecture

Routes
↓
Controllers
↓
Services
↓
Models
↓
MongoDB

---

## 5. Database Collections

User
- username
- email
- password

Note
- title
- content
- userId
- folderId
- tags
- isPinned
- isArchived

Folder
- name
- userId

---

## 6. API Endpoints

Authentication
POST /api/auth/register
POST /api/auth/login
GET  /api/auth/me

Notes
GET    /api/notes
GET    /api/notes/:id
POST   /api/notes
PUT    /api/notes/:id
DELETE /api/notes/:id

Folders
GET    /api/folders
POST   /api/folders
PUT    /api/folders/:id
DELETE /api/folders/:id

---

## 7. Authentication Flow

Register
↓
Password Hashing (bcrypt)
↓
MongoDB
↓
Login
↓
JWT Token
↓
Protected API Requests