import React, {ChangeEvent, FC, useCallback} from "react";
import {useDispatch} from "react-redux";
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, TaskType} from "../../store/tasksReducer/tasksReducer";
import {Box, Checkbox, IconButton} from "@mui/material";
import {EditableSpan} from "../EditableSpan/EditableSpan";
import DeleteIcon from "@mui/icons-material/Delete";

type TaskPropsType = {
  todolistId: string
  task: TaskType
}
export const Task: FC<TaskPropsType> = (props) => {

  const {
    todolistId,
    task,
  } = props
  const dispatch = useDispatch()

  const onChangeTaskStatusHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    dispatch(changeTaskStatusAC({checked: e.currentTarget.checked, taskId: task.id, todolistId}))
  }, [dispatch, todolistId, task.id])
  const onChangeTaskTitleHandler = useCallback((title: string) => {
    dispatch(changeTaskTitleAC({title, taskId: task.id, todolistId}))
  }, [dispatch, todolistId, task.id])
  const onRemoveButtonClickHandler = useCallback(() => {
    dispatch(removeTaskAC({taskId: task.id, todolistId}))
  }, [dispatch, todolistId, task.id])

  return (
    <Box className={task.isDone ? "is-done" : ""}>
      <Checkbox checked={task.isDone} onChange={onChangeTaskStatusHandler}/>
      <EditableSpan callback={onChangeTaskTitleHandler} title={task.title}/>
      <IconButton aria-label={'delete-task'} onClick={onRemoveButtonClickHandler}>
        <DeleteIcon/>
      </IconButton>
    </Box>)
}