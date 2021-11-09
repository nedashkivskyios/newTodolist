import {v1} from "uuid";
import {todolistId1, todolistId2} from "../todolistReducer/todolistReducer";


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
export const tasksReducer = (state = initialValue): TasksType => {
  return state
}

export type TaskType = {
  id: string
  title: string
  isDone: boolean
}
export type TasksType = {
  [key: string]: Array<TaskType>
}