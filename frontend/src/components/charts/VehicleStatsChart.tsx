import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface VehicleStatsChartProps {
  data: {
    name: string;
    actifs: number;
    maintenance: number;
    horsService: number;
  }[];
}

export const VehicleStatsChart: React.FC<VehicleStatsChartProps> = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="actifs" fill="#10b981" name="En service" />
        <Bar dataKey="maintenance" fill="#f59e0b" name="En maintenance" />
        <Bar dataKey="horsService" fill="#ef4444" name="Hors service" />
      </BarChart>
    </ResponsiveContainer>
  );
};

