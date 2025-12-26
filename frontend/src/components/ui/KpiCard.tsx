import { ReactNode } from 'react'

type Props = {
  label: string
  value: string
  icon?: ReactNode
  highlight?: boolean
  sub?: string
}

export function KpiCard({ label, value, icon, highlight, sub }: Props) {
  return (
    <div
      className={`rounded-2xl p-5 shadow-sm border bg-white ${
        highlight ? 'bg-orange-400 text-white' : ''
      }`}
    >
      <div className="flex justify-between items-center">
        <div>
          <p className="text-sm opacity-80">{label}</p>
          <p className="text-2xl font-semibold">{value}</p>
          {sub && <p className="text-xs mt-1 opacity-70">{sub}</p>}
        </div>
        {icon && (
          <div className="w-10 h-10 rounded-full flex items-center justify-center bg-orange-100 text-orange-500">
            {icon}
          </div>
        )}
      </div>
    </div>
  )
}

