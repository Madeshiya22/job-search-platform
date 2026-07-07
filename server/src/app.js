import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import compression from "compression";
import rateLimit from "express-rate-limit";
import errorHandler from "./middleware/error.middleware.js";
import notFound from "./middleware/notFound.middleware.js";
import dashboardRoutes from "./routes/dashboard.routes.js";
import jobRoutes from "./routes/job.routes.js";
import duplicateRoutes from "./routes/duplicate.routes.js";

const app = express();

app.use(helmet());
app.use(compression());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: {
    success: false,
    message: "Too many requests from this IP, please try again after 15 minutes.",
  },
});

app.use(limiter);

app.use(
  cors({
    origin: ["http://localhost:5173"],
  })
);
app.use(morgan("dev"));
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
