import type { UserStatus } from '@/types/user';

export function Badge({ status }: { status: UserStatus }) {
  return <span className={`badge badge--${status.toLowerCase()}`}>{status}</span>;
}
