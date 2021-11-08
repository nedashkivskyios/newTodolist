import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";
import {v1} from "uuid";

export type FilterValuesType = "all" | "active" | "completed"

const App = () => {

  let [tasks, setTasks] = useState<Array<TaskType>>([
    {id: v1(), title: "CSS", isDone: true},
    {id: v1(), title: "JS", isDone: true},
    {id: v1(), title: "React", isDone: false},
    {id: v1(), title: "Redux", isDone: false},
  ])
  let [filter, setFilter] = useState<FilterValuesType>("all")

  const removeTask = (id: string) => {
    let filteredTasks = tasks.filter(t => t.id !== id)
    setTasks(filteredTasks)
  }
  const addTask = (newTitle: string) => {
    let newTask = {id: v1(), title: newTitle, isDone: false}
    let newTasks = [...tasks, newTask]
    setTasks(newTasks)
  }
  const changeFilter = (filter: FilterValuesType) => {
    setFilter(filter)
  }
  const onChangeTaskStatus = (checked: boolean, taskId: string) => {
    let newTasks = tasks.map(el => el.id === taskId ? {...el, isDone: checked} : el)
    setTasks(newTasks)
  }


  let tasksForTodolist = tasks
  if (filter === "completed") {
    tasksForTodolist = tasksForTodolist.filter(t => t.isDone)
  }
  if (filter === "active") {
    tasksForTodolist = tasksForTodolist.filter(t => !t.isDone)
  }


  return (
    <div className="App">
      <Todolist title={"What to learn"}
                filter={filter}
                tasks={tasksForTodolist}
                addTask={addTask}
                removeTask={removeTask}
                changeFilter={changeFilter}
                onChangeTaskStatus={onChangeTaskStatus}
      />
    </div>
  );
}


export default App;
