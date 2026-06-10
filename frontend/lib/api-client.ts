const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

interface RequestOptions extends RequestInit {
  params?: Record<string, any>;
}

export async function apiCall(endpoint: string, options: RequestOptions = {}) {
  const { params, ...fetchOptions } = options;

  let url = `${API_BASE_URL}${endpoint}`;

  if (params) {
    const queryString = new URLSearchParams(params).toString();
    url += `?${queryString}`;
  }

  const token = typeof window !== 'undefined' ? localStorage.getItem('authToken') : null;

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...fetchOptions.headers,
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(url, {
    ...fetchOptions,
    headers,
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'API request failed');
  }

  return response.json();
}

// Asset API
export const assetAPI = {
  getAll: () => apiCall('/assets'),
  getById: (id: string) => apiCall(`/assets/${id}`),
  create: (data: any) => apiCall('/assets', { method: 'POST', body: JSON.stringify(data) }),
  update: (id: string, data: any) => apiCall(`/assets/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  delete: (id: string) => apiCall(`/assets/${id}`, { method: 'DELETE' }),
  assign: (id: string, employeeId: string) =>
    apiCall(`/assets/${id}/assign`, { method: 'POST', body: JSON.stringify({ employeeId }) }),
  return: (id: string) => apiCall(`/assets/${id}/return`, { method: 'POST' }),
  maintenance: (id: string, reason: string) =>
    apiCall(`/assets/${id}/maintenance`, { method: 'POST', body: JSON.stringify({ reason }) }),
  scanBarcode: (barcode: string) => apiCall(`/assets/scan/${barcode}`),
};

// Employee API
export const employeeAPI = {
  getAll: () => apiCall('/employees'),
  getById: (id: string) => apiCall(`/employees/${id}`),
  create: (data: any) => apiCall('/employees', { method: 'POST', body: JSON.stringify(data) }),
  update: (id: string, data: any) => apiCall(`/employees/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  delete: (id: string) => apiCall(`/employees/${id}`, { method: 'DELETE' }),
};

// Vendor API
export const vendorAPI = {
  getAll: () => apiCall('/vendors'),
  getById: (id: string) => apiCall(`/vendors/${id}`),
  create: (data: any) => apiCall('/vendors', { method: 'POST', body: JSON.stringify(data) }),
  update: (id: string, data: any) => apiCall(`/vendors/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  delete: (id: string) => apiCall(`/vendors/${id}`, { method: 'DELETE' }),
};

// Category API
export const categoryAPI = {
  getAll: () => apiCall('/categories'),
  getById: (id: string) => apiCall(`/categories/${id}`),
  create: (data: any) => apiCall('/categories', { method: 'POST', body: JSON.stringify(data) }),
  update: (id: string, data: any) => apiCall(`/categories/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  delete: (id: string) => apiCall(`/categories/${id}`, { method: 'DELETE' }),
};

// Activity API
export const activityAPI = {
  getAll: () => apiCall('/activities'),
  getByAsset: (assetId: string) => apiCall(`/activities/asset/${assetId}`),
  getByEmployee: (employeeId: string) => apiCall(`/activities/employee/${employeeId}`),
};

// Report API
export const reportAPI = {
  getAll: () => apiCall('/reports'),
  generateAssets: (filters?: any) =>
    apiCall('/reports/generate/assets', { method: 'POST', body: JSON.stringify({ filters }) }),
  generateAssignments: (filters?: any) =>
    apiCall('/reports/generate/assignments', { method: 'POST', body: JSON.stringify({ filters }) }),
  generateMaintenance: () => apiCall('/reports/generate/maintenance', { method: 'POST' }),
};

// Auth API
export const authAPI = {
  googleAuth: (googleId: string, email: string, name: string, profileImage?: string) =>
    apiCall('/auth/google', {
      method: 'POST',
      body: JSON.stringify({ googleId, email, name, profileImage }),
    }),
};
