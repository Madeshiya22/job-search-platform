import { useQuery } from "@tanstack/react-query";
import { 
  MdWork, 
  MdBusiness, 
  MdLocationOn, 
  MdComputer, 
  MdContentCopy, 
  MdAccessTime 
} from "react-icons/md";

import DashboardCard from "../components/dashboard/DashboardCard";
import CompanyChart from "../components/dashboard/CompanyChart";
import WorkModeChart from "../components/dashboard/WorkModeChart";
import EmploymentTypeChart from "../components/dashboard/EmploymentTypeChart";

import { getDashboard } from "../services/dashboard.service";
import { DashboardSkeleton } from "../components/common/Skeletons";
import { ErrorState } from "../components/common/ErrorState";

const Dashboard = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["dashboard"],
    queryFn: getDashboard,
  });

  if (isLoading) {
    return <DashboardSkeleton />;
  }

  if (isError) {
    return <ErrorState message="Failed to load dashboard statistics. Please try again." />;
  }

  const stats = data.cards;

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <DashboardCard
          title="Total Jobs"
          value={stats.totalJobs}
          icon={<MdWork size={24} />}
        />

        <DashboardCard
          title="Companies"
          value={stats.totalCompanies}
          icon={<MdBusiness size={24} />}
        />

        <DashboardCard
          title="Remote Jobs"
          value={stats.remoteJobs}
          icon={<MdComputer size={24} />}
        />

        <DashboardCard
          title="Duplicate Jobs"
          value={stats.duplicateJobs}
          icon={<MdContentCopy size={24} />}
        />

        <DashboardCard
          title="Locations"
          value={stats.totalLocations}
          icon={<MdLocationOn size={24} />}
        />

        <DashboardCard
          title="Full Time"
          value={stats.fullTimeJobs}
          icon={<MdAccessTime size={24} />}
        />
      </div>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CompanyChart
          data={data.charts.jobsByCompany}
        />

        <WorkModeChart
          data={data.charts.jobsByWorkMode}
        />

        <div className="col-span-1 lg:col-span-2">
          <EmploymentTypeChart
            data={data.charts.jobsByEmploymentType}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;