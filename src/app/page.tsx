import Link from "next/link";

export default function HomePage() {
  return (
    <div className="grid grid-cols-3 m-auto xl:max-w-6xl">
      <Link href="/libraries" className="w-full h-28 bg-pink-300">
        libraries
      </Link>
      <div className="w-full h-28 bg-yellow-300">session</div>
      <div className="w-fullaf h-28 bg-green-300">projects</div>
    </div>
  );
}
