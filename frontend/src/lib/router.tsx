import { createBrowserRouter, Navigate } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { AppLayout } from '../components/layout/AppLayout';

const Login = lazy(() => import('../pages/Login').then(module => ({ default: module.Login })));
const ManagerDashboard = lazy(() => import('../pages/ManagerDashboard').then(module => ({ default: module.ManagerDashboard })));
const VehicleDetail = lazy(() => import('../pages/VehicleDetail').then(module => ({ default: module.VehicleDetail })));
const SafetyChecklist = lazy(() => import('../pages/SafetyChecklist').then(module => ({ default: module.SafetyChecklist })));
const FuelEntry = lazy(() => import('../pages/FuelEntry').then(module => ({ default: module.FuelEntry })));
const AIReports = lazy(() => import('../pages/AIReports').then(module => ({ default: module.AIReports })));

const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="text-gray-500">Chargement...</div>
  </div>
);

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="/dashboard" replace />,
      },
      {
        path: 'login',
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <Login onLogin={() => {}} />
          </Suspense>
        ),
      },
      {
        path: 'dashboard',
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <ManagerDashboard onScreenChange={() => {}} />
          </Suspense>
        ),
      },
      {
        path: 'vehicles/:id',
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <VehicleDetail onBack={() => {}} />
          </Suspense>
        ),
      },
      {
        path: 'safety-checklist',
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <SafetyChecklist onBack={() => {}} />
          </Suspense>
        ),
      },
      {
        path: 'fuel-entry',
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <FuelEntry onBack={() => {}} />
          </Suspense>
        ),
      },
      {
        path: 'ai-reports',
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <AIReports onBack={() => {}} />
          </Suspense>
        ),
      },
    ],
  },
]);

