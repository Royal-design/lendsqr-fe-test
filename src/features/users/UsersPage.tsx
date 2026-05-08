import { useMemo, useState } from 'react';
import { MoreVertical, SlidersHorizontal, Eye, UserCheck, UserX, Users, UserRoundCheck, Banknote, PiggyBank } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { EmptyState, ErrorState, SkeletonTable } from '@/components/feedback/Skeleton';
import { useUserStore } from '@/store/userStore';
import type { User, UserFilters, UserStatus } from '@/types/user';
import { formatDateTime } from '@/utils/formatters';
import { useUsers } from './useUsers';

const pageSizeOptions = [10, 25, 50, 100];
const statuses: Array<UserStatus | ''> = ['', 'Active', 'Inactive', 'Pending', 'Blacklisted'];
const tableHeadings = ['Organization', 'Username', 'Email', 'Phone Number', 'Date Joined', 'Status'];
const stats = [
  { label: 'Users', value: '2,453', icon: Users, tone: 'magenta' },
  { label: 'Active Users', value: '2,453', icon: UserRoundCheck, tone: 'violet' },
  { label: 'Users with Loans', value: '12,453', icon: Banknote, tone: 'coral' },
  { label: 'Users with Savings', value: '102,453', icon: PiggyBank, tone: 'rose' },
] as const;

export default function UsersPage() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [search, setSearch] = useState('');
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [filters, setFilters] = useState<UserFilters>({});
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const setSelectedUser = useUserStore((state) => state.setSelectedUser);
  const { data, isLoading, isError, error } = useUsers(page, pageSize, search, filters);

  const pageCount = useMemo(() => Math.max(1, Math.ceil((data?.total ?? 0) / pageSize)), [data?.total, pageSize]);

  const updateFilter = (name: keyof UserFilters, value: string) => {
    setFilters((current) => ({ ...current, [name]: value }));
    setPage(1);
  };

  const persistUser = (user: User) => setSelectedUser(user);

  return (
    <section className="users page">
      <h1>Users</h1>
      <div className="stats-grid">
        {stats.map(({ label, value, icon: Icon, tone }, index) => (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.04 }} key={label}>
            <Card className="stat-card stat-card--compact">
              <span className={`stat-card__icon stat-card__icon--${tone}`}>
                <Icon size={20} />
              </span>
              <p>{label}</p>
              <strong>{value}</strong>
            </Card>
          </motion.div>
        ))}
      </div>

      <Card className="table-card">
        <div className="table-card__toolbar">
          <label className="sr-only" htmlFor="users-search">
            Search users
          </label>
          <input
            id="users-search"
            type="search"
            placeholder="Search users"
            value={search}
            onChange={(event) => {
              setSearch(event.target.value);
              setPage(1);
            }}
          />
          <Button type="button" variant="outline" onClick={() => setFiltersOpen((value) => !value)}>
            <SlidersHorizontal size={15} />
            Filter
          </Button>
        </div>

        {filtersOpen ? (
          <form className="filter-popover" aria-label="Filter users">
            <label>
              Organization
              <input placeholder="Select" value={filters.organization ?? ''} onChange={(event) => updateFilter('organization', event.target.value)} />
            </label>
            <label>
              Username
              <input placeholder="User" value={filters.username ?? ''} onChange={(event) => updateFilter('username', event.target.value)} />
            </label>
            <label>
              Email
              <input placeholder="Email" value={filters.email ?? ''} onChange={(event) => updateFilter('email', event.target.value)} />
            </label>
            <label>
              Date
              <input type="date" value={filters.date ?? ''} onChange={(event) => updateFilter('date', event.target.value)} />
            </label>
            <label>
              Phone Number
              <input placeholder="Phone Number" value={filters.phoneNumber ?? ''} onChange={(event) => updateFilter('phoneNumber', event.target.value)} />
            </label>
            <label>
              Status
              <select value={filters.status ?? ''} onChange={(event) => updateFilter('status', event.target.value as UserStatus | '')}>
              {statuses.map((status) => (
                <option value={status} key={status || 'all'}>
                  {status || 'Select status'}
                </option>
              ))}
              </select>
            </label>
            <div className="filter-popover__actions">
              <Button type="button" variant="outline" onClick={() => setFilters({})}>
                Reset
              </Button>
              <Button type="button" onClick={() => setFiltersOpen(false)}>
                Filter
              </Button>
            </div>
          </form>
        ) : null}

        {isLoading ? <SkeletonTable /> : null}
        {isError ? <ErrorState message={error instanceof Error ? error.message : 'Please try again.'} /> : null}
        {!isLoading && data?.data.length === 0 ? <EmptyState title="No users found" body="Try another search or filter combination." /> : null}
        {!isLoading && data && data.data.length > 0 ? (
          <div className="table-wrap">
            <table className="users-table">
              <thead>
                <tr>
                  {tableHeadings.map((heading) => (
                    <th key={heading}>
                      <span>{heading}</span>
                      {heading === 'Organization' ? (
                        <button
                          className="users-table__filter"
                          type="button"
                          aria-label="Filter by Organization"
                          onClick={() => setFiltersOpen((value) => !value)}
                        >
                          <SlidersHorizontal size={12} />
                        </button>
                      ) : (
                        <SlidersHorizontal className="users-table__filter-icon" size={12} aria-hidden="true" />
                      )}
                    </th>
                  ))}
                  <th aria-label="Actions" />
                </tr>
              </thead>
              <tbody>
                {data.data.map((user) => (
                  <tr key={user.id}>
                    <td>{user.organization}</td>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td>{user.phoneNumber}</td>
                    <td>{formatDateTime(user.dateJoined)}</td>
                    <td>
                      <Badge status={user.status} />
                    </td>
                    <td className="users-table__actions">
                      <button type="button" aria-label={`Open actions for ${user.username}`} onClick={() => setOpenMenuId(openMenuId === user.id ? null : user.id)}>
                        <MoreVertical size={18} />
                      </button>
                      {openMenuId === user.id ? (
                        <div className="action-menu" role="menu">
                          <Link to={`/users/${user.id}`} onClick={() => persistUser(user)}>
                            <Eye size={14} /> View Details
                          </Link>
                          <button type="button">
                            <UserX size={14} /> Blacklist User
                          </button>
                          <button type="button">
                            <UserCheck size={14} /> Activate User
                          </button>
                        </div>
                      ) : null}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : null}
      </Card>

      <div className="pagination" aria-label="Users pagination">
        <span>Showing</span>
        <select
          value={pageSize}
          onChange={(event) => {
            setPageSize(Number(event.target.value));
            setPage(1);
          }}
        >
          {pageSizeOptions.map((option) => (
            <option value={option} key={option}>
              {option}
            </option>
          ))}
        </select>
        <span>out of {data?.total ?? 0}</span>
        <button type="button" aria-label="Previous page" disabled={page === 1} onClick={() => setPage((value) => value - 1)}>
          &lt;
        </button>
        {[1, 2, 3].filter((value) => value <= pageCount).map((value) => (
          <button
            className={page === value ? 'pagination__page pagination__page--active' : 'pagination__page'}
            type="button"
            onClick={() => setPage(value)}
            key={value}
          >
            {value}
          </button>
        ))}
        {pageCount > 6 ? <span>...</span> : null}
        {pageCount > 3 ? (
          <button className={page === pageCount ? 'pagination__page pagination__page--active' : 'pagination__page'} type="button" onClick={() => setPage(pageCount)}>
            {pageCount}
          </button>
        ) : null}
        <button type="button" aria-label="Next page" disabled={page === pageCount} onClick={() => setPage((value) => value + 1)}>
          &gt;
        </button>
      </div>
    </section>
  );
}
