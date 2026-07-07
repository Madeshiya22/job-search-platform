import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { MdSearch } from "react-icons/md";

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
    <div className="grid grid-cols-1 gap-4 rounded-xl bg-white p-5 shadow-sm border border-slate-100 sm:grid-cols-2 lg:grid-cols-5">
      <div className="relative w-full">
        <MdSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
        <input
          type="text"
          placeholder="Search jobs..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full rounded-lg border border-slate-300 py-2 pl-10 pr-4 outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
        />
      </div>

      <select
        value={filters.company}
        onChange={(e) =>
          setFilters({
            ...filters,
            company: e.target.value,
            page: 1,
          })
        }
        className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
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
        className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
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
        className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
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
        className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
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