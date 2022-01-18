import { createStore, applyMiddleware, composeWithDevTools } from 'redux';
import rootReducer from '../reducer/reducer.js';
import thunk from 'redux-thunk'

const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk))
)

export default store;