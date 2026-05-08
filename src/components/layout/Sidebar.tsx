import {
  BadgeIcon,
  BankIcon,
  ChartIcon,
  ChevronDown,
  ClipBoardIcon,
  CoinIcon,
  GalaxyIcon,
  HandShakeIcon,
  HoldMoneyIcon,
  HomeIcon,
  LogoutIcon,
  MoneyIcon,
  OrganisationIcon,
  PeopleIcon,
  PiggyBankIcon,
  SettlementIcon,
  SliderIcon,
  TransactionIcon,
  UserCheckIcon,
  UserSettingsIcon,
  UsersIcon,
  UserTimesIcon,
} from "@/assets/Icons";
import { useUiStore } from "@/store/uiStore";
import { useUserStore } from "@/store/userStore";
import type { NavItem } from "@/types/nav";
import { NavLink, useNavigate } from "react-router-dom";

const navItems: NavItem[] = [
  { label: "Dashboard", path: "/dashboard", icon: HomeIcon },
  { label: "Users", path: "/users", icon: UsersIcon, section: "Customers" },
  { label: "Guarantors", icon: PeopleIcon },
  { label: "Loans", icon: MoneyIcon },
  { label: "Decision Models", icon: HandShakeIcon },
  { label: "Savings", icon: PiggyBankIcon },
  { label: "Loan Requests", icon: HoldMoneyIcon },
  { label: "Whitelist", icon: UserCheckIcon },
  { label: "Karma", icon: UserTimesIcon },
  { label: "Organization", icon: OrganisationIcon, section: "Businesses" },
  { label: "Loan Products", icon: HoldMoneyIcon },
  { label: "Savings Products", icon: BankIcon },
  { label: "Fees and Charges", icon: CoinIcon },
  { label: "Transactions", icon: TransactionIcon },
  { label: "Services", icon: GalaxyIcon },
  { label: "Service Account", icon: UserSettingsIcon },
  { label: "Settlements", icon: SettlementIcon },
  { label: "Reports", icon: ChartIcon },
  { label: "Preferences", icon: SliderIcon, section: "Settings" },
  { label: "Audit Logs", icon: BadgeIcon },
  { label: "Audit Logs", icon: ClipBoardIcon },
];

export function Sidebar() {
  const navigate = useNavigate();
  const sidebarOpen = useUiStore((state) => state.sidebarOpen);
  const closeSidebar = useUiStore((state) => state.closeSidebar);
  const clearSelectedUser = useUserStore((state) => state.clearSelectedUser);

  const handleLogout = () => {
    clearSelectedUser();
    closeSidebar();
    navigate("/");
  };

  return (
    <aside
      className={`sidebar ${sidebarOpen ? "sidebar--open" : ""}`}
      aria-label="Main navigation"
    >
      <button className="sidebar__switch" type="button">
        <OrganisationIcon aria-hidden="true" />
        <span>Switch Organization</span>
        <ChevronDown className="sidebar__switch-chevron" aria-hidden="true" />
      </button>
      <nav>
        {navItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <div key={`${item.label}-${index}`}>
              {item.section ? (
                <p className="sidebar__section">{item.section}</p>
              ) : null}
              {item.path ? (
                <NavLink
                  className={({ isActive }) =>
                    `sidebar__link ${isActive ? "sidebar__link--active" : ""}`
                  }
                  to={item.path}
                  onClick={closeSidebar}
                >
                  <Icon aria-hidden="true" />
                  {item.label}
                </NavLink>
              ) : (
                <button
                  className="sidebar__link sidebar__link--disabled"
                  type="button"
                  aria-disabled="true"
                >
                  <Icon aria-hidden="true" />
                  {item.label}
                </button>
              )}
            </div>
          );
        })}
      </nav>
      <button className="sidebar__logout" type="button" onClick={handleLogout}>
        <LogoutIcon aria-hidden="true" />
        Logout
      </button>
      <span className="sidebar__version">v1.2.0</span>
    </aside>
  );
}
