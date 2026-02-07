
import React, { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import Logo from './Logo';

const HostLayout: React.FC = () => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleSignOut = () => {
    navigate('/');
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-slate-50 font-sans overflow-hidden">
      {/* Mobile Top Navigation */}
      <header className="flex md:hidden items-center justify-between px-6 py-4 bg-white border-b border-slate-200 z-30 shadow-sm">
        <div className="flex items-center gap-3">
          <Logo className="w-8 h-8" />
          <span className="text-xl font-black text-slate-900 tracking-tight">Ta-Tip</span>
        </div>
        <div className="flex items-center gap-4">
          <NavLink 
            to="/host/reports" 
            className={({ isActive }) => `p-2 rounded-xl transition-all ${isActive ? 'bg-blue-50 text-blue-600' : 'text-slate-400'}`}
          >
            <span className="material-icons-outlined">bar_chart</span>
          </NavLink>
          <NavLink 
            to="/host" 
            end
            className={({ isActive }) => `p-2 rounded-xl transition-all ${isActive ? 'bg-blue-50 text-blue-600' : 'text-slate-400'}`}
          >
            <span className="material-icons-outlined">dashboard</span>
          </NavLink>
          <button 
            onClick={handleSignOut}
            className="flex items-center justify-center p-2 rounded-xl text-slate-400 hover:text-red-600 hover:bg-red-50 transition-all"
            title="Sign Out"
          >
            <span className="material-icons-outlined">logout</span>
          </button>
        </div>
      </header>

      {/* Desktop Sidebar */}
      <aside className="w-[280px] bg-white border-r border-slate-200 hidden md:flex flex-col z-20 shadow-sm">
        <div className="p-8 pb-4">
          <div className="flex items-center gap-3 mb-8">
            <Logo className="w-10 h-10" />
            <span className="text-2xl font-bold text-slate-900 tracking-tight">Ta-Tip</span>
          </div>
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 px-2">Main Menu</div>
          <nav className="space-y-1">
            <NavLink 
              to="/host" 
              end 
              className={({ isActive }) => `flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-all group ${isActive ? 'bg-blue-50 text-blue-600 font-semibold' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'}`}
            >
              <span className="material-icons-outlined text-[22px]">dashboard</span>
              <span>Classes</span>
            </NavLink>
            <NavLink 
              to="/host/reports" 
              className={({ isActive }) => `flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-all group ${isActive ? 'bg-blue-50 text-blue-600 font-semibold' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'}`}
            >
              <span className="material-icons-outlined text-[22px]">bar_chart</span>
              <span>Reports</span>
            </NavLink>
          </nav>
        </div>
        
        <div className="mt-auto p-6 border-t border-slate-100">
           <div className="flex items-center gap-3 p-2 mb-4 rounded-xl border border-slate-100 bg-slate-50/50">
             <img src="https://i.pravatar.cc/150?img=11" alt="User" className="w-10 h-10 rounded-full" />
             <div className="flex-1 min-w-0">
               <p className="text-sm font-bold text-slate-900 truncate">Dr. A. Smith</p>
               <p className="text-xs text-slate-500 truncate">Senior Researcher</p>
             </div>
           </div>
           <button 
             onClick={handleSignOut} 
             className="flex items-center justify-center space-x-2 w-full py-2.5 rounded-lg text-slate-600 hover:bg-red-50 hover:text-red-600 transition-all text-sm font-semibold"
           >
             <span className="material-icons-outlined text-lg">logout</span>
             <span>Sign Out</span>
           </button>
        </div>
      </aside>
      
      <main className="flex-1 flex flex-col h-full overflow-hidden relative">
        <Outlet />
      </main>
    </div>
  );
};

export default HostLayout;
