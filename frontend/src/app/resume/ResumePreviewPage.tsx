'use client';
import Navbar from "@/components/Navbar";
import ResumeCard from "@/components/ResumeCard";
import Link from "next/link";
import { api } from '../../lib/api';

export default function ResumePreviewPage() {

  const handleDownload = async () => {
    try {
      const blob = await api.resumes.download();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'resume.pdf';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Error downloading resume:', error);
    }
  };
  return (
    <div>
      <Navbar />
      <h1 className="flex justify-center text-2xl font-bold">Resume Preview</h1>
      <ResumeCard />
      <div className="flex justify-center mt-4">
      <button 
      onClick={handleDownload} 
      className="text-blue-500 underline"
    >
      Download Resume
    </button>
    </div>
    </div>
  );
}