
import {
  Activity,
  CheckCircle2,
  XCircle,
  AlertTriangle,
} from 'lucide-react'

function DashboardStats() {
  const stats = [
    {
      title: 'Total Endpoints',
      value: '24',
      icon: Activity,
      color: 'text-blue-400',
      bg: 'bg-blue-400/10',
    },
    {
      title: 'Healthy APIs',
      value: '20',
      icon: CheckCircle2,
      color: 'text-emerald-400',
      bg: 'bg-emerald-400/10',
    },
    {
      title: 'Failed APIs',
      value: '4',
      icon: XCircle,
      color: 'text-red-400',
      bg: 'bg-red-400/10',
    },
    {
      title: 'Active Incidents',
      value: '2',
      icon: AlertTriangle,
      color: 'text-amber-400',
      bg: 'bg-amber-400/10',
    },
  ]

  return (
    <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon

        return (
          <div
            key={stat.title}
            className="rounded-xl border border-slate-800 bg-slate-900 p-5"
          >
            <div className="flex items-center justify-between">
              <p className="text-sm text-slate-400">
                {stat.title}
              </p>

              <div className={`rounded-lg p-2 ${stat.bg}`}>
                <Icon size={20} className={stat.color} />
              </div>
            </div>

            <h3 className="mt-4 text-3xl font-bold">
              {stat.value}
            </h3>
          </div>
        )
      })}
    </div>
  )
}

export default DashboardStats
