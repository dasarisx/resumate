import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-gray-900 text-white px-6 py-3 flex gap-6">
      <Link href="/dashboard" className="font-bold">Dashboard</Link>
      <Link href="/resume">Resume</Link>
      <Link href="/activities">Activities</Link>
      <Link href="/profile">Profile</Link>
    </nav>
  );
}
