import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

import Dashboard from "../pages/Dashboard";
import Jobs from "../pages/Jobs";
import JobDetails from "../pages/JobDetails";
import DuplicateReview from "../pages/DuplicateReview";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Dashboard />} />

          <Route path="/jobs" element={<Jobs />} />

          <Route path="/jobs/:id" element={<JobDetails />} />

          <Route
            path="/duplicates"
            element={<DuplicateReview />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;