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

// Avatar colors come from the shared system-accent family so they match the
// app accents and the Mailbox widget exactly.
export const INBOX: Mail[] = [
  { id: 0, from: 'Test Sender 1', subject: 'Test email 1', preview: 'This is the preview for test email 1', body: 'This is the body of test email 1. It contains some placeholder text used for previewing the mail screens and widget.', time: '9:41', unread: true, color: '#0A84FF' },
  { id: 1, from: 'Test Sender 2', subject: 'Test email 2', preview: 'This is the preview for test email 2', body: 'This is the body of test email 2. It contains some placeholder text used for previewing the mail screens and widget.', time: '8:12', unread: true, color: '#BF5AF3' },
  { id: 2, from: 'Test Sender 3', subject: 'Test email 3', preview: 'This is the preview for test email 3', body: 'This is the body of test email 3. It contains some placeholder text used for previewing the mail screens and widget.', time: 'Tue', color: '#30D158' },
  { id: 3, from: 'Test Sender 4', subject: 'Test email 4', preview: 'This is the preview for test email 4', body: 'This is the body of test email 4. It contains some placeholder text used for previewing the mail screens and widget.', time: 'Tue', color: '#FF9F0A' },
];
export const findMail = (id: number) => INBOX.find((m) => m.id === id);
export const unreadCount = () => INBOX.filter((m) => m.unread).length;
