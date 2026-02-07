
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MOCK_CLASSES } from '../constants';
import { Classroom } from '../types';

const CreateClassModal: React.FC<{ isOpen: boolean; onClose: () => void; onCreate: (name: string) => void }> = ({ isOpen, onClose, onCreate }) => {
  const [name, setName] = useState('');
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative bg-white w-full max-w-md rounded-[2rem] shadow-2xl p-8 animate-in fade-in zoom-in duration-200">
        <h2 className="text-2xl font-black text-slate-900 mb-2">Create New Class</h2>
        <p className="text-slate-500 mb-6 text-sm">Set up a new monitoring room for your research session.</p>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Class Name</label>
            <input 
              autoFocus
              className="w-full px-4 py-3.5 rounded-2xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-4 focus:ring-blue-600/5 focus:border-blue-600 transition-all outline-none text-slate-900 font-medium" 
              placeholder="e.g. Advanced Machine Learning"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="pt-4 flex flex-col gap-3">
            <button 
              onClick={() => { onCreate(name); setName(''); }}
              className="w-full bg-blue-600 text-white font-bold py-4 rounded-2xl shadow-xl shadow-blue-600/20 hover:bg-blue-700 transition-all"
            >
              Start Creating
            </button>
            <button onClick={onClose} className="w-full py-3 text-slate-400 font-bold hover:text-slate-600">Cancel</button>
          </div>
        </div>
      </div>
    </div>
  );
};

const HostClassList: React.FC = () => {
  const [classes, setClasses] = useState<Classroom[]>(MOCK_CLASSES);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const toggleSession = (id: string) => {
    setClasses(prev => prev.map(c => {
      if (c.id === id) {
        const newState = !c.isCurrentSession;
        return { 
          ...c, 
          isCurrentSession: newState, 
          status: newState ? 'active' : 'inactive',
          trackingCount: newState ? Math.max(c.trackingCount, 8) : 0,
          onlineCount: newState ? Math.max(c.onlineCount, 12) : 0
        };
      }
      return { 
        ...c, 
        isCurrentSession: false, 
        status: 'inactive',
        trackingCount: 0,
        onlineCount: 0
      };
    }));
  };

  const createClass = (name: string) => {
    const newClass: Classroom = {
      id: Math.random().toString(36).substr(2, 9),
      name,
      roomId: Math.random().toString(36).substr(2, 6).toUpperCase(),
      status: 'inactive',
      isCurrentSession: false,
      onlineCount: 0,
      trackingCount: 0,
      thumbnailUrl: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=600&auto=format&fit=crop'
    };
    setClasses([newClass, ...classes]);
    setIsCreateModalOpen(false);
  };

  return (
    <div className="flex flex-col h-full overflow-y-auto bg-slate-50/50 custom-scrollbar">
      <CreateClassModal isOpen={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)} onCreate={createClass} />
      
      <header className="px-8 py-8">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Classes</h1>
          <p className="text-slate-500 mt-1">Manage and monitor your active academic sessions.</p>
        </div>
      </header>
      
      <div className="px-8 pb-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {classes.map((cls) => (
          <div 
            key={cls.id} 
            className={`group relative flex flex-col bg-white rounded-3xl border ${cls.isCurrentSession ? 'border-blue-500 ring-2 ring-blue-500/10 shadow-2xl' : 'border-slate-200 shadow-sm'} transition-all overflow-hidden`}
          >
            <div className="h-32 w-full relative overflow-hidden">
              <div 
                className={`absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110`} 
                style={{ backgroundImage: `url(${cls.thumbnailUrl})` }}
              ></div>
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent"></div>
              
              <div className="absolute top-4 right-4">
                 {cls.isCurrentSession ? (
                   <span className="flex items-center gap-1.5 px-3 py-1 bg-green-500 text-white rounded-full text-[10px] font-bold uppercase tracking-wider shadow-lg">
                     <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse"></span>
                     Live Session
                   </span>
                 ) : (
                   <span className="px-3 py-1 bg-white/20 backdrop-blur-md text-white rounded-full text-[10px] font-bold uppercase tracking-wider">
                     Archived
                   </span>
                 )}
              </div>

              <div className="absolute bottom-4 left-4 text-white">
                <h3 className="text-xl font-black leading-tight drop-shadow-sm">{cls.name}</h3>
                <p className="text-xs font-mono opacity-80 mt-0.5">ROOM: {cls.roomId}</p>
              </div>
            </div>

            <div className="p-6 flex-1 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100 text-center">
                    <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest mb-1">Online</p>
                    <p className="text-xl font-black text-slate-900">{cls.onlineCount}</p>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100 text-center">
                    <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest mb-1">Tracking</p>
                    <p className="text-xl font-black text-slate-900">{cls.trackingCount}</p>
                  </div>
                </div>
                
                <div className="flex flex-col gap-2">
                  <button 
                    onClick={() => toggleSession(cls.id)}
                    className={`flex items-center justify-center gap-2 w-full py-3.5 rounded-2xl text-[10px] font-black uppercase tracking-[0.15em] transition-all shadow-lg active:scale-[0.98] ${
                      cls.isCurrentSession 
                      ? 'bg-red-500 text-white hover:bg-red-600 shadow-red-500/20' 
                      : 'bg-blue-600 text-white hover:bg-blue-700 shadow-blue-600/20'
                    }`}
                  >
                    <span className="material-icons-outlined text-sm">{cls.isCurrentSession ? 'stop' : 'play_arrow'}</span>
                    {cls.isCurrentSession ? 'Stop Current Session' : 'Start as Live Session'}
                  </button>

                  <Link 
                    to={`/host/class/${cls.id}`} 
                    className="flex items-center justify-center gap-2 w-full py-3 bg-white text-slate-700 border border-slate-200 rounded-2xl text-[10px] font-black uppercase tracking-[0.1em] hover:bg-slate-50 hover:border-slate-300 transition-all active:scale-[0.98]"
                  >
                    <span className="material-icons-outlined text-sm">visibility</span>
                    Open Console
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
        
        <button 
          onClick={() => setIsCreateModalOpen(true)}
          className="min-h-[350px] flex flex-col items-center justify-center gap-4 rounded-[2.5rem] border-2 border-dashed border-slate-200 bg-white/50 p-6 transition-all hover:border-blue-400 hover:bg-blue-50/50 group shadow-sm hover:shadow-xl"
        >
          <div className="h-16 w-16 rounded-3xl bg-white shadow-sm border border-slate-100 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all transform group-hover:rotate-12">
            <span className="material-icons-outlined text-3xl text-slate-400 group-hover:text-white">add</span>
          </div>
          <div className="text-center">
            <span className="block font-black text-slate-900 text-lg group-hover:text-blue-600">Create New Class</span>
            <span className="text-xs font-medium text-slate-400 uppercase tracking-widest">Setup Session</span>
          </div>
        </button>
      </div>
    </div>
  );
};

export default HostClassList;
