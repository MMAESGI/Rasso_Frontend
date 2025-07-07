export type RegisterRequest = {
  email: string
  password: string
  confirmPassword: string
  firstName: string
  lastName: string
  username: string
}

export type RegisterResponse = {
  email: string
  firstName: string
  lastName: string
  username: string
  isActive: boolean
  roles: string[]
}

export type LoginRequest = {
  email: string
  password: string
}

export type LoginResponse = {
  token: string
  user: {
    email: string
    firstName: string
    lastName: string
    username: string
    isActive: boolean
    roles: string[]
  }
}
