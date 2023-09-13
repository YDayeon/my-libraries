import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      <ul className='w-full px-56 flex flex-col gap-4'>
        <li className='bg-red-500 py-2 justify-center rounded-lg flex'>
          <Link href='/time-slot'>Time Slot</Link>
        </li>
        <li className='bg-orange-400 py-2 justify-center rounded-lg flex'>
          <Link href='/minimap'>Minimap</Link>
        </li>
        <li></li>
      </ul>
    </main>
  );
}
