import React, {memo, useCallback} from 'react';
import {Todolist} from "./Todolist";
import {AddItemForm} from "./components/AddItemForm/AddItemForm";
import {AppBar, Box, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import {addTodolistAC, FilterValuesType, TodolistsType} from "./store/todolistReducer/todolistReducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./store/store";

const App = memo(() => {

    const dispatch = useDispatch()
    const todolists = useSelector<AppRootStateType, TodolistsType>(state => state.todolists)

    // ACTIONS FOR TODOLIST
    const addTodolist = useCallback((title: string) => {
      dispatch(addTodolistAC(title))
    }, [dispatch])

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
                return <Grid key={tl.todolistId} item>
                  <Paper style={{padding: "10px"}}>
                    <Todolist
                      todolistId={tl.todolistId}
                      title={tl.title}
                      filter={tl.filter as FilterValuesType}
                    />
                  </Paper>
                </Grid>
              })
            }
          </Grid>
        </Container>
      </Box>
    );
  },
)

export default App;
