import React from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";

const App = () => {

  let tasks1: Array<TaskType> = [
    {id: 1, title: "CSS", isDone: true},
    {id: 1, title: "JS", isDone: true},
    {id: 1, title: "React", isDone: false},
  ]

  let tasks2: Array<TaskType> = [
    {id: 1, title: "book", isDone: true},
    {id: 1, title: "bread", isDone: false},
    {id: 1, title: "milk", isDone: false},
  ]

  return (
    <div className="App">
      <Todolist title={"What to learn"} tasks={tasks1}/>
      <Todolist title={"What to bye"} tasks={tasks2}/>
    </div>
  );
}


export default App;
