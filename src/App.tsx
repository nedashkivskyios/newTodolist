import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from "uuid";

export type FilterValuesType = "all" | "active" | "completed"

const App = () => {

  const todolistId1 = v1()
  const todolistId2 = v1()
  const [todolists, setTodolists] = useState([
    {id: todolistId1, title: "What to learn", filter: "active"},
    {id: todolistId2, title: "What to bye", filter: "all"},
  ])
  const [tasks, setTasks] = useState({
    [todolistId1]: [
      {id: v1(), title: "CSS", isDone: true},
      {id: v1(), title: "JS", isDone: true},
      {id: v1(), title: "React", isDone: false},
      {id: v1(), title: "Redux", isDone: false},
    ],
    [todolistId2]: [{id: v1(), title: "book", isDone: true},
      {id: v1(), title: "milk", isDone: true},
    ],
  })

  const removeTask = (id: string, todolistId: string) => {
    let ourTasks = tasks[todolistId]
    let filteredTasks = ourTasks.filter(t => t.id !== id)
    tasks[todolistId] = filteredTasks
    setTasks({...tasks})
  }
  const addTask = (newTitle: string, todolistId: string) => {
    let ourTasks = tasks[todolistId]
    let newTask = {id: v1(), title: newTitle, isDone: false}
    tasks[todolistId] = [...ourTasks, newTask]
    setTasks({...tasks})
  }
  const changeFilter = (todolistId: string, filter: FilterValuesType) => {
    const newTodolists = todolists.map(el => el.id === todolistId ? {...el, filter} : el)
    setTodolists(newTodolists)
  }
  const onChangeTaskStatus = (checked: boolean, taskId: string, todolistId: string) => {
    let ourTasks = tasks[todolistId]
    tasks[todolistId] = ourTasks.map(el => el.id === taskId ? {...el, isDone: checked} : el)
    setTasks({...tasks})
  }
  const removeTodolist = (todolistId: string) => {
    setTodolists(todolists.filter(tl => tl.id !== todolistId))
    delete tasks[todolistId]
    setTasks(tasks)
  }

  return (
    <div className="App">
      {
        todolists.map((tl) => {
          let tasksForTodolist = tasks[tl.id]
          if (tl.filter === "completed") {
            tasksForTodolist = tasks[tl.id].filter(t => t.isDone)
          }
          if (tl.filter === "active") {
            tasksForTodolist = tasks[tl.id].filter(t => !t.isDone)
          }
          return <Todolist key={tl.id}
                           todolistId={tl.id}
                           title={tl.title}
                           filter={tl.filter as FilterValuesType}
                           tasks={tasksForTodolist}
                           addTask={addTask}
                           removeTask={removeTask}
                           changeFilter={changeFilter}
                           removeTodolist={removeTodolist}
                           onChangeTaskStatus={onChangeTaskStatus}
          />
        })
      }
    </div>
  );
}


export default App;
