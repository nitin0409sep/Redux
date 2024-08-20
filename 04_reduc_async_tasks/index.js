//? redux-thunk -> Define async action creators, works as a middleware, which we uses with our store

const { createStore, applyMiddleware } = require('redux');
const { thunk } = require('redux-thunk');
const axios = require('axios');

//? State
const initialState = {
    loading: false,
    users: [],
    error: '',
}

// ACTIONS
const FETCH_USERS_REQUEST = 'FETCH_USERS_REQUEST';
const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';
const FETCH_USERS_FAILURE = 'FETCH_USERS_FAILURE';


// CREATE ACTIONS
const fetchUserRequestAction = () => {
    return {
        type: 'FETCH_USERS_REQUEST'
    }
};

const fetchUserSuccessAction = (users) => {
    return {
        type: 'FETCH_USERS_SUCCESS',
        payload: users,
    }
}

const fetchUserFailureAction = (error) => {
    return {
        type: 'FETCH_USERS_FAILURE',
        payload: error,

    }
}

// REDUCERS
const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_USERS_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case FETCH_USERS_SUCCESS:
            return {
                ...state,
                loading: false,
                users: action.payload,
                error: ''
            }
        case FETCH_USERS_FAILURE:
            return {
                ...state,
                loading: false,
                users: [],
                error: action.payload
            }
        default:
            return state;
    }
}


//! Async Action Creator
const fetchUsers = () => {

    //! Action Creator returns an action as an object, but as we are using thunkMiddleware it gives us the ability
    //! to retun a function instead of action object, and the function is impure

    return function (dispatch) {
        //! We can also dispatch actions, because it gets dispatch as an action
        dispatch(fetchUserRequestAction());

        axios.get('https://jsonplaceholder.typicode.com/users').then((res) => {
            const users = res.data.map((user) => user.name);
            dispatch(fetchUserSuccessAction(users));
        }).catch((error) => {
            dispatch(fetchUserFailureAction(error.message));
        })
    }

}


const store = createStore(userReducer, applyMiddleware(thunk));
store.subscribe(() => { console.log(store.getState()) });
store.dispatch(fetchUsers());