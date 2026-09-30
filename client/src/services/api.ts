import axios, { type AxiosError } from 'axios'
import { toast } from 'sonner'

export const api = axios.create({ baseURL: '/api' })

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError<{ message?: string }>) => {
    const message =
      error.response?.data?.message ?? 'Не удалось выполнить запрос'

    toast.error(message)

    return Promise.reject(new Error(message))
  },
)
