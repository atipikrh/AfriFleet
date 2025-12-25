import { RevenueChart } from '@/features/reports/RevenueChart'

const data = [
  { month: 'Jan', revenue: 1200 },
  { month: 'Feb', revenue: 2100 },
  { month: 'Mar', revenue: 1800 },
]

export default function Reports() {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Rapports</h1>
      <RevenueChart data={data} />
    </div>
  )
}

