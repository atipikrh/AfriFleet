import { lazy, Suspense, ReactNode } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Lazy loading des pages pour optimiser le code splitting
const Login = lazy(() => import('../pages/Login').then(m => ({ default: m.Login })));
const ManagerDashboard = lazy(() => import('../pages/ManagerDashboard').then(m => ({ default: m.ManagerDashboard })));
const VehicleDetail = lazy(() => import('../pages/VehicleDetail').then(m => ({ default: m.VehicleDetail })));
const SafetyChecklist = lazy(() => import('../pages/SafetyChecklist').then(m => ({ default: m.SafetyChecklist })));
const FuelEntry = lazy(() => import('../pages/FuelEntry').then(m => ({ default: m.FuelEntry })));
const AIReports = lazy(() => import('../pages/AIReports').then(m => ({ default: m.AIReports })));

// Composant de chargement pendant le lazy loading
const LoadingFallback = () => (
  <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
    <div className="text-center">
      <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      <p className="mt-4 text-gray-600">Chargement...</p>
    </div>
  </div>
);

// Wrapper pour les routes avec Suspense
const SuspenseRoute = ({ children }: { children: ReactNode }) => (
  <Suspense fallback={<LoadingFallback />}>
    {children}
  </Suspense>
);

// Configuration du router avec lazy loading
export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route 
          path="/" 
          element={
            <SuspenseRoute>
              <Login />
            </SuspenseRoute>
          } 
        />
        <Route 
          path="/dashboard" 
          element={
            <SuspenseRoute>
              <ManagerDashboard />
            </SuspenseRoute>
          } 
        />
        <Route 
          path="/vehicle/:id" 
          element={
            <SuspenseRoute>
              <VehicleDetail />
            </SuspenseRoute>
          } 
        />
        <Route 
          path="/safety-checklist" 
          element={
            <SuspenseRoute>
              <SafetyChecklist />
            </SuspenseRoute>
          } 
        />
        <Route 
          path="/fuel-entry" 
          element={
            <SuspenseRoute>
              <FuelEntry />
            </SuspenseRoute>
          } 
        />
        <Route 
          path="/ai-reports" 
          element={
            <SuspenseRoute>
              <AIReports />
            </SuspenseRoute>
          } 
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

