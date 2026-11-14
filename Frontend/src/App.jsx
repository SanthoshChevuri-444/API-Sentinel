
import DashboardLayout from './layouts/DashboardLayout'

function App() {
  return (
    <DashboardLayout>
      <div>
        <h2 className="text-2xl font-bold">
          Dashboard Overview
        </h2>

        <p className="mt-2 text-slate-400">
          Welcome to API Sentinel. Monitor your APIs and track their health.
        </p>
      </div>
    </DashboardLayout>
  )
}

export default App
