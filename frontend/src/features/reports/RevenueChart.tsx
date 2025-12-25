import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts'

type Point = {
  month: string
  revenue: number
}

export function RevenueChart({ data }: { data: Point[] }) {
  return (
    <div className="h-72 rounded-2xl bg-white p-4 shadow">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="revenue" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

