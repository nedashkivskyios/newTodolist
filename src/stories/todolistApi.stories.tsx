import React, {useEffect, useState} from "react";
import {todolistsAPI, UpdateTaskModelType} from "../api/todolistsAPI";

export default {
  title: 'API',
}

export const GetTodolists = () => {
  const [state, setState] = useState<any>(null)
  useEffect(() => {
    todolistsAPI.getTodolists().then(res => setState(res.data))
  }, [])

  return <div>{JSON.stringify(state)}</div>
}

export const CreateTodolists = () => {
  const [state, setState] = useState<any>(null)

  useEffect(() => {
    todolistsAPI.createTodolist('444').then(res => setState(res.data))
  }, [])

  return <div>{JSON.stringify(state)}</div>
}

export const DeleteTodolists = () => {
  const [state, setState] = useState<any>(null)
  const todolistId = 'this place for TODOLIST ID'
  useEffect(() => {
    todolistsAPI.deleteTodolist(todolistId).then(res => setState(res.data))
  }, [])

  return <div>{JSON.stringify(state)}</div>
}

export const UpdateTodolists = () => {
  const [state, setState] = useState<any>(null)
  const todolistId = 'c645cc43-a282-4466-8623-78e1cfd99bce'
  const newTitle = 'IF YOU WANNA DO'
  useEffect(() => {
    todolistsAPI.updateTodolist({todolistId, title: newTitle}).then(res => setState(res.data))
  }, [])

  return <div>{JSON.stringify(state)}</div>
}

export const GetTasks = () => {
  const [state, setState] = useState<any>(null)
  const todolistId = '66c66702-6afa-47a2-aef4-40e989218114'
  useEffect(() => {
    todolistsAPI.getTasks(todolistId)
      .then(res => setState(res.data.items))
  }, [])

  return <div>{JSON.stringify(state)}</div>
}

export const CreateTask = () => {
  const [state, setState] = useState<any>(null)
  const todolistId = '66c66702-6afa-47a2-aef4-40e989218114'
  const title = 'Three'

  useEffect(() => {
    todolistsAPI.createTask({todolistId, title})
      .then(res => setState(res.data))
  }, [])

  return <div>{JSON.stringify(state)}</div>
}

export const DeleteTask = () => {
  const [state, setState] = useState<any>(null)
  const todolistId = 'b421951a-e197-473b-b74b-1fcc6b29aa13'
  const taskId = 'b7c58b42-e2fc-4722-b258-000dc5892555'

  useEffect(() => {
    todolistsAPI.deleteTask({todolistId, taskId})
      .then(res => setState(res.data))
  }, [])

  return <div>{JSON.stringify(state)}</div>
}

export const UpdateTask = () => {
  const [state, setState] = useState<any>(null)
  const todolistId = 'b421951a-e197-473b-b74b-1fcc6b29aa13'
  const taskId = '428505f0-2862-421a-9db5-1826b0a0dbec'
  const model: UpdateTaskModelType = {
    title: 'FOur',
    description: null,
    completed: false,
    status: 0,
    priority: 1,
    startDate: null,
    deadline: null,
  }

  useEffect(() => {
    todolistsAPI.updateTask({todolistId, taskId, model})
      .then(res => setState(res.data))
  }, [])

  return <div>{JSON.stringify(state)}</div>
}