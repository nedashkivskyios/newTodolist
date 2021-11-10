import {v1} from "uuid";
import {addTodolistAC, removeTodolistAC, todolistId1, todolistId2} from "../todolistReducer/todolistReducer";


const initialValue: TasksType = {
  [todolistId1]: [
    {id: v1(), title: "CSS", isDone: true},
    {id: v1(), title: "JS", isDone: true},
    {id: v1(), title: "React", isDone: false},
    {id: v1(), title: "Redux", isDone: false},
  ],
  [todolistId2]: [
    {id: v1(), title: "book", isDone: true},
    {id: v1(), title: "milk", isDone: true},
  ],
}
export const tasksReducer = (state = initialValue, action: TasksReducerACTypes): TasksType => {
  switch (action.type) {
    case "ADD-TODOLIST": {
      return {
        ...state,
        [action.todolistId]: [],
      }
    }
    case "REMOVE-TODOLIST": {
      const copyState = {...state}
      delete copyState[action.todolistId]
      return copyState
    }
    case "REMOVE-TASK": {
      return {
        ...state,
        [action.todolistId]: state[action.todolistId].filter(t => t.id !== action.taskId),
      }
    }
    case "ADD-TASK": {
      let newTask = {id: v1(), title: action.title, isDone: false}
      return {
        ...state,
        [action.todolistId]: [newTask, ...state[action.todolistId]],
      }
    }
    case "CHANGE-TASK-STATUS": {
      return {
        ...state,
        [action.todolistId]: state[action.todolistId].map(el => el.id === action.taskId ? {
          ...el,
          isDone: action.checked,
        } : el),
      }
    }
    case "CHANGE-TASK-TITLE": {
      return {
        ...state,
        [action.todolistId]: state[action.todolistId].map(el => el.id === action.taskId ? {
          ...el,
          title: action.title,
        } : el),
      }
    }
    default: {
      return state
    }
  }
}

export const removeTaskAC = (params: { todolistId: string, taskId: string }) => {
  return {
    type: 'REMOVE-TASK',
    todolistId: params.todolistId,
    taskId: params.taskId,
  } as const
}
export const addTaskAC = (params: { todolistId: string, title: string }) => {
  return {
    type: 'ADD-TASK',
    todolistId: params.todolistId,
    title: params.title,
  } as const
}
export const changeTaskStatusAC = (params: { checked: boolean, taskId: string, todolistId: string }) => {
  return {
    type: 'CHANGE-TASK-STATUS',
    checked: params.checked,
    taskId: params.taskId,
    todolistId: params.todolistId,
  } as const
}
export const changeTaskTitleAC = (params: { title: string, taskId: string, todolistId: string }) => {
  return {
    type: 'CHANGE-TASK-TITLE',
    title: params.title,
    taskId: params.taskId,
    todolistId: params.todolistId,
  } as const
}


type TasksReducerACTypes =
  ReturnType<typeof addTodolistAC>
  | ReturnType<typeof removeTodolistAC>
  | ReturnType<typeof removeTaskAC>
  | ReturnType<typeof addTaskAC>
  | ReturnType<typeof changeTaskStatusAC>
  | ReturnType<typeof changeTaskTitleAC>

export type TaskType = {
  id: string
  title: string
  isDone: boolean
}
export type TasksType = {
  [key: string]: Array<TaskType>
}