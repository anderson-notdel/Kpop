export default function EventLoading() {
  return (
    <div className="animate-pulse space-y-6">
      <div className="h-4 w-32 rounded bg-gray-200" />
      <div className="h-64 rounded-lg bg-gray-200 sm:h-80" />
      <div className="space-y-3">
        <div className="h-8 w-3/4 rounded bg-gray-200" />
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="h-12 rounded bg-gray-200" />
          <div className="h-12 rounded bg-gray-200" />
          <div className="h-12 rounded bg-gray-200" />
          <div className="h-12 rounded bg-gray-200" />
        </div>
      </div>
    </div>
  );
}
