
export enum UserStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  FLAGGED = 'flagged'
}

export interface ActivityEvent {
  id: string;
  timestamp: string;
  type: 'app_launch' | 'web_visit' | 'session_start' | 'disconnect';
  title: string;
  description: string;
  color: string;
}

export interface UserMetric {
  label: string;
  value: string;
  color: string;
  bg: string;
  icon: string;
}

export interface DistractionLogEntry {
  id: number;
  time: string;
  app: string;
  duration: string;
  impact: 'Low' | 'Medium' | 'High';
}

export interface Student {
  id: string;
  name: string;
  status: UserStatus;
  activeApp?: string;
  lastWebsite?: string;
  role: 'participant' | 'host';
  avatarUrl: string;
  trackingDuration: string;
}

export interface Classroom {
  id: string;
  name: string;
  roomId: string;
  status: 'active' | 'inactive';
  isCurrentSession: boolean;
  onlineCount: number;
  trackingCount: number;
  thumbnailUrl: string;
}
