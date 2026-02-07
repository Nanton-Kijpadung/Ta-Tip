
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import { MOCK_USERS, SESSION_METRICS, MOCK_EVENTS, PIE_DATA, DISTRACTION_LOG } from '../constants';
import { analyzeFocus } from '../geminiService';

const HostUserSummary: React.FC = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const user = MOCK_USERS.find(u => u.id === userId) || MOCK_USERS[0];
  
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [aiInsight, setAiInsight] = useState<string | null>(null);

  const handleGetInsight = async () => {
    setIsAnalyzing(true);
    const result = await analyzeFocus({
      name: user.name,
      activeTime: '1h 45m',
      focusScore: '8.5/10',
      distractions: DISTRACTION_LOG,
      apps: PIE_DATA.map(d => d.name)
    });
    setAiInsight(result);
    setIsAnalyzing(false);
  };

  return (
    <div className="flex flex-col h-full bg-slate-50/50 overflow-y-auto custom-scrollbar">
      <header className="bg-white px-8 py-6 border-b border-slate-200 shadow-sm z-10 sticky top-0">
        <div className="flex flex-col gap-4">
           <div className="flex items-center gap-2 text-sm font-medium text-slate-500">
             <span className="cursor-pointer hover:text-slate-800 transition-colors" onClick={() => navigate('/host')}>Classes</span>
             <span className="material-icons-outlined text-xs text-slate-300">chevron_right</span>
             <span className="cursor-pointer hover:text-slate-800 transition-colors" onClick={() => window.history.back()}>Back</span>
             <span className="material-icons-outlined text-xs text-slate-300">chevron_right</span>
             <span className="text-slate-900">Student Report</span>
           </div>
           <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                 <img src={user.avatarUrl} alt="" className="w-16 h-16 rounded-xl border-2 border-white shadow-sm" />
                 <div>
                    <h1 className="text-2xl font-bold text-slate-900 tracking-tight">{user.name}</h1>
                    <div className="flex items-center gap-3 text-sm text-slate-500 mt-1">
                       <span className="flex items-center gap-1 font-medium bg-green-50 text-green-700 px-2 py-0.5 rounded border border-green-100">
                         <span className="material-icons-outlined text-sm">check_circle</span> Tracking Active
                       </span>
                       <span className="h-1 w-1 rounded-full bg-slate-300"></span>
                       <span>ID: #88291</span>
                       <span className="h-1 w-1 rounded-full bg-slate-300"></span>
                       <span>Oct 24, 2024</span>
                    </div>
                 </div>
              </div>
              <div className="flex gap-3">
                 <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-700 font-bold rounded-lg shadow-sm hover:bg-slate-50 transition-all text-sm">
                   <span className="material-icons-outlined text-sm">file_download</span> 
                   Export
                 </button>
                 <button 
                   onClick={handleGetInsight}
                   disabled={isAnalyzing}
                   className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white font-bold rounded-lg shadow-lg shadow-blue-600/20 hover:bg-blue-700 transition-all text-sm disabled:opacity-70"
                 >
                   <span className="material-icons-outlined text-sm">psychology</span> 
                   {isAnalyzing ? 'Analyzing...' : 'AI Focus Advisor'}
                 </button>
              </div>
           </div>
        </div>
      </header>

      <div className="p-8 space-y-6">
        {aiInsight && (
          <div className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white p-6 rounded-2xl shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-10">
              <span className="material-icons-outlined text-9xl">auto_awesome</span>
            </div>
            <div className="relative z-10">
              <h2 className="text-lg font-bold mb-3 flex items-center gap-2">
                <span className="material-icons-outlined">stars</span>
                AI Focus Recommendations
              </h2>
              <div className="text-blue-50 leading-relaxed whitespace-pre-wrap">{aiInsight}</div>
              <button 
                onClick={() => setAiInsight(null)}
                className="mt-4 text-xs font-bold bg-white/20 hover:bg-white/30 px-3 py-1.5 rounded-lg backdrop-blur-sm transition-all"
              >
                Dismiss
              </button>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {SESSION_METRICS.map((metric) => (
            <div key={metric.label} className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-start justify-between">
              <div>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">{metric.label}</p>
                <p className="text-2xl font-bold text-slate-900">{metric.value}</p>
              </div>
              <div className={`p-3 rounded-xl ${metric.bg} ${metric.color}`}>
                <span className="material-icons-outlined">{metric.icon}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <div className="xl:col-span-2 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <span className="material-icons-outlined text-slate-400">history</span>
                Activity Timeline
              </h2>
              <span className="text-xs font-medium text-slate-400">Live Updates</span>
            </div>
            <div className="relative pl-2">
              <div className="absolute left-[27px] top-2 bottom-4 w-0.5 bg-slate-100"></div>
              <div className="space-y-8 relative">
                {MOCK_EVENTS.map((event) => (
                  <div key={event.id} className="flex gap-6 relative group">
                    <div className="relative z-10 w-14 text-right pt-1.5">
                      <span className="text-xs font-mono font-medium text-slate-400">{event.timestamp.split(' ')[0]}</span>
                    </div>
                    <div className={`relative z-10 w-3.5 h-3.5 mt-2 rounded-full border-2 border-white shadow-sm shrink-0 ${event.color}`}></div>
                    <div className="flex-1 bg-slate-50 p-4 rounded-xl border border-slate-100 group-hover:border-blue-600/20 group-hover:bg-blue-50/20 transition-all">
                      <div className="font-bold text-slate-900 mb-0.5">{event.title}</div>
                      <p className="text-sm text-slate-500">{event.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm h-[320px] flex flex-col">
              <h2 className="text-lg font-bold text-slate-900 mb-2 flex items-center gap-2">
                <span className="material-icons-outlined text-slate-400">pie_chart</span>
                Usage Distribution
              </h2>
              <div className="flex-1">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie 
                      data={PIE_DATA} 
                      cx="50%" cy="50%" 
                      innerRadius={60} outerRadius={80} 
                      paddingAngle={5} 
                      dataKey="value"
                    >
                      {PIE_DATA.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.fill} />)}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                <span className="material-icons-outlined text-orange-500">warning</span>
                Distraction Events
              </h2>
              <div className="overflow-hidden rounded-lg border border-slate-100">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-50 text-slate-500 font-semibold">
                    <tr>
                      <th className="px-3 py-2">Time</th>
                      <th className="px-3 py-2">Source</th>
                      <th className="px-3 py-2 text-right">Dur.</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {DISTRACTION_LOG.map((log) => (
                      <tr key={log.id}>
                        <td className="px-3 py-2.5 font-mono text-slate-400 text-xs">{log.time}</td>
                        <td className="px-3 py-2.5 font-medium text-slate-900">{log.app}</td>
                        <td className="px-3 py-2.5 text-right text-slate-500">{log.duration}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HostUserSummary;
