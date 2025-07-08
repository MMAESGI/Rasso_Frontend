import axios from 'axios'
import type { UserResponse } from '@/models/User'

/**
 * Fetches the current user's profile
 * @returns Promise with user profile data
 */
export async function getUserByEmail(): Promise<UserResponse> {
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/users/email/${localStorage.getItem('user_email')}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
      },
    })

    return response.data
  } catch (error) {
    console.error('Error fetching user profile:', error)
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || 'Failed to fetch user profile')
    }
    throw error
  }
}

/**
 * Updates the current user's profile
 * @param updatedData Partial user data to update
 * @returns Promise with updated user profile data
 */
export async function updateUser(user_id: string, updatedData: Partial<UserResponse>): Promise<UserResponse> {
  try {
    console.log(user_id, updatedData)
    const response = await axios.put(
      `${import.meta.env.VITE_API_URL}/users/${user_id}`,
      updatedData,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
        },
      }
    )
    return response.data
  } catch (error) {
    console.error('Error updating user profile:', error)
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || 'Failed to update user profile')
    }
    throw error
  }
}