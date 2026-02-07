
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MOCK_USERS, MOCK_CLASSES } from '../constants';
import { UserStatus } from '../types';

const HostClassDetail: React.FC = () => {
  const { classId } = useParams();
  const navigate = useNavigate();
  const [classInfo, setClassInfo] = useState(MOCK_CLASSES.find(c => c.id === classId) || MOCK_CLASSES[0]);

  const toggleSession = () => {
    setClassInfo(prev => {
      const newState = !prev.isCurrentSession;
      return {
        ...prev,
        isCurrentSession: newState,
        status: newState ? 'active' : 'inactive',
        trackingCount: newState ? Math.max(prev.trackingCount, 8) : 0,
        onlineCount: newState ? Math.max(prev.onlineCount, 12) : 0
      };
    });
  };

  return (
    <div className="flex flex-col h-full bg-slate-50/50">
      <header className="bg-white px-8 py-6 border-b border-slate-200 shadow-sm z-10">
        <div className="flex flex-col gap-4">
           <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
             <span className="cursor-pointer hover:text-slate-800 transition-colors" onClick={() => navigate('/host')}>Classes</span>
             <span className="material-icons-outlined text-xs text-slate-300">chevron_right</span>
             <span className="text-slate-900">{classInfo.name}</span>
           </div>
           <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                 <div className={`h-14 w-14 rounded-2xl flex items-center justify-center text-white shadow-xl transition-all ${classInfo.isCurrentSession ? 'bg-blue-600 shadow-blue-600/20' : 'bg-slate-400 shadow-slate-400/20'}`}>
                    <span className="font-black text-2xl">{classInfo.name.substring(0, 2).toUpperCase()}</span>
                 </div>
                 <div>
                    <h1 className="text-2xl font-black text-slate-900 tracking-tight">{classInfo.name}</h1>
                    <div className="flex items-center gap-3 text-xs text-slate-500 mt-1">
                       <span className="flex items-center gap-1 font-mono bg-slate-50 px-2 py-0.5 rounded border border-slate-100"><span className="material-icons-outlined text-xs">vpn_key</span> {classInfo.roomId}</span>
                       <span className="h-1 w-1 rounded-full bg-slate-300"></span>
                       <span className="font-bold">{classInfo.onlineCount} Students Active</span>
                    </div>
                 </div>
              </div>
              <div className="flex items-center gap-3">
                 {classInfo.isCurrentSession ? (
                    <div className="flex items-center gap-2 px-4 py-2 bg-green-50 text-green-700 rounded-xl border border-green-100 mr-2">
                       <span className="relative flex h-2 w-2">
                          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75"></span>
                          <span className="relative inline-flex h-2 w-2 rounded-full bg-green-600"></span>
                       </span>
                       <span className="text-xs font-bold uppercase tracking-widest">{classInfo.trackingCount} Live Tracks</span>
                    </div>
                 ) : null}
                 
                 <button 
                   onClick={toggleSession}
                   className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all shadow-lg active:scale-95 ${classInfo.isCurrentSession ? 'bg-red-50 text-red-600 border border-red-100 hover:bg-red-100' : 'bg-blue-600 text-white shadow-blue-600/20 hover:bg-blue-700'}`}
                 >
                    <span className="material-icons-outlined text-sm">{classInfo.isCurrentSession ? 'stop' : 'play_arrow'}</span>
                    {classInfo.isCurrentSession ? 'End Session' : 'Start Session'}
                 </button>
                 
                 <button className="p-2.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl transition-colors border border-transparent hover:border-slate-200">
                    <span className="material-icons-outlined">settings</span>
                 </button>
              </div>
           </div>
        </div>
      </header>
      
      <div className="flex-1 p-8 overflow-hidden flex flex-col">
        <div className="bg-white rounded-3xl shadow-sm border border-slate-200 flex flex-col h-full overflow-hidden">
          <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-white">
            <div className="flex gap-2">
              <button className="px-4 py-2 text-xs font-bold uppercase tracking-widest text-slate-600 bg-slate-50 hover:bg-slate-100 rounded-xl border border-slate-200 transition-colors">All Users</button>
              <button className="px-4 py-2 text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-slate-700 hover:bg-slate-50 rounded-xl transition-colors">Active Only</button>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Sort:</span>
              <select className="text-xs border-none bg-transparent font-bold text-slate-700 focus:ring-0 cursor-pointer outline-none">
                <option>Recent Activity</option>
                <option>Name A-Z</option>
                <option>Status</option>
              </select>
            </div>
          </div>
          <div className="overflow-auto flex-1 custom-scrollbar">
            <table className="w-full text-left border-collapse">
              <thead className="bg-slate-50/80 sticky top-0 z-10 backdrop-blur-sm">
                <tr className="text-[10px] font-black uppercase text-slate-400 tracking-[0.15em]">
                  <th className="px-8 py-5 border-b border-slate-200">Participant</th>
                  <th className="px-8 py-5 border-b border-slate-200">Status</th>
                  <th className="px-8 py-5 border-b border-slate-200">Focus Indicator</th>
                  <th className="px-8 py-5 border-b border-slate-200">Session Dur.</th>
                  <th className="px-8 py-5 border-b border-slate-200 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {MOCK_USERS.map((user) => (
                  <tr key={user.id} className="hover:bg-blue-50/20 transition-colors group">
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-3">
                        <img src={user.avatarUrl} alt="" className="w-10 h-10 rounded-2xl bg-slate-200 object-cover border-2 border-white shadow-sm" />
                        <div className="font-bold text-slate-900">{user.name}</div>
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-[10px] font-bold uppercase tracking-wider border ${user.status === UserStatus.ACTIVE && classInfo.isCurrentSession ? 'bg-green-50 text-green-700 border-green-100' : 'bg-slate-50 text-slate-400 border-slate-200'}`}>
                        <span className={`h-2 w-2 rounded-full ${user.status === UserStatus.ACTIVE && classInfo.isCurrentSession ? 'bg-green-500' : 'bg-slate-300'}`}></span>
                        {user.status === UserStatus.ACTIVE && classInfo.isCurrentSession ? 'Monitoring' : 'Disconnected'}
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      {user.status === UserStatus.ACTIVE && classInfo.isCurrentSession ? (
                        <div className="flex flex-col gap-0.5">
                          <div className="flex items-center gap-2 text-slate-800 font-bold truncate max-w-[200px]">
                            <span className="material-icons-outlined text-blue-500 text-sm">desktop_windows</span>
                            {user.activeApp}
                          </div>
                          <div className="flex items-center gap-2 text-slate-400 text-[10px] font-medium tracking-tight">
                            <span className="material-icons-outlined text-[12px]">link</span>
                            {user.lastWebsite}
                          </div>
                        </div>
                      ) : <span className="text-slate-300 italic font-medium">No activity signal</span>}
                    </td>
                    <td className="px-8 py-5 font-mono text-slate-600 text-xs font-bold">{classInfo.isCurrentSession ? user.trackingDuration : '--'}</td>
                    <td className="px-8 py-5 text-right">
                      <button 
                        onClick={() => navigate(`/host/user/${user.id}`)} 
                        className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all bg-white border border-slate-200 text-blue-600 shadow-sm hover:border-blue-600 hover:bg-blue-50 hover:shadow-blue-600/10 active:scale-95"
                      >
                        Analysis
                        <span className="material-icons-outlined text-sm">insights</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HostClassDetail;
