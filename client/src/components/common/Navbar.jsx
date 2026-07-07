import { MdMenu } from "react-icons/md";

const Navbar = ({ onMenuClick }) => {
  return (
    <header className="flex h-16 items-center justify-between border-b border-slate-200 bg-white px-4 shadow-sm md:px-8">
      <div className="flex items-center gap-4">
        <button className="md:hidden text-slate-500 hover:text-slate-800 transition-colors" onClick={onMenuClick}>
          <MdMenu size={24} />
        </button>
        <h1 className="text-xl md:text-2xl font-extrabold tracking-tight text-slate-800 truncate">
          Job Dashboard
        </h1>
      </div>

      <div className="rounded-full bg-slate-100/80 border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 md:text-base">
        Rahul
      </div>
    </header>
  );
};

export default Navbar;