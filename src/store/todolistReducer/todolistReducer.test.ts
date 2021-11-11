import {
  addTodolistAC,
  changeTodolistFilterAC,
  changeTodolistTitleAC,
  FilterValuesType,
  removeTodolistAC,
  todolistReducer,
  TodolistsType,
} from "./todolistReducer";
import {v1} from "uuid";

export let todolistId1 = v1()
export let todolistId2 = v1()
let initialState: TodolistsType

beforeEach(() => {

  initialState = [
    {todolistId: todolistId1, title: "What to learn", filter: "all"},
    {todolistId: todolistId2, title: "What to bye", filter: "all"},
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
  expect(newState[0].todolistId).toBe(todolistId2)
  expect(newState[0].title).toBe("What to bye")
})

test('todolist1 title should be corect changed', () => {
  const newTitle = 'NEW TITLE'
  const newState = todolistReducer(initialState, changeTodolistTitleAC({todolistId: todolistId1, title: newTitle}))

  expect(newState.length).toBe(2)
  expect(newState[0].todolistId).toBe(todolistId1)
  expect(newState[0].filter).toBe("all")
  expect(newState[0].title).toBe(newTitle)
  expect(newState[1].todolistId).toBe(initialState[1].todolistId)
  expect(newState[1].filter).toBe(initialState[1].filter)
  expect(newState[1].title).toBe(initialState[1].title)
})

test('todolist filter should be correct changed', () => {
  let newFilter = 'active' as FilterValuesType
  let newState = todolistReducer(initialState, changeTodolistFilterAC({todolistId: todolistId1, filter: newFilter}))

  expect(newState.length).toBe(initialState.length)
  expect(newState[0].filter).toBe(newFilter)
  expect(newState[1].filter).toBe(initialState[1].filter)

})