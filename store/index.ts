import todoReducer from './todo/reducers';
import { combineReducers } from 'redux';
import { Todo } from './todo/types';

export type RootState = {
  todo: Todo;
};

const rootReducer = combineReducers({
  todo: todoReducer,
});

export default rootReducer;
