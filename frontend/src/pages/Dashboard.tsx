import { KpiCard } from '@/components/ui/KpiCard'
import { FleetCard } from '@/components/ui/FleetCard'
import { Sidebar } from '@/components/layout/Sidebar'

export default function Dashboard() {
  return (
    <div className="flex bg-gray-50 min-h-screen">
      <Sidebar />

      <main className="flex-1 p-6 space-y-6">
        <h1 className="text-2xl font-semibold">Tableau de bord</h1>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <KpiCard label="Véhicules actifs" value="3/5" highlight />
          <KpiCard label="Conducteurs" value="3/5" />
          <KpiCard label="Recettes" value="116k FCFA" sub="+15%" />
          <KpiCard label="Dépenses" value="115k FCFA" />
          <KpiCard label="Alertes" value="3" />
          <KpiCard label="Maintenance" value="2" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
            <FleetCard
              plate="LT 2847 CE"
              model="Toyota Hiace"
              km="87 450 km"
              fuel={78}
              driver="Jean-Pierre Mbarga"
              status="active"
            />
            <FleetCard
              plate="LT 9134 AB"
              model="Hyundai H100"
              km="124 300 km"
              fuel={45}
              driver="—"
              status="maintenance"
            />
          </div>

          <div className="rounded-2xl border bg-white p-4">
            <p className="font-medium mb-2">Samba-Pulse</p>
            <p className="text-sm text-gray-600">
              Surconsommation détectée sur le Suzuki Dzire.
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}
