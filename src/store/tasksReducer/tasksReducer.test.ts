import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer, TasksType} from "./tasksReducer";
import {v1} from "uuid";
import {addTodolistAC, removeTodolistAC} from "../todolistReducer/todolistReducer";
import { todolistId1, todolistId2 } from "../todolistReducer/todolistReducer.test";

let firstTaskId: string
let initialState: TasksType

beforeEach(() => {
  firstTaskId = v1()
  initialState = {
    [todolistId1]: [
      {id: firstTaskId, title: "CSS", isDone: true},
      {id: v1(), title: "JS", isDone: true},
      {id: v1(), title: "React", isDone: false},
      {id: v1(), title: "Redux", isDone: false},
    ],
    [todolistId2]: [
      {id: v1(), title: "book", isDone: true},
      {id: v1(), title: "milk", isDone: true},
    ],
  }
})

test('removing first task should be done', () => {
  let newState = tasksReducer(initialState, removeTaskAC({todolistId: todolistId1, taskId: firstTaskId}))

  expect(newState[todolistId1].length).toBe(3)
  expect(newState[todolistId1][0].title).toBe("JS")
  expect(newState[todolistId1][1].title).toBe("React")
  expect(newState[todolistId1][2].title).toBe("Redux")
})

test('adding new task should be done', () => {
  const newTaskTitle = 'NTT'
  let newState = tasksReducer(initialState, addTaskAC({todolistId: todolistId2, title: newTaskTitle}))

  // todolist1 should not change
  expect(newState[todolistId1].length).toBe(initialState[todolistId1].length)
  expect(newState[todolistId1][0].id).toBe(initialState[todolistId1][0].id)
  expect(newState[todolistId1][1].id).toBe(initialState[todolistId1][1].id)
  expect(newState[todolistId1][2].id).toBe(initialState[todolistId1][2].id)
  expect(newState[todolistId1][3].id).toBe(initialState[todolistId1][3].id)

  // new task should be add to todolist2
  expect(newState[todolistId2].length).toBe(initialState[todolistId2].length + 1)

  // new task should be add to the first position in todolist
  expect(newState[todolistId2][1].id).toBe(initialState[todolistId2][0].id)
  expect(newState[todolistId2][0].title).toBe(newTaskTitle)
})

test('task status should be changed correct', () => {
  const newChecked = false
  let newState = tasksReducer(initialState, changeTaskStatusAC({
    checked: newChecked,
    taskId: firstTaskId,
    todolistId: todolistId1,
  }))

  // todolist2 should not change
  expect(newState[todolistId2].length).toBe(initialState[todolistId2].length)
  expect(newState[todolistId2][0].id).toBe(initialState[todolistId2][0].id)
  expect(newState[todolistId2][1].id).toBe(initialState[todolistId2][1].id)

  // task status should be correct changed
  expect(newState[todolistId1].length).toBe(initialState[todolistId1].length)
  expect(newState[todolistId1][0].id).toBe(initialState[todolistId1][0].id)
  expect(newState[todolistId1][0].isDone).toBe(newChecked)
  expect(newState[todolistId1][1].isDone).toBe(initialState[todolistId1][1].isDone)
  expect(newState[todolistId1][2].isDone).toBe(initialState[todolistId1][2].isDone)
  expect(newState[todolistId1][3].isDone).toBe(initialState[todolistId1][3].isDone)
})

test('task title should be changed correct', () => {
  const newTaskTitle = 'NewTaskTitle'
  let newState = tasksReducer(initialState, changeTaskTitleAC({
    todolistId: todolistId1,
    taskId: firstTaskId,
    title: newTaskTitle,
  }))

  // todolist2 should not change
  expect(newState[todolistId2].length).toBe(initialState[todolistId2].length)
  expect(newState[todolistId2][0].id).toBe(initialState[todolistId2][0].id)
  expect(newState[todolistId2][1].id).toBe(initialState[todolistId2][1].id)

  // task status should be correct changed
  expect(newState[todolistId1].length).toBe(initialState[todolistId1].length)
  expect(newState[todolistId1][0].id).toBe(initialState[todolistId1][0].id)
  expect(newState[todolistId1][0].title).toBe(newTaskTitle)
  expect(newState[todolistId1][1].isDone).toBe(initialState[todolistId1][1].isDone)
  expect(newState[todolistId1][2].isDone).toBe(initialState[todolistId1][2].isDone)
  expect(newState[todolistId1][3].isDone).toBe(initialState[todolistId1][3].isDone)
})

test('new array should be added when new todolist is added', () => {

  const action = addTodolistAC("new todolist");

  const newState = tasksReducer(initialState, action)


  const keys = Object.keys(newState);
  const newKey = keys.find(k => k !== todolistId2 && k !== todolistId1);
  if (!newKey) {
    throw Error("new key should be added")
  }

  expect(keys.length).toBe(3);
  expect(newState[newKey]).toEqual([]);
});

test('property with todolistId should be deleted', () => {
  const action = removeTodolistAC(todolistId2);

  const newState = tasksReducer(initialState, action)
  const keys = Object.keys(newState);

  expect(keys.length).toBe(1);
  expect(newState[todolistId2]).not.toBeDefined();
});

