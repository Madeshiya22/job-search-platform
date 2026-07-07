# ApplyWizz API Documentation

This document outlines the core API endpoints available in the ApplyWizz backend.

---

## 1. Get Jobs
Retrieves a paginated, filterable, and sortable list of jobs.

**Endpoint:** `GET /api/jobs`

### Query Parameters

| Parameter | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `page` | `integer` | `1` | Page number for pagination (minimum: 1). |
| `limit` | `integer` | `10` | Number of items per page (maximum: 100). |
| `search` | `string` | `null` | Uses MongoDB `$text` index to search by `title` and `company`. |
| `company` | `string` | `null` | Exact match filter for company name. |
| `location` | `string` | `null` | Exact match filter for location. |
| `workMode` | `string` | `null` | Exact match filter for work mode (e.g., Remote, Hybrid). |
| `employmentType` | `string` | `null` | Exact match filter for employment type (e.g., Full-time). |
| `experienceLevel`| `string` | `null` | Exact match filter for experience level. |
| `sortBy` | `string` | `postedDate` | Field to sort the results by (e.g., `title`, `company`, `createdAt`). |
| `order` | `string` | `desc` | Sort order. Accepts `asc` or `desc`. |

### Example Request
```http
GET /api/jobs?page=1&limit=10&search=engineer&company=Google&sortBy=createdAt&order=desc
```

### Example Response
```json
{
  "success": true,
  "data": {
    "jobs": [
      {
        "_id": "60d5ecb54b5...",
        "title": "Software Engineer",
        "company": "Google",
        "location": "Remote",
        "workMode": "Remote",
        "employmentType": "Full-time",
        "postedDate": "2024-10-25T10:00:00.000Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 10,
      "totalJobs": 45,
      "totalPages": 5
    }
  }
}
```

---

## 2. Get Single Job
Retrieves detailed information about a specific job by ID.

**Endpoint:** `GET /api/jobs/:id`

### Example Request
```http
GET /api/jobs/60d5ecb54b5f8c001f3e7a9b
```

---

## 3. Get Dashboard Statistics
Retrieves aggregated statistics and charts data for the recruiter dashboard.

**Endpoint:** `GET /api/dashboard`

### Example Response
```json
{
  "success": true,
  "data": {
    "cards": {
      "totalJobs": 1250,
      "totalCompanies": 85,
      "remoteJobs": 450,
      "fullTimeJobs": 980
    },
    "charts": {
      "jobsByCompany": [...],
      "jobsByWorkMode": [...],
      "jobsByEmploymentType": [...]
    }
  }
}
```

---

## 4. Get Duplicate Jobs
Retrieves all jobs that have been flagged as potential duplicates (`isDuplicate: true`).

**Endpoint:** `GET /api/jobs/duplicates`

---

## 5. Update Duplicate Status
Updates the status of a flagged duplicate job (Confirm or Ignore).

**Endpoint:** `PATCH /api/jobs/duplicates/:id`

### Body Parameters
| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `duplicateStatus` | `string` | Yes | Accepts `confirmed`, `ignored`, or `pending`. |

### Example Request
```http
PATCH /api/jobs/duplicates/60d5ecb54b5f8c001f3e7a9b
Content-Type: application/json

{
  "duplicateStatus": "confirmed"
}
```
