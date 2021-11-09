import {v1} from "uuid";


export const todolistId1 = v1()
export const todolistId2 = v1()
const initialValue: TodolistsType = [
  {id: todolistId1, title: "What to learn", filter: "all"},
  {id: todolistId2, title: "What to bye", filter: "all"},
]

export const todolistReducer = (state = initialValue, action: TodolistReducersActionType): TodolistsType => {
  switch (action.type) {
    case "ADD-TODOLIST": {
      const newTodolistId = v1()
      return ([{id: newTodolistId, title: action.title, filter: "all"}, ...state])
    }
    case "REMOVE-TODOLIST": {
      return state.filter(tl => tl.id !== action.todolistId)
    }
    default: {
      return state
    }

  }
}

export type TodolistReducersActionType =
  ReturnType<typeof addTodolistAC>
  | ReturnType<typeof removeTodolistAC>

export const addTodolistAC = (title: string) => {
  return {
    type: 'ADD-TODOLIST',
    title: title,
  } as const
}

export const removeTodolistAC = (todolistId: string) => {
  return {
    type: 'REMOVE-TODOLIST',
    todolistId,
  } as const
}

export type FilterValuesType = "all" | "active" | "completed"
export type TodolistType = {
  id: string
  title: string
  filter: FilterValuesType
}
export type TodolistsType = Array<TodolistType>