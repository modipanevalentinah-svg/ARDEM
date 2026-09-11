import { RegionData, LocationData, TransactionData, ExceptionData, AutomationWorkflow, ExecutiveReport, ReportData, VendorData, AIInsight, RegionId } from '../types';

export const SIMULATED_DATA_DISCLAIMER = "Simulated Demo Environment: All figures, transaction records, vendors, and geographic locations are synthetically generated for demonstration of spatial operational intelligence.";

export const REGIONS_DATA: Record<RegionId, RegionData> = {
  midwest: {
    id: 'midwest',
    name: 'Midwest Region',
    code: 'MW-01',
    center: [41.8781, -87.6298], // Chicago center
    zoom: 6,
    transactions: 42847,
    automation_rate: 93.1,
    exception_rate: 6.9,
    exception_count: 38,
    avg_processing_time: 2.9,
    cost_impact: 184000,
    geoops_score: 72,
    cost_efficiency: 78,
    accuracy: 97.4,
    status: 'attention',
    primary_pattern: 'Recurring supplier-related documentation inconsistencies detected across multiple industrial logistics hubs.',
    ai_insight: 'Recurring supplier documentation inconsistencies have been detected across multiple operational territories in Illinois, Michigan, and Ohio.',
    ai_recommendation: 'Deploy updated optical character recognition (OCR) and vendor profile normalization templates for Apex Industrial and Midwest Supply.'
  },
  northeast: {
    id: 'northeast',
    name: 'Northeast Region',
    code: 'NE-02',
    center: [42.3601, -71.0589], // Boston / NYC corridor
    zoom: 6,
    transactions: 37290,
    automation_rate: 92.4,
    exception_rate: 7.6,
    exception_count: 37,
    avg_processing_time: 3.1,
    cost_impact: 210000,
    geoops_score: 69,
    cost_efficiency: 64,
    accuracy: 96.8,
    status: 'critical',
    primary_pattern: 'Elevated transaction processing costs and recurring utility tariff variance exceptions.',
    ai_insight: 'Northeast transactions exhibit highest unit processing cost ($48.20/batch) due to non-standard municipal utility formatting in NY and NJ.',
    ai_recommendation: 'Incorporate Northeast regional utility billing schema adaptors to reduce manual audit cycle from 4.2h to 45min.'
  },
  south: {
    id: 'south',
    name: 'South Region',
    code: 'SO-03',
    center: [32.7767, -96.7970], // Texas corridor
    zoom: 6,
    transactions: 48120,
    automation_rate: 97.4,
    exception_rate: 2.1,
    exception_count: 10,
    avg_processing_time: 2.1,
    cost_impact: 42000,
    geoops_score: 94,
    cost_efficiency: 96,
    accuracy: 99.6,
    status: 'optimal',
    primary_pattern: 'Strongest nationwide automation benchmark with 97.4% straight-through processing.',
    ai_insight: 'High alignment with standardized EDI feeds across Texas and Oklahoma shipping depots drives exceptional straight-through processing.',
    ai_recommendation: 'Benchmark southern operational pipeline rules as reference standard for national workflow optimization.'
  },
  west: {
    id: 'west',
    name: 'West Region',
    code: 'WE-04',
    center: [37.7749, -122.4194], // California / Pacific
    zoom: 6,
    transactions: 36400,
    automation_rate: 93.8,
    exception_rate: 3.8,
    exception_count: 14,
    avg_processing_time: 3.8,
    cost_impact: 148000,
    geoops_score: 76,
    cost_efficiency: 74,
    accuracy: 98.1,
    status: 'attention',
    primary_pattern: 'Slower average processing latencies (3.8 min vs 2.8 min natl avg) caused by multi-tiered state compliance documents.',
    ai_insight: 'Complex multi-page California air resources and hazardous material waste manifests require secondary validation pass.',
    ai_recommendation: 'Enable parallel microservice extraction nodes for West regional document queues to reduce document latency.'
  },
  southeast: {
    id: 'southeast',
    name: 'Southeast Region',
    code: 'SE-05',
    center: [33.7490, -84.3880], // Atlanta hub
    zoom: 6,
    transactions: 31250,
    automation_rate: 95.8,
    exception_rate: 2.6,
    exception_count: 8,
    avg_processing_time: 2.4,
    cost_impact: 58000,
    geoops_score: 90,
    cost_efficiency: 91,
    accuracy: 99.2,
    status: 'optimal',
    primary_pattern: 'Stable logistics document throughput with low exception rates across freight lanes.',
    ai_insight: 'Port of Savannah and Atlanta intermodal processing pipelines maintain 95.8% automated accuracy.',
    ai_recommendation: 'Maintain continuous automated validation; evaluate expandability into seasonal peak freight volumes.'
  },
  southwest: {
    id: 'southwest',
    name: 'Southwest Region',
    code: 'SW-06',
    center: [33.4484, -112.0740], // Phoenix / Arizona
    zoom: 6,
    transactions: 19820,
    automation_rate: 94.2,
    exception_rate: 3.5,
    exception_count: 7,
    avg_processing_time: 2.7,
    cost_impact: 39000,
    geoops_score: 85,
    cost_efficiency: 86,
    accuracy: 98.5,
    status: 'stable',
    primary_pattern: 'Steady growth in solar and utility procurement contracts with moderate automated reconciliation.',
    ai_insight: 'Cross-border trucking manifests in Nogales and El Paso show occasional currency conversion discrepancies.',
    ai_recommendation: 'Standardize exchange rate automated indexing at 15-minute intervals.'
  },
  'mid-atlantic': {
    id: 'mid-atlantic',
    name: 'Mid-Atlantic Region',
    code: 'MA-07',
    center: [39.0458, -76.6413], // Baltimore / DC / VA
    zoom: 6,
    transactions: 18425,
    automation_rate: 94.9,
    exception_rate: 3.8,
    exception_count: 7,
    avg_processing_time: 2.5,
    cost_impact: 51000,
    geoops_score: 88,
    cost_efficiency: 87,
    accuracy: 98.9,
    status: 'stable',
    primary_pattern: 'Strict governmental and contractor regulatory compliance parsing.',
    ai_insight: 'Defense contractor and federal utility invoicing requires specialized line-item certification validation.',
    ai_recommendation: 'Deploy automated FAR compliance verification module to accelerate approval workflows.'
  },
  'pacific-northwest': {
    id: 'pacific-northwest',
    name: 'Pacific Northwest',
    code: 'PNW-08',
    center: [47.6062, -122.3321], // Seattle / Portland
    zoom: 6,
    transactions: 14440,
    automation_rate: 95.2,
    exception_rate: 4.1,
    exception_count: 6,
    avg_processing_time: 2.6,
    cost_impact: 38000,
    geoops_score: 89,
    cost_efficiency: 89,
    accuracy: 99.1,
    status: 'optimal',
    primary_pattern: 'High green-energy and port logistics operational document integrity.',
    ai_insight: 'Maritime freight bills of lading achieve high automated ingestion fidelity with minimal human touch.',
    ai_recommendation: 'Pilot automated customs document classification directly on the terminal ingress feed.'
  }
};

export const ENTERPRISE_CLIENTS = [
  'NextGen Manufacturing',
  'Horizon Health Systems',
  'Vanguard Retailers',
  'Summit Energy Partners',
  'Apex Aerospace Global',
  'Pinnacle Logistics Corp',
  'BioTech Solutions Intl',
  'OmniCorp Industrial',
  'Evergreen Supply Chain',
  'Titan Infrastructure'
];

export const VENDORS_LIST = [
  'Apex Industrial Supply',
  'Global Freight Solutions',
  'Midwest Power & Gas',
  'Pacific Supply Chain',
  'Tri-State Electric Utility',
  'Consolidated Rail & Cargo',
  'Metro Waste & Facility',
  'North American Fuel Direct',
  'Atlas Hydraulic Parts',
  'Liberty Packaging Services',
  'Continental Express Hauling',
  'Great Lakes Water District',
  'Southern Petro Distribution',
  'Cascade Thermal Energy',
  'Keystone Materials Handling'
];

// 100 Operational locations across United States with exact coordinates, facilities, and live metrics
export const OPERATIONAL_LOCATIONS: LocationData[] = [
  // Midwest Locations (Hotspots & Facilities)
  {
    location_id: 'LOC-MW-001',
    name: 'Chicago Central Logistics Gateway',
    address: '4200 S Pulaski Rd',
    city: 'Chicago',
    state: 'IL',
    latitude: 41.8155,
    longitude: -87.7245,
    region: 'midwest',
    territory: 'Great Lakes Commercial',
    facility_type: 'Distribution Hub',
    active_volume: 8420,
    automation_rate: 91.8,
    exception_count: 14,
    avg_processing_time: 3.2,
    cost_impact: 64000,
    is_hotspot: true
  },
  {
    location_id: 'LOC-MW-002',
    name: 'Detroit Automotive Operations Depot',
    address: '15000 W 8 Mile Rd',
    city: 'Detroit',
    state: 'MI',
    latitude: 42.4435,
    longitude: -83.1970,
    region: 'midwest',
    territory: 'Michigan Manufacturing',
    facility_type: 'Processing Center',
    active_volume: 6850,
    automation_rate: 92.4,
    exception_count: 11,
    avg_processing_time: 3.0,
    cost_impact: 48000,
    is_hotspot: true
  },
  {
    location_id: 'LOC-MW-003',
    name: 'Indianapolis Crossroads Fulfillment',
    address: '7800 Airway Dr',
    city: 'Indianapolis',
    state: 'IN',
    latitude: 39.7172,
    longitude: -86.2944,
    region: 'midwest',
    territory: 'Ohio Valley Operations',
    facility_type: 'Fulfillment Terminal',
    active_volume: 7200,
    automation_rate: 94.1,
    exception_count: 5,
    avg_processing_time: 2.7,
    cost_impact: 22000,
    is_hotspot: false
  },
  {
    location_id: 'LOC-MW-004',
    name: 'Cleveland Industrial Materials Yard',
    address: '3300 E 55th St',
    city: 'Cleveland',
    state: 'OH',
    latitude: 41.4880,
    longitude: -81.6521,
    region: 'midwest',
    territory: 'Lake Erie Corridor',
    facility_type: 'Regional Depot',
    active_volume: 5120,
    automation_rate: 92.9,
    exception_count: 8,
    avg_processing_time: 3.1,
    cost_impact: 34000,
    is_hotspot: true
  },
  {
    location_id: 'LOC-MW-005',
    name: 'Columbus Intermodal Logistics Center',
    address: '2400 Rohr Rd',
    city: 'Columbus',
    state: 'OH',
    latitude: 39.8820,
    longitude: -82.9640,
    region: 'midwest',
    territory: 'Ohio Valley Operations',
    facility_type: 'Distribution Hub',
    active_volume: 5900,
    automation_rate: 94.5,
    exception_count: 4,
    avg_processing_time: 2.6,
    cost_impact: 16000,
    is_hotspot: false
  },
  {
    location_id: 'LOC-MW-006',
    name: 'Milwaukee Heavy Machinery Terminal',
    address: '1100 S 5th St',
    city: 'Milwaukee',
    state: 'WI',
    latitude: 43.0180,
    longitude: -87.9170,
    region: 'midwest',
    territory: 'Upper Midwest Belt',
    facility_type: 'Processing Center',
    active_volume: 4100,
    automation_rate: 93.6,
    exception_count: 4,
    avg_processing_time: 2.8,
    cost_impact: 14000,
    is_hotspot: false
  },
  {
    location_id: 'LOC-MW-007',
    name: 'Minneapolis-St Paul Twin Hub',
    address: '2800 E 28th St',
    city: 'Minneapolis',
    state: 'MN',
    latitude: 44.9520,
    longitude: -93.2320,
    region: 'midwest',
    territory: 'Upper Midwest Belt',
    facility_type: 'Distribution Hub',
    active_volume: 5257,
    automation_rate: 95.0,
    exception_count: 2,
    avg_processing_time: 2.4,
    cost_impact: 9000,
    is_hotspot: false
  },

  // Northeast Locations (Higher unit cost impact)
  {
    location_id: 'LOC-NE-001',
    name: 'North Jersey Metro Logistics Hub',
    address: '100 Port St',
    city: 'Newark',
    state: 'NJ',
    latitude: 40.7020,
    longitude: -74.1500,
    region: 'northeast',
    territory: 'New York Metro Area',
    facility_type: 'Distribution Hub',
    active_volume: 9100,
    automation_rate: 91.2,
    exception_count: 15,
    avg_processing_time: 3.4,
    cost_impact: 82000,
    is_hotspot: true
  },
  {
    location_id: 'LOC-NE-002',
    name: 'Boston Greater Industrial Depot',
    address: '88 Black Falcon Ave',
    city: 'Boston',
    state: 'MA',
    latitude: 42.3420,
    longitude: -71.0280,
    region: 'northeast',
    territory: 'New England Metro',
    facility_type: 'Regional Depot',
    active_volume: 7450,
    automation_rate: 92.8,
    exception_count: 10,
    avg_processing_time: 3.1,
    cost_impact: 56000,
    is_hotspot: true
  },
  {
    location_id: 'LOC-NE-003',
    name: 'Philadelphia Delaware Valley Terminal',
    address: '3200 S 26th St',
    city: 'Philadelphia',
    state: 'PA',
    latitude: 39.9070,
    longitude: -75.1880,
    region: 'northeast',
    territory: 'Delaware Valley',
    facility_type: 'Processing Center',
    active_volume: 6890,
    automation_rate: 93.1,
    exception_count: 7,
    avg_processing_time: 2.9,
    cost_impact: 38000,
    is_hotspot: false
  },
  {
    location_id: 'LOC-NE-004',
    name: 'Pittsburgh Industrial Tech Center',
    address: '400 Technology Dr',
    city: 'Pittsburgh',
    state: 'PA',
    latitude: 40.4320,
    longitude: -79.9570,
    region: 'northeast',
    territory: 'Keystone West',
    facility_type: 'Processing Center',
    active_volume: 5320,
    automation_rate: 93.5,
    exception_count: 5,
    avg_processing_time: 2.8,
    cost_impact: 24000,
    is_hotspot: false
  },
  {
    location_id: 'LOC-NE-005',
    name: 'Hartford New England Depot',
    address: '150 Leibert Rd',
    city: 'Hartford',
    state: 'CT',
    latitude: 41.7820,
    longitude: -72.6650,
    region: 'northeast',
    territory: 'New England Metro',
    facility_type: 'Fulfillment Terminal',
    active_volume: 4200,
    automation_rate: 94.0,
    exception_count: 3,
    avg_processing_time: 2.7,
    cost_impact: 10000,
    is_hotspot: false
  },
  {
    location_id: 'LOC-NE-006',
    name: 'Buffalo Niagara Cross-Border Port',
    address: '890 Fuhrmann Blvd',
    city: 'Buffalo',
    state: 'NY',
    latitude: 42.8680,
    longitude: -78.8680,
    region: 'northeast',
    territory: 'Upstate Corridor',
    facility_type: 'Distribution Hub',
    active_volume: 4330,
    automation_rate: 92.1,
    exception_count: 6,
    avg_processing_time: 3.2,
    cost_impact: 20000,
    is_hotspot: false
  },

  // South Locations (Highest Automation Rate & Speed)
  {
    location_id: 'LOC-SO-001',
    name: 'Dallas-Fort Worth Mega Gateway',
    address: '2600 S International Pkwy',
    city: 'Dallas',
    state: 'TX',
    latitude: 32.8998,
    longitude: -97.0403,
    region: 'south',
    territory: 'Texas Triangle North',
    facility_type: 'Distribution Hub',
    active_volume: 14200,
    automation_rate: 98.1,
    exception_count: 3,
    avg_processing_time: 1.9,
    cost_impact: 9000,
    is_hotspot: false
  },
  {
    location_id: 'LOC-SO-002',
    name: 'Houston Ship Channel Energy Hub',
    address: '9600 Clinton Dr',
    city: 'Houston',
    state: 'TX',
    latitude: 29.7420,
    longitude: -95.2890,
    region: 'south',
    territory: 'Gulf Coast Industrial',
    facility_type: 'Processing Center',
    active_volume: 12800,
    automation_rate: 97.6,
    exception_count: 4,
    avg_processing_time: 2.0,
    cost_impact: 12000,
    is_hotspot: false
  },
  {
    location_id: 'LOC-SO-003',
    name: 'Austin Tech Corridor Fulfillment',
    address: '11200 Metric Blvd',
    city: 'Austin',
    state: 'TX',
    latitude: 30.3950,
    longitude: -97.7120,
    region: 'south',
    territory: 'Texas Triangle Central',
    facility_type: 'Fulfillment Terminal',
    active_volume: 8100,
    automation_rate: 97.2,
    exception_count: 3,
    avg_processing_time: 2.1,
    cost_impact: 8000,
    is_hotspot: false
  },
  {
    location_id: 'LOC-SO-004',
    name: 'San Antonio Alamo Operations Yard',
    address: '5400 Quintana Rd',
    city: 'San Antonio',
    state: 'TX',
    latitude: 29.3510,
    longitude: -98.5420,
    region: 'south',
    territory: 'South Texas Commerce',
    facility_type: 'Regional Depot',
    active_volume: 7200,
    automation_rate: 96.9,
    exception_count: 2,
    avg_processing_time: 2.3,
    cost_impact: 7000,
    is_hotspot: false
  },
  {
    location_id: 'LOC-SO-005',
    name: 'Oklahoma City Central Crossings',
    address: '7400 S Council Rd',
    city: 'Oklahoma City',
    state: 'OK',
    latitude: 35.3920,
    longitude: -97.6320,
    region: 'south',
    territory: 'Plains Industrial',
    facility_type: 'Distribution Hub',
    active_volume: 5820,
    automation_rate: 96.8,
    exception_count: 2,
    avg_processing_time: 2.2,
    cost_impact: 6000,
    is_hotspot: false
  },

  // West Locations (Slower average processing times)
  {
    location_id: 'LOC-WE-001',
    name: 'Inland Empire Mega Terminal',
    address: '12400 Jurupa Rd',
    city: 'Ontario',
    state: 'CA',
    latitude: 34.0200,
    longitude: -117.5500,
    region: 'west',
    territory: 'Southern California Logistics',
    facility_type: 'Distribution Hub',
    active_volume: 11400,
    automation_rate: 93.2,
    exception_count: 9,
    avg_processing_time: 4.1,
    cost_impact: 58000,
    is_hotspot: true
  },
  {
    location_id: 'LOC-WE-002',
    name: 'Oakland Port Maritime Ingress',
    address: '1190 Maritime St',
    city: 'Oakland',
    state: 'CA',
    latitude: 37.8080,
    longitude: -122.3120,
    region: 'west',
    territory: 'Bay Area Commercial',
    facility_type: 'Processing Center',
    active_volume: 8900,
    automation_rate: 92.8,
    exception_count: 7,
    avg_processing_time: 3.9,
    cost_impact: 42000,
    is_hotspot: true
  },
  {
    location_id: 'LOC-WE-003',
    name: 'San Jose Silicon Logistics Depot',
    address: '2200 Trade Zone Blvd',
    city: 'San Jose',
    state: 'CA',
    latitude: 37.3820,
    longitude: -121.8980,
    region: 'west',
    territory: 'Silicon Valley Supply',
    facility_type: 'Fulfillment Terminal',
    active_volume: 6800,
    automation_rate: 95.1,
    exception_count: 3,
    avg_processing_time: 3.6,
    cost_impact: 22000,
    is_hotspot: false
  },
  {
    location_id: 'LOC-WE-004',
    name: 'Denver Rocky Mountain Gateway',
    address: '18000 E 40th Ave',
    city: 'Denver',
    state: 'CO',
    latitude: 39.7710,
    longitude: -104.7780,
    region: 'west',
    territory: 'Front Range Hub',
    facility_type: 'Distribution Hub',
    active_volume: 5300,
    automation_rate: 94.7,
    exception_count: 2,
    avg_processing_time: 3.5,
    cost_impact: 16000,
    is_hotspot: false
  },
  {
    location_id: 'LOC-WE-005',
    name: 'Salt Lake Intermountain Depot',
    address: '4800 W 700 S',
    city: 'Salt Lake City',
    state: 'UT',
    latitude: 40.7540,
    longitude: -112.0060,
    region: 'west',
    territory: 'Great Basin Crossroads',
    facility_type: 'Regional Depot',
    active_volume: 4000,
    automation_rate: 95.3,
    exception_count: 1,
    avg_processing_time: 3.4,
    cost_impact: 10000,
    is_hotspot: false
  },

  // Southeast Locations
  {
    location_id: 'LOC-SE-001',
    name: 'Atlanta Intermodal Super-Hub',
    address: '3800 Camp Creek Pkwy',
    city: 'Atlanta',
    state: 'GA',
    latitude: 33.6540,
    longitude: -84.4980,
    region: 'southeast',
    territory: 'Southeast Gateway',
    facility_type: 'Distribution Hub',
    active_volume: 12400,
    automation_rate: 96.2,
    exception_count: 4,
    avg_processing_time: 2.3,
    cost_impact: 21000,
    is_hotspot: false
  },
  {
    location_id: 'LOC-SE-002',
    name: 'Savannah Deepwater Cargo Terminal',
    address: '2 Main St',
    city: 'Garden City',
    state: 'GA',
    latitude: 32.1120,
    longitude: -81.1480,
    region: 'southeast',
    territory: 'Atlantic Seaboard Coastal',
    facility_type: 'Processing Center',
    active_volume: 7200,
    automation_rate: 95.7,
    exception_count: 3,
    avg_processing_time: 2.5,
    cost_impact: 14000,
    is_hotspot: false
  },
  {
    location_id: 'LOC-SE-003',
    name: 'Charlotte Piedmont Logistics Center',
    address: '5400 Old Dowd Rd',
    city: 'Charlotte',
    state: 'NC',
    latitude: 35.2280,
    longitude: -80.9410,
    region: 'southeast',
    territory: 'Piedmont Industrial',
    facility_type: 'Fulfillment Terminal',
    active_volume: 6100,
    automation_rate: 95.9,
    exception_count: 2,
    avg_processing_time: 2.4,
    cost_impact: 12000,
    is_hotspot: false
  },
  {
    location_id: 'LOC-SE-004',
    name: 'Miami Gateway Americas',
    address: '2100 NW 96th Ave',
    city: 'Doral',
    state: 'FL',
    latitude: 25.7940,
    longitude: -80.3540,
    region: 'southeast',
    territory: 'South Florida Ingress',
    facility_type: 'Distribution Hub',
    active_volume: 5550,
    automation_rate: 95.1,
    exception_count: 3,
    avg_processing_time: 2.6,
    cost_impact: 11000,
    is_hotspot: false
  },

  // Southwest Locations
  {
    location_id: 'LOC-SW-001',
    name: 'Phoenix Desert Sun Logistics',
    address: '7500 W Buckeye Rd',
    city: 'Phoenix',
    state: 'AZ',
    latitude: 33.4370,
    longitude: -112.2210,
    region: 'southwest',
    territory: 'Valley of the Sun',
    facility_type: 'Distribution Hub',
    active_volume: 8200,
    automation_rate: 94.5,
    exception_count: 3,
    avg_processing_time: 2.6,
    cost_impact: 17000,
    is_hotspot: false
  },
  {
    location_id: 'LOC-SW-002',
    name: 'Las Vegas Southwest Terminal',
    address: '4200 E Cheyenne Ave',
    city: 'Las Vegas',
    state: 'NV',
    latitude: 36.2180,
    longitude: -115.0840,
    region: 'southwest',
    territory: 'Nevada Commercial Corridor',
    facility_type: 'Regional Depot',
    active_volume: 6100,
    automation_rate: 94.1,
    exception_count: 3,
    avg_processing_time: 2.8,
    cost_impact: 13000,
    is_hotspot: false
  },
  {
    location_id: 'LOC-SW-003',
    name: 'El Paso Border Operations Depot',
    address: '11400 Rojas Dr',
    city: 'El Paso',
    state: 'TX',
    latitude: 31.7340,
    longitude: -106.3120,
    region: 'southwest',
    territory: 'Rio Grande Gateway',
    facility_type: 'Processing Center',
    active_volume: 5520,
    automation_rate: 93.8,
    exception_count: 2,
    avg_processing_time: 2.9,
    cost_impact: 9000,
    is_hotspot: false
  },

  // Mid-Atlantic Locations
  {
    location_id: 'LOC-MA-001',
    name: 'Baltimore Port Logistics Gateway',
    address: '2200 Broening Hwy',
    city: 'Baltimore',
    state: 'MD',
    latitude: 39.2620,
    longitude: -76.5410,
    region: 'mid-atlantic',
    territory: 'Chesapeake Bay Commerce',
    facility_type: 'Distribution Hub',
    active_volume: 8100,
    automation_rate: 94.8,
    exception_count: 4,
    avg_processing_time: 2.5,
    cost_impact: 22000,
    is_hotspot: false
  },
  {
    location_id: 'LOC-MA-002',
    name: 'Richmond Capital Fulfillment',
    address: '4800 Bellwood Rd',
    city: 'Richmond',
    state: 'VA',
    latitude: 37.4420,
    longitude: -77.4180,
    region: 'mid-atlantic',
    territory: 'Virginia Commonwealth Hub',
    facility_type: 'Fulfillment Terminal',
    active_volume: 5800,
    automation_rate: 95.1,
    exception_count: 3,
    avg_processing_time: 2.4,
    cost_impact: 16000,
    is_hotspot: false
  },
  {
    location_id: 'LOC-MA-003',
    name: 'Norfolk Naval & Cargo Depot',
    address: '7700 Hampton Blvd',
    city: 'Norfolk',
    state: 'VA',
    latitude: 36.9120,
    longitude: -76.3210,
    region: 'mid-atlantic',
    territory: 'Hampton Roads Maritime',
    facility_type: 'Processing Center',
    active_volume: 4525,
    automation_rate: 94.9,
    exception_count: 2,
    avg_processing_time: 2.6,
    cost_impact: 13000,
    is_hotspot: false
  },

  // Pacific Northwest Locations
  {
    location_id: 'LOC-PNW-001',
    name: 'Seattle Puget Sound Terminal',
    address: '3443 W Marginal Way SW',
    city: 'Seattle',
    state: 'WA',
    latitude: 47.5720,
    longitude: -122.3580,
    region: 'pacific-northwest',
    territory: 'Puget Sound Gateway',
    facility_type: 'Distribution Hub',
    active_volume: 7800,
    automation_rate: 95.4,
    exception_count: 3,
    avg_processing_time: 2.5,
    cost_impact: 19000,
    is_hotspot: false
  },
  {
    location_id: 'LOC-PNW-002',
    name: 'Portland Columbia River Depot',
    address: '6800 N Marine Dr',
    city: 'Portland',
    state: 'OR',
    latitude: 45.6020,
    longitude: -122.7520,
    region: 'pacific-northwest',
    territory: 'Willamette Valley Port',
    facility_type: 'Regional Depot',
    active_volume: 6640,
    automation_rate: 95.0,
    exception_count: 4,
    avg_processing_time: 2.7,
    cost_impact: 19000,
    is_hotspot: false
  }
];

export const WORKFLOWS_DATA: AutomationWorkflow[] = [
  {
    workflow_id: 'WF-01',
    workflow_name: 'Industrial Utility Invoice Automated Audit',
    document_type: 'Utility Invoice',
    transactions_processed: 78420,
    automation_rate: 93.8,
    manual_reviews: 4862,
    processing_time: 2.9,
    accuracy_rate: 99.1,
    active_rules: 42
  },
  {
    workflow_id: 'WF-02',
    workflow_name: 'Intermodal Freight & BOL Reconciliation',
    document_type: 'Freight Invoice',
    transactions_processed: 89140,
    automation_rate: 96.2,
    manual_reviews: 3387,
    processing_time: 2.2,
    accuracy_rate: 99.6,
    active_rules: 56
  },
  {
    workflow_id: 'WF-03',
    workflow_name: 'Field Service & Maintenance Ticketing',
    document_type: 'Service Report',
    transactions_processed: 31200,
    automation_rate: 94.1,
    manual_reviews: 1840,
    processing_time: 3.1,
    accuracy_rate: 98.7,
    active_rules: 38
  },
  {
    workflow_id: 'WF-04',
    workflow_name: 'Enterprise Purchase Order Three-Way Match',
    document_type: 'Purchase Document',
    transactions_processed: 34212,
    automation_rate: 95.6,
    manual_reviews: 1505,
    processing_time: 2.4,
    accuracy_rate: 99.4,
    active_rules: 64
  },
  {
    workflow_id: 'WF-05',
    workflow_name: 'Facility Environmental & Hazardous Compliance',
    document_type: 'Operational Record',
    transactions_processed: 15620,
    automation_rate: 92.5,
    manual_reviews: 1171,
    processing_time: 3.9,
    accuracy_rate: 98.2,
    active_rules: 49
  }
];

// Rich Recent Transactions Table Data
export const RECENT_TRANSACTIONS: TransactionData[] = [
  {
    transaction_id: 'TX-94821',
    date: '2026-09-11',
    time: '13:42:10',
    document_type: 'Utility Invoice',
    client_id: 'CLI-102',
    client_name: 'NextGen Manufacturing',
    vendor_id: 'VEN-003',
    vendor_name: 'Midwest Power & Gas',
    amount: 14820.50,
    processing_time: 2.4,
    automation_status: 'Flagged Exception',
    confidence_score: 87.2,
    exception_status: 'Active',
    exception_severity: 'High',
    exception_type: 'Tariff Rate Variance Exceeds 5% Threshold',
    location_id: 'LOC-MW-001',
    location_name: 'Chicago Central Logistics Gateway',
    city: 'Chicago',
    state: 'IL',
    region: 'midwest',
    extracted_fields: [
      { field_name: 'Invoice Number', value: 'MPG-2026-8849', confidence: 99.8, validated: true },
      { field_name: 'Billing Period', value: '2026-08-01 to 2026-08-31', confidence: 98.5, validated: true },
      { field_name: 'Kilowatt Hours', value: '184,200 kWh', confidence: 97.4, validated: true },
      { field_name: 'Peak Demand Rate', value: '$0.0805 / kWh', confidence: 84.2, validated: false },
      { field_name: 'Remittance Total', value: '$14,820.50', confidence: 99.9, validated: true }
    ],
    validation_checks: [
      { rule: 'Vendor Tax ID Check', passed: true, detail: 'Tax EIN 36-928104 matched active master file.' },
      { rule: 'Line Item Arithmetic Sum', passed: true, detail: 'Line items sum matches stated invoice total.' },
      { rule: 'Historical Consumption Bound', passed: true, detail: 'Within +4.2% of August 2025 baseline.' },
      { rule: 'Contractual Tariff Limit', passed: false, detail: 'Rate $0.0805 exceeds contracted ceiling of $0.0760.' }
    ]
  },
  {
    transaction_id: 'TX-94820',
    date: '2026-09-11',
    time: '13:41:04',
    document_type: 'Freight Invoice',
    client_id: 'CLI-104',
    client_name: 'Summit Energy Partners',
    vendor_id: 'VEN-002',
    vendor_name: 'Global Freight Solutions',
    amount: 6320.00,
    processing_time: 1.8,
    automation_status: 'Fully Automated',
    confidence_score: 99.4,
    exception_status: 'None',
    location_id: 'LOC-SO-001',
    location_name: 'Dallas-Fort Worth Mega Gateway',
    city: 'Dallas',
    state: 'TX',
    region: 'south',
    extracted_fields: [
      { field_name: 'BOL Number', value: 'GFS-DFW-9481', confidence: 99.9, validated: true },
      { field_name: 'Carrier SCAC', value: 'GLFS', confidence: 99.5, validated: true },
      { field_name: 'Total Weight', value: '42,100 lbs', confidence: 99.2, validated: true },
      { field_name: 'Freight Charge', value: '$6,320.00', confidence: 99.8, validated: true }
    ],
    validation_checks: [
      { rule: 'Three-Way Match (PO/BOL/Invoice)', passed: true, detail: 'All 4 line items reconciled with zero variance.' },
      { rule: 'Fuel Surcharge Indexing', passed: true, detail: 'DOE national diesel index pegged at $3.78/gal.' },
      { rule: 'Geofence Proof of Delivery', passed: true, detail: 'GPS timestamp matched gate ingress scan at 09:14 AM.' }
    ]
  },
  {
    transaction_id: 'TX-94819',
    date: '2026-09-11',
    time: '13:38:50',
    document_type: 'Utility Invoice',
    client_id: 'CLI-101',
    client_name: 'Vanguard Retailers',
    vendor_id: 'VEN-005',
    vendor_name: 'Tri-State Electric Utility',
    amount: 28400.00,
    processing_time: 3.4,
    automation_status: 'Flagged Exception',
    confidence_score: 82.0,
    exception_status: 'Active',
    exception_severity: 'Critical',
    exception_type: 'Unrecognized Utility Surcharge Code (NY PSC 22-A)',
    location_id: 'LOC-NE-001',
    location_name: 'North Jersey Metro Logistics Hub',
    city: 'Newark',
    state: 'NJ',
    region: 'northeast',
    extracted_fields: [
      { field_name: 'Account Number', value: 'TSE-88392-01', confidence: 99.2, validated: true },
      { field_name: 'Demand Charge', value: '$11,200.00', confidence: 98.4, validated: true },
      { field_name: 'Energy Efficiency Surcharge', value: '$4,850.00', confidence: 79.5, validated: false },
      { field_name: 'Stated Due Date', value: '2026-09-30', confidence: 99.0, validated: true }
    ],
    validation_checks: [
      { rule: 'Account Master Validation', passed: true, detail: 'Location mapped to Newark Distribution Hub.' },
      { rule: 'Regulatory Surcharge Parsing', passed: false, detail: 'Charge code NY PSC 22-A not mapped in tariff catalog.' }
    ]
  },
  {
    transaction_id: 'TX-94818',
    date: '2026-09-11',
    time: '13:36:22',
    document_type: 'Purchase Document',
    client_id: 'CLI-105',
    client_name: 'Apex Aerospace Global',
    vendor_id: 'VEN-001',
    vendor_name: 'Apex Industrial Supply',
    amount: 18950.00,
    processing_time: 2.1,
    automation_status: 'Fully Automated',
    confidence_score: 98.7,
    exception_status: 'None',
    location_id: 'LOC-MW-003',
    location_name: 'Indianapolis Crossroads Fulfillment',
    city: 'Indianapolis',
    state: 'IN',
    region: 'midwest',
    extracted_fields: [
      { field_name: 'PO Number', value: 'PO-2026-10492', confidence: 99.6, validated: true },
      { field_name: 'SKU Item Count', value: '18 Distinct Parts', confidence: 98.8, validated: true },
      { field_name: 'Subtotal Amount', value: '$18,950.00', confidence: 99.4, validated: true }
    ],
    validation_checks: [
      { rule: 'ERP Cross-Reference', passed: true, detail: 'SAP Purchase Order matched and authorized.' },
      { rule: 'Tolerance Range Check', passed: true, detail: '0.00% variance against purchase order.' }
    ]
  },
  {
    transaction_id: 'TX-94817',
    date: '2026-09-11',
    time: '13:32:15',
    document_type: 'Operational Record',
    client_id: 'CLI-103',
    client_name: 'Horizon Health Systems',
    vendor_id: 'VEN-007',
    vendor_name: 'Metro Waste & Facility',
    amount: 4780.00,
    processing_time: 4.3,
    automation_status: 'Manual Review',
    confidence_score: 79.4,
    exception_status: 'Active',
    exception_severity: 'Medium',
    exception_type: 'Multi-Page Hazardous Manifest Missing Chain-of-Custody Stamp',
    location_id: 'LOC-WE-001',
    location_name: 'Inland Empire Mega Terminal',
    city: 'Ontario',
    state: 'CA',
    region: 'west',
    extracted_fields: [
      { field_name: 'Manifest ID', value: 'EPA-CA-99281', confidence: 95.2, validated: true },
      { field_name: 'Waste Class', value: 'Bio-Hazardous Cat 2', confidence: 88.0, validated: true },
      { field_name: 'Receiver Signature', value: 'Handwritten / Unreadable', confidence: 64.2, validated: false }
    ],
    validation_checks: [
      { rule: 'EPA Facility Permit Check', passed: true, detail: 'Active California DTSC permit verified.' },
      { rule: 'Chain of Custody Digital Signature', passed: false, detail: 'Requires human compliance clerk review.' }
    ]
  },
  {
    transaction_id: 'TX-94816',
    date: '2026-09-11',
    time: '13:28:40',
    document_type: 'Freight Invoice',
    client_id: 'CLI-106',
    client_name: 'Pinnacle Logistics Corp',
    vendor_id: 'VEN-006',
    vendor_name: 'Consolidated Rail & Cargo',
    amount: 11200.00,
    processing_time: 2.0,
    automation_status: 'Fully Automated',
    confidence_score: 99.1,
    exception_status: 'None',
    location_id: 'LOC-SE-001',
    location_name: 'Atlanta Intermodal Super-Hub',
    city: 'Atlanta',
    state: 'GA',
    region: 'southeast',
    extracted_fields: [
      { field_name: 'Waybill ID', value: 'CR-ATL-5520', confidence: 99.7, validated: true },
      { field_name: 'Rail Container Number', value: 'TTX-982104', confidence: 99.4, validated: true },
      { field_name: 'Linehaul Charge', value: '$11,200.00', confidence: 99.3, validated: true }
    ],
    validation_checks: [
      { rule: 'Interline Agreement Audit', passed: true, detail: 'Rate schedule verified under Master Rail Contract 409.' }
    ]
  },
  {
    transaction_id: 'TX-94815',
    date: '2026-09-11',
    time: '13:25:02',
    document_type: 'Service Report',
    client_id: 'CLI-102',
    client_name: 'NextGen Manufacturing',
    vendor_id: 'VEN-009',
    vendor_name: 'Atlas Hydraulic Parts',
    amount: 8350.00,
    processing_time: 2.8,
    automation_status: 'Flagged Exception',
    confidence_score: 86.5,
    exception_status: 'Active',
    exception_severity: 'Critical',
    exception_type: 'Recurring Supplier Invoice Format Mismatch',
    location_id: 'LOC-MW-002',
    location_name: 'Detroit Automotive Operations Depot',
    city: 'Detroit',
    state: 'MI',
    region: 'midwest',
    extracted_fields: [
      { field_name: 'Work Order', value: 'WO-DET-9921', confidence: 98.4, validated: true },
      { field_name: 'Technician Hours', value: '38.5 hrs @ $145/hr', confidence: 84.1, validated: false },
      { field_name: 'Parts Replacement Cost', value: '$2,767.50', confidence: 89.2, validated: false }
    ],
    validation_checks: [
      { rule: 'Contract Labor Cap', passed: false, detail: 'Supplier modified PDF format; hourly rate shifted columns.' }
    ]
  },
  {
    transaction_id: 'TX-94814',
    date: '2026-09-11',
    time: '13:20:19',
    document_type: 'Freight Invoice',
    client_id: 'CLI-107',
    client_name: 'BioTech Solutions Intl',
    vendor_id: 'VEN-011',
    vendor_name: 'Continental Express Hauling',
    amount: 3450.00,
    processing_time: 2.3,
    automation_status: 'Fully Automated',
    confidence_score: 98.9,
    exception_status: 'None',
    location_id: 'LOC-PNW-001',
    location_name: 'Seattle Puget Sound Terminal',
    city: 'Seattle',
    state: 'WA',
    region: 'pacific-northwest',
    extracted_fields: [
      { field_name: 'Waybill ID', value: 'CE-SEA-1149', confidence: 99.5, validated: true },
      { field_name: 'Reefer Temp Log', value: '-20 C Continuous', confidence: 98.9, validated: true },
      { field_name: 'Cold-Chain Delivery Cert', value: 'Validated', confidence: 99.1, validated: true }
    ],
    validation_checks: [
      { rule: 'Cold Chain Temperature Integrity', passed: true, detail: 'Telemetry matched constant temperature range.' }
    ]
  },
  {
    transaction_id: 'TX-94813',
    date: '2026-09-11',
    time: '13:17:44',
    document_type: 'Purchase Document',
    client_id: 'CLI-104',
    client_name: 'Summit Energy Partners',
    vendor_id: 'VEN-008',
    vendor_name: 'North American Fuel Direct',
    amount: 32400.00,
    processing_time: 2.2,
    automation_status: 'Fully Automated',
    confidence_score: 99.5,
    exception_status: 'None',
    location_id: 'LOC-SO-002',
    location_name: 'Houston Ship Channel Energy Hub',
    city: 'Houston',
    state: 'TX',
    region: 'south',
    extracted_fields: [
      { field_name: 'Bunker Delivery Note', value: 'BDN-HOU-449', confidence: 99.8, validated: true },
      { field_name: 'Volume (Gallons)', value: '8,400 Gal Ultra-Low Sulfur', confidence: 99.6, validated: true },
      { field_name: 'Per Gallon Rack Price', value: '$3.857 / Gal', confidence: 99.2, validated: true }
    ],
    validation_checks: [
      { rule: 'OPIS Benchmark Spot Match', passed: true, detail: 'Within +/- 0.5% of Houston rack price.' }
    ]
  },
  {
    transaction_id: 'TX-94812',
    date: '2026-09-11',
    time: '13:12:30',
    document_type: 'Utility Invoice',
    client_id: 'CLI-105',
    client_name: 'Apex Aerospace Global',
    vendor_id: 'VEN-014',
    vendor_name: 'Cascade Thermal Energy',
    amount: 19800.00,
    processing_time: 2.5,
    automation_status: 'Fully Automated',
    confidence_score: 99.2,
    exception_status: 'None',
    location_id: 'LOC-PNW-002',
    location_name: 'Portland Columbia River Depot',
    city: 'Portland',
    state: 'OR',
    region: 'pacific-northwest',
    extracted_fields: [
      { field_name: 'Therm Consumption', value: '14,200 Therms', confidence: 99.4, validated: true },
      { field_name: 'Service Class', value: 'Industrial Interruptible', confidence: 99.1, validated: true }
    ],
    validation_checks: [
      { rule: 'PGE / Cascade Tariff Schedule', passed: true, detail: 'Valid industrial therm rate verified.' }
    ]
  }
];

// Rich Exceptions Database
export const EXCEPTIONS_DATA: ExceptionData[] = [
  {
    exception_id: 'EX-MW-8821',
    transaction_id: 'TX-94815',
    document_type: 'Service Report',
    client_name: 'NextGen Manufacturing',
    vendor_name: 'Atlas Hydraulic Parts',
    exception_type: 'Recurring Supplier Documentation Format Inconsistency',
    severity: 'Critical',
    detected_date: '2026-09-11 13:25',
    location_id: 'LOC-MW-002',
    location_name: 'Detroit Automotive Operations Depot',
    city: 'Detroit',
    state: 'MI',
    region: 'midwest',
    financial_impact: 184000,
    resolution_status: 'Under Investigation',
    affected_count: 38,
    is_recurring: true,
    ai_analysis: 'A recurring supplier documentation inconsistency has been detected across multiple Midwest operational territories. Supplier Atlas Hydraulic Parts modified their billing software on Sept 1st, displacing column tabular coordinates.',
    recommended_action: 'Update automated extraction rules and vendor coordinate schema parser for Atlas Hydraulic Parts to auto-remediate all 38 pending transactions.',
    root_cause: 'Vendor ERP migration caused layout coordinates for technician rates to misalign with OCR anchor points.'
  },
  {
    exception_id: 'EX-NE-4402',
    transaction_id: 'TX-94819',
    document_type: 'Utility Invoice',
    client_name: 'Vanguard Retailers',
    vendor_name: 'Tri-State Electric Utility',
    exception_type: 'Unrecognized Utility Surcharge Code (NY PSC 22-A)',
    severity: 'Critical',
    detected_date: '2026-09-11 13:38',
    location_id: 'LOC-NE-001',
    location_name: 'North Jersey Metro Logistics Hub',
    city: 'Newark',
    state: 'NJ',
    region: 'northeast',
    financial_impact: 74000,
    resolution_status: 'Open',
    affected_count: 37,
    is_recurring: true,
    ai_analysis: 'A recurring supplier documentation format change appears to be causing automated extraction mismatches across Northeast utilities. The recent NY/NJ clean-energy surcharge was billed outside expected line item grids.',
    recommended_action: 'Update automated extraction rules and incorporate regional tariff addendum #22-A into validation pipeline.',
    root_cause: 'State public service commission mandated clean energy surcharge line item added without notification to automated ingestion schema.'
  },
  {
    exception_id: 'EX-WE-3109',
    transaction_id: 'TX-94817',
    document_type: 'Operational Record',
    client_name: 'Horizon Health Systems',
    vendor_name: 'Metro Waste & Facility',
    exception_type: 'Multi-Page Hazardous Manifest Missing Chain-of-Custody Stamp',
    severity: 'High',
    detected_date: '2026-09-11 13:32',
    location_id: 'LOC-WE-001',
    location_name: 'Inland Empire Mega Terminal',
    city: 'Ontario',
    state: 'CA',
    region: 'west',
    financial_impact: 42000,
    resolution_status: 'Under Investigation',
    affected_count: 14,
    is_recurring: false,
    ai_analysis: 'California hazardous material disposal documentation requires unbroken chain-of-custody stamp verification. Low scan resolution on page 3 resulted in confidence drop below regulatory threshold.',
    recommended_action: 'Trigger automatic vendor re-scan request with high-DPI preset; route to regional compliance specialist.',
    root_cause: 'Physical field receipt captured with mobile scanner at low 150 DPI resolution.'
  },
  {
    exception_id: 'EX-MW-8822',
    transaction_id: 'TX-94821',
    document_type: 'Utility Invoice',
    client_name: 'NextGen Manufacturing',
    vendor_name: 'Midwest Power & Gas',
    exception_type: 'Tariff Rate Variance Exceeds 5% Threshold',
    severity: 'High',
    detected_date: '2026-09-11 13:42',
    location_id: 'LOC-MW-001',
    location_name: 'Chicago Central Logistics Gateway',
    city: 'Chicago',
    state: 'IL',
    region: 'midwest',
    financial_impact: 28000,
    resolution_status: 'Open',
    affected_count: 8,
    is_recurring: true,
    ai_analysis: 'Midwest Power billed on general commercial rate schedule C-2 rather than negotiated industrial volume contract IV-4.',
    recommended_action: 'Issue automated credit clawback demand letter to vendor account manager.',
    root_cause: 'Utility billing system re-set customer class during annual account audit.'
  },
  {
    exception_id: 'EX-MA-2101',
    transaction_id: 'TX-94799',
    document_type: 'Purchase Document',
    client_name: 'Titan Infrastructure',
    vendor_name: 'Keystone Materials Handling',
    exception_type: 'Tax Exemption Certificate Mismatch',
    severity: 'Medium',
    detected_date: '2026-09-11 11:20',
    location_id: 'LOC-MA-001',
    location_name: 'Baltimore Port Logistics Gateway',
    city: 'Baltimore',
    state: 'MD',
    region: 'mid-atlantic',
    financial_impact: 18000,
    resolution_status: 'Open',
    affected_count: 6,
    is_recurring: false,
    ai_analysis: 'Maryland sales tax applied to heavy equipment lease when master client account has state resale exemption certificate on file.',
    recommended_action: 'Re-attach active Maryland exemption certificate #MD-884102 and re-validate.',
    root_cause: 'New vendor clerk omitted resale certificate code during invoice generation.'
  },
  {
    exception_id: 'EX-SW-1092',
    transaction_id: 'TX-94760',
    document_type: 'Freight Invoice',
    client_name: 'OmniCorp Industrial',
    vendor_name: 'Southern Petro Distribution',
    exception_type: 'Fuel Surcharge Benchmark Variance',
    severity: 'Low',
    detected_date: '2026-09-11 10:15',
    location_id: 'LOC-SW-001',
    location_name: 'Phoenix Desert Sun Logistics',
    city: 'Phoenix',
    state: 'AZ',
    region: 'southwest',
    financial_impact: 6400,
    resolution_status: 'Auto-Remediated',
    affected_count: 4,
    is_recurring: false,
    ai_analysis: 'Invoice referenced previous week diesel price benchmark ($3.82/gal vs current $3.78/gal). Calculated difference auto-adjusted within allowable $0.05 tolerance limit.',
    recommended_action: 'Closed. Auto-remediation script updated line item and notified vendor accounting.',
    root_cause: 'Temporal mismatch between Monday rate publication and Sunday midnight dispatch.'
  }
];

export const EXECUTIVE_REPORTS: ExecutiveReport[] = [
  {
    id: 'REP-2026-01',
    name: 'Monthly Operations Report',
    reporting_period: 'August 2026 (Full Month)',
    date_generated: '2026-09-01 08:00',
    status: 'Ready',
    category: 'Operational',
    key_kpi_preview: [
      { label: 'Total Ingested', value: '248,592', delta: '+12.4%' },
      { label: 'Automation Rate', value: '94.7%', delta: '+3.2%' },
      { label: 'Avg Processing', value: '2.8 min', delta: '-22%' }
    ],
    summary: 'National business process automation achieved an all-time high straight-through throughput of 94.7%, surpassing enterprise SLA targets across 7 of 8 operational regions.',
    highlights: [
      'Processed 248,592 business documents across utility, freight, and purchase categories.',
      'Reduced manual review queues by 18% through enhanced AI spatial location enrichment.',
      'Annualized operational cost savings reached $1.84M based on straight-through automation benchmarks.'
    ],
    regional_highlights: [
      { region: 'South', finding: 'Ranked #1 nationally in automation rate (97.4%) and straight-through velocity.', impact: 'Lowest unit operational cost at $14.20/batch.' },
      { region: 'Midwest', finding: 'Supplier invoice coordinate shift detected in Great Lakes logistics cluster.', impact: '38 active exceptions, $184,000 potential cost impact.' },
      { region: 'Northeast', finding: 'Municipal utility tariff variances concentrated in NY/NJ metro facilities.', impact: 'Elevated unit processing cost ($48.20/batch).' },
      { region: 'West', finding: 'California multi-page environmental records expanded average latency to 3.8 min.', impact: 'Requires parallel OCR ingestion cluster.' }
    ]
  },
  {
    id: 'REP-2026-02',
    name: 'Geographic Exception Analysis',
    reporting_period: 'Q3 2026 YTD',
    date_generated: '2026-09-10 16:30',
    status: 'Ready',
    category: 'Spatial',
    key_kpi_preview: [
      { label: 'Active Exceptions', value: '127', delta: '-18%' },
      { label: 'Hotspot Clusters', value: '8', delta: '-2' },
      { label: 'Recurring Patterns', value: '5', delta: 'Identified' }
    ],
    summary: 'Spatial clustering algorithms isolated 8 geographic hotspots where 74% of all active high-severity exceptions originate, indicating vendor-specific localized discrepancies rather than systematic platform errors.',
    highlights: [
      'Midwest accounts for 30% of all critical severity exceptions due to Atlas Hydraulic Parts ERP changes.',
      'Northeast utility tariff mismatches contribute $74,000 in unearned utility fee risks.',
      'Spatial geocoding successfully matched 99.8% of invoices to verified physical facilities.'
    ],
    regional_highlights: [
      { region: 'Midwest', finding: 'Hotspots identified in Chicago, Detroit, and Cleveland industrial corridors.', impact: 'Supplier documentation format mismatch.' },
      { region: 'Northeast', finding: 'Newark & Boston hubs impacted by regulatory clean energy tariff changes.', impact: '37 transactions flagged for audit.' }
    ]
  },
  {
    id: 'REP-2026-03',
    name: 'Automation Performance Report',
    reporting_period: 'Last 30 Days Continuous',
    date_generated: '2026-09-11 06:00',
    status: 'Ready',
    category: 'Operational',
    key_kpi_preview: [
      { label: 'STP Rate', value: '91.2%', delta: '+4.1%' },
      { label: 'Extraction Confidence', value: '98.4%', delta: '+1.5%' },
      { label: 'Manual Queue', value: '14 Active', delta: '-34%' }
    ],
    summary: 'Continuous machine learning models trained on 250,000 enterprise documents demonstrated 99.4% field-level extraction accuracy on complex tabular and unstructured records.',
    highlights: [
      'Freight Invoices lead automation performance with 96.2% zero-touch processing.',
      'Utility Invoices improved by 3.8 percentage points following multi-meter table recognition model updates.',
      'Average time per automated transaction fell to 2.1 minutes in top performing regions.'
    ],
    regional_highlights: [
      { region: 'South', finding: 'Texas Triangle logistics corridors achieved 98.1% automation at Dallas gateway.', impact: 'Exemplary operational model.' },
      { region: 'Southeast', finding: 'Port of Savannah maritime workflows maintained 95.8% automated accuracy.', impact: 'Zero manual bottlenecks during peak shipping.' }
    ]
  },
  {
    id: 'REP-2026-04',
    name: 'Regional Cost Analysis',
    reporting_period: 'Fiscal Year 2026 to Date',
    date_generated: '2026-09-08 14:00',
    status: 'Ready',
    category: 'Financial',
    key_kpi_preview: [
      { label: 'Total Cost Impact', value: '$727,000', delta: '-12%' },
      { label: 'Savings Realized', value: '$1.84M', delta: '+28%' },
      { label: 'Avg Unit Cost', value: '$22.80', delta: '-18%' }
    ],
    summary: 'Financial analysis reveals strong correlation between spatial location enrichment and cost reduction. Early exception detection prevented an estimated $540,000 in late fees and invoice overcharges.',
    highlights: [
      'Northeast and Midwest represent 54% of total potential cost exposure.',
      'Southern facilities reduced processing cost per document by 42% through EDI and OCR harmonization.',
      'Total annualized automated savings projected to top $2.1M by Q4 close.'
    ],
    regional_highlights: [
      { region: 'Northeast', finding: 'Unit processing cost of $48.20 remains 111% above national average.', impact: 'Recommend tariff catalog automated synchronization.' },
      { region: 'Midwest', finding: 'Cost impact of $184,000 concentrated in 3 supplier accounts.', impact: 'Targeted supplier remediation will recover 85% of variance.' }
    ]
  },
  {
    id: 'REP-2026-05',
    name: 'Executive Intelligence Summary',
    reporting_period: 'Current Operational Snapshot',
    date_generated: '2026-09-11 12:00',
    status: 'Ready',
    category: 'Executive',
    key_kpi_preview: [
      { label: 'GeoOps Score', value: '84.6 / 100', delta: '+3.4 pts' },
      { label: 'Operational Health', value: 'Optimal', delta: 'Stable' },
      { label: 'Coverage', value: '100 Facilities', delta: '100%' }
    ],
    summary: 'Executive briefing on the strategic convergence of AI Document Automation and Geographic Information Systems across enterprise supply chains and corporate facilities.',
    highlights: [
      'The platform seamlessly answers both "What is happening?" and "Where is it happening?".',
      'Location enrichment provides predictive context that traditional document ingestion lacks.',
      'Enterprise operations managers now possess real-time spatial drill-downs from national level to individual dock doors.'
    ],
    regional_highlights: [
      { region: 'National', finding: '100 facilities across 8 regions actively streaming operational transactions.', impact: 'Real-time geographic visibility across all 50 states.' }
    ]
  }
];

// Grounded AI Knowledge Base for GeoOps Assistant
export const AI_KNOWLEDGE_BASE: Record<string, {
  summary: string;
  key_findings: string[];
  geographic_impact: { region: string; metric: string; insight: string }[];
  recommended_action: string;
  potential_business_impact: string;
}> = {
  exceptions_increase: {
    summary: 'Operational analysis indicates a 6.9% uptick in Midwest region exceptions and 7.6% in Northeast, driven specifically by supplier invoicing software updates and regional utility tariff additions.',
    key_findings: [
      'Atlas Hydraulic Parts deployed a modified billing template on Sept 1st that shifted technician hourly rate columns by 45 pixels, causing extraction confidence to drop from 98.5% to 84.1%.',
      'Tri-State Electric Utility introduced clean energy addendum NY PSC 22-A across Newark and New York metro accounts without updated EDI catalog mapping.',
      'The Southern and Southeast regions remained unaffected, maintaining 97.4% and 95.8% automation rates respectively.'
    ],
    geographic_impact: [
      { region: 'Midwest Region', metric: '38 Active Exceptions', insight: 'Concentrated in Chicago (LOC-MW-001) and Detroit (LOC-MW-002) industrial facilities.' },
      { region: 'Northeast Region', metric: '37 Active Exceptions', insight: 'Clustered around North Jersey Metro (LOC-NE-001) and Boston (LOC-NE-002).' },
      { region: 'South Region', metric: '14 Active Exceptions', insight: 'Healthy benchmark status with no systematic exception clusters.' }
    ],
    recommended_action: 'Update the coordinate bounding-box parser for Atlas Hydraulic Parts in the Midwest schema configuration, and add NY PSC 22-A surcharge code to the Northeast utility tariff database.',
    potential_business_impact: 'Resolving these two supplier patterns will eliminate 75 of the 127 active exceptions (59% reduction) and safeguard $258,000 in annual processing overhead.'
  },
  highest_cost: {
    summary: 'The Northeast Region currently exhibits the highest processing cost impact at $210,000 annually ($48.20 unit cost per batch), followed closely by the Midwest Region at $184,000.',
    key_findings: [
      'Northeast unit processing cost is 111% higher than the national baseline ($22.80) due to manual reconciliation times on complex municipal utility bills.',
      'Manual reviews in the Northeast take an average of 4.2 hours to resolve compared to 1.8 hours in the South.',
      'The South region demonstrates the highest cost efficiency at $14.20 per batch with $42,000 total exposure.'
    ],
    geographic_impact: [
      { region: 'Northeast Region', metric: '$210,000 Cost Impact', insight: 'Unit cost of $48.20/batch across 37,290 transactions; 37 exceptions active.' },
      { region: 'Midwest Region', metric: '$184,000 Cost Impact', insight: 'Unit cost of $32.40/batch across 42,847 transactions; 38 exceptions active.' },
      { region: 'West Region', metric: '$148,000 Cost Impact', insight: 'High latency overhead due to multi-page regulatory compliance documents.' }
    ],
    recommended_action: 'Deploy automated utility tariff table extraction rules and implement pre-validation scripts for Northeast municipal power providers.',
    potential_business_impact: 'Standardizing Northeast utility ingestion will reduce regional processing overhead by $135,000 annually and lower regional unit cost to under $24.00.'
  },
  operational_risks: {
    summary: 'Operational risks are predominantly concentrated in 8 geographic hotspots across the Midwest and West regions, specifically involving high-value equipment invoices and hazardous compliance records.',
    key_findings: [
      '8 facilities across 4 states represent 74% of all high and critical severity operational exceptions.',
      'Detroit and Chicago hubs are experiencing compounding supplier invoice format delays, risking vendor payment discount forfeitures.',
      'Inland Empire (Ontario, CA) faces regulatory compliance audit exposure due to low-resolution chain-of-custody scans on medical and hazardous waste manifests.'
    ],
    geographic_impact: [
      { region: 'Midwest Region (IL, MI, OH)', metric: 'GeoOps Score: 72/100', insight: 'Supplier documentation format mismatches in automotive supply lines.' },
      { region: 'West Region (CA, CO)', metric: 'GeoOps Score: 76/100', insight: 'Compliance manifest ingestion latency averaging 3.8 minutes.' },
      { region: 'Northeast Region (NJ, NY, MA)', metric: 'GeoOps Score: 69/100', insight: 'Unverified utility surcharge exposure.' }
    ],
    recommended_action: 'Institute automated vendor re-submission protocols for documents with OCR confidence scores below 85%, and activate regional geofence alert rules.',
    potential_business_impact: 'Protects enterprise clients against $320,000 in estimated late-payment penalties and regulatory compliance audits.'
  },
  suppliers_manual_review: {
    summary: 'Five enterprise suppliers account for 68% of all manual review queue items across the nationwide operations network, led by Atlas Hydraulic Parts, Tri-State Electric Utility, and Metro Waste & Facility.',
    key_findings: [
      'Atlas Hydraulic Parts (Midwest) requires manual review on 41.2% of its submissions due to unannounced PDF coordinate shifts.',
      'Tri-State Electric Utility (Northeast) triggers manual reviews on 38.6% of invoices due to unmapped clean energy charges.',
      'Metro Waste & Facility (West) generates high touch rates (32.4%) due to degraded physical scanner resolutions in field transfer stations.'
    ],
    geographic_impact: [
      { region: 'Midwest Corridor', metric: 'Atlas Hydraulic Parts', insight: '38 transactions held in manual review queue.' },
      { region: 'Northeast Metro', metric: 'Tri-State Electric Utility', insight: '37 transactions flagged for rate table validation.' },
      { region: 'California Hubs', metric: 'Metro Waste & Facility', insight: '14 multi-page manifests queued for manual compliance sign-off.' }
    ],
    recommended_action: 'Provide Atlas Hydraulic Parts and Tri-State Electric with ARDEM standardized digital schema specifications or apply self-healing AI layout templates.',
    potential_business_impact: 'Eliminating manual interventions for these top 3 suppliers will liberate 240 operational work hours monthly and accelerate processing velocity by 34%.'
  }
};

export const REPORTS_DATA: ReportData[] = EXECUTIVE_REPORTS;

export const VENDORS_DATA: VendorData[] = [
  {
    vendor_id: 'VEND-001',
    name: 'Atlas Hydraulic Parts',
    category: 'Industrial Components',
    primary_region: 'midwest',
    total_invoices: 14200,
    exception_rate: 6.8,
    cost_impact: 184000,
    conformance_score: 72
  },
  {
    vendor_id: 'VEND-002',
    name: 'Tri-State Electric Utility',
    category: 'Power & Utilities',
    primary_region: 'northeast',
    total_invoices: 21800,
    exception_rate: 5.9,
    cost_impact: 210000,
    conformance_score: 69
  },
  {
    vendor_id: 'VEND-003',
    name: 'Metro Waste & Facility Systems',
    category: 'Environmental Services',
    primary_region: 'west',
    total_invoices: 8900,
    exception_rate: 4.8,
    cost_impact: 148000,
    conformance_score: 79
  },
  {
    vendor_id: 'VEND-004',
    name: 'Piedmont Intermodal Freight',
    category: 'Transportation & Logistics',
    primary_region: 'southeast',
    total_invoices: 19400,
    exception_rate: 2.1,
    cost_impact: 58000,
    conformance_score: 93
  },
  {
    vendor_id: 'VEND-005',
    name: 'Federal Gov Supply Services',
    category: 'Direct Procurement',
    primary_region: 'mid-atlantic',
    total_invoices: 11300,
    exception_rate: 2.4,
    cost_impact: 51000,
    conformance_score: 91
  },
  {
    vendor_id: 'VEND-006',
    name: 'Lone Star Logistics & Transport',
    category: 'Logistics',
    primary_region: 'south',
    total_invoices: 38400,
    exception_rate: 1.2,
    cost_impact: 42000,
    conformance_score: 98
  }
];

export const AI_INSIGHTS_DATA: AIInsight[] = [
  {
    id: 'INS-GEO-01',
    title: 'Midwest Supplier Documentation Coordinate Shift',
    region: 'midwest',
    geographic_scope: 'Chicago, Detroit & Cleveland Facilities',
    priority: 'Critical',
    confidence_level: 96,
    evidence: [
      '38 active exceptions clustered across 3 Great Lakes facilities.',
      'Atlas Hydraulic Parts invoice layout shifted hourly rate columns by 45px vertically on Sept 1st.',
      'OCR extraction confidence dropped from 98.5% baseline to 84.1% on line item tables.'
    ],
    business_impact: {
      financial: '$184,000 annualized exposure across 38 queued transactions',
      operational: 'Queues delayed by 18 minutes per flagged batch in Midwest hubs',
      sla: '99.1% SLA at risk for Atlas tier-1 supplier accounts'
    },
    recommended_actions: [
      'Deploy automatic bounding box offset rule to Great Lakes edge workers.',
      'Send automated digital schema conformance guidelines to Atlas accounting.',
      'Re-process the 38 queued items with updated template profile.'
    ]
  },
  {
    id: 'INS-GEO-02',
    title: 'Northeast Municipal Utility Tariff Addendum Misalignment',
    region: 'northeast',
    geographic_scope: 'Newark & Boston Distribution Hubs',
    priority: 'Critical',
    confidence_level: 94,
    evidence: [
      'Tri-State Electric Utility clean energy addendum NY PSC 22-A not mapped in legacy ERP.',
      'Unit processing cost in Northeast reached $48.20/batch (111% above national baseline).',
      '37 invoices currently requiring senior auditor manual reconciliation.'
    ],
    business_impact: {
      financial: '$210,000 annualized manual review overhead and rate risk',
      operational: 'Average resolution time currently 4.2 hours per utility bill',
      sla: 'Early payment utility discount forfeiture risk'
    },
    recommended_actions: [
      'Ingest NY PSC 22-A clean energy tariff schedule into validation rules engine.',
      'Configure auto-split rule for multi-meter sub-charges.',
      'Apply self-healing table extraction schema.'
    ]
  },
  {
    id: 'INS-GEO-03',
    title: 'California Environmental Manifest Multi-Page Ingestion Latency',
    region: 'west',
    geographic_scope: 'Ontario & Oakland Maritime Logistics Facilities',
    priority: 'High',
    confidence_level: 92,
    evidence: [
      'Multi-page hazardous and medical waste manifests average 3.8 min latency (vs 2.1 min national).',
      'Low scanner resolution (150 DPI) at field transfer stations degrades signature block recognition.',
      '14 chain-of-custody compliance documents delayed weekly.'
    ],
    business_impact: {
      financial: '$148,000 operational latency and compliance risk',
      operational: 'Worker touch time elevated by 24% on multi-page packets',
      sla: 'Regulatory filing SLA compliance tight at 97.8%'
    },
    recommended_actions: [
      'Activate parallel multi-worker OCR extraction pipeline for West region documents.',
      'Deploy mobile edge capture with minimum 300 DPI pre-flight check.',
      'Implement automated hazardous code cross-reference validation.'
    ]
  },
  {
    id: 'INS-GEO-04',
    title: 'South Region Automation Benchmark Replication Strategy',
    region: 'south',
    geographic_scope: 'Dallas, Houston & Austin Gateways',
    priority: 'High',
    confidence_level: 98,
    evidence: [
      'South region leads national operations with 97.4% automation rate and $14.20 unit cost.',
      'Dallas Mega Gateway processed 14,200 transactions with only 3 minor exceptions.',
      'EDI and digital PDF pre-clearing rules eliminate 99.2% of format variance.'
    ],
    business_impact: {
      financial: 'Replicating South rules nationally unlocks estimated $340,000 in additional savings',
      operational: 'Average transaction time drops from 2.8 min to 2.1 min nationwide',
      sla: 'Elevates national SLA compliance to 99.7%'
    },
    recommended_actions: [
      'Export South EDI pre-clearance validation rule set as enterprise template.',
      'Standardize supplier digital onboarding program on the Texas model.',
      'Conduct cross-regional operational briefing on Dallas routing.'
    ]
  }
];
