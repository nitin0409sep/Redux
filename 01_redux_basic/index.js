const { createStore } = require('redux');

//! An action is a object with type property  
const BUY_CAKE = 'BUY_CAKE';

// const action = {
//     type: BUY_CAKE,
//     info: 'first redux action'
//     ...
//     ...
// }
function buyCake() { //! Action Creator - A func that returns an action
    return {
        type: BUY_CAKE,
        info: 'first redux action'
    }
}


//! Reducer - (prevState, action) => { return newState } 
const initalState = {
    numOfCakes: 10,
}

const reducer = (state = initalState, action) => {
    switch (action.type) {
        case 'BUY_CAKE':
            return {
                ...state,
                numOfCakes: state.numOfCakes - 1
            }
        default:
            return state;
    }
}


const store = createStore(reducer);

//! GET STATE 
console.log('Initial State', store.getState());

//! SUBSCRIBE THE STORE WITH APP 
const unsubscribe = store.subscribe(() => {
    console.log('Updated State', store.getState());
});

//! DISPATCH 
store.dispatch(buyCake())
store.dispatch(buyCake())
store.dispatch(buyCake())

//! In Redux, we can unsubscribe from the store's updates by calling the function returned by store.subscribe().
unsubscribe();
