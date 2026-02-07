
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from './Logo';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignInAsParticipant = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate('/participant/join');
  };

  const handleSignInAsHost = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate('/host');
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-[#f8fafc]">
      {/* Refined Background Elements */}
      <div className="absolute top-[-5%] left-[-5%] w-[40%] h-[40%] rounded-full bg-blue-100/30 blur-[100px] animate-pulse"></div>
      <div className="absolute bottom-[-5%] right-[-5%] w-[40%] h-[40%] rounded-full bg-indigo-100/30 blur-[100px] animate-pulse" style={{ animationDelay: '2s' }}></div>
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.02] pointer-events-none"></div>

      <div className="relative z-10 w-full max-w-[400px] p-6">
        <div className="bg-white/95 backdrop-blur-3xl rounded-[2.5rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] overflow-hidden border border-white/60">
          
          <div className="px-10 pt-10 pb-8 text-center">
            <div className="inline-flex items-center justify-center p-3.5 bg-white rounded-2xl mb-5 shadow-sm border border-slate-100 transition-transform hover:scale-105 duration-300">
              <Logo className="w-12 h-12" />
            </div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight mb-1">Ta-Tip</h1>
            <p className="text-slate-400 text-[10px] font-bold tracking-[0.25em] uppercase">Student Achievement & Focus System</p>
          </div>

          <div className="px-10 pb-12">
            <div className="space-y-6">
              {/* CREDENTIALS */}
              <div className="space-y-3">
                <div className="relative">
                  <span className="material-icons-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-lg">alternate_email</span>
                  <input 
                    className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:ring-4 focus:ring-blue-600/5 focus:border-blue-600 transition-all outline-none text-slate-900 font-medium text-sm" 
                    type="email" 
                    placeholder="Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="relative">
                  <span className="material-icons-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-lg">lock</span>
                  <input 
                    className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:ring-4 focus:ring-blue-600/5 focus:border-blue-600 transition-all outline-none text-slate-900 font-medium text-sm" 
                    type="password" 
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>

              {/* ROLE SELECTION */}
              <div className="space-y-3 pt-2">
                <button 
                  onClick={handleSignInAsParticipant} 
                  className="w-full h-[56px] relative group overflow-hidden rounded-xl bg-blue-600 text-white active:scale-[0.98] transition-all shadow-lg shadow-blue-600/20"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative flex items-center justify-center gap-3 px-6 h-full">
                    <span className="material-icons-outlined text-xl">sensors</span>
                    <span className="text-sm font-black uppercase tracking-wider">Join as Participant</span>
                  </div>
                  <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white/10 group-hover:animate-shine"></div>
                </button>

                <button 
                  onClick={handleSignInAsHost} 
                  className="w-full h-[56px] flex items-center justify-center gap-3 bg-slate-900 text-white rounded-xl hover:bg-slate-800 active:scale-[0.98] transition-all border border-slate-900"
                >
                  <span className="material-icons-outlined text-xl text-slate-400">admin_panel_settings</span>
                  <span className="text-sm font-black uppercase tracking-wider">Join as Host</span>
                </button>
              </div>
            </div>
          </div>
          
          <div className="px-10 pb-8 text-center border-t border-slate-50 pt-6">
            <p className="text-[11px] text-slate-400 font-semibold">
              New to Ta-Tip? {' '}
              <button 
                onClick={() => navigate('/signup')} 
                className="text-blue-600 font-bold hover:underline"
              >
                Register Account
              </button>
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes shine {
          0% { left: -100%; }
          100% { left: 100%; }
        }
        .animate-shine {
          animation: shine 1.5s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }
      `}</style>
    </div>
  );
};

export default Login;
