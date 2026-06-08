import { MailList } from '../../lib/MailList';
import { DRAFTS } from '../../lib/mail';

export default function Drafts() {
  return <MailList title="Drafts" mail={DRAFTS} badgePath="mail/drafts" />;
}
