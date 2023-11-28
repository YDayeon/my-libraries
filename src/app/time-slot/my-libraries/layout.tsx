import Image from "next/image";
import Link from "next/link";
import SVGIMG from "../../../public/assets/online-library.svg";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Link
        href={"/"}
        className="mb-4 rounded-full flex justify-center items-center"
      >
        <Image src={SVGIMG} alt="library icon" width={40} height={40} />
      </Link>
      <h1 className="mb-10">
        <Link href="/">My Libraries</Link>
      </h1>
      <div className="w-full flex justify-center grow px-10 pb-20">
        {children}
      </div>
    </div>
  );
}
