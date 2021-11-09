import {v1} from "uuid";
import {addTodolistAC, removeTodolistAC, todolistReducer, TodolistsType} from "./todolistReducer";

let todolistId1: string
let todolistId2: string
let initialState: TodolistsType

beforeEach(() => {
  todolistId1 = v1()
  todolistId2 = v1()
  initialState = [
    {id: todolistId1, title: "What to learn", filter: "all"},
    {id: todolistId2, title: "What to bye", filter: "all"},
  ]
})

test('new todolist should be correctly created', () => {
  const newTLTitle = 'new tl title'
  const newState = todolistReducer(initialState, addTodolistAC(newTLTitle))

  expect(newState.length).toBe(3)
  expect(newState[0].title).toBe(newTLTitle)
  expect(newState[0].filter).toBe('all')
})

test('todolist should be correctly deleted', () => {
  const newState = todolistReducer(initialState, removeTodolistAC(todolistId1))

  expect(newState.length).toBe(1)
  expect(newState[0].id).toBe(todolistId2)
  expect(newState[0].title).toBe("What to bye")
})