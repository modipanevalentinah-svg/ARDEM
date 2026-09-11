export type PageType = 
  | 'overview' 
  | 'map' 
  | 'automation' 
  | 'exceptions' 
  | 'analytics' 
  | 'ai-insights' 
  | 'reports';

export type RegionId = 
  | 'midwest' 
  | 'northeast' 
  | 'south' 
  | 'west' 
  | 'southeast' 
  | 'southwest' 
  | 'mid-atlantic' 
  | 'pacific-northwest';

export type DocumentType = 
  | 'Utility Invoice' 
  | 'Freight Invoice' 
  | 'Service Report' 
  | 'Purchase Document' 
  | 'Operational Record';

export type AutomationStatus = 'Fully Automated' | 'Manual Review' | 'Flagged Exception' | 'In Progress';
export type ExceptionSeverity = 'Critical' | 'High' | 'Medium' | 'Low';
export type ResolutionStatus = 'Open' | 'Under Investigation' | 'Rules Updated' | 'Resolved' | 'Auto-Remediated';

export interface LocationData {
  location_id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  latitude: number;
  longitude: number;
  region: RegionId;
  territory: string;
  facility_type: 'Distribution Hub' | 'Processing Center' | 'Regional Depot' | 'Fulfillment Terminal';
  active_volume: number;
  automation_rate: number;
  exception_count: number;
  avg_processing_time: number; // in minutes
  cost_impact: number;
  is_hotspot?: boolean;
}

export interface RegionData {
  id: RegionId;
  name: string;
  code: string;
  center: [number, number];
  zoom: number;
  transactions: number;
  automation_rate: number;
  exception_rate: number;
  exception_count: number;
  avg_processing_time: number;
  cost_impact: number;
  geoops_score: number;
  cost_efficiency: number;
  accuracy: number;
  status: 'optimal' | 'attention' | 'critical' | 'stable';
  primary_pattern: string;
  ai_insight: string;
  ai_recommendation: string;
}

export interface TransactionData {
  transaction_id: string;
  date: string;
  time: string;
  document_type: DocumentType;
  client_id: string;
  client_name: string;
  vendor_id: string;
  vendor_name: string;
  amount: number;
  processing_time: number; // minutes
  automation_status: AutomationStatus;
  confidence_score: number; // 0-100%
  exception_status: 'None' | 'Active' | 'Resolved';
  exception_severity?: ExceptionSeverity;
  exception_type?: string;
  location_id: string;
  location_name: string;
  city: string;
  state: string;
  region: RegionId;
  extracted_fields?: {
    field_name: string;
    value: string;
    confidence: number;
    validated: boolean;
  }[];
  validation_checks?: {
    rule: string;
    passed: boolean;
    detail: string;
  }[];
}

export interface ExceptionData {
  exception_id: string;
  transaction_id: string;
  document_type: DocumentType;
  client_name: string;
  vendor_name: string;
  exception_type: string;
  severity: ExceptionSeverity;
  detected_date: string;
  location_id: string;
  location_name: string;
  city: string;
  state: string;
  region: RegionId;
  financial_impact: number;
  resolution_status: ResolutionStatus;
  affected_count: number;
  is_recurring: boolean;
  ai_analysis: string;
  recommended_action: string;
  root_cause: string;
}

export interface AutomationWorkflow {
  workflow_id: string;
  workflow_name: string;
  document_type: DocumentType;
  transactions_processed: number;
  automation_rate: number;
  manual_reviews: number;
  processing_time: number;
  accuracy_rate: number;
  active_rules: number;
}

export interface ExecutiveReport {
  id: string;
  name: string;
  reporting_period: string;
  date_generated: string;
  status: 'Ready' | 'Generating' | 'Archived';
  category: 'Operational' | 'Spatial' | 'Financial' | 'Executive';
  key_kpi_preview: {
    label: string;
    value: string;
    delta: string;
  }[];
  summary: string;
  highlights: string[];
  regional_highlights: {
    region: string;
    finding: string;
    impact: string;
  }[];
}

export type ReportData = ExecutiveReport;

export interface VendorData {
  vendor_id: string;
  name: string;
  category: string;
  primary_region: RegionId;
  total_invoices: number;
  exception_rate: number;
  cost_impact: number;
  conformance_score: number;
}

export interface AIInsight {
  id: string;
  title: string;
  region: RegionId;
  geographic_scope: string;
  priority: 'Critical' | 'High' | 'Medium';
  confidence_level: number;
  evidence: string[];
  business_impact: {
    financial: string;
    operational: string;
    sla: string;
  };
  recommended_actions: string[];
}

export interface AIResponse {
  query: string;
  summary: string;
  key_findings: string[];
  geographic_impact: {
    region: string;
    metric: string;
    insight: string;
  }[];
  recommended_action: string;
  potential_business_impact: string;
  confidence_rating: number;
  timestamp: string;
}
