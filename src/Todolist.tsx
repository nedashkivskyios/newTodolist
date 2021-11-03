import React, {FC} from "react";
import {FilterValuesType} from "./App";

export type TaskType = {
  id: number
  title: string
  isDone: boolean
}

type PropsType = {
  title: string
  tasks: TaskType[]
  removeTask: (id: number) => void
  changeFilter: (filter: FilterValuesType) => void
}

export const Todolist: FC<PropsType> = (props) => {
  const {
    title,
    removeTask,
    changeFilter,
  } = props

  const onAllButtonClick = () => {
    changeFilter('all')
  }
  const onActiveButtonClick = () => {
    changeFilter('active')
  }
  const onCompletedButtonClick = () => {
    changeFilter('completed')
  }

  return (
    <div>
      <h3>{title}</h3>
      <div>
        <input type="text"/>
        <button>+</button>
      </div>
      <ul>
        {props.tasks.map(t => {
          return (
            <li key={`${t.id}-${t.title}`}>
              <input type="checkbox" checked={t.isDone}/>
              <span>{t.title}</span>
              <button onClick={() => removeTask(t.id)}>x</button>
            </li>)
        })}
      </ul>
      <div>
        <button onClick={onAllButtonClick}>All</button>
        <button onClick={onActiveButtonClick}>Active</button>
        <button onClick={onCompletedButtonClick}>Complete</button>
      </div>
    </div>
  )
}