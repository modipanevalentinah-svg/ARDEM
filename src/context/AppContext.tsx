import React, { createContext, useContext, useState, useMemo } from 'react';
import { 
  PageType, 
  RegionId, 
  TransactionData, 
  ExceptionData, 
  LocationData, 
  ExecutiveReport,
  RegionData 
} from '../types';
import { 
  REGIONS_DATA, 
  OPERATIONAL_LOCATIONS, 
  RECENT_TRANSACTIONS, 
  EXCEPTIONS_DATA, 
  EXECUTIVE_REPORTS 
} from '../data/mockData';

export type MapLayerType = 
  | 'activity' 
  | 'exceptions' 
  | 'hotspots';

interface NotificationToast {
  id: string;
  message: string;
  type: 'success' | 'info' | 'warning';
}

interface AppContextType {
  activePage: PageType;
  setActivePage: (page: PageType) => void;
  selectedRegion: RegionId | 'all';
  setSelectedRegion: (region: RegionId | 'all') => void;
  selectedTransaction: TransactionData | null;
  setSelectedTransaction: (tx: TransactionData | null) => void;
  selectedException: ExceptionData | null;
  setSelectedException: (ex: ExceptionData | null) => void;
  selectedLocation: LocationData | null;
  setSelectedLocation: (loc: LocationData | null) => void;
  selectedReport: ExecutiveReport | null;
  setSelectedReport: (report: ExecutiveReport | null) => void;
  mapActiveLayer: MapLayerType;
  setMapActiveLayer: (layer: MapLayerType) => void;
  sidebarCollapsed: boolean;
  setSidebarCollapsed: (collapsed: boolean | ((prev: boolean) => boolean)) => void;
  mobileNavOpen: boolean;
  setMobileNavOpen: (open: boolean) => void;
  settingsOpen: boolean;
  setSettingsOpen: (open: boolean) => void;
  
  // Dynamic lists with mutation capabilities (e.g. resolving exceptions)
  exceptionsList: ExceptionData[];
  resolveException: (id: string, actionNote?: string) => void;
  
  // Navigation helper
  navigateTo: (page: PageType, region?: RegionId | 'all', extraState?: { location?: LocationData; layer?: MapLayerType }) => void;
  
  // Toast notifications
  toasts: NotificationToast[];
  showToast: (message: string, type?: 'success' | 'info' | 'warning') => void;
  removeToast: (id: string) => void;

  // Filtered computed values
  filteredLocations: LocationData[];
  filteredTransactions: TransactionData[];
  filteredExceptions: ExceptionData[];
  currentRegionData: RegionData | null;
  aggregateStats: {
    totalTransactions: number;
    automationRate: number;
    activeExceptions: number;
    hotspotCount: number;
    avgProcessingTime: number;
    costImpact: number;
    savings: string;
    geoopsScore: number;
  };
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activePage, setActivePage] = useState<PageType>('overview');
  const [selectedRegion, setSelectedRegion] = useState<RegionId | 'all'>('all');
  const [selectedTransaction, setSelectedTransaction] = useState<TransactionData | null>(null);
  const [selectedException, setSelectedException] = useState<ExceptionData | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<LocationData | null>(null);
  const [selectedReport, setSelectedReport] = useState<ExecutiveReport | null>(null);
  const [mapActiveLayer, setMapActiveLayer] = useState<MapLayerType>('hotspots');
  const [sidebarCollapsed, setSidebarCollapsed] = useState<boolean>(false);
  const [mobileNavOpen, setMobileNavOpen] = useState<boolean>(false);
  const [settingsOpen, setSettingsOpen] = useState<boolean>(false);
  const [exceptionsList, setExceptionsList] = useState<ExceptionData[]>(EXCEPTIONS_DATA);
  const [toasts, setToasts] = useState<NotificationToast[]>([]);

  const showToast = (message: string, type: 'success' | 'info' | 'warning' = 'info') => {
    const id = Date.now().toString() + Math.random().toString(36).substring(2, 5);
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const resolveException = (id: string, actionNote?: string) => {
    setExceptionsList(prev => 
      prev.map(item => {
        if (item.exception_id === id) {
          return {
            ...item,
            resolution_status: 'Resolved' as const,
            ai_analysis: item.ai_analysis + (actionNote ? ` [Resolution Note: ${actionNote}]` : ' [Resolved by Operations Team]')
          };
        }
        return item;
      })
    );
    showToast(`Exception ${id} successfully resolved and extraction rule updated.`, 'success');
  };

  const navigateTo = (
    page: PageType, 
    region?: RegionId | 'all', 
    extraState?: { location?: LocationData; layer?: MapLayerType }
  ) => {
    setActivePage(page);
    if (region !== undefined) {
      setSelectedRegion(region);
    }
    if (extraState?.location) {
      setSelectedLocation(extraState.location);
    }
    if (extraState?.layer) {
      setMapActiveLayer(extraState.layer);
    }
    setMobileNavOpen(false);
  };

  // Filtered Locations
  const filteredLocations = useMemo(() => {
    if (selectedRegion === 'all') return OPERATIONAL_LOCATIONS;
    return OPERATIONAL_LOCATIONS.filter(loc => loc.region === selectedRegion);
  }, [selectedRegion]);

  // Filtered Transactions
  const filteredTransactions = useMemo(() => {
    if (selectedRegion === 'all') return RECENT_TRANSACTIONS;
    return RECENT_TRANSACTIONS.filter(tx => tx.region === selectedRegion);
  }, [selectedRegion]);

  // Filtered Exceptions
  const filteredExceptions = useMemo(() => {
    if (selectedRegion === 'all') return exceptionsList;
    return exceptionsList.filter(ex => ex.region === selectedRegion);
  }, [selectedRegion, exceptionsList]);

  // Current Region Metadata
  const currentRegionData = useMemo(() => {
    if (selectedRegion === 'all') return null;
    return REGIONS_DATA[selectedRegion] || null;
  }, [selectedRegion]);

  // Count how many exceptions have been resolved in this session
  const resolvedCount = useMemo(() => {
    return exceptionsList.filter(e => e.resolution_status === 'Resolved').length;
  }, [exceptionsList]);

  // Aggregate stats dynamically calculating based on region selection
  const aggregateStats = useMemo(() => {
    if (selectedRegion === 'all') {
      return {
        totalTransactions: 248592,
        automationRate: 94.7,
        activeExceptions: Math.max(0, 127 - resolvedCount),
        hotspotCount: 8,
        avgProcessingTime: 2.8,
        costImpact: 727000,
        savings: '$1.84M',
        geoopsScore: 84.6
      };
    }

    const reg = REGIONS_DATA[selectedRegion];
    const regResolved = exceptionsList.filter(e => e.region === selectedRegion && e.resolution_status === 'Resolved').length;
    const baseExceptions = reg ? reg.exception_count : 0;
    const hotspots = selectedRegion === 'midwest' ? 3 : (OPERATIONAL_LOCATIONS.filter(l => l.region === selectedRegion && (l.is_hotspot || l.exception_count >= 8)).length || 1);

    return {
      totalTransactions: reg ? reg.transactions : 0,
      automationRate: reg ? reg.automation_rate : 94.0,
      activeExceptions: Math.max(0, baseExceptions - regResolved),
      hotspotCount: hotspots,
      avgProcessingTime: reg ? reg.avg_processing_time : 2.8,
      costImpact: reg ? reg.cost_impact : 50000,
      savings: `$${((reg ? reg.transactions : 10000) * 0.0074).toFixed(2)}M`,
      geoopsScore: reg ? reg.geoops_score : 80
    };
  }, [selectedRegion, resolvedCount, exceptionsList]);

  return (
    <AppContext.Provider
      value={{
        activePage,
        setActivePage,
        selectedRegion,
        setSelectedRegion,
        selectedTransaction,
        setSelectedTransaction,
        selectedException,
        setSelectedException,
        selectedLocation,
        setSelectedLocation,
        selectedReport,
        setSelectedReport,
        mapActiveLayer,
        setMapActiveLayer,
        sidebarCollapsed,
        setSidebarCollapsed,
        mobileNavOpen,
        setMobileNavOpen,
        settingsOpen,
        setSettingsOpen,
        exceptionsList,
        resolveException,
        navigateTo,
        toasts,
        showToast,
        removeToast,
        filteredLocations,
        filteredTransactions,
        filteredExceptions,
        currentRegionData,
        aggregateStats
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
