import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

const Dashboard = lazy(() => import('@/pages/Dashboard'))
const Reports = lazy(() => import('@/pages/Reports'))

function Loader() {
  return <div className="p-6">Chargement…</div>
}

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="*" element={<div className="p-6">404</div>} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

