import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <main className='flex w-full min-h-screen flex-col items-center justify-between py-24'>
      <ul className='w-full flex flex-col gap-4 items-center px-10'>
        <li className='bg-red-500 py-3 justify-center rounded-lg flex w-full max-w-md'>
          <Link href='/time-slot'>Time Slot</Link>
        </li>
        <li className='bg-orange-400 py-3 justify-center rounded-lg flex w-full max-w-md'>
          <Link href='/mini-map'>Minimap</Link>
        </li>
        <li></li>
      </ul>
    </main>
  );
}
