# Low-Level Design (LLD)

## 1. Frontend Folder Structure

client/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── common/
│   │   ├── layout/
│   │   ├── notes/
│   │   └── auth/
│   ├── pages/
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── Dashboard.jsx
│   │   └── NotFound.jsx
│   ├── services/
│   │   ├── api.js
│   │   ├── authService.js
│   │   └── noteService.js
│   ├── hooks/
│   ├── context/
│   ├── utils/
│   ├── routes/
│   ├── App.jsx
│   └── main.jsx

---

## 2. Backend Folder Structure

server/
├── config/
├── controllers/
│   ├── authController.js
│   ├── noteController.js
│   └── folderController.js
├── middleware/
│   ├── authMiddleware.js
│   └── errorMiddleware.js
├── models/
│   ├── User.js
│   ├── Note.js
│   └── Folder.js
├── routes/
│   ├── authRoutes.js
│   ├── noteRoutes.js
│   └── folderRoutes.js
├── services/
│   ├── authService.js
│   ├── noteService.js
│   └── folderService.js
├── utils/
├── app.js
└── server.js

---

## 3. Frontend Components

Layout
- Navbar
- Sidebar
- MainLayout

Authentication
- LoginForm
- RegisterForm

Notes
- NoteCard
- NoteList
- NoteEditor
- SearchBar
- FolderList

---

## 4. Backend Modules

Authentication
- Register
- Login
- JWT Verification

Notes
- Create
- Read
- Update
- Delete
- Search

Folders
- Create
- Rename
- Delete

---

## 5. Database Models

User
- username
- email
- password

Note
- title
- content
- tags
- folderId
- userId
- isPinned
- isArchived

Folder
- name
- userId

---

## 6. API Flow

Frontend
↓
Route
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

---

## 7. Error Handling

- Invalid input
- Unauthorized access
- Note not found
- Database errors
- Server errors