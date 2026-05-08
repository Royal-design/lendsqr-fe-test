import { AppLayout } from "@/layouts/AppLayout";
import { LendsqrLogo } from "@/assets/Icons";
import { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

const LoginPage = lazy(() => import("@/features/auth/LoginPage"));
const UsersPage = lazy(() => import("@/features/users/UsersPage"));
const UserDetailsPage = lazy(
  () => import("@/features/user-details/UserDetailsPage"),
);

function RouteFallback() {
  return (
    <div className="route-loader" role="status" aria-live="polite">
      <LendsqrLogo className="route-loader__logo" />
      <div className="route-loader__progress" aria-hidden="true">
        <span />
      </div>
      <p>Preparing your dashboard</p>
    </div>
  );
}

export function AppRoutes() {
  return (
    <Suspense fallback={<RouteFallback />}>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route element={<AppLayout />}>
          <Route path="/users" element={<UsersPage />} />
          <Route path="/users/:id" element={<UserDetailsPage />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
}
