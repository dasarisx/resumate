import Navbar from "@/components/Navbar";
import ActivityForm from "@/components/ActivityForm";

export default function AddActivityPage() {
  return (
    <div>
      <Navbar />
      <h1 className="flex text-2xl font-bold justify-center">Add a New Activity</h1>
      <ActivityForm />
    </div>
  );
}