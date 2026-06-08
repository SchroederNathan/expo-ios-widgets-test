import { MailList } from '../../lib/MailList';
import { STARRED } from '../../lib/mail';

export default function Starred() {
  return <MailList title="Starred" mail={STARRED} badgePath="mail/starred" />;
}
