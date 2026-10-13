import React from 'react';
import { Database, ShieldCheck, Mail, Sparkles, School, HardDrive, LogOut, User } from 'lucide-react';
import { LocalDatabaseStats } from '../types/survey';
import { AuthUser } from './LoginView';

interface HeaderProps {
  activeTab: 'input' | 'database' | 'analytics' | 'report';
  setActiveTab: (tab: 'input' | 'database' | 'analytics' | 'report') => void;
  recordCount: number;
  dbStats?: LocalDatabaseStats | null;
  targetEmail: string;
  currentUser?: AuthUser | null;
  onLogout?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  recordCount,
  dbStats,
  targetEmail,
  currentUser,
  onLogout,
}) => {
  return (
    <header className="bg-slate-900 text-white border-b border-slate-800 sticky top-0 z-40 shadow-lg">
      {/* Top Banner: Official Republic of the Philippines / ASCOT identity */}
      <div className="bg-slate-950 px-4 py-1.5 border-b border-slate-800 text-xs text-slate-400 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span className="font-semibold text-slate-300">Republic of the Philippines</span>
          <span>•</span>
          <span className="text-amber-400 font-medium">AURORA STATE COLLEGE OF TECHNOLOGY (ASCOT)</span>
          <span className="hidden sm:inline">•</span>
          <span className="hidden sm:inline text-slate-400">Casiguran Campus Planning Committee (DICADI Area)</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-xs text-emerald-400 bg-emerald-950/80 border border-emerald-800/60 px-2 py-0.5 rounded">
            <HardDrive className="w-3.5 h-3.5" />
            <span>Local Database: Active (Offline-Ready)</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-sky-300 bg-sky-950/80 border border-sky-800/60 px-2 py-0.5 rounded">
            <Mail className="w-3.5 h-3.5" />
            <span className="font-mono">{targetEmail}</span>
          </div>
        </div>
      </div>

      {/* Main Header Row */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-amber-600 to-amber-400 flex items-center justify-center shadow-md shadow-amber-500/20 text-slate-950 font-black text-xl border border-amber-300/40">
            <School className="w-7 h-7 text-slate-950" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
                ASCOT Feasibility Study System
              </h1>
              <span className="bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs px-2 py-0.5 rounded font-medium">
                Local Storage Edition
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-400">
              Direct Data Intake • Local Database & PDF Export • Feasibility Analysis • Email Dispatch
            </p>
          </div>
        </div>

        {/* User profile & quick status pills */}
        <div className="flex flex-wrap items-center gap-3 self-start md:self-auto">
          {currentUser && (
            <div className="bg-slate-800/90 border border-slate-700/80 px-3 py-1.5 rounded-lg flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/30 flex items-center justify-center font-bold text-xs">
                {currentUser.name ? currentUser.name.charAt(0).toUpperCase() : 'U'}
              </div>
              <div>
                <div className="text-xs font-bold text-white flex items-center gap-1.5">
                  <span>{currentUser.name}</span>
                  <span className="text-[10px] bg-amber-400/20 text-amber-300 px-1 rounded font-normal">
                    {currentUser.role.split(' ')[0]}
                  </span>
                </div>
                <div className="text-[10px] text-slate-400 font-mono truncate max-w-[150px]">
                  {currentUser.email}
                </div>
              </div>

              {onLogout && (
                <button
                  type="button"
                  onClick={onLogout}
                  title="Sign out of Ascot FSS"
                  className="ml-1 p-1.5 rounded text-slate-400 hover:text-rose-400 hover:bg-slate-700/60 transition-all"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          )}

          <div className="bg-slate-800/90 border border-slate-700/80 px-3 py-1.5 rounded-lg flex items-center gap-3">
            <div className="text-right">
              <div className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Local Records</div>
              <div className="text-base font-bold text-amber-400 font-mono">{recordCount} Stored</div>
            </div>
            <div className="w-8 h-8 rounded-lg bg-slate-700/60 flex items-center justify-center text-amber-400">
              <Database className="w-4 h-4" />
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <nav className="flex space-x-1 sm:space-x-2 border-t border-slate-800 pt-2 pb-2 overflow-x-auto scrollbar-none">
          <button
            onClick={() => setActiveTab('input')}
            className={`px-3.5 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'input'
                ? 'bg-amber-500 text-slate-950 shadow-sm font-semibold'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            Survey Data Input
          </button>

          <button
            onClick={() => setActiveTab('database')}
            className={`px-3.5 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'database'
                ? 'bg-amber-500 text-slate-950 shadow-sm font-semibold'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Database className="w-4 h-4" />
            Local Database
            <span
              className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                activeTab === 'database' ? 'bg-slate-950 text-amber-400' : 'bg-slate-800 text-slate-300'
              }`}
            >
              {recordCount}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('analytics')}
            className={`px-3.5 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'analytics'
                ? 'bg-amber-500 text-slate-950 shadow-sm font-semibold'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <span className="text-base leading-none">📊</span>
            Feasibility Analytics
          </button>

          <button
            onClick={() => setActiveTab('report')}
            className={`px-3.5 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'report'
                ? 'bg-amber-500 text-slate-950 shadow-sm font-semibold'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Mail className="w-4 h-4" />
            Executive Report & Email
            <span className="bg-sky-400/20 text-sky-300 text-[10px] px-1.5 py-0.5 rounded border border-sky-400/40">
              Smart
            </span>
          </button>
        </nav>
      </div>
    </header>
  );
};
