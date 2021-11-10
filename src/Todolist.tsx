import React, {ChangeEvent, FC} from "react";
import {AddItemForm} from "./components/AddItemForm";
import {EditableSpan} from "./components/EditableSpan";
import {Box, Button, Checkbox, IconButton, Typography} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import {TaskType} from "./store/tasksReducer/tasksReducer";
import {FilterValuesType} from "./store/todolistReducer/todolistReducer";


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
  changeTaskTitle: (todolistId: string, taskId: string, title: string) => void
  changeTodolistTitle: (todolistId: string, title: string) => void
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

  // ACTIONS
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
    changeTodolistTitle(title, todolistId)
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
        {props.tasks.map(t => {
          const onChangeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
            onChangeTaskStatus(e.currentTarget.checked, t.id, todolistId)
          }
          const onChangeTaskTitleHandler = (title: string) => {
            changeTaskTitle(todolistId, t.id, title)
          }
          const onRemoveButtonClickHandler = () => {
            removeTask(t.id, todolistId)
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

