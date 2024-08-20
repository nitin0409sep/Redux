const { createStore, combineReducers } = require('redux');

// const initalState = {
//     numOfCakes: 10,
//     numOfIceCreams: 20,
// }

//! Reducer - (prevState, action) => { return newState } 
// const reducer = (state = initalState, action) => {
//     switch (action.type) {
//         case 'BUY_CAKE':
//             return {
//                 ...state,
//                 numOfCakes: state.numOfCakes - 1
//             }
//         case 'BUY_ICECREAM':
//             return {
//                 ...state,
//                 numOfIceCreams: state.numOfIceCreams - 1
//             }
//         default:

//             return state;
//     }
// }

//! ACTIONS
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
const store = createStore(rootReducers);

console.log(`Initial State`, store.getState());
const unsubscribe = store.subscribe(() => console.log(store.getState()));

store.dispatch(buyIceCream());
store.dispatch(buyIceCream());
store.dispatch(buyIceCream());

store.dispatch(buyCake());
store.dispatch(buyCake());

unsubscribe();

