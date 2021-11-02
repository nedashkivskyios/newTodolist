import React, {FC} from "react";

export type TaskType = {
  id: number
  title: string
  isDone: boolean
}

type PropsType = {
  title: string
  tasks: TaskType[]
}

export const Todolist: FC<PropsType> = (props) => {
  const {
    title
  } = props

  return (
    <div>
      <h3>{title}</h3>
      <div>
        <input type="text"/>
        <button>+</button>
      </div>
      <ul>
        <li><input type="checkbox" checked={props.tasks[0].isDone}/><span>{props.tasks[0].title}</span></li>
        <li><input type="checkbox" checked={props.tasks[1].isDone}/><span>{props.tasks[1].title}</span></li>
        <li><input type="checkbox" checked={props.tasks[2].isDone}/><span>{props.tasks[2].title}</span></li>
      </ul>
      <div>
        <button>All</button>
        <button>Active</button>
        <button>Complete</button></div>
    </div>
  )
}