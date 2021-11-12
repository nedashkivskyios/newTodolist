import axios, {AxiosResponse} from "axios";

const instance = axios.create({
  baseURL: 'https://social-network.samuraijs.com/api/1.1',
  withCredentials: true,
  headers: {
    'API-KEY': 'cb296593-09e8-482c-8587-896f9cf54a71',
  },
})


export const todolistsAPI = {
  getTodolists() {
    return instance.get<TodolistType[]>('/todo-lists')
  },
  createTodolist(title: string) {
    return instance.post<any, AxiosResponse<TodolistResponseType<{item: TodolistType }>>, { title: string }>('/todo-lists', {title})
  },
  deleteTodolist(todolistId: string) {
    return instance.delete<TodolistResponseType>(`/todo-lists/${todolistId}`)
  },
  updateTodolist(params: {todolistId: string, title: string}) {
    return instance.put<any, AxiosResponse<TodolistResponseType>, { title: string }>(`/todo-lists/${params.todolistId}`, {title: params.title})
  }
}


type TodolistType = {
  id: string
  title: string
  addedDate: string
  order: number
}

type TodolistResponseType<T = {}> = {
  messages: string[]
  fieldsErrors: string[]
  resultCode: number
  data: T
}