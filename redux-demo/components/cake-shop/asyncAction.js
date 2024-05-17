const redux = require('redux');
const reduxLogger = require('redux-logger');
const axios = require('axios');
const thunkMiddlerware = require('redux-thunk').default;

const createStore = redux.createStore;
const applyMiddleware = redux.applyMiddleware;
const logger = reduxLogger.createLogger();

const initialState = {
    loading: '',
    users: [],
    error: '',
};

const FETCH_USERS_REQUESTED = 'FETCH_USERS_REQUESTED';
const FETCH_USERS_SUCCEEDED = 'FETCH_USERS_SUCCEEDED';
const FETCH_USERS_FAILED = 'FETCH_USERS_FAILED';

const fetchUserRequested = () => {
    return {
        type: FETCH_USERS_REQUESTED,
    }
}

const fetchUserSucceeded = (users) => {
    return {
        type: FETCH_USERS_SUCCEEDED,
        payload: users,
    }
}

const fetchUserFailed = (error) => {
    return {
        type: FETCH_USERS_FAILED,
        payload: error,
    }
}

const usersReducer = (state = initialState, action) => {
    switch(action.type){
        case FETCH_USERS_REQUESTED:
            return {
                ...state,
                loading: true,
            }
        case FETCH_USERS_SUCCEEDED:
            return {
                loading: false,
                users: action.payload,
                error: '',
            }
        case FETCH_USERS_FAILED:
            return {
                loading: false,
                users: [],
                error: action.payload,
            }
        default:
            return state;
    }
}


const fetchUsers = () => {
    return function(dispatch){
        dispatch(fetchUserRequested());
        axios.get('https://jsonplaceholder.typicode.com/users').
            then(response => {
                const users = response.data.map(user => user.id);
                dispatch(fetchUserSucceeded(users));
            })
            .catch(error => {
                dispatch(fetchUserFailed(error.message));
            })
    };
};

const middlewares = [thunkMiddlerware, logger];

const store = createStore(usersReducer, applyMiddleware(...middlewares));

const unsubscribe = store.subscribe(() => {});

store.dispatch(fetchUsers());

unsubscribe();
