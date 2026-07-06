import express from "express";
import cors from "cors";
import errorHandler from "./middleware/error.middleware.js";
import notFound from "./middleware/notFound.middleware.js";
import dashboardRoutes from "./routes/dashboard.routes.js";
import jobRoutes from "./routes/job.routes.js";
import duplicateRoutes from "./routes/duplicate.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/dashboard", dashboardRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/duplicates", duplicateRoutes);

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Job Search Platform API Running",
  });
});

app.use(notFound);
app.use(errorHandler);

export default app;
