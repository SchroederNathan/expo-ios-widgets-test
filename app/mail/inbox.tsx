import { MailList } from '../../lib/MailList';
import { INBOX } from '../../lib/mail';

export default function Inbox() {
  return <MailList title="Inbox" mail={INBOX} badgePath="mail/inbox" />;
}
