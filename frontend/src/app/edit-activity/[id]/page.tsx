'use client';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { api } from '../../../lib/api';

export default function EditActivityPage() {
  const { id } = useParams();
  const router = useRouter();
  const [activity, setActivity] = useState<any>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchActivity() {
      try {
        const data = await api.activities.getById(id as string);
        setActivity(data);
      } catch (err) {
        console.error('Failed to fetch activity:', err);
        setError('Could not load activity. Please try again.');
      }
    }
    fetchActivity();
  }, [id]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      await api.activities.update(id as string, activity);
      router.push('/activities');
    } catch (err: any) {
      console.error('Failed to save activity:', err);
      setError(err.message || 'Could not save changes. Please try again.');
    }
  };

  if (!activity) return <p className="text-center mt-6">Loading...</p>;

  return (
    <div className="max-w-3xl w-full mx-auto mt-6 p-6 bg-white shadow rounded-lg">
      <h2 className="flex justify-center text-xl font-semibold mb-4">Edit Activity</h2>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-2 rounded mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSave} className="flex flex-col gap-4">
        <input
          type="text"
          value={activity.title}
          onChange={e => setActivity({ ...activity, title: e.target.value })}
          className="border rounded px-3 py-2"
          placeholder="Title"
        />
        <select
          name="type"
          value={activity.type}
          onChange={e => setActivity({ ...activity, type: e.target.value })}
          className="border rounded px-3 py-2"
        >
          <option value="">Select Activity Type</option>
          <option value="project">Project</option>
          <option value="internship">Internship</option>
          <option value="course">Course</option>
        </select>
        <input
          type="text"
          value={activity.organization}
          onChange={e => setActivity({ ...activity, organization: e.target.value })}
          className="border rounded px-3 py-2"
          placeholder="Platform/Organization"
        />
        <input
          type="text"
          value={activity.duration}
          onChange={e => setActivity({ ...activity, duration: e.target.value })}
          className="border rounded px-3 py-2"
          placeholder="Duration"
        />
        <input
          type="text"
          value={activity.link || ''}
          onChange={e => setActivity({ ...activity, link: e.target.value })}
          className="border rounded px-3 py-2"
          placeholder="Link"
        />
        <textarea
          value={activity.description}
          onChange={e => setActivity({ ...activity, description: e.target.value })}
          className="border rounded px-3 py-2 h-40"
          placeholder="Description"
        />
        <div className="flex justify-center gap-4 gap-2">
          <button
            type="button"
            onClick={() => router.back()}
            className="px-4 py-2 border rounded hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
