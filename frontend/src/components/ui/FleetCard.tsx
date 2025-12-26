type Props = {
  plate: string
  model: string
  km: string
  fuel: number
  driver: string
  status: 'active' | 'maintenance'
}

export function FleetCard({ plate, model, km, fuel, driver, status }: Props) {
  return (
    <div className="rounded-2xl p-4 border bg-white space-y-3">
      <div className="flex justify-between items-center">
        <div>
          <p className="font-medium">{plate}</p>
          <p className="text-sm text-gray-500">{model}</p>
        </div>
        <span
          className={`text-xs px-2 py-1 rounded-full ${
            status === 'active'
              ? 'bg-green-100 text-green-700'
              : 'bg-orange-100 text-orange-700'
          }`}
        >
          {status === 'active' ? 'Actif' : 'Maintenance'}
        </span>
      </div>

      <div className="text-sm text-gray-600">Kilométrage : {km}</div>

      <div>
        <div className="flex justify-between text-xs mb-1">
          <span>Carburant</span>
          <span>{fuel}%</span>
        </div>
        <div className="h-2 bg-gray-200 rounded-full">
          <div
            className="h-2 bg-orange-400 rounded-full"
            style={{ width: `${fuel}%` }}
          />
        </div>
      </div>

      <div className="text-xs text-gray-500">Conducteur : {driver}</div>
    </div>
  )
}

