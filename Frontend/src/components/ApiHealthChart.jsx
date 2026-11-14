
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from 'recharts'

function ApiHealthChart() {
  const data = [
    { name: 'Healthy', value: 20 },
    { name: 'Failed', value: 4 },
  ]

  const COLORS = ['#10b981', '#ef4444']

  return (
    <div className="mt-8 rounded-xl border border-slate-800 bg-slate-900 p-6">
      <h3 className="text-lg font-semibold">
        API Health Distribution
      </h3>

      <p className="mt-1 text-sm text-slate-400">
        Current status of monitored endpoints
      </p>

      <div className="mt-6 h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={65}
              outerRadius={100}
              paddingAngle={5}
              dataKey="value"
              nameKey="name"
            >
              {data.map((entry, index) => (
                <Cell
                  key={entry.name}
                  fill={COLORS[index]}
                />
              ))}
            </Pie>

            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default ApiHealthChart
