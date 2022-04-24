import {
  DELETE_TODO_REQUEST,
  INSERT_TODO_REQUEST,
  LIST_TODOS_REQUEST,
  MOVE_TODO_FINISHED_REQUEST,
} from './actionTypes';

export const listTodos = (pageNum: number, countNum: number) => ({
  type: LIST_TODOS_REQUEST,
  pageNum,
  countNum,
});

export const insertTodo = (
  todo: { id: number; importance: number; todo: string; completed: boolean; date: string }[]
) => ({
  type: INSERT_TODO_REQUEST,
  todo,
});
export const deleteTodo = ({ todoId }: { todoId: number }) => ({
  type: DELETE_TODO_REQUEST,
  todoId,
});
export const moveTodoFinished = ({ todoId }: { todoId: number }) => ({
  type: MOVE_TODO_FINISHED_REQUEST,
  todoId,
});
export const updateTodo = () => ({});
export const searchTodo = () => ({});

export const moveFinishedTodo = {};
