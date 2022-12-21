import {createStore, applyMiddleware} from 'redux';
// import logger from 'redux-logger';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/root_reducer';

//put logger back later
const configureStore = (preloadedState = {}) => {
  return createStore(rootReducer,preloadedState, applyMiddleware(thunk));
};

export default configureStore;
