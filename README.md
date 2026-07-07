<div align="center">
  <h1>ApplyWizz 🚀</h1>
  <p><strong>A production-ready Job Search & Duplicate Resolution Platform</strong></p>
</div>

---

ApplyWizz is a highly scalable, robust job management dashboard designed to help recruiters search, filter, and analyze job listings while providing a dedicated interface to identify and resolve duplicate job postings. 

This project was built with a strong emphasis on **production-readiness**, incorporating security, performance optimizations, and an exceptional user experience.

---

## 🛠 Tech Stack

**Frontend:** React 19, Vite, Tailwind CSS, React Query, React Router DOM, Recharts, React Hot Toast  
**Backend:** Node.js, Express.js, MongoDB, Mongoose  
**Security & Performance:** Zod (Validation), Express Rate Limit, Helmet, Compression, Morgan (Logging)  
**Deployment:** Vercel (Frontend), Render (Backend)

---

## 🏗 Architecture & Design

The application follows a strict **Model-View-Controller (MVC)** architecture on the backend and a modular, component-driven architecture on the frontend. 

**State Management**: `React Query` is utilized to handle all asynchronous server state, providing out-of-the-box caching, background fetching, and optimistic updates without the boilerplate of Redux.

### Folder Structure
```text
📦 job-search-platform
 ┣ 📂 client (Vite + React)
 ┃ ┣ 📂 src
 ┃ ┃ ┣ 📂 components (common, dashboard, jobs, duplicates)
 ┃ ┃ ┣ 📂 layouts (MainLayout)
 ┃ ┃ ┣ 📂 pages (Dashboard, Jobs, JobDetails, DuplicateReview, NotFound)
 ┃ ┃ ┣ 📂 services (api.js, job.service.js)
 ┃ ┃ ┗ 📂 routes
 ┗ 📂 server (Node.js + Express)
   ┣ 📂 src
   ┃ ┣ 📂 controllers (job.controller.js)
   ┃ ┣ 📂 models (job.model.js)
   ┃ ┣ 📂 routes (job.routes.js)
   ┃ ┣ 📂 services (job.service.js)
   ┃ ┣ 📂 validators (job.validator.js - Zod schemas)
   ┃ ┗ 📂 middleware (error, notFound, etc.)
```

---

## 🗄 Database Design & Optimization

The database is built on **MongoDB** with heavy optimizations for read-heavy operations:
- **Text Indexes**: A `$text` index is applied to `title`, `company`, and `description` to enable lightning-fast tokenized text searches (replacing inefficient `$regex` queries).
- **Compound Indexes**: Applied on filter-heavy fields like `location`, `workMode`, and `employmentType`.
- **Aggregation Pipelines**: The Dashboard charts utilize `$group`, `$sort`, and `$limit: 10` aggregation pipelines at the database layer to prevent shipping massive payloads to the client.

---

## 🔍 Duplicate Detection & Normalization

Detecting duplicate jobs ingested from various sources is a core feature of the platform.

1. **Normalization Pipeline**: Upon ingestion, fields are stripped of special characters, converted to lowercase, and mapped to `normalizedTitle` and `normalizedCompany`.
2. **Detection Logic**: 
   - **Exact Match**: If normalized fields match exactly, the job is flagged as `isDuplicate: true` with `duplicateType: "exact"`.
   - **Near Match**: Utilizing Levenshtein distance/fuzzy matching to flag similar roles (e.g., "Sr. SDE" vs "Senior Software Engineer").
3. **Resolution**: Recruiters use the UI to update the `duplicateStatus` to `confirmed` or `ignored`. 

---

## 🔌 API Design & Security

All APIs are documented in [`docs/api.md`](./docs/api.md) and secured against common vulnerabilities:
- **Zod Validation**: Strict runtime validation of query parameters (`page`, `limit`, `sortBy`) to prevent malicious inputs and OOM crashes.
- **Express Rate Limit**: Capped at 100 requests per 15 minutes to prevent DDoS and brute-force attacks.
- **Helmet**: Secures HTTP response headers automatically.
- **Compression**: Gzip compression is enabled via the `compression` middleware to drastically reduce JSON payload sizes over the wire.

---

## 📸 Screenshots

*(Replace with actual hosted image links)*

- **Dashboard**: `[Screenshot of Analytics Dashboard]`
- **Job Search**: `[Screenshot of Jobs Page with Filters]`
- **Duplicate Review**: `[Screenshot of the Duplicate Review Table]`

---

## ⚖️ Tradeoffs

1. **MongoDB Text Index vs. Elasticsearch**: For this iteration, native MongoDB `$text` indexes were chosen to minimize infrastructure complexity and cost while still providing high performance. In an enterprise environment with millions of records, Elasticsearch would be the superior choice.
2. **Client-Side vs Server-Side Rendering**: A Single Page Application (React) was chosen over Next.js (SSR) because SEO is typically not a requirement for an internal recruiter dashboard, prioritizing a rich, app-like interactive experience.

---

## 🚀 Future Improvements

- **AI Resume Tailoring (Bonus Feature)**: Integrating the Gemini API to match uploaded PDFs against job descriptions and provide gap analysis and match scores.
- **Redis Caching**: Implementing a Redis layer to cache static lookup values (Companies, Locations) and heavy Dashboard aggregation queries.

---

## 🌍 Deployment

- **Frontend**: Hosted on [Vercel](https://vercel.com/)
- **Backend**: Hosted on [Render](https://render.com/)

**Local Setup**:
1. `git clone` the repository.
2. In `/server`: Run `npm install`, setup your `.env` (`MONGO_URI`, `PORT`), and `npm run dev`.
3. In `/client`: Run `npm install`, setup `.env` (`VITE_API_URL`), and `npm run dev`.
