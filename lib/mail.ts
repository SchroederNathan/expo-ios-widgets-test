export type Mail = {
  id: number;
  from: string;
  subject: string;
  preview: string;
  body: string;
  time: string;
  unread?: boolean;
  color: string;
};

export const INBOX: Mail[] = [
  { id: 0, from: 'GitHub', subject: 'Your build passed ✓', preview: 'Workflow “iOS” completed on main', body: 'Workflow “iOS” completed successfully on main in 4m 12s. All checks are green and the artifact is ready to download.', time: '9:41', unread: true, color: '#22D3EE' },
  { id: 1, from: 'Linear', subject: 'WID-42 assigned to you', preview: 'Add Mailbox widget deep links', body: 'Nate assigned WID-42 “Add Mailbox widget deep links” to you. The widget should route each inbox item to its own message screen via Expo Router.', time: '8:12', unread: true, color: '#A78BFA' },
  { id: 2, from: 'Expo', subject: 'SDK 56 is here', preview: 'Widgets & Live Activities, no native code', body: 'Expo SDK 56 ships expo-widgets — build iOS home screen widgets and Live Activities entirely with Expo UI components.', time: 'Tue', color: '#34D399' },
  { id: 3, from: 'Vercel', subject: 'Deployment ready', preview: 'widget-studio-app is live in production', body: 'Your deployment of widget-studio-app finished and is now live in production.', time: 'Tue', color: '#F87171' },
];
export const STARRED: Mail[] = [
  { id: 10, from: 'Mom', subject: 'Sunday dinner?', preview: 'Bring the new phone, show me the widgets', body: 'Are you coming Sunday? Bring the new phone — I want to see those widgets you keep talking about.', time: 'Wed', color: '#FBBF24' },
  { id: 11, from: 'Apple Developer', subject: 'TestFlight build ready', preview: 'Build 1.0 (3) is ready to test', body: 'Build 1.0 (3) of Widget Studio has finished processing and is ready to test in TestFlight.', time: 'Mon', color: '#60A5FA' },
];
export const DRAFTS: Mail[] = [
  { id: 20, from: 'To: design@', subject: 'Re: widget polish', preview: 'A couple more ideas for the Day Arc…', body: 'A couple more ideas for the Day Arc ring — maybe a softer gradient at night and a subtle glow at golden hour.', time: '—', color: '#A78BFA' },
];

const ALL = [...INBOX, ...STARRED, ...DRAFTS];
export const findMail = (id: number) => ALL.find((m) => m.id === id);
export const unreadCount = () => INBOX.filter((m) => m.unread).length;
