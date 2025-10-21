"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import { api } from "../../lib/api";

export default function ProfilePage() {
  const [profile, setProfile] = useState({
    name: "",
    mobile: "",
    email: "",
    summary: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await api.profiles.get();
        setProfile(data);
      } catch (error) {
        console.error('Error fetching activities:', error);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!profile.name) return setError("Name is required");
    // if (!profile.mobile) return setError("Mobile is required");
    if (!profile.email) return setError("Email is required");

    // Here you can call an API to save profile
    try {
      await api.profiles.update({ mobile: profile.mobile, summary: profile.summary });
      setSuccess("Profile updated successfully!");
    } catch (err: any) {
      console.error('Failed to save activity:', err);
      setError(err.message || 'Could not save changes. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-4xl w-full mx-auto mt-6 p-6 bg-white shadow rounded-lg">
        <h1 className="text-2xl font-bold mb-6 text-center">Profile</h1>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-2 rounded mb-4">
            {error}
          </div>
        )}
        {success && (
          <div className="bg-green-50 border border-green-200 text-green-600 px-4 py-2 rounded mb-4">
            {success}
          </div>
        )}

        <form onSubmit={handleUpdate} className="space-y-4">
          <div>
            <input
              type="text"
              name="name"
              value={profile.name || ''}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              placeholder="Your Name"
            />
          </div>

          <div>
            <input
              type="text"
              name="mobile"
              value={profile.mobile || ''}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              placeholder="Your Mobile Number"
            />
          </div>

          <div>
            <input
              type="email"
              name="email"
              value={profile.email || ''}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              placeholder="Your Email"
            />
          </div>

          <div>
            <textarea
              name="summary"
              value={profile.summary || ''}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 h-24"
              placeholder="Write a brief summary about yourself"
            />
          </div>

          <div className="flex justify-center mt-4">
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
