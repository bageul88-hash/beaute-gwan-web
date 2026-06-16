import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Partner } from '../types'
import { MOCK_CREDENTIALS, MOCK_PARTNER, MOCK_TOKEN } from '../constants/mockData'

interface AuthState {
  token: string | null
  partner: Partner | null
  isLoggedIn: boolean
  loginError: string | null
  login: (email: string, password: string) => boolean
  logout: () => void
  clearError: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      partner: null,
      isLoggedIn: false,
      loginError: null,

      login: (email, password) => {
        if (email === MOCK_CREDENTIALS.email && password === MOCK_CREDENTIALS.password) {
          set({ token: MOCK_TOKEN, partner: MOCK_PARTNER, isLoggedIn: true, loginError: null })
          return true
        }
        set({ loginError: '이메일 또는 비밀번호가 올바르지 않습니다.' })
        return false
      },

      logout: () => {
        set({ token: null, partner: null, isLoggedIn: false, loginError: null })
      },

      clearError: () => {
        set({ loginError: null })
      },
    }),
    {
      name: 'beaute-gwan-auth',
      partialize: (state) => ({ token: state.token, partner: state.partner, isLoggedIn: state.isLoggedIn }),
    }
  )
)
