``` 
    Middleware extends redux with custom functionality 
    Provides 3rd party extension point b/w dispatching an action, and moment it reaches reducer
    Uses- Logging, crash reporting, performing async taks
```
const { createStore, combineReducers, applyMiddleware } = require('redux');
const { createLogger } = require('redux-logger');

const logger = createLogger()

const BUY_CAKE = 'BUY_CAKE';
const BUY_ICECREAM = 'BUY_ICECREAM';

//! Create Actions
function buyCake() { //! Action Creator
    return {
        type: BUY_CAKE,
    }
}

function buyIceCream() { //! Action Creator
    return {
        type: BUY_ICECREAM,
    }
}

const iceCreamInitalState = {
    numOfIceCreams: 20,
}

const cakeInitalState = {
    numOfCakes: 10,
}

const cakeReducer = (state = cakeInitalState, action) => {
    switch (action.type) {
        case 'BUY_CAKE':
            return {
                ...state,
                numOfCakes: state.numOfCakes - 1,
            }
        default:
            return state
    }
}

const iceCreamReducer = (state = iceCreamInitalState, action) => {
    switch (action.type) {
        case 'BUY_ICECREAM':
            return {
                ...state,
                numOfIceCreams: state.numOfIceCreams - 1,
            }
        default:
            return state
    }
}

//! Store
const rootReducers = combineReducers({
    cake: cakeReducer,
    iceCream: iceCreamReducer,
});
const store = createStore(rootReducers, applyMiddleware(logger)); //! We can pass multiple middleware

console.log(`Initial State`, store.getState());
const unsubscribe = store.subscribe(() => { });

store.dispatch(buyIceCream());
store.dispatch(buyIceCream());
store.dispatch(buyIceCream());

store.dispatch(buyCake());
store.dispatch(buyCake());

unsubscribe();

