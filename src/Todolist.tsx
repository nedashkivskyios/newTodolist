import React, {FC, memo, useCallback} from "react";
import {AddItemForm} from "./components/AddItemForm";
import {EditableSpan} from "./components/EditableSpan";
import {Box, Button, IconButton, Typography} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import {addTaskAC, TaskType} from "./store/tasksReducer/tasksReducer";
import {
  changeTodolistFilterAC,
  changeTodolistTitleAC,
  FilterValuesType,
  removeTodolistAC,
} from "./store/todolistReducer/todolistReducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./store/store";
import {Task} from "./components/Task";

type PropsType = {
  title: string
  filter: FilterValuesType
  todolistId: string
}

export const Todolist: FC<PropsType> = memo((props) => {
  const {
    title,
    filter,
    todolistId,
  } = props

  const tasks = useSelector<AppRootStateType, TaskType[]>(state => state.tasks[todolistId])
  const dispatch = useDispatch()

  // ACTIONS
  const onAllButtonClick = useCallback(() => {
    dispatch(changeTodolistFilterAC({todolistId, filter: 'all'}))
  }, [dispatch, todolistId])
  const onActiveButtonClick = useCallback(() => {
    dispatch(changeTodolistFilterAC({todolistId, filter: 'active'}))
  }, [dispatch, todolistId])
  const onCompletedButtonClick = useCallback(() => {
    dispatch(changeTodolistFilterAC({todolistId, filter: 'completed'}))
  }, [dispatch, todolistId])
  const onRemoveTodolistHandler = useCallback(() => {
    dispatch(removeTodolistAC(todolistId))
  }, [dispatch, todolistId])
  const addTaskWrapper = useCallback((title: string) => {
    dispatch(addTaskAC({todolistId, title}))
  }, [dispatch, todolistId])
  const onChangeTodolistTitle = useCallback((title: string) => {
    dispatch(changeTodolistTitleAC({todolistId, title}))
  }, [dispatch, todolistId])

  let tasksForTodolist = tasks
  if (filter === "completed") {
    tasksForTodolist = tasks.filter(t => t.isDone)
  }
  if (filter === "active") {
    tasksForTodolist = tasks.filter(t => !t.isDone)
  }

  return (
    <Box>
      <Typography variant={'h5'}>
        <EditableSpan title={title} callback={onChangeTodolistTitle}/>
        <IconButton aria-label={'delete-todolist'} onClick={onRemoveTodolistHandler}>
          <DeleteIcon/>
        </IconButton>
      </Typography>
      <AddItemForm callback={addTaskWrapper}/>
      <Box>
        {tasksForTodolist.map(t =>
          <Task key={t.id} task={t} todolistId={todolistId}/>,
        )}
      </Box>
      <Box>
        <Button variant={filter === 'all' ? 'contained' : 'text'}
                onClick={onAllButtonClick}>All
        </Button>
        <Button color={'primary'} variant={filter === 'active' ? 'contained' : 'text'}
                onClick={onActiveButtonClick}>Active
        </Button>
        <Button color={'secondary'} variant={filter === 'completed' ? 'contained' : 'text'}
                onClick={onCompletedButtonClick}>Complete
        </Button>
      </Box>
    </Box>
  )
})

