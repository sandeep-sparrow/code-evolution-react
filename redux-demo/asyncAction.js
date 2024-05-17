const redux = require('redux');
const reduxLogger = require('redux-logger');
const thunkMiddlerWare = require('redux-thunk').default;
const axios = require('axios');

const createStore = redux.createStore;
const applyMiddleware = redux.applyMiddleware;
const logger = reduxLogger.createLogger();

// state
// typical three properties when working with createAsyncThunk (data fetching async)
// loading / loader?
// data / users[] / userInfo
// error / successMessage, failureMessage
const initialState = {
    loading: false,
    users: [],
    error: '',
}
// here in this case we use the loading, users, and error as out initial state...


// actions
const FETCH_USERS_REQUESTED = 'FETCH_USERS_REQUESTED';
const FETCH_USERS_SUCCEEDED = 'FETCH_USERS_SUCCEEDED';
const FETCH_USERS_FAILED = 'FETCH_USERS_FAILED';

// actions creators
const fetchUsersRequested = () => {
    return {
        type: FETCH_USERS_REQUESTED,
    }
};

const fetchUsersSucceeded = (users) => {
    return {
        type: FETCH_USERS_SUCCEEDED,
        payload: users,
    }
};

function fetchUsersFailed(error) {
    return {
        type: FETCH_USERS_FAILED,
        payload: error,
    }
};

// reducer
const reducer = (state = initialState, action) => {
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

// action creator (async - createAsyncThunk...) calls action creators
const fetchUsers = () => {
    return function(dispatch){
        dispatch(fetchUsersRequested());
        axios.get('https://jsonplaceholder.typicode.com/users').then(response => {
            const users = response.data.map(user => user.id);
            dispatch(fetchUsersSucceeded(users));
        })
        .catch(error => {
            dispatch(fetchUsersFailed(error.message));
        })
    };
};

const middlewares = [thunkMiddlerWare, logger];

// store
const store = createStore(reducer, applyMiddleware(...middlewares));

// subscribe
const unsubscribe = store.subscribe(() => {});

store.dispatch(fetchUsers()); // dispatch is embedded...

// unsubscribe
unsubscribe();