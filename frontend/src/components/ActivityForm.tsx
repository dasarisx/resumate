"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '../lib/api';

export default function ActivityForm() {
  const router = useRouter();
  const [activities, setActivities] = useState<any[]>([]);
  const [form, setForm] = useState({
    title: '',
    type: '',
    organization: '',
    duration: '',
    link: '',
    description: ''
  });
  const [error, setError] = useState('');

  useEffect(() => {
    fetchActivities();
  }, []);

  const fetchActivities = async () => {
    try {
      const data = await api.activities.list();
      setActivities(data);
    } catch (error) {
      console.error('Error fetching activities:', error);
    }
  };

  const handleEdit = (id: string) => {
    router.push(`/edit-activity/${id}`);
    // Example: navigate to edit form or open modal
    // window.location.href = `/edit-activity/${id}`;
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this activity?')) return;
    try {
      await api.activities.delete(id);
      await fetchActivities();
    //   setActivities((prev) => prev.filter((a) => a.id !== id));
    } catch (error) {
      console.error('Error deleting activity:', error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    if (!form.title) return 'Title is required';
    if (!form.type) return 'Activity type is required';
    return '';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      const newActivity = await api.activities.create(form);
      setActivities([...activities, newActivity]);
      
      // Reset form
      setForm({
        title: '',
        type: '',
        organization: '',
        duration: '',
        link: '',
        description: ''
      });
    } catch (error: any) {
      setError(error.message || 'Failed to add activity');
      console.error('Error adding activity:', error);
    }
  };

  return (
    <div>
    <div className="max-w-3xl w-full mx-auto mt-6 p-6 bg-white shadow rounded-lg">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-2 rounded">
            {error}
          </div>
        )}
        <input 
          name="title"
          value={form.title}
          onChange={handleChange}
          className="border rounded px-3 py-2" 
          placeholder="Title" 
        />
        <select 
          name="type"
          value={form.type}
          onChange={handleChange}
          className="border rounded px-3 py-2"
        >
          <option value="">Select Activity Type</option>
          <option value="project">Project</option>
          <option value="internship">Internship</option>
          <option value="course">Course</option>
        </select>
        <input 
          name="organization"
          value={form.organization}
          onChange={handleChange}
          className="border rounded px-3 py-2" 
          placeholder="Platform/Organization" 
        />
        <input 
          name="duration"
          value={form.duration}
          onChange={handleChange}
          className="border rounded px-3 py-2" 
          placeholder="Duration" 
        />
        <input 
          name="link"
          value={form.link}
          onChange={handleChange}
          className="border rounded px-3 py-2" 
          placeholder="Link" 
        />
        <textarea 
          name="description"
          value={form.description}
          onChange={handleChange}
          className="border rounded px-3 py-2" 
          placeholder="Description" 
        />
        {/* <input className="border rounded px-3 py-2" type="file" /> */}
        <div className="flex justify-center gap-4 gap-2">
        <button 
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add Activity
        </button>
        </div>
      </form>
      </div>

      {/* Display Activities */}
      <div className='max-w-5xl w-full mx-auto mt-6 p-6 bg-white shadow rounded-lg'>
      <div className="mt-8">
        <h2 className="flex justify-center text-xl font-bold mb-4">Added Activities</h2>
        <div className="space-y-4">
          {activities.map((activity) => (
            // <div key={activity._id} className="border rounded p-4 bg-white shadow">
            //   <div>
            //     <h3 className="font-bold">{activity.title}</h3>
            //     <p className="text-sm text-gray-600">{activity.type}</p>
            //     <p>{activity.organization}</p>
            //     <p className="text-sm">{activity.description}</p>
            //   </div>
            <div key={activity._id} className="border rounded p-4 bg-white shadow flex justify-between items-center">
              <div>
                <h3 className="font-bold">{activity.title}</h3>
                <p className="text-sm text-gray-600">{activity.type}</p>
                <p>{activity.organization}</p>
                <p className="text-sm">{activity.description}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(activity._id)}
                  className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(activity._id)}
                  className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    </div>
  );
}
