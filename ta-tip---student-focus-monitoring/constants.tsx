
import { Classroom, Student, UserStatus, ActivityEvent, UserMetric, DistractionLogEntry } from './types';

export const MOCK_CLASSES: Classroom[] = [
    { id: '1', name: 'Introduction to Statistics', roomId: '4A8B2C', status: 'active', isCurrentSession: true, onlineCount: 12, trackingCount: 8, thumbnailUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=600&auto=format&fit=crop' },
    { id: '2', name: 'AP Physics C: Mechanics', roomId: '9F3D1E', status: 'inactive', isCurrentSession: false, onlineCount: 0, trackingCount: 0, thumbnailUrl: 'https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?q=80&w=600&auto=format&fit=crop' },
    { id: '3', name: 'Organic Chemistry Lab', roomId: 'B7C5A0', status: 'inactive', isCurrentSession: false, onlineCount: 0, trackingCount: 0, thumbnailUrl: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=600&auto=format&fit=crop' },
    { id: '4', name: 'Molecular Biology', roomId: 'C8E2F1', status: 'inactive', isCurrentSession: false, onlineCount: 0, trackingCount: 0, thumbnailUrl: 'https://images.unsplash.com/photo-1576086213369-97a306d36557?q=80&w=600&auto=format&fit=crop' },
];

export const MOCK_USERS: Student[] = [
    { id: 'u1', name: 'Sarah Jenkins', status: UserStatus.ACTIVE, activeApp: 'RStudio', lastWebsite: 'stackoverflow.com', role: 'participant', avatarUrl: 'https://i.pravatar.cc/150?img=5', trackingDuration: '1h 45m' },
    { id: 'u2', name: 'David Kim', status: UserStatus.ACTIVE, activeApp: 'Jupyter Notebook', lastWebsite: 'kaggle.com', role: 'participant', avatarUrl: 'https://i.pravatar.cc/150?img=3', trackingDuration: '42m' },
    { id: 'u3', name: 'Emily Larson', status: UserStatus.INACTIVE, role: 'participant', avatarUrl: 'https://i.pravatar.cc/150?img=9', trackingDuration: '--' },
    { id: 'u4', name: 'Michael Brown', status: UserStatus.ACTIVE, activeApp: 'Safari', lastWebsite: 'wolframalpha.com', role: 'participant', avatarUrl: 'https://i.pravatar.cc/150?img=12', trackingDuration: '2h 10m' },
    { id: 'u5', name: 'Chris Park', status: UserStatus.ACTIVE, activeApp: 'Microsoft Excel', lastWebsite: 'wikipedia.org', role: 'participant', avatarUrl: 'https://i.pravatar.cc/150?img=15', trackingDuration: '15m' },
];

export const SESSION_METRICS: UserMetric[] = [
  { label: 'Focus Score', value: '8.5/10', color: 'text-green-600', bg: 'bg-green-50', icon: 'psychology' },
  { label: 'Active Time', value: '1h 45m', color: 'text-blue-600', bg: 'bg-blue-50', icon: 'timer' },
  { label: 'Distractions', value: '3 Events', color: 'text-orange-600', bg: 'bg-orange-50', icon: 'warning' },
  { label: 'Participation', value: 'High', color: 'text-purple-600', bg: 'bg-purple-50', icon: 'hand_raised' },
];

export const MOCK_EVENTS: ActivityEvent[] = [
    { id: '1', timestamp: '11:45 AM', type: 'disconnect', title: 'Session Ended', description: 'Student logged out', color: 'bg-slate-500' },
    { id: '2', timestamp: '11:30 AM', type: 'web_visit', title: 'Visited twitter.com', description: 'Distraction detected (5m)', color: 'bg-red-500' },
    { id: '3', timestamp: '11:15 AM', type: 'app_launch', title: 'Switched to RStudio', description: 'Coding analysis', color: 'bg-blue-500' },
    { id: '4', timestamp: '10:45 AM', type: 'web_visit', title: 'Visited stackoverflow.com', description: 'Researching syntax', color: 'bg-green-500' },
];

export const PIE_DATA = [
    { name: 'RStudio', value: 65, fill: '#3b82f6' },
    { name: 'Chrome', value: 20, fill: '#22c55e' },
    { name: 'Slack', value: 10, fill: '#eab308' },
    { name: 'Other', value: 5, fill: '#ef4444' },
];

export const DISTRACTION_LOG: DistractionLogEntry[] = [
  { id: 1, time: '10:20 AM', app: 'Instagram', duration: '2m', impact: 'Low' },
  { id: 2, time: '11:05 AM', app: 'YouTube', duration: '8m', impact: 'High' },
  { id: 3, time: '11:30 AM', app: 'Twitter', duration: '5m', impact: 'Medium' },
];
