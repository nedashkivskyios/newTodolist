import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";

export type FilterValuesType = "all" | "active" | "completed"

const App = () => {

  let [tasks, setTasks] = useState<Array<TaskType>>([
    {id: 1, title: "CSS", isDone: true},
    {id: 2, title: "JS", isDone: true},
    {id: 3, title: "React", isDone: false},
    {id: 4, title: "Redux", isDone: false},
  ])
  let [filter, setFilter] = useState<FilterValuesType>("all")

  const removeTask = (id: number) => {
    debugger
    let filteredTasks = tasks.filter(t => t.id !== id)
    setTasks(filteredTasks)
  }
  const changeFilter = (filter: FilterValuesType) => {
    setFilter(filter)
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
                tasks={tasksForTodolist}
                removeTask={removeTask}
                changeFilter={changeFilter}/>
    </div>
  );
}


export default App;
