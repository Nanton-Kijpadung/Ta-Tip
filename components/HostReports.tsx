
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const WEEKLY_DATA = [
  { day: 'Mon', students: 45 },
  { day: 'Tue', students: 52 },
  { day: 'Wed', students: 48 },
  { day: 'Thu', students: 61 },
  { day: 'Fri', students: 39 },
];

const TOP_RESOURCES = [
  { name: 'RStudio Desktop', count: 42, fill: '#3b82f6' },
  { name: 'Stack Overflow', count: 38, fill: '#64748b' },
  { name: 'VS Code', count: 31, fill: '#22c55e' },
  { name: 'Jupyter Hub', count: 25, fill: '#8b5cf6' },
];

const HostReports: React.FC = () => {
  return (
    <div className="flex flex-col h-full bg-slate-50/50 overflow-y-auto custom-scrollbar">
      <header className="px-8 py-8">
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Summary & Reports</h1>
        <p className="text-slate-500 mt-1">Overview of research activity and participation across all classes.</p>
      </header>

      <div className="px-8 pb-8 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm transition-all hover:shadow-md">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
                <span className="material-icons-outlined text-2xl">school</span>
              </div>
              <div>
                <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Active Classes</span>
                <div className="text-4xl font-black text-slate-900">4</div>
              </div>
            </div>
            <div className="text-xs text-green-600 font-bold flex items-center bg-green-50 px-2 py-1 rounded-md w-fit">
              <span className="material-icons-outlined text-xs mr-1">trending_up</span> +1 this week
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm transition-all hover:shadow-md">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-purple-50 text-purple-600 rounded-xl">
                <span className="material-icons-outlined text-2xl">groups</span>
              </div>
              <div>
                <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Total Participants</span>
                <div className="text-4xl font-black text-slate-900">128</div>
              </div>
            </div>
            <div className="text-xs text-slate-400 font-bold uppercase tracking-wider">Across all rooms</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <span className="material-icons-outlined text-slate-400">bar_chart</span>
                Weekly Participation
              </h2>
            </div>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={WEEKLY_DATA}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis 
                    dataKey="day" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{fill: '#64748b', fontSize: 12, fontWeight: 500}} 
                    dy={10} 
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{fill: '#64748b', fontSize: 12}} 
                  />
                  <Tooltip 
                    cursor={{fill: '#f8fafc'}}
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  />
                  <Bar dataKey="students" name="Active Students" fill="#2563eb" radius={[6, 6, 0, 0]} barSize={44} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
              <span className="material-icons-outlined text-slate-400">apps</span>
              Top Research Tools
            </h2>
            <div className="space-y-5">
              {TOP_RESOURCES.map((res) => (
                <div key={res.name} className="flex items-center justify-between group">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: res.fill }}></div>
                    <span className="text-sm font-semibold text-slate-700 group-hover:text-blue-600 transition-colors">{res.name}</span>
                  </div>
                  <span className="text-xs font-bold text-slate-400 bg-slate-50 px-2 py-1 rounded border border-slate-100">{res.count} users</span>
                </div>
              ))}
            </div>
            <div className="mt-8 pt-6 border-t border-slate-100">
              <button className="w-full py-3 bg-slate-50 text-slate-600 rounded-xl text-sm font-bold hover:bg-slate-100 transition-all border border-slate-200 active:scale-[0.98]">
                View Full Audit Log
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HostReports;
