import { applyMiddleware, compose, createStore, Middleware, StoreEnhancer } from 'redux';
import rootReducer from '../store';
import { composeWithDevTools } from 'redux-devtools-extension';
import logger from 'redux-logger';

const enhancer =
  process.env.NODE_ENV === 'production'
    ? compose(applyMiddleware())
    : composeWithDevTools(applyMiddleware(logger));

export const store = createStore(rootReducer, enhancer);
