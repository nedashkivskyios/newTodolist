import React, {ChangeEvent, FC} from "react";
import {FilterValuesType, TaskType} from "./App";
import {AddItemForm} from "./components/AddItemForm";
import {EditableSpan} from "./components/EditableSpan";


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
  changeTaskTitle: (params: { todolistId: string, taskId: string, title: string }) => void
  changeTodolistTitle: (params: { todolistId: string, title: string }) => void
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
    changeTaskTitle,
    changeTodolistTitle,
  } = props


  const onAllButtonClick = () => {
    changeFilter(todolistId, 'all')
  }
  const onActiveButtonClick = () => {
    changeFilter(todolistId, 'active')
  }
  const onCompletedButtonClick = () => {
    changeFilter(todolistId, 'completed')
  }
  const onRemoveTodolistHandler = () => {
    removeTodolist(todolistId)
  }
  const addTaskWrapper = (title: string) => {
    addTask(todolistId, title)
  }
  const onChangeTodolistTitle = (title: string) => {
    changeTodolistTitle({todolistId, title})
  }

  return (
    <div>
      <h3>
        <EditableSpan title={title} callback={onChangeTodolistTitle}/>
        <button onClick={onRemoveTodolistHandler}>x</button>
      </h3>
      <AddItemForm callback={addTaskWrapper}/>
      <ul>
        {props.tasks.map(t => {
          const onChangeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
            onChangeTaskStatus(e.currentTarget.checked, t.id, todolistId)
          }
          const onChangeTaskTitleHandler = (title: string) => {
            changeTaskTitle({todolistId, taskId: t.id, title})
          }
          const onRemoveButtonClickHandler = () => {
            removeTask(t.id, todolistId)
          }
          return (
            <li key={`${t.id}-${t.title}`} className={t.isDone ? "is-done" : ""}>
              <input onChange={onChangeTaskStatusHandler} type="checkbox" checked={t.isDone}/>
              <EditableSpan callback={onChangeTaskTitleHandler} title={t.title}/>
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

