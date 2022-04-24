import {
  DELETE_TODO_REQUEST,
  INSERT_TODO_REQUEST,
  LIST_TODOS_REQUEST,
  MOVE_FINISHED_TODO_REQUEST,
  MOVE_TODO_FINISHED_REQUEST,
  SEARCH_FINISHED_REQUEST,
  SEARCH_TODOS_REQUEST,
} from './actionTypes';

export interface Todo {
  todos: { id: number; importance: number; todo: string; completed: boolean; date: string }[];
  finishedTodos: {
    id: number;
    importance: number;
    todo: string;
    completed: boolean;
    date: string;
  }[];
  searchedTodos: {
    id: number;
    importance: number;
    todo: string;
    completed: boolean;
    date: string;
  }[];
  searchedFinished: {
    id: number;
    importance: number;
    todo: string;
    completed: boolean;
    date: string;
  }[];
  searchState: boolean;
}

export interface InsertTodoRequestAction {
  type: typeof INSERT_TODO_REQUEST;
  todo: { id: number; importance: number; todo: string; completed: boolean; date: string }[];
}

export interface ListTodosRequestAction {
  type: typeof LIST_TODOS_REQUEST;
  todos: Todo;
}

export interface DeleteTodoRequestAction {
  type: typeof DELETE_TODO_REQUEST;
  todoId: number;
}

export interface MoveTodoFinishedRequestAction {
  type: typeof MOVE_TODO_FINISHED_REQUEST;
  todoId: number;
}

export interface MoveFinishedTodoRequestAction {
  type: typeof MOVE_FINISHED_TODO_REQUEST;
  finishedId: number;
}

export interface SearchTodosRequestAction {
  type: typeof SEARCH_TODOS_REQUEST;
  searchKey: string;
}
export interface SearchFinishedRequestAction {
  type: typeof SEARCH_FINISHED_REQUEST;
  searchKey: string;
}

export type TodoAction =
  | InsertTodoRequestAction
  | ListTodosRequestAction
  | DeleteTodoRequestAction
  | MoveTodoFinishedRequestAction
  | MoveFinishedTodoRequestAction
  | SearchTodosRequestAction
  | SearchFinishedRequestAction;
