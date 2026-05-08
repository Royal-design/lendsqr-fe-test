import { BellIcon, ChevronDown, LendsqrLogo } from "@/assets/Icons";
import { useUiStore } from "@/store/uiStore";
import { Menu, Search } from "lucide-react";

export function Navbar() {
  const toggleSidebar = useUiStore((state) => state.toggleSidebar);

  return (
    <header className="navbar">
      <div className="navbar__brand">
        <button
          className="navbar__menu"
          type="button"
          aria-label="Open navigation"
          onClick={toggleSidebar}
        >
          <Menu size={20} />
        </button>
        <LendsqrLogo />
      </div>
      <form className="navbar__search" role="search">
        <label className="sr-only" htmlFor="global-search">
          Search dashboard
        </label>
        <input
          id="global-search"
          type="search"
          placeholder="Search for anything"
        />
        <button type="submit" aria-label="Search">
          <Search size={15} />
        </button>
      </form>
      <div className="navbar__actions">
        <a href="#docs">Docs</a>
        <button type="button" aria-label="Notifications">
          <BellIcon />
        </button>
        <button className="navbar__profile" type="button" aria-haspopup="menu">
          <img className="navbar__avatar" src="/avatar.webp" alt="Adedeji" />
          <div className="navbar__profile-info">
            <p className="navbar__name">Adedeji</p>
            <ChevronDown />
          </div>
        </button>
      </div>
    </header>
  );
}
