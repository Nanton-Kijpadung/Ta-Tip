
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from './Logo';

const Signup: React.FC = () => {
  const navigate = useNavigate();

  const handleBackToLogin = (e: React.MouseEvent) => {
    e.preventDefault();
    // Use replace to avoid polluting the history stack and prevent navigation issues
    navigate('/', { replace: true });
  };

  const handleCreateAccount = (e: React.FormEvent) => {
    e.preventDefault();
    // Defaulting to host for the signup flow demo, 
    // but in a real app, users would choose their role here or later.
    navigate('/host');
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-[#f8fafc]">
      {/* Background Decor */}
      <div className="absolute top-[-10%] left-[-10%] w-[45%] h-[45%] rounded-full bg-blue-100/40 blur-[120px] animate-pulse"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[45%] h-[45%] rounded-full bg-indigo-100/40 blur-[120px] animate-pulse" style={{ animationDelay: '2s' }}></div>

      <div className="relative z-10 w-full max-w-[420px] p-6">
        <div className="bg-white/95 backdrop-blur-3xl rounded-[3rem] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.15)] overflow-hidden border border-white/60">
          
          <div className="px-8 pt-12 pb-6 text-center">
            <div className="inline-flex items-center justify-center p-3 bg-white rounded-[1.2rem] mb-6 shadow-sm border border-slate-100 transition-transform hover:scale-105 duration-300">
              <Logo className="w-12 h-12" />
            </div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight mb-1">Create Account</h1>
            <p className="text-slate-500 text-[10px] font-black tracking-[0.25em] uppercase opacity-60">Access for Participants & Hosts</p>
          </div>

          <div className="px-10 pb-12">
            <form className="space-y-4" onSubmit={handleCreateAccount}>
              <div className="space-y-1">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
                <div className="relative">
                  <span className="material-icons-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-lg">person</span>
                  <input 
                    required
                    className="w-full pl-12 pr-4 py-3.5 rounded-2xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:ring-4 focus:ring-blue-600/5 focus:border-blue-600 transition-all outline-none text-slate-900 font-medium text-sm" 
                    type="text" 
                    placeholder="Name" 
                  />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Academic Email</label>
                <div className="relative">
                  <span className="material-icons-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-lg">alternate_email</span>
                  <input 
                    required
                    className="w-full pl-12 pr-4 py-3.5 rounded-2xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:ring-4 focus:ring-blue-600/5 focus:border-blue-600 transition-all outline-none text-slate-900 font-medium text-sm" 
                    type="email" 
                    placeholder="name@university.edu" 
                  />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Password</label>
                <div className="relative">
                  <span className="material-icons-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-lg">lock</span>
                  <input 
                    required
                    className="w-full pl-12 pr-4 py-3.5 rounded-2xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:ring-4 focus:ring-blue-600/5 focus:border-blue-600 transition-all outline-none text-slate-900 font-medium text-sm" 
                    type="password" 
                    placeholder="Create Secure Password" 
                  />
                </div>
              </div>

              <div className="pt-6 space-y-4">
                <button 
                  type="submit"
                  className="w-full bg-slate-900 text-white font-black py-4 px-4 rounded-2xl hover:bg-slate-800 active:scale-[0.98] transition-all shadow-xl shadow-slate-900/10 tracking-tight"
                >
                  Create My Account
                </button>
                
                <div className="text-center pt-2">
                  <p className="text-xs text-slate-400 font-medium">
                    Already have a Ta-Tip account? {' '}
                    <button 
                      type="button"
                      onClick={handleBackToLogin} 
                      className="text-blue-600 font-black hover:underline"
                    >
                      Sign In
                    </button>
                  </p>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
