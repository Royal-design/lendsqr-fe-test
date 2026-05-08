import { Bell, Menu, Search } from 'lucide-react';
import { Logo } from '@/components/layout/Logo';
import { useUiStore } from '@/store/uiStore';

export function Navbar() {
  const toggleSidebar = useUiStore((state) => state.toggleSidebar);

  return (
    <header className="navbar">
      <div className="navbar__brand">
        <button className="navbar__menu" type="button" aria-label="Open navigation" onClick={toggleSidebar}>
          <Menu size={20} />
        </button>
        <Logo />
      </div>
      <form className="navbar__search" role="search">
        <label className="sr-only" htmlFor="global-search">
          Search dashboard
        </label>
        <input id="global-search" type="search" placeholder="Search for anything" />
        <button type="submit" aria-label="Search">
          <Search size={15} />
        </button>
      </form>
      <div className="navbar__actions">
        <a href="#docs">Docs</a>
        <button type="button" aria-label="Notifications">
          <Bell size={18} />
        </button>
        <button className="navbar__profile" type="button" aria-haspopup="menu">
          <span className="navbar__avatar">A</span>
          <span className="navbar__name">Adedeji</span>
        </button>
      </div>
    </header>
  );
}
