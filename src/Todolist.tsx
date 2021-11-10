import React, {ChangeEvent, FC} from "react";
import {AddItemForm} from "./components/AddItemForm";
import {EditableSpan} from "./components/EditableSpan";
import {Box, Button, Checkbox, IconButton, Typography} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import {
  addTaskAC,
  changeTaskStatusAC,
  changeTaskTitleAC,
  removeTaskAC,
  TaskType,
} from "./store/tasksReducer/tasksReducer";
import {
  changeTodolistFilterAC,
  changeTodolistTitleAC,
  FilterValuesType,
  removeTodolistAC,
} from "./store/todolistReducer/todolistReducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./store/store";


type PropsType = {
  title: string
  filter: FilterValuesType
  todolistId: string
}

export const Todolist: FC<PropsType> = (props) => {
  const {
    title,
    filter,
    todolistId,
  } = props

  const tasks = useSelector<AppRootStateType, TaskType[]>(state => state.tasks[todolistId])
  const dispatch = useDispatch()


  // ACTIONS
  const onAllButtonClick = () => {
    dispatch(changeTodolistFilterAC({todolistId, filter: 'all'}))
  }
  const onActiveButtonClick = () => {
    dispatch(changeTodolistFilterAC({todolistId, filter: 'active'}))
  }
  const onCompletedButtonClick = () => {
    dispatch(changeTodolistFilterAC({todolistId, filter: 'completed'}))
  }
  const onRemoveTodolistHandler = () => {
    dispatch(removeTodolistAC(todolistId))
  }
  const addTaskWrapper = (title: string) => {
    dispatch(addTaskAC({todolistId, title}))
  }
  const onChangeTodolistTitle = (title: string) => {
    dispatch(changeTodolistTitleAC({todolistId, title}))
  }

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
        {tasksForTodolist.map(t => {

          const onChangeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
            dispatch(changeTaskStatusAC({checked: e.currentTarget.checked, taskId: t.id, todolistId}))
          }
          const onChangeTaskTitleHandler = (title: string) => {
            dispatch(changeTaskTitleAC({title, taskId: t.id, todolistId}))
          }
          const onRemoveButtonClickHandler = () => {
            dispatch(removeTaskAC({taskId: t.id, todolistId}))
          }
          return (
            <Box key={`${t.id}-${t.title}`} className={t.isDone ? "is-done" : ""}>
              <Checkbox checked={t.isDone} onChange={onChangeTaskStatusHandler}/>
              <EditableSpan callback={onChangeTaskTitleHandler} title={t.title}/>
              <IconButton aria-label={'delete-task'} onClick={onRemoveButtonClickHandler}>
                <DeleteIcon/>
              </IconButton>
            </Box>);
        })}
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
}

