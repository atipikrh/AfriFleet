import { lazy, Suspense } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { ProtectedRoute } from '@/routes/ProtectedRoute'
import { AppLayout } from '@/components/layout/AppLayout'

const Login = lazy(() => import('@/pages/Login'))
const Dashboard = lazy(() => import('@/pages/Dashboard'))
const ManagerDashboard = lazy(() => import('@/pages/ManagerDashboard').then(module => ({ default: module.ManagerDashboard })))
const Reports = lazy(() => import('@/pages/Reports'))
const VehicleDetail = lazy(() => import('@/pages/VehicleDetail'))
const SafetyChecklist = lazy(() => import('@/pages/SafetyChecklist').then(module => ({ default: module.SafetyChecklist })))
const FuelEntry = lazy(() => import('@/pages/FuelEntry').then(module => ({ default: module.FuelEntry })))
const AIReports = lazy(() => import('@/pages/AIReports').then(module => ({ default: module.AIReports })))
const Unauthorized = lazy(() => import('@/pages/Unauthorized'))

function Loader() {
  return <div className="flex items-center justify-center min-h-screen"><div className="text-gray-500">Chargement...</div></div>
}

export default function App() {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
        
        <Route
          element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute roles={['manager']}>
                <ManagerDashboard onScreenChange={() => {}} />
              </ProtectedRoute>
            }
          />

          <Route
            path="/reports"
            element={
              <ProtectedRoute roles={['manager']}>
                <Reports />
              </ProtectedRoute>
            }
          />

          <Route
            path="/vehicles/:id"
            element={<VehicleDetail />}
          />

          <Route
            path="/safety-checklist"
            element={<SafetyChecklist onBack={() => {}} />}
          />

          <Route
            path="/fuel-entry"
            element={<FuelEntry onBack={() => {}} />}
          />

          <Route
            path="/ai-reports"
            element={
              <ProtectedRoute roles={['manager']}>
                <AIReports onBack={() => {}} />
              </ProtectedRoute>
            }
          />
        </Route>

        <Route path="*" element={<div className="p-6">404</div>} />
      </Routes>
    </Suspense>
  )
}


