import data from '../../data/todo.json';
import {
  DELETE_TODO_REQUEST,
  INSERT_TODO_REQUEST,
  LIST_TODOS_REQUEST,
  MOVE_TODO_FINISHED_REQUEST,
} from './actionTypes';
import { Todo, TodoAction } from './types';

const initialState: Todo = {
  todos: data,
  finishedTodos: [],
};

const todoReducer = (state = initialState, action: TodoAction) => {
  switch (action.type) {
    case LIST_TODOS_REQUEST:
      return {
        ...state,
        todos: action.todos,
      };
    case INSERT_TODO_REQUEST:
      return {
        ...state,
        todos: state.todos.concat(action.todo),
      };
    case DELETE_TODO_REQUEST:
      return {
        ...state,
        todos: state.todos.filter((todoItem) => todoItem.id !== action.todoId),
      };
    case MOVE_TODO_FINISHED_REQUEST:
      return {
        ...state,
        finishedTodos: state.finishedTodos.concat(
          state.todos.filter((todoItem) => todoItem.id === action.todoId)[0]
        ),
        todos: state.todos.filter((todoItem) => todoItem.id !== action.todoId),
      };
    default:
      return state;
  }
};

export default todoReducer;
