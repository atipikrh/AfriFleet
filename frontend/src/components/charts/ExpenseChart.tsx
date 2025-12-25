import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface ExpenseChartProps {
  data: {
    date: string;
    montant: number;
  }[];
}

export const ExpenseChart: React.FC<ExpenseChartProps> = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="montant" stroke="#6366f1" strokeWidth={2} name="Dépenses (FCFA)" />
      </LineChart>
    </ResponsiveContainer>
  );
};

