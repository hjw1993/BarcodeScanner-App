import { createStore, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk'
 
import CombinedReducers from '../reducers/index'; 
const store = createStore(CombinedReducers,applyMiddleware(thunkMiddleware));

export default store;