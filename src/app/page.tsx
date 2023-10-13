import Link from "next/link";

export default function Home() {
  return (
    <main className="flex w-full min-h-screen flex-col items-center justify-between py-24">
      <div className="w-full flex flex-col gap-4 items-center px-10">
        <Link href="/time-slot" className="bg-red-500 py-3 justify-center rounded-lg flex w-full max-w-md">
          Time Slot
        </Link>
        <Link href="/mini-map" className="bg-orange-400 py-3 justify-center rounded-lg flex w-full max-w-md">
          Minimap
        </Link>
        <Link href="/search-box" className="bg-yellow-400 py-3 justify-center rounded-lg flex w-full max-w-md">
          Search Box
        </Link>
      </div>
    </main>
  );
}
