const API_BASE = 'http://localhost:5000/api';

async function apiFetch(endpoint: string, options: RequestInit = {}) {
  const token = localStorage.getItem('token');
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const response = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'API request failed');
  }

  return data;
}

export const api = {
  activities: {
    list: () => apiFetch('/activities'),
    create: (data: any) => apiFetch('/activities', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
    update: (id: string, data: any) => apiFetch(`/activities/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),
    delete: (id: string) => apiFetch(`/activities/${id}`, {
      method: 'DELETE'
    }),
    getById: (id: string) => apiFetch(`/activities/${id}`),
  },
  resumes: {
    getActivities: () => apiFetch('/activities?sort=type,createdAt'),
    preview: () => apiFetch('/resumes/preview'),
    download: async () => {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE}/resumes/download`, {
        headers: {
          Accept: 'application/pdf',
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        const error = await response.text();
        throw new Error(error || 'Download failed');
      }
      return response.blob();
    },
  },
  profiles: {
    get: () => apiFetch('/auth/profile', { method: 'GET' }),
    update: (data: { mobile?: string; summary?: string }) => apiFetch('/auth/profile', {
      method: 'PUT',
      body: JSON.stringify(data),
    }),
  }
};
