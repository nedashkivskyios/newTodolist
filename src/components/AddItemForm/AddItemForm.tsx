import React, {ChangeEvent, FC, KeyboardEvent, memo, useState} from "react";
import {Box, IconButton, TextField} from "@mui/material";
import {AddBox} from "@mui/icons-material";

type AddItemFormPropsType = {
  callback: (title: string) => void
}

export const AddItemForm: FC<AddItemFormPropsType> = memo((props) => {

  // DATA
  const [newTaskTitle, setNewTaskTitle] = useState('')
  const [error, setError] = useState(false)

  // ACTIONS
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
    <Box>
      <TextField error={error ? !!('error') : !!('')}
                 variant={'outlined'}
                 label={'Enter text'}
                 helperText={error ? "Title is required" : ''}
                 onKeyPress={onEnterKeyPressHandler}
                 value={newTaskTitle}
                 onChange={onNewTaskTitleInputChangeHandler}
                 type="text"/>
      <IconButton onClick={onAddTaskButtonClickHandler} color={'primary'}>
        <AddBox/>
      </IconButton>
    </Box>
  )
})