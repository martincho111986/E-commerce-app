import { createStore, combineReducers, applyMiddleware } from 'redux';
import ThunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';


import cartItems from './Reducers/cartItem';


const reducers =  combineReducers({
    //cartReducer
    cartItems: cartItems
})

const store = createStore(
    reducers,
    composeWithDevTools(applyMiddleware(ThunkMiddleware))
)

export default store;