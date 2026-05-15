export interface ATSProvider {
  id: string;
  name: string;
  icon: string;
  description: string;
}

export interface ATSConnection {
  id: string;
  providerId: string;
  providerName: string;
  status: "connected" | "error" | "disconnected";
  apiKeyMasked: string;
  connectedAt: string;
  lastSyncedAt: string | null;
}

export interface SyncJob {
  id: string;
  connectionId: string;
  status: "completed" | "failed" | "in_progress";
  startedAt: string;
  completedAt: string | null;
  jobRequisitionsImported: number;
  candidatesImported: number;
  error?: string;
}

export interface ImportProgress {
  phase: "job_requisitions" | "candidates";
  phaseLabel: string;
  percent: number;
  jobRequisitionsImported: number;
  candidatesImported: number;
  candidatesTotal: number;
}

export interface ATSConnectionProps {
  /** List of supported ATS providers to display */
  providers: ATSProvider[];
  /** Current connection, if one exists */
  connection: ATSConnection | null;
  /** Past sync operations for the current connection */
  syncJobs: SyncJob[];
  /** Progress data when an import is in progress, null otherwise */
  importProgress: ImportProgress | null;
  /** Called when the user selects a provider and submits an API key */
  onConnect?: (providerId: string, apiKey: string, customProvider?: { name: string; baseUrl: string }) => void;
  /** Called when the user clicks "Re-sync" */
  onSync?: () => void;
  /** Called when the user disconnects the current connection */
  onDisconnect?: () => void;
}
