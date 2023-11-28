import Image from "next/image";
import Link from "next/link";
import Book from "../../../public/assets/online-library.svg";

export default function Home() {
  return (
    <main className="flex w-full min-h-screen flex-col item-center py-24">
      <Link
        href="/libraries"
        className="w-full flex justify-center items-center gap-2 mb-16"
      >
        <Image src={Book} width={30} alt="book icon" />
        <h1 className="text-xl">My Libraries</h1>
      </Link>

      <ul className="w-full flex flex-col gap-4 items-center px-10">
        <li className="bg-red-500 rounded-lg flex w-full max-w-md">
          <Link className="py-3 w-full text-center" href="/time-slot">
            Time Slot
          </Link>
        </li>
        <li className="bg-orange-400 rounded-lg flex w-full max-w-md">
          <Link className="py-3 w-full text-center" href="/mini-map">
            Minimap
          </Link>
        </li>
        <li className="bg-yellow-400 rounded-lg flex w-full max-w-md">
          <Link className="py-3 w-full text-center" href="/search-box">
            Search Box
          </Link>
        </li>
      </ul>
    </main>
  );
}
