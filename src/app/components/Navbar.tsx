"use client";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
("publicimagesEquinor_Symbol_Favicon_RED_64x64px.png");
const Navbar = () => {
  const searchParams = useSearchParams();
  return (
    <nav className="bg-gray-800 text-white p-4 shadow-md grid grid-cols-2 ">
      {/* Logo and title */}
      <div className="flex justify-start items-center gap-2">
        <Link href={`/?${searchParams}`}>
          <Image
            src="/images/Equinor_Symbol_Favicon_RED_64x64px.png"
            alt="Logo"
            width={24}
            height={24}
          />
        </Link>
        <Link href={`/?${searchParams}`}>
          <h1 className="font-bold">OSDU Self-service Portal</h1>
        </Link>
      </div>

      {/* Buttons for different users */}
      <ul className="flex justify-end space-x-4">
        {["Data Producer", "Data Consumer", "Developer"].map((item) => (
          <li key={item}>
            <Link
              href={`?user=${item.replace(" ", "-")}`}
              className="px-4 py-2 bg-gray-700 hover:bg-gray-600 focus:outline-none focus:ring focus:ring-blue-500 rounded"
            >
              {item}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
