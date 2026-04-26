export default function HomePage() {
  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">Scout AI</h1>
      <p className="text-zinc-500">Soccer player performance analysis powered by ML.</p>
      <div className="flex gap-4 pt-2">
        <a
          href="/players"
          className="rounded-lg bg-zinc-900 text-white px-4 py-2 text-sm font-medium hover:bg-zinc-700"
        >
          View Players
        </a>
        <a
          href="/matches"
          className="rounded-lg border border-zinc-300 px-4 py-2 text-sm font-medium hover:bg-zinc-100"
        >
          View Matches
        </a>
      </div>
    </div>
  );
}
