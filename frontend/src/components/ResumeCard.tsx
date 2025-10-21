"use client";
import { useEffect, useState } from 'react';
import { api } from '../lib/api';

type Activity = {
  _id: string;
  title: string;
  type: string;
  organization: string;
  description: string;
  duration: string;
};

export default function ResumeCard() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [profile, setProfile] = useState({
    name: "",
    mobile: "",
    email: "",
    summary: "",
  });

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const data = await api.resumes.getActivities();
        setActivities(data);
      } catch (error) {
        console.error('Error fetching activities:', error);
      }
    };
    fetchActivities();
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

  const groupedActivities = activities.reduce((acc, activity) => {
    if (!acc[activity.type]) acc[activity.type] = [];
    acc[activity.type].push(activity);
    return acc;
  }, {} as Record<string, Activity[]>);

  return (
    <div className="max-w-5xl w-full mx-auto mt-6 px-6 border rounded p-6 bg-white shadow mb-4">
      <h2 className="text-lg font-bold mb-2">{profile.name || 'Loading...'}</h2>
      <div className="text-sm mb-4">
        {profile.email || 'Loading...'} | {profile.mobile || 'Loading...'}
      </div>
      <h3 className="font-bold capitalize mb-2">Summary</h3>
      <p className="text-sm text-gray-600 ml-4 mb-4">{profile.summary || 'Loading...'}</p>
      

      {Object.entries(groupedActivities).map(([type, items]) => (
        <div key={type} className="mb-4">
          <h3 className="font-bold capitalize mb-2">{type}s</h3>
          <ul className="list-disc list-inside">
            {items.map(activity => (
              <li key={activity._id} className="mb-2">
                <span className="font-medium">{activity.title}</span>
                {activity.organization && (
                  <span className="text-gray-600"> - {activity.organization}</span>
                )}
                {activity.duration && (
                  <span className="text-gray-600"> ({activity.duration})</span>
                )}
                {activity.description && (
                  <p className="text-sm text-gray-600 ml-4">{activity.description}</p>
                )}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
