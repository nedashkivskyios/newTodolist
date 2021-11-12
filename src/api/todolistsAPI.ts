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
    return instance.post<any, AxiosResponse<TodolistResponseType<{ item: TodolistType }>>, { title: string }>('/todo-lists', {title})
  },
  deleteTodolist(todolistId: string) {
    return instance.delete<TodolistResponseType>(`/todo-lists/${todolistId}`)
  },
  updateTodolist(params: { todolistId: string, title: string }) {
    return instance.put<any, AxiosResponse<TodolistResponseType>, { title: string }>(`/todo-lists/${params.todolistId}`, {title: params.title})
  },
  getTasks(todolistId: string) {
    return instance.get<GetTasksResponseType>(`/todo-lists/${todolistId}/tasks`)
  },
  createTask(params: { todolistId: string, title: string }) {
    return instance.post<any, AxiosResponse<TaskResponseType<{ item: TaskType }>>, { title: string }>(`/todo-lists/${params.todolistId}/tasks`, {title: params.title})
  },
  deleteTask(params: { todolistId: string, taskId: string }) {
    return instance.delete<TaskResponseType>(`/todo-lists/${params.todolistId}/tasks/${params.taskId}`)
  },
  updateTask(params: { todolistId: string, taskId: string, model: UpdateTaskModelType }) {
    return instance.put<any, AxiosResponse<TaskResponseType<{ item: TaskType }>>, UpdateTaskModelType>(`/todo-lists/${params.todolistId}/tasks/${params.taskId}`, params.model)
  },
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

type TaskType = {
  description: string | null
  title: string
  completed: boolean
  status: number
  priority: number
  startDate: string | null
  deadline: string | null
  id: string
  todoListId: string
  order: number
  addedDate: string
}
type GetTasksResponseType = {
  items: TaskType[]
  totalCount: number
  error: null | string
}
type TaskResponseType<T = {}> = {
  resultCode: number
  messages: string[]
  "fieldsErrors": []
  data: T
}
export type UpdateTaskModelType = {
  title: string
  description: string | null
  completed: boolean
  status: number
  priority: number
  startDate: string | null
  deadline: string | null
}