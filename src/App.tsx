import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Sidebar } from './components/common/Sidebar';
import { Header } from './components/common/Header';
import { OverviewPage } from './components/overview/OverviewPage';
import { OperationsMapPage } from './components/map/OperationsMapPage';
import { AutomationPage } from './components/automation/AutomationPage';
import { ExceptionsPage } from './components/exceptions/ExceptionsPage';
import { AnalyticsPage } from './components/analytics/AnalyticsPage';
import { AIInsightsPage } from './components/ai/AIInsightsPage';
import { ReportsPage } from './components/reports/ReportsPage';
import { TransactionDetailDrawer } from './components/common/TransactionDetailDrawer';
import { ExceptionDetailModal } from './components/common/ExceptionDetailModal';
import { ReportDetailModal } from './components/common/ReportDetailModal';
import { SettingsModal } from './components/common/SettingsModal';
import { ToastContainer } from './components/common/ToastContainer';
import { LocationDetailDrawer } from './components/common/LocationDetailDrawer';

const MainContent: React.FC = () => {
  const { activePage } = useApp();

  return (
    <main className="flex-1 overflow-y-auto bg-slate-50 px-4 sm:px-6 lg:px-8 py-6">
      <div className="mx-auto max-w-7xl">
        {activePage === 'overview' && <OverviewPage />}
        {activePage === 'map' && <OperationsMapPage />}
        {activePage === 'automation' && <AutomationPage />}
        {activePage === 'exceptions' && <ExceptionsPage />}
        {activePage === 'analytics' && <AnalyticsPage />}
        {activePage === 'ai-insights' && <AIInsightsPage />}
        {activePage === 'reports' && <ReportsPage />}
      </div>
    </main>
  );
};

export default function App() {
  return (
    <AppProvider>
      <div className="flex h-screen w-screen overflow-hidden bg-slate-900 font-sans text-slate-800 antialiased selection:bg-amber-500 selection:text-slate-950">
        {/* Charcoal-themed Sidebar */}
        <Sidebar />

        {/* Right side: Top Header + Scrollable Page Content */}
        <div className="flex flex-1 flex-col overflow-hidden bg-slate-50">
          <Header />
          <MainContent />
        </div>

        {/* Global Drawers & Modals */}
        <TransactionDetailDrawer />
        <LocationDetailDrawer />
        <ExceptionDetailModal />
        <ReportDetailModal />
        <SettingsModal />
        <ToastContainer />
      </div>
    </AppProvider>
  );
}
