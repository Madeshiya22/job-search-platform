import { NavLink } from "react-router-dom";
import {
  MdDashboard,
  MdWork,
  MdContentCopy,
} from "react-icons/md";

const links = [
  {
    title: "Dashboard",
    path: "/",
    icon: <MdDashboard size={22} />,
  },
  {
    title: "Jobs",
    path: "/jobs",
    icon: <MdWork size={22} />,
  },
  {
    title: "Duplicate Review",
    path: "/duplicates",
    icon: <MdContentCopy size={22} />,
  },
];

const Sidebar = () => {
  return (
    <aside className="w-64 bg-slate-900 text-white">
      <div className="p-6 text-2xl font-bold">
        ApplyWizz
      </div>

      <nav className="mt-8 flex flex-col gap-2">
        {links.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            className={({ isActive }) =>
              `mx-3 flex items-center gap-3 rounded-lg px-4 py-3 transition ${
                isActive
                  ? "bg-blue-600"
                  : "hover:bg-slate-800"
              }`
            }
          >
            {link.icon}

            {link.title}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;