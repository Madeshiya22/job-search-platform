import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";

import {
  getCompanies,
  getLocations,
} from "../../services/job.service";

const JobFilters = ({ filters, setFilters }) => {
  const [searchTerm, setSearchTerm] = useState(filters.search);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (filters.search !== searchTerm) {
        setFilters((prev) => ({ ...prev, search: searchTerm, page: 1 }));
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, setFilters, filters.search]);
  const { data: companies } = useQuery({
    queryKey: ["companies"],
    queryFn: getCompanies,
  });

  const { data: locations } = useQuery({
    queryKey: ["locations"],
    queryFn: getLocations,
  });

  return (
    <div className="grid grid-cols-1 gap-4 rounded-xl bg-white p-5 shadow sm:grid-cols-2 lg:grid-cols-5">
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="rounded border p-2"
      />

      <select
        value={filters.company}
        onChange={(e) =>
          setFilters({
            ...filters,
            company: e.target.value,
            page: 1,
          })
        }
        className="rounded border p-2"
      >
        <option value="">All Companies</option>

        {companies?.data.map((company) => (
          <option
            key={company}
            value={company}
          >
            {company}
          </option>
        ))}
      </select>

      <select
        value={filters.location}
        onChange={(e) =>
          setFilters({
            ...filters,
            location: e.target.value,
            page: 1,
          })
        }
        className="rounded border p-2"
      >
        <option value="">All Locations</option>

        {locations?.data.map((location) => (
          <option
            key={location}
            value={location}
          >
            {location}
          </option>
        ))}
      </select>

      <select
        value={filters.workMode}
        onChange={(e) =>
          setFilters({
            ...filters,
            workMode: e.target.value,
            page: 1,
          })
        }
        className="rounded border p-2"
      >
        <option value="">Work Mode</option>
        <option>Remote</option>
        <option>Hybrid</option>
        <option>On-site</option>
      </select>

      <select
        value={filters.employmentType}
        onChange={(e) =>
          setFilters({
            ...filters,
            employmentType: e.target.value,
            page: 1,
          })
        }
        className="rounded border p-2"
      >
        <option value="">Employment Type</option>
        <option>Full-time</option>
        <option>Part-time</option>
        <option>Internship</option>
        <option>Contract</option>
      </select>
    </div>
  );
};

export default JobFilters;