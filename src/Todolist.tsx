import React, {ChangeEvent, FC, KeyboardEvent, useState} from "react";
import {FilterValuesType} from "./App";

export type TaskType = {
  id: string
  title: string
  isDone: boolean
}

type PropsType = {
  title: string
  tasks: TaskType[]
  removeTask: (id: string) => void
  changeFilter: (filter: FilterValuesType) => void
  addTask: (newTaskTitle: string) => void
}

export const Todolist: FC<PropsType> = (props) => {
  const {
    title,
    removeTask,
    changeFilter,
    addTask,
  } = props

  const [newTaskTitle, setNewTaskTitle] = useState('')


  const onAllButtonClick = () => {
    changeFilter('all')
  }
  const onActiveButtonClick = () => {
    changeFilter('active')
  }
  const onCompletedButtonClick = () => {
    changeFilter('completed')
  }
  const onAddTaskButtonClickHandler = () => {
    addTask(newTaskTitle)
    setNewTaskTitle('')
  }
  const onNewTaskTitleInputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTaskTitle(e.currentTarget.value)
  }
  const onRemoveButtonClickHandler = (id: string) => {
    removeTask(id)
  }
  const onEnterKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.ctrlKey) {
      if (e.charCode === 13) {
        if (newTaskTitle.trim().length > 0) {
          addTask(newTaskTitle)
          setNewTaskTitle('')
        } else {
          alert('NEW ERROR --> INPUT EMPTY')
        }
      }
    }
  }


  return (
    <div>
      <h3>{title}</h3>
      <div>
        <input onKeyPress={onEnterKeyPressHandler} value={newTaskTitle} onChange={onNewTaskTitleInputChangeHandler}
               type="text"/>
        <button onClick={onAddTaskButtonClickHandler}>+</button>
      </div>
      <ul>
        {props.tasks.map(t => {
          return (
            <li key={`${t.id}-${t.title}`}>
              <input type="checkbox" checked={t.isDone}/>
              <span>{t.title}</span>
              <button onClick={() => onRemoveButtonClickHandler(t.id)}>x</button>
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