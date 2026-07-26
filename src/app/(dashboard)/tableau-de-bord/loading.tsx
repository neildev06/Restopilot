export default function DashboardLoading() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="space-y-2">
        <div className="h-7 w-48 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
        <div className="h-4 w-32 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="p-4 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
            <div className="h-3 w-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-3" />
            <div className="h-7 w-28 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-1" />
            <div className="h-3 w-20 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
          </div>
        ))}
      </div>
    </div>
  )
}
