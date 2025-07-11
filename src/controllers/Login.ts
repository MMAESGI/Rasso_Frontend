import axios from 'axios'
import type { LoginRequest, LoginResponse, RegisterRequest, RegisterResponse } from '@/models/Login'

/**
 * Authenticates a user with email and password
 * @param credentials Login credentials
 * @returns Promise with authentication token and user data
 */
export async function login(credentials: LoginRequest): Promise<LoginResponse> {
  try {
    const response = await axios.post(`${import.meta.env.VITE_IDENTITY_URL}/auth/connexion`, credentials, {
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
    const response = await axios.post(`${import.meta.env.VITE_IDENTITY_URL}/auth/inscription`, userData, {
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
  localStorage.removeItem('user_email')
}

/**
 * Decodes a JWT token and returns its payload
 * @param token JWT token
 * @returns decoded payload or null if invalid
 */
function decodeJWT(token: string): { exp?: number } | null {
  try {
    const parts = token.split('.')
    if (parts.length !== 3) return null
    
    const payload = JSON.parse(atob(parts[1]))
    return payload
  } catch (error) {
    console.error('Error decoding JWT:', error)
    return null
  }
}

/**
 * Checks if a token is expired
 * @param token JWT token
 * @returns true if token is expired
 */
function isTokenExpired(token: string): boolean {
  const payload = decodeJWT(token)
  if (!payload?.exp) return true
  
  // exp is in seconds, Date.now() is in milliseconds
  return payload.exp * 1000 < Date.now()
}

/**
 * Checks if a user is currently authenticated and token is valid
 * @returns boolean indicating if user is logged in with valid token
 */
export function isAuthenticated(): boolean {
  const token = localStorage.getItem('auth_token')
  if (!token) return false
  
  if (isTokenExpired(token)) {
    // Token is expired, remove it
    logout()
    return false
  }
  
  return true
}

/**
 * Gets the current authentication token if valid
 * @returns The current auth token or null if not authenticated or expired
 */
export function getToken(): string | null {
  const token = localStorage.getItem('auth_token')
  if (!token) return null
  
  if (isTokenExpired(token)) {
    // Token is expired, remove it
    logout()
    return null
  }
  
  return token
}

/**
 * Checks and cleans expired tokens on app startup
 */
export function checkAndCleanExpiredToken(): void {
  const token = localStorage.getItem('auth_token')
  if (token && isTokenExpired(token)) {
    console.log('Token expired, cleaning up...')
    logout()
  }
}
