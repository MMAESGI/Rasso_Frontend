import axios from 'axios';
import type { LoginRequest, LoginResponse, RegisterRequest, RegisterResponse } from '@/models/Login';

/**
 * Authenticates a user with email and password
 * @param credentials Login credentials
 * @returns Promise with authentication token and user data
 */
export async function login(credentials: LoginRequest): Promise<LoginResponse> {
  try {
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/login`, credentials, {
      headers: {
      'Content-Type': 'application/json',
      },
    });
    
    // Store the token in localStorage
    localStorage.setItem('auth_token', response.data.token);
    
    return response.data;
  } catch (error) {
    console.error('Login error:', error);
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || 'Failed to login');
    }
    throw error;
  }
}

/**
 * Registers a new user
 * @param userData User registration data
 * @returns Promise with the registered user data
 */
export async function register(userData: RegisterRequest): Promise<RegisterResponse> {
  try {
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/signup`, userData, {
      headers: {
      'Content-Type': 'application/json',
      },
    });

    console.log('Registration successful:', response.data);
    // Optionally, you can store the token or redirect the user after registration
    // localStorage.setItem('auth_token', response.data.token);
    
    return response.data;
  } catch (error) {
    console.error('Registration error:', error);
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || 'Registration failed');
    }
    throw error;
  }
}

/**
 * Logs out the current user
 */
export function logout(): void {
  // Remove the token from localStorage
  localStorage.removeItem('auth_token');
  // You might also want to redirect to the login page or home page
}

/**
 * Checks if a user is currently authenticated
 * @returns boolean indicating if user is logged in
 */
export function isAuthenticated(): boolean {
  return localStorage.getItem('auth_token') !== null;
}

/**
 * Gets the current authentication token
 * @returns The current auth token or null if not authenticated
 */
export function getToken(): string | null {
  return localStorage.getItem('auth_token');
}