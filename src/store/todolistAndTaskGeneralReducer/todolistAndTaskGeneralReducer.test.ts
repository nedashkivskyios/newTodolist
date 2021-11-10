import {tasksReducer, TasksType} from "../tasksReducer/tasksReducer";
import {addTodolistAC, todolistReducer, TodolistType} from "../todolistReducer/todolistReducer";

test('ids should be equals', () => {
  const startTasksState: TasksType = {};
  const startTodolistsState: Array<TodolistType> = [];

  const action = addTodolistAC("new todolist");

  const endTasksState = tasksReducer(startTasksState, action)
  const endTodolistsState = todolistReducer(startTodolistsState, action)

  const keys = Object.keys(endTasksState);
  const idFromTasks = keys[0];
  const idFromTodolists = endTodolistsState[0].todolistId;

  expect(idFromTasks).toBe(action.todolistId);
  expect(idFromTodolists).toBe(action.todolistId);
});
