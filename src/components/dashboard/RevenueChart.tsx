'use client'

import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'

interface RevenueChartProps {
  data: { name: string; revenu: number; couverts: number }[]
  type?: 'line' | 'bar'
}

export function RevenueChart({ data, type = 'line' }: RevenueChartProps) {
  const formatEuro = (value: number) => `${value}€`

  if (type === 'bar') {
    return (
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="name" tick={{ fontSize: 12 }} stroke="#9ca3af" />
            <YAxis tick={{ fontSize: 12 }} stroke="#9ca3af" tickFormatter={formatEuro} />
            <Tooltip
              formatter={(value: number, name: string) => {
                if (name === 'revenu') return [`${value}€`, 'Chiffre d\'affaires']
                return [value, 'Couverts']
              }}
              contentStyle={{ borderRadius: '8px', border: '1px solid #e5e7eb' }}
            />
            <Legend
              formatter={(value: string) => {
                if (value === 'revenu') return 'Chiffre d\'affaires'
                return 'Couverts'
              }}
            />
            <Bar dataKey="revenu" fill="#C47A5A" radius={[4, 4, 0, 0]} name="revenu" />
            <Bar dataKey="couverts" fill="#7A9E7E" radius={[4, 4, 0, 0]} name="couverts" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    )
  }

  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="name" tick={{ fontSize: 12 }} stroke="#9ca3af" />
          <YAxis tick={{ fontSize: 12 }} stroke="#9ca3af" tickFormatter={formatEuro} />
          <Tooltip
            formatter={(value: number) => [`${value}€`, 'CA']}
            contentStyle={{ borderRadius: '8px', border: '1px solid #e5e7eb' }}
          />
          <Line
            type="monotone"
            dataKey="revenu"
            stroke="#C47A5A"
            strokeWidth={2}
            dot={{ fill: '#C47A5A', r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
