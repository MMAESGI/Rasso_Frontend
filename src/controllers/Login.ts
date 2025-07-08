import axios from 'axios'
import type { LoginRequest, LoginResponse, RegisterRequest, RegisterResponse } from '@/models/Login'

/**
 * Authenticates a user with email and password
 * @param credentials Login credentials
 * @returns Promise with authentication token and user data
 */
export async function login(credentials: LoginRequest): Promise<LoginResponse> {
  try {
    const response = await axios.post(`${import.meta.env.VITE_IDENTITY_URL}/login`, credentials, {
      headers: {
        'Content-Type': 'application/json',
      },
    })

    localStorage.setItem('auth_token', response.data.token)
    localStorage.setItem('user_email', response.data.user.email)

    return response.data
  } catch (error) {
    console.error('Login error:', error)
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message ?? 'Failed to login')
    }
    throw error
  }
}

/**
 * Registers a new user
 * @param userData User registration data
 * @returns Promise with the registered user data
 */
export async function register(userData: RegisterRequest): Promise<RegisterResponse> {
  try {
    const response = await axios.post(`${import.meta.env.VITE_IDENTITY_URL}/signup`, userData, {
      headers: {
        'Content-Type': 'application/json',
      },
    })

    console.log('Registration successful:', response.data)

    return response.data
  } catch (error) {
    console.error('Registration error:', error)
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || 'Registration failed')
    }
    throw error
  }
}

/**
 * Logs out the current user
 */
export function logout(): void {
  localStorage.removeItem('auth_token')
  // TODO: Redirect to login page
}

/**
 * Checks if a user is currently authenticated
 * @returns boolean indicating if user is logged in
 */
export function isAuthenticated(): boolean {
  return localStorage.getItem('auth_token') !== null
}

/**
 * Gets the current authentication token
 * @returns The current auth token or null if not authenticated
 */
export function getToken(): string | null {
  return localStorage.getItem('auth_token')
}
