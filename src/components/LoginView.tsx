import React, { useState } from 'react';
import {
  School,
  Lock,
  Mail,
  Eye,
  EyeOff,
  ShieldCheck,
  ArrowRight,
  UserCheck,
  AlertCircle,
  HardDrive,
  KeyRound,
  CheckCircle2,
} from 'lucide-react';

export interface AuthUser {
  email: string;
  name: string;
  role: string;
  title: string;
  loginTime: string;
}

interface LoginViewProps {
  onLoginSuccess: (user: AuthUser) => void;
}

export const PRESET_ACCOUNTS = [
  {
    name: 'Cheska Cate',
    email: 'cheskacate18@gmail.com',
    role: 'Lead Administrator & Researcher',
    title: 'Head of Feasibility Study Committee',
    defaultPassword: 'ascot',
  },
  {
    name: 'ASCOT Field Enumerator',
    email: 'enumerator@ascot.edu.ph',
    role: 'DICADI Field Researcher',
    title: 'Data Intake & Campus Planning Officer',
    defaultPassword: 'ascot',
  },
];

export const LoginView: React.FC<LoginViewProps> = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('cheskacate18@gmail.com');
  const [password, setPassword] = useState('ascot');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    if (!trimmedEmail) {
      setError('Please provide an email address.');
      return;
    }

    if (!trimmedPassword) {
      setError('Please enter your password.');
      return;
    }

    setIsSubmitting(true);

    // Simulate authenticating against local secure database
    setTimeout(() => {
      // Find preset account or create custom user profile
      const matched = PRESET_ACCOUNTS.find(
        (a) => a.email.toLowerCase() === trimmedEmail.toLowerCase()
      );

      const user: AuthUser = {
        email: trimmedEmail,
        name: matched ? matched.name : trimmedEmail.split('@')[0],
        role: matched ? matched.role : 'Authorized Academic Evaluator',
        title: matched ? matched.title : 'ASCOT Casiguran Planning Committee',
        loginTime: new Date().toISOString(),
      };

      if (rememberMe) {
        localStorage.setItem('ascot_fss_session', JSON.stringify(user));
      } else {
        sessionStorage.setItem('ascot_fss_session', JSON.stringify(user));
      }

      setIsSubmitting(false);
      onLoginSuccess(user);
    }, 450);
  };

  const handleQuickSelectAccount = (account: (typeof PRESET_ACCOUNTS)[0]) => {
    setEmail(account.email);
    setPassword(account.defaultPassword);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-center items-center p-4 sm:p-6 text-slate-100 selection:bg-amber-500 selection:text-slate-950">
      {/* Background Decorative Rings */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-md w-full relative z-10 space-y-6">
        {/* Institutional Branding Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-600 to-amber-400 text-slate-950 shadow-xl shadow-amber-500/20 border border-amber-300/40 mb-2">
            <School className="w-9 h-9" />
          </div>

          <div className="text-xs font-bold uppercase tracking-widest text-amber-400">
            Republic of the Philippines
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
            AURORA STATE COLLEGE OF TECHNOLOGY
          </h1>
          <div className="inline-block bg-slate-900 border border-slate-800 text-slate-300 text-xs px-3 py-1 rounded-full font-medium">
            Feasibility Study System (Ascot FSS)
          </div>
          <p className="text-xs text-slate-400 max-w-xs mx-auto">
            Casiguran Campus Planning Committee • DICADI Catchment Feasibility
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-slate-900/90 backdrop-blur-md border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6">
          <div className="border-b border-slate-800 pb-3 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-300">
              <KeyRound className="w-4 h-4 text-amber-400" />
              <span>Sign in to access Ascot FSS</span>
            </div>
            <span className="text-[10px] text-emerald-400 bg-emerald-950/80 border border-emerald-800/60 px-2 py-0.5 rounded font-mono">
              Local Storage Mode
            </span>
          </div>

          {error && (
            <div className="p-3 bg-rose-950/60 border border-rose-800/80 rounded-xl text-xs text-rose-300 flex items-center gap-2 animate-fadeIn">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Field */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
                Official Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. cheskacate18@gmail.com"
                  className="w-full text-sm pl-10 pr-3.5 py-2.5 bg-slate-950/80 border border-slate-800 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 font-mono"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
                  Password
                </label>
                <span className="text-[11px] text-slate-500">Default: ascot</span>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full text-sm pl-10 pr-10 py-2.5 bg-slate-950/80 border border-slate-800 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center justify-between text-xs pt-1">
              <label className="flex items-center gap-2 cursor-pointer text-slate-300 select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded border-slate-700 bg-slate-950 text-amber-500 focus:ring-amber-500"
                />
                <span>Remember session on this device</span>
              </label>
            </div>

            {/* Sign In Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold py-3 px-4 rounded-xl text-sm flex items-center justify-center gap-2 transition-all shadow-lg shadow-amber-500/20 disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                  <span>Verifying Credentials...</span>
                </>
              ) : (
                <>
                  <span>Open Ascot FSS Portal</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Quick Login Presets for testing & authorized roles */}
          <div className="pt-2 border-t border-slate-800 space-y-2">
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Quick Sign-in (1-Click Fill):
            </div>
            <div className="space-y-1.5">
              {PRESET_ACCOUNTS.map((acc) => (
                <button
                  key={acc.email}
                  type="button"
                  onClick={() => handleQuickSelectAccount(acc)}
                  className={`w-full p-2.5 rounded-xl border text-left transition-all flex items-center justify-between text-xs ${
                    email.toLowerCase() === acc.email.toLowerCase()
                      ? 'bg-amber-500/10 border-amber-500/40 text-amber-300'
                      : 'bg-slate-950/60 border-slate-800/80 text-slate-300 hover:bg-slate-800/50'
                  }`}
                >
                  <div>
                    <div className="font-bold flex items-center gap-1.5">
                      <UserCheck className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span>{acc.name}</span>
                    </div>
                    <div className="text-[11px] text-slate-400 font-mono mt-0.5">
                      {acc.email}
                    </div>
                  </div>
                  <span className="text-[10px] bg-slate-900 border border-slate-700/80 px-2 py-0.5 rounded text-slate-300 shrink-0">
                    {acc.role.split(' ')[0]}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Security & System Info Footer */}
        <div className="text-center text-[11px] text-slate-500 space-y-1">
          <div className="flex items-center justify-center gap-2">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
            <span>Authorized ASCOT Personnel Only</span>
            <span>•</span>
            <HardDrive className="w-3.5 h-3.5 text-sky-500" />
            <span>Local Database Store</span>
          </div>
          <p>© {new Date().getFullYear()} Aurora State College of Technology • Baler, Aurora, Philippines</p>
        </div>
      </div>
    </div>
  );
};
