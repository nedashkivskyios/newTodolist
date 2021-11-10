export const neem = 'askjdhfklasjdfh'
// import React, {useReducer} from 'react';
// import {Todolist} from "./Todolist";
// import {v1} from "uuid";
// import {AddItemForm} from "./components/AddItemForm";
// import {AppBar, Box, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
// import MenuIcon from '@mui/icons-material/Menu';
// import {
//   addTodolistAC,
//   changeTodolistFilterAC,
//   changeTodolistTitleAC,
//   FilterValuesType,
//   removeTodolistAC,
//   todolistReducer,
// } from "./store/todolistReducer/todolistReducer";
// import {
//   addTaskAC,
//   changeTaskStatusAC,
//   changeTaskTitleAC,
//   removeTaskAC,
//   tasksReducer,
// } from "./store/tasksReducer/tasksReducer";
//
// const App = () => {
//   // DATA
//   const todolistId1 = v1()
//   const todolistId2 = v1()
//   const [todolists, dispatchToTodolistsReducer] = useReducer(todolistReducer, [
//     {todolistId: todolistId1, title: "What to learn", filter: "all"},
//     {todolistId: todolistId2, title: "What to bye", filter: "all"},
//   ])
//   const [tasks, dispatchToTasksReducer] = useReducer(tasksReducer, {
//     [todolistId1]: [
//       {id: v1(), title: "CSS", isDone: true},
//       {id: v1(), title: "JS", isDone: true},
//       {id: v1(), title: "React", isDone: false},
//       {id: v1(), title: "Redux", isDone: false},
//     ],
//     [todolistId2]: [
//       {id: v1(), title: "book", isDone: true},
//       {id: v1(), title: "milk", isDone: true},
//     ],
//   })
//
//   // ACTIONS FOR TODOLIST
//   const addTodolist = (title: string) => {
//     const action = addTodolistAC(title)
//     dispatchToTodolistsReducer(action)
//     dispatchToTasksReducer(action)
//   }
//   const removeTodolist = (todolistId: string) => {
//     dispatchToTodolistsReducer(removeTodolistAC(todolistId))
//     dispatchToTasksReducer(removeTodolistAC(todolistId))
//   }
//   const changeTodolistTitle = (todolistId: string, title: string) => {
//     dispatchToTodolistsReducer(changeTodolistTitleAC({todolistId, title}))
//   }
//   const changeTodolistFilter = (todolistId: string, filter: FilterValuesType) => {
//     dispatchToTodolistsReducer(changeTodolistFilterAC({todolistId, filter}))
//   }
//
//   // ACTIONS FOR TASKS
//   const removeTask = (taskId: string, todolistId: string) => {
//     dispatchToTasksReducer(removeTaskAC({taskId, todolistId}))
//   }
//   const addTask = (todolistId: string, newTitle: string) => {
//     dispatchToTasksReducer(addTaskAC({todolistId, title: newTitle}))
//   }
//   const onChangeTaskStatus = (checked: boolean, taskId: string, todolistId: string) => {
//     dispatchToTasksReducer(changeTaskStatusAC({checked, taskId, todolistId}))
//   }
//   const changeTaskTitle = (todolistId: string, taskId: string, title: string) => {
//     dispatchToTasksReducer(changeTaskTitleAC({title, taskId, todolistId}))
//   }
//
//   return (
//     <Box className="App">
//       <AppBar position="static">
//         <Toolbar>
//           <IconButton
//             size="large"
//             edge="start"
//             color="inherit"
//             aria-label="menu"
//             sx={{mr: 2}}
//           >
//             <MenuIcon/>
//           </IconButton>
//           <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
//             News
//           </Typography>
//           <Button color="inherit">Login</Button>
//         </Toolbar>
//       </AppBar>
//       <Container fixed>
//
//         <Grid style={{padding: "10px"}} container>
//           <AddItemForm callback={addTodolist}/>
//         </Grid>
//
//         <Grid container spacing={3}>
//           {
//             todolists.map((tl) => {
//               let tasksForTodolist = tasks[tl.todolistId]
//               if (tl.filter === "completed") {
//                 tasksForTodolist = tasks[tl.todolistId].filter(t => t.isDone)
//               }
//               if (tl.filter === "active") {
//                 tasksForTodolist = tasks[tl.todolistId].filter(t => !t.isDone)
//               }
//               return <Grid key={tl.todolistId} item spacing={10}>
//                 <Paper style={{padding: "10px"}}>
//                   <Todolist
//                     todolistId={tl.todolistId}
//                     title={tl.title}
//                     filter={tl.filter as FilterValuesType}
//                     tasks={tasksForTodolist}
//                     addTask={addTask}
//                     removeTask={removeTask}
//                     changeFilter={changeTodolistFilter}
//                     removeTodolist={removeTodolist}
//                     changeTaskTitle={changeTaskTitle}
//                     changeTodolistTitle={changeTodolistTitle}
//                     onChangeTaskStatus={onChangeTaskStatus}
//                   />
//                 </Paper>
//               </Grid>
//             })
//           }
//         </Grid>
//       </Container>
//     </Box>
//   );
// };
//
// export default App;
