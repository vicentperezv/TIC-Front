import { LoginCredentials, RegisterData, AuthResponse } from '../types/auth';
import { SensorData } from '../types/sensordata';

const API_URL = 'http://127.0.0.1:8000'; 

export const login = async (credentials: LoginCredentials): Promise<AuthResponse> => {
  const response = await fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    throw new Error('Login failed');
  }
  return response.json();
};

export const register = async (data: RegisterData): Promise<AuthResponse> => {
  const response = await fetch(`${API_URL}/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('Registration failed');
  }

  return response.json();
};

export const sensorData = async ():Promise<SensorData[]> =>{
  const response = await fetch(`${API_URL}/sensor-data/recent`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    
  });

  if (!response.ok) {
    throw new Error('Get data failed');
  }

  return response.json();
};

export const changePassword = async (token: string, oldPassword: string, newPassword: string): Promise<void> => {
  const response = await fetch(`${API_URL}/auth/change-password`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ oldPassword, newPassword }),
  });

  if (!response.ok) {
    throw new Error('Failed to change password');
  }
};