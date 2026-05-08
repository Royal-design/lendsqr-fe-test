import { Outlet } from 'react-router-dom';
import { Navbar } from '@/components/layout/Navbar';
import { Sidebar } from '@/components/layout/Sidebar';
import { useUiStore } from '@/store/uiStore';

export function AppLayout() {
  const sidebarOpen = useUiStore((state) => state.sidebarOpen);
  const closeSidebar = useUiStore((state) => state.closeSidebar);

  return (
    <div className="app-shell">
      <Navbar />
      <div className="app-shell__body">
        <Sidebar />
        {sidebarOpen ? <button className="app-shell__scrim" aria-label="Close navigation" onClick={closeSidebar} /> : null}
        <main className="app-shell__content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
