import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    // Job Basic Information
    title: {
      type: String,
      required: true,
      trim: true,
    },

    company: {
      type: String,
      required: true,
      trim: true,
    },

    location: {
      type: String,
      trim: true,
      default: "Not Specified",
    },

    url: {
      type: String,
      trim: true,
    },

    description: {
      type: String,
      default: "",
    },

    skills: [
      {
        type: String,
        trim: true,
      },
    ],

    // Job Details
    applyType: {
      type: String,
      trim: true,
      default: "Unknown",
    },

    experienceLevel: {
      type: String,
      trim: true,
      default: "Unknown",
    },

    employmentType: {
      type: String,
      trim: true,
      default: "Unknown",
    },

    department: {
      type: String,
      trim: true,
      default: "General",
    },

    workMode: {
      type: String,
      trim: true,
      default: "Unknown",
    },

    // Salary Information
    salary: {
      raw: {
        type: String,
        default: "",
      },

      min: {
        type: Number,
        default: null,
      },

      max: {
        type: Number,
        default: null,
      },

      currency: {
        type: String,
        default: "",
      },
    },

    postedDate: {
      type: Date,
      default: null,
    },

    // Normalized Fields (for search & duplicate detection)
    normalizedTitle: {
      type: String,
      index: true,
    },

    normalizedCompany: {
      type: String,
      index: true,
    },

    // Duplicate Detection
    isDuplicate: {
      type: Boolean,
      default: false,
    },

    duplicateType: {
      type: String,
      enum: ["exact", "near", null],
      default: null,
    },

    duplicateStatus: {
      type: String,
      enum: ["pending", "confirmed", "ignored"],
      default: "pending",
    },

    duplicateOf: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes for faster searching
jobSchema.index({
  title: "text",
  company: "text",
  description: "text",
});

jobSchema.index({
  company: 1,
});

jobSchema.index({
  location: 1,
});

jobSchema.index({
  employmentType: 1,
});

jobSchema.index({
  workMode: 1,
});

const Job = mongoose.model("Job", jobSchema);

export default Job;
