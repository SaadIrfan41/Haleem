# Yearly Recap Application 🎵✨

A nostalgic, Spotify Wrapped-style web application for creating and viewing personal yearly recaps. This project features a full-stack architecture with a React frontend and a modular Node.js/Express backend.

## 🎯 Requirements & Achievements

| Requirement | Status | Implementation Details |
|-------------|--------|------------------------|
| **Responsive Design** | ✅ Achieved | Built with **Tailwind CSS**. Fully responsive on mobile, tablet, and desktop. Glassmorphism UI ensures legibility across themes. |
| **Authentication** | ✅ Achieved | **Passport.js** (Local Strategy) + **Express Sessions**. Users can sign up (via seed), login, and logout. Private recaps are securely gated. |
| **Dynamic Themes** | ✅ Achieved | Database-driven styling. Themes (Neon Night, Cyberpunk) define colors and fonts, which are applied dynamically to UI components. |
| **Recap Creation** | ✅ Achieved | Multi-step wizard (`RecapCreationModal`) allowing users to select themes, add pages with images from a library, and publish content. |
| **Slideshow View** | ✅ Achieved | Interactive slideshow component with progress bars, touch/click navigation, and animations matching the selected theme. |
| **Data Persistence** | ✅ Achieved | **SQLite** database with **Knex.js** ORM. Handles relationships between Users, Recaps, Pages, Themes, and Images. |

---

## 🎨 Frontend Architecture

The frontend is a Single Page Application (SPA) built for performance and interactivity.

### **Tech Stack**
- **Framework:** React 18 + Vite (Fast HMR & Build)
- **Styling:** Tailwind CSS (Utility-first, v3)
- **HTTP Client:** Native `fetch` (via API service wrapper)
- **State Management:** React Context API (`AuthContext`)

### **Key Components**
*   **`App.jsx`**: Main controller. Handles routing (view switching), global loading states, and modal coordination.
*   **`RecapCard.jsx`**: Displays a summary of a recap. Uses `theme` props to dynamically style the card's aurora gradients and fonts.
*   **`Slideshow.jsx`**: The core "Story" experience. Manages slide transitions, timers, and progress bars.
*   **`RecapCreationModal.jsx`**: A complex multi-step form:
    1.  **Theme Selection**: Visual grid of available styles.
    2.  **Page Editor**: dynamic inputs based on selected image metadata.
    3.  **Finalize**: Title and visibility settings.
*   **`LoginModal.jsx`**: Glassmorphism auth form with error handling.

### **Folder Structure**
```
client/
├── public/             # Static assets
├── src/
│   ├── components/     # Reusable UI components (RecapCard, Slideshow, etc.)
│   ├── context/        # Global state (AuthContext.jsx)
│   ├── services/       # API integration (api.js - centralizes fetch calls)
│   ├── styles/         # Global CSS and Tailwind directives
│   ├── App.jsx         # Main application logic
│   └── main.jsx        # Entry point
```

---

## ⚙️ Backend Architecture

The backend is a robust REST API designed with modularity in mind.

### **Tech Stack**
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** SQLite3
- **ORM/Query Builder:** Knex.js
- **Authentication:** Passport.js + bcrypt + express-session

### **Architecture: MVC & Modular**
We refactored a monolithic server into a clean separation of concerns:

1.  **Controllers** (`server/controllers/`): Handle business logic.
    *   `authController.js`: Login, register (seed-based), logout.
    *   `recapController.js`: CRUD for Recaps. Complex filtering for private/public visibility.
    *   `themeController.js`: Fetches themes and provides the image library.
2.  **Routes** (`server/routes/`): Define API endpoints and map them to controllers.
    *   `auth.js`, `recaps.js`, `themes.js`.
3.  **Middleware** (`server/middleware/`):
    *   `auth.js`: Protects routes requiring login (`isAuthenticated`).
4.  **Database** (`server/database/`):
    *   `db.js`: Knex configuration and schema migration (init tables).
    *   `seeds.js`: Populates initial data (Users, Themes, Images) and handles data integrity.

### **Database Schema**
*   **Users**: `id`, `username`, `password` (hashed).
*   **Themes**: `id`, `name`, `colors` (primary, secondary, accent, background), `font`.
*   **Recaps**: `id`, `title`, `author_id`, `theme_id`, `public` (bool).
*   **Pages**: `id`, `recap_id`, `image_id`, `text1`, `text2`, `text3`, `order`.
*   **Images**: `id`, `url`, `theme_id`, `fields` (metadata for UI inputs).

### **Folder Structure**
```
server/
├── config/             # Configuration (passport.js)
├── controllers/        # Route logic (auth, recaps, themes)
├── database/           # DB setup (db.js, seeds.js, sqlite file)
├── middleware/         # Custom middleware (auth checks)
├── routes/             # API route definitions
├── app.js              # Express app setup (middleware, cors, logging)
└── index.js            # Server entry point
```

---

## 🚀 Getting Started

### Prerequisites
*   Node.js (v14+)
*   npm

### Installation

1.  **Install Dependencies** (Root aka Backend + Client)
    ```bash
    # Install backend deps
    npm install
    
    # Install client deps
    cd client
    npm install
    ```

2.  **Run the Application**
    You need two terminals:

    **Terminal 1 (Backend):**
    ```bash
    # From root directory
    cd server
    node index.js
    ```
    *This will auto-create the database and seed it on the first run.*

    **Terminal 2 (Frontend):**
    ```bash
    # From root directory
    cd client
    npm run dev
    ```

3.  **Access**
    Open `http://localhost:5173` in your browser.

### Dummy Login Credentials
*   **Username:** `hal_dev` | `coffee_lover` | `retro_fan`
*   **Password:** `password123`
