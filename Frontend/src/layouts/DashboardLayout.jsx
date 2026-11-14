
import {
  LayoutDashboard,
  Server,
  AlertTriangle,
  GitCompareArrows,
  Network,
  Settings,
  ShieldCheck,
} from 'lucide-react'

function DashboardLayout({ children }) {
  const menuItems = [
    { name: 'Dashboard', icon: LayoutDashboard },
    { name: 'Endpoints', icon: Server },
    { name: 'Incidents', icon: AlertTriangle },
    { name: 'API Comparison', icon: GitCompareArrows },
    { name: 'Dependencies', icon: Network },
    { name: 'Settings', icon: Settings },
  ]

  return (
    <div className="flex min-h-screen bg-slate-950 text-white">
      <aside className="w-64 border-r border-slate-800 p-6">
        <div className="mb-10 flex items-center gap-3">
          <ShieldCheck size={30} className="text-cyan-400" />
          <h1 className="text-xl font-bold">API Sentinel</h1>
        </div>

        <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
          Main Menu
        </p>

        <nav className="space-y-2">
          {menuItems.map((item, index) => {
            const Icon = item.icon

            return (
              <button
                key={item.name}
                className={`flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left transition ${
                  index === 0
                    ? 'bg-cyan-500/10 text-cyan-400'
                    : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <Icon size={19} />
                <span className="text-sm font-medium">{item.name}</span>
              </button>
            )
          })}
        </nav>
      </aside>

      <main className="flex-1 p-8">
        {children}
      </main>
    </div>
  )
}

export default DashboardLayout

