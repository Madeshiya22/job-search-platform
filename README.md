# Job Search Platform

This is a full-stack job search platform.

## Setup

- Backend is in `server/` directory.
- Frontend is in `client/` directory.
- Dataset is in `dataset/` directory.

## Design Decisions

- **Data Import**: During import, existing job records are cleared to avoid duplicate imports while testing. In a real production scenario, this would be handled differently (e.g., upserts), but for this assignment, a fresh import ensures clean state.
