const API_BASE = import.meta.env.VITE_API_BASE ?? '/api'

export type Vehicle = {
  id: string
  name: string
}

export async function fetchVehicles(): Promise<Vehicle[]> {
  const res = await fetch(`${API_BASE}/vehicles`)
  if (!res.ok) throw new Error('Failed to fetch vehicles')
  return res.json()
}

