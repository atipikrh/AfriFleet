export interface ChecklistItem {
  id: string;
  text: string;
  checked: boolean;
  anomalie_critique?: boolean;
}

export interface Checklist {
  id: string;
  vehicle_id: string;
  driver_id: string;
  date: string;
  items: ChecklistItem[];
  anomalies: string[];
  photo_url?: string;
  signature?: string;
}

