import {
  BarChart3,
  Banknote,
  Briefcase,
  Building2,
  ClipboardList,
  HandCoins,
  Home,
  LogOut,
  PiggyBank,
  Settings,
  ShieldCheck,
  UserRound,
  Users,
  WalletCards,
} from 'lucide-react';
import { NavLink, useNavigate } from 'react-router-dom';
import type { NavItem } from '@/types/nav';
import { useUiStore } from '@/store/uiStore';
import { useUserStore } from '@/store/userStore';

const navItems: NavItem[] = [
  { label: 'Dashboard', path: '/dashboard', icon: Home },
  { label: 'Users', path: '/users', icon: Users, section: 'Customers' },
  { label: 'Guarantors', icon: UserRound },
  { label: 'Loans', icon: Banknote },
  { label: 'Decision Models', icon: ShieldCheck },
  { label: 'Savings', icon: PiggyBank },
  { label: 'Loan Requests', icon: HandCoins },
  { label: 'Organization', icon: Building2, section: 'Businesses' },
  { label: 'Loan Products', icon: WalletCards },
  { label: 'Reports', icon: BarChart3 },
  { label: 'Preferences', icon: Settings, section: 'Settings' },
  { label: 'Audit Logs', icon: ClipboardList },
];

export function Sidebar() {
  const navigate = useNavigate();
  const sidebarOpen = useUiStore((state) => state.sidebarOpen);
  const closeSidebar = useUiStore((state) => state.closeSidebar);
  const clearSelectedUser = useUserStore((state) => state.clearSelectedUser);

  const handleLogout = () => {
    clearSelectedUser();
    closeSidebar();
    navigate('/');
  };

  return (
    <aside className={`sidebar ${sidebarOpen ? 'sidebar--open' : ''}`} aria-label="Main navigation">
      <button className="sidebar__switch" type="button">
        <Briefcase size={16} />
        Switch Organization
      </button>
      <nav>
        {navItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <div key={`${item.label}-${index}`}>
              {item.section ? <p className="sidebar__section">{item.section}</p> : null}
              {item.path ? (
                <NavLink
                  className={({ isActive }) => `sidebar__link ${isActive ? 'sidebar__link--active' : ''}`}
                  to={item.path}
                  onClick={closeSidebar}
                >
                  <Icon size={15} aria-hidden="true" />
                  {item.label}
                </NavLink>
              ) : (
                <button className="sidebar__link sidebar__link--disabled" type="button" aria-disabled="true">
                  <Icon size={15} aria-hidden="true" />
                  {item.label}
                </button>
              )}
            </div>
          );
        })}
      </nav>
      <button className="sidebar__logout" type="button" onClick={handleLogout}>
        <LogOut size={15} />
        Logout
      </button>
      <span className="sidebar__version">v1.2.0</span>
    </aside>
  );
}
