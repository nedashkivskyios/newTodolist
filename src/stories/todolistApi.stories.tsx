import React, {useEffect, useState} from "react";
import {todolistsAPI} from "../api/todolistsAPI";

export default {
  title: 'API'
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
    todolistsAPI.createTodolist('SOME NEW TITLE').then(res => setState(res.data))
  }, [])

  return <div>{JSON.stringify(state)}</div>
}

export const DeleteTodolists = () => {
  const [state, setState] = useState<any>(null)
  const todolistId = 'c645cc43-a282-4466-8623-78e1cfd99bce'
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
    todolistsAPI.updateTodolist({todolistId, title: newTitle} ).then(res => setState(res.data))
  }, [])

  return <div>{JSON.stringify(state)}</div>
}