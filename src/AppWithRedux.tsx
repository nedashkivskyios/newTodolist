import React from 'react';
import {Todolist} from "./Todolist";
import {AddItemForm} from "./components/AddItemForm";
import {AppBar, Box, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import {
  addTodolistAC,
  changeTodolistFilterAC,
  changeTodolistTitleAC,
  FilterValuesType,
  removeTodolistAC,
  TodolistsType,
} from "./store/todolistReducer/todolistReducer";
import {
  addTaskAC,
  changeTaskStatusAC,
  changeTaskTitleAC,
  removeTaskAC,
  TasksType,
} from "./store/tasksReducer/tasksReducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./store/store";

const App = () => {

  const dispatch = useDispatch()
  const todolists = useSelector<AppRootStateType, TodolistsType>(state => state.todolists)
  const tasks = useSelector<AppRootStateType, TasksType>(state => state.tasks)

  // ACTIONS FOR TODOLIST
  const addTodolist = (title: string) => {
    dispatch(addTodolistAC(title))
  }
  const removeTodolist = (todolistId: string) => {
    dispatch(removeTodolistAC(todolistId))
  }
  const changeTodolistTitle = (todolistId: string, title: string) => {
    dispatch(changeTodolistTitleAC({todolistId, title}))
  }
  const changeTodolistFilter = (todolistId: string, filter: FilterValuesType) => {
    dispatch(changeTodolistFilterAC({todolistId, filter}))
  }

  // ACTIONS FOR TASKS
  const removeTask = (taskId: string, todolistId: string) => {
    dispatch(removeTaskAC({taskId, todolistId}))
  }
  const addTask = (todolistId: string, newTitle: string) => {
    dispatch(addTaskAC({todolistId, title: newTitle}))
  }
  const onChangeTaskStatus = (checked: boolean, taskId: string, todolistId: string) => {
    dispatch(changeTaskStatusAC({checked, taskId, todolistId}))
  }
  const changeTaskTitle = (todolistId: string, taskId: string, title: string) => {
    dispatch(changeTaskTitleAC({title, taskId, todolistId}))
  }

  return (
    <Box className="App">
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{mr: 2}}
          >
            <MenuIcon/>
          </IconButton>
          <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
            News
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
      <Container fixed>

        <Grid style={{padding: "10px"}} container>
          <AddItemForm callback={addTodolist}/>
        </Grid>

        <Grid container spacing={3}>
          {
            todolists.map((tl) => {
              let tasksForTodolist = tasks[tl.todolistId]
              if (tl.filter === "completed") {
                tasksForTodolist = tasks[tl.todolistId].filter(t => t.isDone)
              }
              if (tl.filter === "active") {
                tasksForTodolist = tasks[tl.todolistId].filter(t => !t.isDone)
              }
              return <Grid key={tl.todolistId} item>
                <Paper style={{padding: "10px"}}>
                  <Todolist
                    todolistId={tl.todolistId}
                    title={tl.title}
                    filter={tl.filter as FilterValuesType}
                    tasks={tasksForTodolist}
                    addTask={addTask}
                    removeTask={removeTask}
                    changeFilter={changeTodolistFilter}
                    removeTodolist={removeTodolist}
                    changeTaskTitle={changeTaskTitle}
                    changeTodolistTitle={changeTodolistTitle}
                    onChangeTaskStatus={onChangeTaskStatus}
                  />
                </Paper>
              </Grid>
            })
          }
        </Grid>
      </Container>
    </Box>
  );
};

export default App;
