import Navbar from "@/components/Navbar";
import ResumeCard from "@/components/ResumeCard";
import Link from "next/link";

export default function DashboardPage() {
  return (
    <div>
      <Navbar />
      <h1 className="flex justify-center text-2xl font-bold">Dashboard</h1>
      {/* <Link href="/somepage">Go to some page</Link> */}
      <ResumeCard />
    </div>
  );
}