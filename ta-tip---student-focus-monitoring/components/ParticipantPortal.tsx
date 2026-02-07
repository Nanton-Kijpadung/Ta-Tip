
import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Logo from './Logo';

const JoinRoom: React.FC = () => {
  const navigate = useNavigate();
  const [roomId, setRoomId] = useState('');
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-slate-50">
      <div className="w-full max-w-md text-center mb-10">
        <div className="inline-flex items-center space-x-3">
          <Logo className="w-16 h-16" />
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">Ta-Tip</h1>
        </div>
        <p className="mt-2 text-lg text-slate-500 font-medium">Participant Portal</p>
      </div>
      <div className="w-full max-w-md bg-white border border-slate-200 rounded-2xl shadow-xl p-8 space-y-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-900">Join a Session</h2>
          <p className="mt-2 text-slate-600">Enter the room code provided by your host.</p>
        </div>
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-700 uppercase tracking-widest text-[10px] font-bold">Room ID</label>
            <div className="relative">
              <span className="material-icons-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">meeting_room</span>
              <input 
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 bg-slate-50 text-slate-900 text-xl font-mono tracking-widest outline-none transition-all" 
                maxLength={6} 
                placeholder="4A8B2C" 
                value={roomId} 
                onChange={(e) => setRoomId(e.target.value.toUpperCase())} 
              />
            </div>
          </div>
          <button 
            onClick={() => roomId.length >= 6 && navigate('/participant/tracking')} 
            className="w-full bg-blue-600 text-white font-bold py-4 px-6 rounded-xl hover:bg-blue-700 transition-colors text-lg shadow-lg shadow-blue-600/20 active:scale-95"
          >
            Join Session
          </button>
        </div>
      </div>
    </div>
  );
};

const PermissionModal: React.FC<{ onConfirm: () => void; onCancel: () => void }> = ({ onConfirm, onCancel }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
    <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={onCancel}></div>
    <div className="relative bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden p-8 animate-in fade-in zoom-in duration-200">
      <div className="flex items-center justify-center w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl mb-6 mx-auto">
        <span className="material-icons-outlined text-4xl">security</span>
      </div>
      <h3 className="text-2xl font-bold text-slate-900 text-center mb-2">Tracking Permission</h3>
      <p className="text-slate-500 text-center mb-6">Ta-Tip requires your permission to monitor your focus metrics. This data is used strictly for academic research.</p>
      
      <div className="bg-slate-50 rounded-xl p-4 mb-8 space-y-3">
        <div className="flex items-center gap-3 text-sm text-slate-700">
          <span className="material-icons-outlined text-blue-600 text-sm">check_circle</span>
          <span>Current active window metadata</span>
        </div>
        <div className="flex items-center gap-3 text-sm text-slate-700">
          <span className="material-icons-outlined text-blue-600 text-sm">check_circle</span>
          <span>Web browser tab activity</span>
        </div>
        <div className="flex items-center gap-3 text-sm text-slate-700">
          <span className="material-icons-outlined text-blue-600 text-sm">check_circle</span>
          <span>Usage duration statistics</span>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <button 
          onClick={onConfirm}
          className="w-full bg-blue-600 text-white font-bold py-3.5 rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20 active:scale-95"
        >
          I Grant Permission
        </button>
        <button 
          onClick={onCancel}
          className="w-full bg-white text-slate-500 font-bold py-3 rounded-xl hover:bg-slate-50 transition-all"
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
);

const TrackingInterface: React.FC = () => {
  const navigate = useNavigate();
  const [isTracking, setIsTracking] = useState(false);
  const [showPermission, setShowPermission] = useState(false);

  const toggleTracking = () => {
    if (!isTracking) {
      setShowPermission(true);
    } else {
      setIsTracking(false);
    }
  };

  const handleConfirmPermission = () => {
    setShowPermission(false);
    setIsTracking(true);
  };

  const handleSignOut = () => {
    // Stop tracking first
    setIsTracking(false);
    // Navigate back to login
    navigate('/');
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col bg-slate-50">
      {showPermission && <PermissionModal onConfirm={handleConfirmPermission} onCancel={() => setShowPermission(false)} />}
      
      <header className="flex w-full items-center justify-between border-b border-slate-200 bg-white px-6 py-4 shadow-sm sticky top-0 z-30">
        <div className="flex items-center gap-4">
          <Logo className="w-8 h-8" />
          <h2 className="text-xl font-bold tracking-tight text-slate-900 hidden sm:block">Ta-Tip</h2>
          <div className="h-6 w-px bg-slate-200 hidden sm:block mx-1"></div>
          <div className="flex items-center gap-2 rounded-full bg-green-100 px-3 py-1.5 text-xs font-bold text-green-700 border border-green-200">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-green-600"></span>
            </span>
            CONNECTED
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3 px-3 py-1.5 rounded-xl border border-slate-100 bg-slate-50/50">
            <img src="https://i.pravatar.cc/150?img=5" alt="Student" className="w-8 h-8 rounded-full border border-white shadow-sm" />
            <div className="hidden md:block">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-0.5">Student</p>
              <p className="text-xs font-bold text-slate-900 leading-none">Sarah Jenkins</p>
            </div>
          </div>
          <button 
            onClick={handleSignOut}
            className="flex items-center gap-2 text-slate-500 hover:text-red-600 hover:bg-red-50 px-3 py-2 rounded-xl transition-all font-bold text-sm"
          >
            <span className="material-icons-outlined text-lg">logout</span>
            <span className="hidden sm:inline">Sign Out</span>
          </button>
        </div>
      </header>

      <main className="flex flex-col items-center justify-center flex-grow p-4 py-12 text-center">
        <div className="w-full max-w-xl">
          <div className="flex flex-col items-center gap-3 mb-10">
            <div className="bg-blue-600 text-white p-3 rounded-2xl shadow-xl shadow-blue-600/20 mb-2">
              <span className="material-icons-outlined text-3xl">school</span>
            </div>
            <h1 className="text-4xl font-black tracking-tight text-slate-900">Session Active</h1>
            <p className="text-lg text-slate-500 font-medium">Currently in: <span className="font-bold text-slate-700">Intro to Statistics</span></p>
          </div>

          <div className="mb-10 bg-white rounded-[2rem] border border-slate-200 shadow-[0_20px_50px_rgba(0,0,0,0.05)] overflow-hidden p-10 relative">
            {isTracking && (
              <div className="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1 bg-red-50 text-red-600 rounded-full border border-red-100 animate-pulse">
                <span className="h-2 w-2 rounded-full bg-red-600"></span>
                <span className="text-[10px] font-bold uppercase tracking-wider">Live</span>
              </div>
            )}

            <div className={`p-10 rounded-full inline-flex items-center justify-center mb-8 transition-all duration-700 ${isTracking ? 'bg-blue-600 text-white shadow-2xl shadow-blue-600/40 rotate-12 scale-110' : 'bg-slate-100 text-slate-300'}`}>
              <span className="material-icons-outlined text-7xl">
                {isTracking ? 'auto_awesome' : 'sensors_off'}
              </span>
            </div>
            
            <h3 className="text-2xl font-black text-slate-900 mb-2">
              {isTracking ? 'Focus Tracking Active' : 'Tracking Paused'}
            </h3>
            <p className="text-slate-500 mb-10 max-w-xs mx-auto leading-relaxed">
              {isTracking 
                ? 'Great work! Your study session is currently contributing to the classroom research.' 
                : 'Your activity is not being shared. Grant permission to start contributing to the research.'}
            </p>

            <button 
              onClick={toggleTracking} 
              className={`flex h-18 w-full max-w-sm mx-auto items-center justify-center gap-4 rounded-2xl px-10 text-xl font-bold text-white shadow-2xl transition-all active:scale-[0.97] hover:-translate-y-1 ${isTracking ? 'bg-red-500 shadow-red-500/30 hover:bg-red-600' : 'bg-blue-600 shadow-blue-600/30 hover:bg-blue-700'}`}
            >
              <span className="material-icons-outlined text-3xl">{isTracking ? 'pause_circle' : 'play_arrow'}</span>
              <span>{isTracking ? 'Pause Tracking' : 'Resume Tracking'}</span>
            </button>
          </div>

          <div className="bg-slate-100/50 rounded-2xl p-4 max-w-md mx-auto flex items-center gap-3">
             <span className="material-icons-outlined text-slate-400">info</span>
             <p className="text-xs text-slate-500 text-left leading-relaxed">
               Ta-Tip protects your privacy by anonymizing specific content. Only usage patterns and window titles are shared with your instructor.
             </p>
          </div>

          <div className="mt-12">
            <button 
              onClick={() => navigate('/participant/join')} 
              className="group flex mx-auto items-center gap-2 text-slate-400 font-bold hover:text-slate-600 px-4 py-2 rounded-lg transition-all"
            >
              <span className="material-icons-outlined group-hover:-translate-x-1 transition-transform">arrow_back</span>
              Leave Current Room
            </button>
          </div>
        </div>
      </main>
      
      <footer className="py-6 text-center text-slate-400 text-[10px] font-bold uppercase tracking-[0.2em]">
        Research Session ID: TRK-992-BX
      </footer>
    </div>
  );
};

const ParticipantPortal: React.FC = () => {
  return (
    <Routes>
      <Route path="join" element={<JoinRoom />} />
      <Route path="tracking" element={<TrackingInterface />} />
      <Route path="*" element={<JoinRoom />} />
    </Routes>
  );
};

export default ParticipantPortal;
