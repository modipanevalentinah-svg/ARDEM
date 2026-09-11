import React from 'react';
import { 
  LayoutDashboard, 
  Map as MapIcon, 
  Cpu, 
  AlertTriangle, 
  BarChart3, 
  Sparkles, 
  FileText, 
  Settings, 
  User, 
  ChevronLeft, 
  ChevronRight,
  Compass,
  X,
  Building2
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { PageType } from '../../types';

interface NavItem {
  id: PageType;
  label: string;
  icon: React.ElementType;
  badge?: string | number;
  badgeColor?: string;
  description: string;
}

export const Sidebar: React.FC = () => {
  const { 
    activePage, 
    navigateTo, 
    sidebarCollapsed, 
    setSidebarCollapsed, 
    mobileNavOpen, 
    setMobileNavOpen,
    aggregateStats,
    setSettingsOpen
  } = useApp();

  const navItems: NavItem[] = [
    {
      id: 'overview',
      label: 'Overview',
      icon: LayoutDashboard,
      description: 'Executive Performance'
    },
    {
      id: 'map',
      label: 'Operations Map',
      icon: MapIcon,
      badge: 'GIS',
      badgeColor: 'bg-amber-500/20 text-amber-300 border border-amber-500/30',
      description: 'Spatial Intelligence'
    },
    {
      id: 'automation',
      label: 'Automation',
      icon: Cpu,
      badge: `${aggregateStats.automationRate}%`,
      badgeColor: 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30',
      description: 'Pipeline & Ingestion'
    },
    {
      id: 'exceptions',
      label: 'Exceptions',
      icon: AlertTriangle,
      badge: aggregateStats.activeExceptions,
      badgeColor: 'bg-rose-500/20 text-rose-300 border border-rose-500/30',
      description: 'Root Cause & Resolution'
    },
    {
      id: 'analytics',
      label: 'Analytics',
      icon: BarChart3,
      description: 'GeoOps Score & BI'
    },
    {
      id: 'ai-insights',
      label: 'AI Insights',
      icon: Sparkles,
      badge: 'Assistant',
      badgeColor: 'bg-amber-500/20 text-amber-300 border border-amber-500/30',
      description: 'Spatial Intelligence Copilot'
    },
    {
      id: 'reports',
      label: 'Reports',
      icon: FileText,
      description: 'Executive Briefings'
    }
  ];

  const sidebarContent = (
    <div className="flex h-full flex-col justify-between bg-[#0b1320] text-slate-300">
      {/* Brand Header */}
      <div>
        <div className="flex h-16 items-center justify-between border-b border-slate-800/80 px-4">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-amber-500 to-amber-600 shadow-md shadow-amber-900/30 text-white font-black text-sm">
              <Compass className="h-5 w-5 animate-spin-slow" />
            </div>
            {!sidebarCollapsed && (
              <div className="flex flex-col min-w-0">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400 font-mono">
                  ARDEM
                </span>
                <span className="text-sm font-bold tracking-tight text-white truncate">
                  GeoOps Intelligence
                </span>
              </div>
            )}
          </div>

          {/* Close button on mobile, collapse toggle on desktop */}
          <button
            type="button"
            onClick={() => setMobileNavOpen(false)}
            className="rounded p-1 text-slate-400 hover:bg-slate-800 hover:text-white lg:hidden"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Primary Navigation */}
        <nav className="space-y-1 p-2">
          {!sidebarCollapsed && (
            <div className="px-3 py-2 text-[10px] font-bold uppercase tracking-widest text-slate-500">
              Navigation
            </div>
          )}
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activePage === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => navigateTo(item.id)}
                title={sidebarCollapsed ? item.label : undefined}
                className={`group relative flex w-full items-center rounded-md px-3 py-2.5 text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-amber-500/15 text-amber-400 border border-amber-500/30 shadow-xs'
                    : 'text-slate-300 hover:bg-slate-800/70 hover:text-white'
                }`}
              >
                {isActive && (
                  <span className="absolute left-0 top-1.5 bottom-1.5 w-1 rounded-r-full bg-amber-500"></span>
                )}
                <Icon
                  className={`h-4 w-4 shrink-0 transition-colors ${
                    isActive ? 'text-amber-400' : 'text-slate-400 group-hover:text-slate-200'
                  } ${!sidebarCollapsed ? 'mr-3' : 'mx-auto'}`}
                />
                {!sidebarCollapsed && (
                  <div className="flex flex-1 items-center justify-between overflow-hidden">
                    <span className="truncate">{item.label}</span>
                    {item.badge !== undefined && (
                      <span className={`ml-2 rounded px-1.5 py-0.5 text-[10px] font-bold ${item.badgeColor || 'bg-slate-800 text-slate-300'}`}>
                        {item.badge}
                      </span>
                    )}
                  </div>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Section: User Profile & Collapse Toggle */}
      <div className="border-t border-slate-800/80 p-2 space-y-1">
        {/* Settings button */}
        <button
          type="button"
          onClick={() => setSettingsOpen(true)}
          title={sidebarCollapsed ? 'Settings' : undefined}
          className="group flex w-full items-center rounded-md px-3 py-2 text-xs font-medium text-slate-400 hover:bg-slate-800 hover:text-white transition"
        >
          <Settings className={`h-4 w-4 shrink-0 ${!sidebarCollapsed ? 'mr-3' : 'mx-auto'}`} />
          {!sidebarCollapsed && <span>Settings & GIS Config</span>}
        </button>

        {/* User Profile Card */}
        <div className={`flex items-center rounded-md bg-slate-800/40 p-2 border border-slate-800/60 ${sidebarCollapsed ? 'justify-center' : 'justify-between'}`}>
          <div className="flex items-center gap-2.5 overflow-hidden">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-700 text-amber-300 font-bold text-xs border border-slate-600">
              OM
            </div>
            {!sidebarCollapsed && (
              <div className="flex flex-col min-w-0">
                <span className="text-xs font-semibold text-white truncate">
                  Ops Manager
                </span>
                <span className="text-[10px] text-slate-400 truncate">
                  Enterprise Operations
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Desktop Collapse Toggle */}
        <div className="hidden lg:block pt-1">
          <button
            type="button"
            onClick={() => setSidebarCollapsed(prev => !prev)}
            className="flex w-full items-center justify-center rounded p-1.5 text-slate-500 hover:bg-slate-800 hover:text-slate-300 transition"
            title={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {sidebarCollapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <div className="flex items-center gap-1 text-[11px]">
                <ChevronLeft className="h-4 w-4" />
                <span>Collapse Navigation</span>
              </div>
            )}
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Persistent Sidebar */}
      <aside
        className={`hidden lg:flex flex-col shrink-0 transition-all duration-300 ease-in-out z-20 border-r border-slate-800 shadow-xl ${
          sidebarCollapsed ? 'w-16' : 'w-64'
        }`}
      >
        {sidebarContent}
      </aside>

      {/* Mobile Drawer Navigation with backdrop */}
      {mobileNavOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div
            className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileNavOpen(false)}
          />
          <div className="relative flex w-72 max-w-[85vw] flex-1 flex-col shadow-2xl">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
};
