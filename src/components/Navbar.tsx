import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav
      className="bg-gray-800 text-white p-4 shadow-md grid grid-cols-2"
      style={{ height: "var(--navbar-height)" }}
    >
      {/* Logo and title */}
      <div className="flex justify-start items-center gap-2">
        {/* <Link href={`/?${searchParams}`} aria-label="logo"> */}
        <Link href="/" aria-label="logo">
          <Image
            src="/images/Equinor_Symbol_Favicon_RED_64x64px.png"
            alt="Logo"
            width={24}
            height={24}
          />
        </Link>
        {/* <Link href={`/?${searchParams}`} aria-label="title"> */}
        <Link href="/" aria-label="title">
          <h1 className="font-bold">OSDU Self-service Portal</h1>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
