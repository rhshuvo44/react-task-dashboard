# React Task Dashboard

**A responsive admin dashboard for managing and analyzing articles.**

---

## Live Demo

[View the deployed site](https://react-task-dashboard-dusky.vercel.app)

---

## Features

### Core Functionality

* **Articles Dashboard**

  * Displays a list of articles with **Title**, **Author**, **Published Date**, **Views**, **Likes**, and **Comments**.
  * Supports **filtering** by author and date range.
  * Includes **search input** for filtering articles by title (case-insensitive).
  * **Sorting** enabled for views, likes, and comments.
  * Supports **pagination** for handling large datasets.

* **Performance Visualization**

  * Displays article view counts on a **line or bar chart** using Recharts or Chart.js.
  * Can toggle between **daily** and **monthly** views.
  * Automatically updates based on the applied filters.

* **Edit Article Modal**

  * Opens a modal to edit article **Title**, **Content**, and **Status** (Published / Draft).
  * Includes basic **form validation** for required fields.
  * Saves changes via a mock or local API and shows a success message upon completion.

### Bonus (Implemented)

* **React Context API** (or Redux Toolkit Query) for state management.
* **Debounced filters** to improve table performance.
* **Fake login system**, storing a token in localStorage.
* **Role-based UI logic** (`admin` vs `editor`) for conditional rendering of actions.
 
---

## Tech Stack

* **Framework**: React (with TypeScript)
* **Bundler**: Vite
* **UI Library**: Ant Design
* **Charts**: Recharts or Chart.js
* **State Management**: Redux 
* **Routing**: React Router
* **Styles**: Tailwind CSS 

---

## Setup & Run

```bash
# Clone the repository
git clone https://github.com/rhshuvo44/react-task-dashboard.git
cd react-task-dashboard

# Install dependencies
npm install

# Run in development mode
npm run dev

# Build for production
npm run build
```

---

## Usage Guide

1. **Login screen**: Use `admin/password` or `editor/password` to log in.
2. After login, you'll land on the **Dashboard**:

   * Use filters and search to narrow down articles.
   * Click table headers to sort.
3. Edit an article:

   * Click **Edit** → modify fields (status editable for admin only).
   * Click **Save** — data persists via the mock API.
4. **Performance Chart** updates based on filter selections and range mode (daily/monthly).
5. **Role-based behavior**:

   * **Admin**: Can edit, change status, and delete articles.
   * **Editor**: Can edit but cannot change status or delete.
   * Guests/read-only: Limited access.

---

---

## License

This project is open source—feel free to explore, use, and contribute!

---

Let me know if you’d like me to structure different sections or tailor this further for clarity or branding!
