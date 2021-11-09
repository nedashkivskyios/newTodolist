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
  removeTask: (id: string, todolistId: string) => void
  changeFilter: (todolistId: string, filter: FilterValuesType) => void
  addTask: (newTaskTitle: string, todolistId: string) => void
  onChangeTaskStatus: (checked: boolean, taskId: string, todolistId: string) => void
  filter: FilterValuesType
  todolistId: string
  removeTodolist: (todolistId: string) => void
}

export const Todolist: FC<PropsType> = (props) => {
  const {
    title,
    removeTask,
    changeFilter,
    addTask,
    onChangeTaskStatus,
    filter,
    todolistId,
    removeTodolist,
  } = props

  const [newTaskTitle, setNewTaskTitle] = useState('')
  const [error, setError] = useState(false)


  const onAllButtonClick = () => {
    changeFilter(todolistId, 'all')
  }
  const onActiveButtonClick = () => {
    changeFilter(todolistId, 'active')
  }
  const onCompletedButtonClick = () => {
    changeFilter(todolistId, 'completed')
  }
  const onAddTaskButtonClickHandler = () => {
    if (newTaskTitle.trim().length > 0) {
      addTask(newTaskTitle.trim(), todolistId)
      setNewTaskTitle('')
      setError(false)
    } else {
      setNewTaskTitle('')
      setError(true)
    }
  }
  const onNewTaskTitleInputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (error) {
      setNewTaskTitle(e.currentTarget.value)
      setError(false)
    }
    setNewTaskTitle(e.currentTarget.value)
  }

  const onEnterKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.ctrlKey && e.charCode === 13) {
      if (newTaskTitle.trim().length > 0) {
        addTask(newTaskTitle.trim(), todolistId)
        setNewTaskTitle('')
        setError(false)
      } else {
        setNewTaskTitle('')
        setError(true)
      }
    }
  }

  const onRemoveTodolistHandler = () => {
    removeTodolist(todolistId)
  }


  return (
    <div>
      <h3>{title}
        <button onClick={onRemoveTodolistHandler}>x</button>
      </h3>
      <div>
        <input className={error ? 'error' : ''}
               onKeyPress={onEnterKeyPressHandler}
               value={newTaskTitle}
               onChange={onNewTaskTitleInputChangeHandler}
               type="text"/>
        <button onClick={onAddTaskButtonClickHandler}>+</button>
        {error && <div className={'error-message'}>Title is required</div>}
      </div>
      <ul>
        {props.tasks.map(t => {
          const onChangeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
            onChangeTaskStatus(e.currentTarget.checked, t.id, todolistId)
          }
          const onRemoveButtonClickHandler = () => {
            removeTask(t.id, todolistId)
          }
          return (
            <li key={`${t.id}-${t.title}`} className={t.isDone ? "is-done" : ""}>
              <input onChange={onChangeTaskStatusHandler} type="checkbox" checked={t.isDone}/>
              <span>{t.title}</span>
              <button onClick={onRemoveButtonClickHandler}>x</button>
            </li>)
        })}
      </ul>
      <div>
        <button className={filter === 'all' ? 'active-filter' : ""}
                onClick={onAllButtonClick}>All
        </button>
        <button className={filter === 'active' ? 'active-filter' : ""}
                onClick={onActiveButtonClick}>Active
        </button>
        <button className={filter === 'completed' ? 'active-filter' : ""}
                onClick={onCompletedButtonClick}>Complete
        </button>
      </div>
    </div>
  )
}