# Job Search Platform

A full-stack Job Search & Management Platform built as part of an assignment. It features a modern, responsive user interface with advanced filtering, real-time search, data visualization, and duplicate job management.

## 🚀 Features

- **Analytics Dashboard**: High-level metrics and data visualization using Recharts for jobs by company, work mode, and employment type.
- **Advanced Job Search**: 
  - 500ms debounced search for optimized API calls
  - Multi-faceted filtering (Company, Location, Work Mode, Employment Type)
  - Sorting and server-side pagination
- **Job Details**: Comprehensive job view with a clean layout and responsive design. Features a truncatable description block for better UX.
- **Duplicate Review System**: A dedicated interface for recruiters to review, confirm, or ignore duplicate job postings.
- **High-Quality UI/UX**:
  - Fully responsive across Mobile, Tablet, and Desktop
  - Beautiful Loading Skeletons
  - Graceful Error and Empty states
  - Toast Notifications for immediate user feedback

## 🛠 Tech Stack

### Frontend
- **Framework**: React 19 + Vite
- **Styling**: Tailwind CSS
- **State Management & Fetching**: React Query (@tanstack/react-query)
- **Routing**: React Router DOM
- **Charts**: Recharts
- **Notifications**: React Hot Toast

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Architecture**: MVC Pattern (Controllers, Services, Models)

## 📦 Getting Started

### Prerequisites
- Node.js (v18+)
- MongoDB instance (local or Atlas)

### Setup

1. **Clone the repository**
   ```bash
   git clone <repo-url>
   cd job-search-platform
   ```

2. **Backend Setup**
   ```bash
   cd server
   npm install
   # Create a .env file with your MONGO_URI and PORT
   npm run seed # Import dummy jobs
   npm run dev
   ```

3. **Frontend Setup**
   ```bash
   cd client
   npm install
   npm run dev
   ```

4. **Open in Browser**
   Navigate to `http://localhost:5173`

## 💎 Polish Details
This project was built with a strong focus on production-ready quality:
- Network requests are **debounced** to prevent server spam.
- **Error Boundaries & Empty States** ensure users never see a broken white screen.
- Complex datasets are aggregated optimally in the backend (e.g., MongoDB `$limit: 10` for charts).
- The UI handles slow network connections gracefully with `animate-pulse` skeletons.
