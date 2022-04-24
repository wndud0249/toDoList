import {
  DELETE_TODO_REQUEST,
  INSERT_TODO_REQUEST,
  LIST_TODOS_REQUEST,
  MOVE_FINISHED_TODO_REQUEST,
  MOVE_TODO_FINISHED_REQUEST,
  SEARCH_FINISHED_REQUEST,
  SEARCH_TODOS_REQUEST,
} from './actionTypes';

export const insertTodo = (
  todo: { id: number; importance: number; todo: string; completed: boolean; date: string }[]
) => ({
  type: INSERT_TODO_REQUEST,
  todo,
});

export const listTodos = (pageNum: number, countNum: number) => ({
  type: LIST_TODOS_REQUEST,
  pageNum,
  countNum,
});

export const deleteTodo = ({ todoId }: { todoId: number }) => ({
  type: DELETE_TODO_REQUEST,
  todoId,
});

export const moveTodoFinished = ({ todoId }: { todoId: number }) => ({
  type: MOVE_TODO_FINISHED_REQUEST,
  todoId,
});

export const moveFinishedTodo = ({ finishedId }: { finishedId: number }) => ({
  type: MOVE_FINISHED_TODO_REQUEST,
  finishedId,
});

export const searchTodos = ({ searchKey }: { searchKey: string }) => ({
  type: SEARCH_TODOS_REQUEST,
  searchKey,
});

export const searchFinished = ({ searchKey }: { searchKey: string }) => ({
  type: SEARCH_FINISHED_REQUEST,
  searchKey,
});
