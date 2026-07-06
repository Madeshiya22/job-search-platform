import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const basePath = path.join(__dirname, 'client', 'src');

const directories = [
  'assets',
  'components/common',
  'components/dashboard',
  'components/jobs',
  'components/duplicates',
  'layouts',
  'pages',
  'routes',
  'services',
  'hooks',
  'utils',
  'constants'
];

const files = {
  'components/common/Navbar.jsx': `export default function Navbar() { return <nav>Navbar</nav>; }`,
  'components/common/Sidebar.jsx': `export default function Sidebar() { return <aside>Sidebar</aside>; }`,
  'components/common/Loader.jsx': `export default function Loader() { return <div>Loading...</div>; }`,
  'components/dashboard/DashboardCards.jsx': `export default function DashboardCards() { return <div>DashboardCards</div>; }`,
  'components/jobs/JobCard.jsx': `export default function JobCard() { return <div>JobCard</div>; }`,
  'components/jobs/JobFilters.jsx': `export default function JobFilters() { return <div>JobFilters</div>; }`,
  'components/jobs/JobTable.jsx': `export default function JobTable() { return <div>JobTable</div>; }`,
  'components/duplicates/DuplicateTable.jsx': `export default function DuplicateTable() { return <div>DuplicateTable</div>; }`,
  'layouts/MainLayout.jsx': `import { Outlet } from "react-router-dom";\nimport Navbar from "../components/common/Navbar";\nimport Sidebar from "../components/common/Sidebar";\n\nexport default function MainLayout() {\n  return (\n    <div className="flex h-screen bg-gray-50">\n      <Sidebar />\n      <div className="flex-1 flex flex-col overflow-hidden">\n        <Navbar />\n        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-6">\n          <Outlet />\n        </main>\n      </div>\n    </div>\n  );\n}`,
  'pages/Dashboard.jsx': `export default function Dashboard() { return <div>Dashboard Page</div>; }`,
  'pages/Jobs.jsx': `export default function Jobs() { return <div>Jobs Page</div>; }`,
  'pages/JobDetails.jsx': `export default function JobDetails() { return <div>JobDetails Page</div>; }`,
  'pages/DuplicateReview.jsx': `export default function DuplicateReview() { return <div>DuplicateReview Page</div>; }`,
  'routes/AppRoutes.jsx': `import { Routes, Route } from "react-router-dom";\nimport MainLayout from "../layouts/MainLayout";\nimport Dashboard from "../pages/Dashboard";\nimport Jobs from "../pages/Jobs";\nimport JobDetails from "../pages/JobDetails";\nimport DuplicateReview from "../pages/DuplicateReview";\n\nexport default function AppRoutes() {\n  return (\n    <Routes>\n      <Route path="/" element={<MainLayout />}>\n        <Route index element={<Dashboard />} />\n        <Route path="jobs" element={<Jobs />} />\n        <Route path="jobs/:id" element={<JobDetails />} />\n        <Route path="duplicates" element={<DuplicateReview />} />\n      </Route>\n    </Routes>\n  );\n}`,
  'services/api.js': `import axios from "axios";\n\nconst api = axios.create({\n  baseURL: "http://localhost:5000/api",\n});\n\nexport default api;`,
  'services/dashboard.service.js': `import api from "./api";\n\nexport const getDashboardStats = async () => {\n  const res = await api.get("/dashboard");\n  return res.data;\n};`,
  'services/job.service.js': `import api from "./api";\n\nexport const getJobs = async (params) => {\n  const res = await api.get("/jobs", { params });\n  return res.data;\n};\n\nexport const getJobDetails = async (id) => {\n  const res = await api.get(\`/jobs/\${id}\`);\n  return res.data;\n};`,
  'App.jsx': `import { BrowserRouter } from "react-router-dom";\nimport AppRoutes from "./routes/AppRoutes";\n\nfunction App() {\n  return (\n    <BrowserRouter>\n      <AppRoutes />\n    </BrowserRouter>\n  );\n}\n\nexport default App;`,
  'main.jsx': `import { StrictMode } from "react";\nimport { createRoot } from "react-dom/client";\nimport "./index.css";\nimport App from "./App.jsx";\n\ncreateRoot(document.getElementById("root")).render(\n  <StrictMode>\n    <App />\n  </StrictMode>\n);`
};

directories.forEach(dir => {
  const dirPath = path.join(basePath, dir);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
});

Object.entries(files).forEach(([file, content]) => {
  const filePath = path.join(basePath, file);
  fs.writeFileSync(filePath, content);
});

console.log('Frontend boilerplate generated successfully.');
