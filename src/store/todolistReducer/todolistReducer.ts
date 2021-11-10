import {v1} from "uuid";


export const todolistId1 = v1()
export const todolistId2 = v1()
const initialValue: TodolistsType = [
  {todolistId: todolistId1, title: "What to learn", filter: "all"},
  {todolistId: todolistId2, title: "What to bye", filter: "all"},
]

export const todolistReducer = (state = initialValue, action: TodolistReducersActionType): TodolistsType => {
  switch (action.type) {
    case "ADD-TODOLIST": {
      return ([{todolistId: action.todolistId, title: action.title, filter: "all"}, ...state])
    }
    case "REMOVE-TODOLIST": {
      return state.filter(tl => tl.todolistId !== action.todolistId)
    }
    case "CHANGE-TODOLIST-TITLE": {
      return state.map(tl => tl.todolistId === action.todolistId ? {...tl, title: action.title} : tl)
    }
    case "CHANGE-TODOLIST-FILTER": {
      return state.map(tl => tl.todolistId === action.todolistId ? {...tl, filter: action.filter} : tl)
    }
    default: {
      return state
    }
  }
}


export const addTodolistAC = (title: string) => {
  return {
    type: 'ADD-TODOLIST',
    title: title,
    todolistId: v1(),
  } as const
}
export const removeTodolistAC = (todolistId: string) => {
  return {
    type: 'REMOVE-TODOLIST',
    todolistId,
  } as const
}
export const changeTodolistTitleAC = (params: { todolistId: string, title: string }) => {
  return {
    type: 'CHANGE-TODOLIST-TITLE',
    todolistId: params.todolistId,
    title: params.title,
  } as const
}
export const changeTodolistFilterAC = (params: { todolistId: string, filter: FilterValuesType }) => {
  return {
    type: 'CHANGE-TODOLIST-FILTER',
    todolistId: params.todolistId,
    filter: params.filter,
  } as const
}

export type TodolistReducersActionType =
  ReturnType<typeof addTodolistAC>
  | ReturnType<typeof removeTodolistAC>
  | ReturnType<typeof changeTodolistTitleAC>
  | ReturnType<typeof changeTodolistFilterAC>

export type FilterValuesType = "all" | "active" | "completed"
export type TodolistType = {
  todolistId: string
  title: string
  filter: FilterValuesType
}
export type TodolistsType = Array<TodolistType>