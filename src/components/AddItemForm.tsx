import React, {ChangeEvent, FC, KeyboardEvent, useState} from "react";

type AddItemFormPropsType = {
  callback: (title: string) => void
}

export const AddItemForm: FC<AddItemFormPropsType> = (props) => {
  const [newTaskTitle, setNewTaskTitle] = useState('')
  const [error, setError] = useState(false)

  const onAddTaskButtonClickHandler = () => {
    if (newTaskTitle.trim().length > 0) {
      props.callback(newTaskTitle.trim())
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
        props.callback(newTaskTitle.trim())
        setNewTaskTitle('')
        setError(false)
      } else {
        setNewTaskTitle('')
        setError(true)
      }
    }
  }
  return (
    <div>
      <input className={error ? 'error' : ''}
             onKeyPress={onEnterKeyPressHandler}
             value={newTaskTitle}
             onChange={onNewTaskTitleInputChangeHandler}
             type="text"/>
      <button onClick={onAddTaskButtonClickHandler}>+</button>
      {error && <div className={'error-message'}>Title is required</div>}
    </div>
  )
}