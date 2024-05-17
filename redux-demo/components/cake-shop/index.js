const CAKE_ORDERED = 'CAKE_ORDERED';
const CAKE_RESTOCKED = 'CAKE_RESTOCKED';
const ICECREAM_ORDERED = 'ICECREAM_ORDERED';
const ICECREAM_RESTOCKED = 'ICECREAM_RESTOCKED';

function orderCake(qty = 1){
    return{
        type: CAKE_ORDERED,
        payload: qty,
    }
};

function restockCake(qty =1){
    return{
        type: CAKE_RESTOCKED,
        payload: qty,
    }
};

function orderIceCream(qty = 1){
    return {
        type: ICECREAM_ORDERED,
        payload: qty,
    }
};

function restockIceCream(qty = 1){
    return {
        type: ICECREAM_RESTOCKED,
        payload: qty,
    }
};

const initialCakeState = {
    numOfCake: 10
};

const initialIceCreamState = {
    numOfIceCream: 20
};

const cakeReducer = (state = initialCakeState, action) => {
    switch(action.type){
        case CAKE_ORDERED:
            return {
                numOfCake: state.numOfCake - action.payload,
            }
        case CAKE_RESTOCKED:
            return {
                numOfCake: state.numOfCake + action.payload,
            }
        default:
            return state
    }
};

const iceCreamReducer = (state = initialIceCreamState, action) => {
    switch(action.type){
        case ICECREAM_ORDERED:
            return {
                numOfIceCream: state.numOfIceCream - action.payload,
            }
        case ICECREAM_RESTOCKED:
            return {
                numOfIceCream: state.numOfIceCream + action.payload,
            }
        default:
            return state
    }
};

const redux = require('redux');
const reduxLogger = require('redux-logger');
const logger = reduxLogger.createLogger(); // we now have the logger middlerware
// that we want to use in our application...
// so HOW TO INCLUDE it to our REDUX APP?
// redux library provide helper function...
const applyMiddlerware = redux.applyMiddleware; // no paranthesis required!


// helper function...the use case of bindActionCreators...
const bindActionCreators = redux.bindActionCreators;
// helper function...to combine multiple reducer...
const combineReducers = redux.combineReducers;
const createStore = redux.createStore;

const rootReducer = combineReducers({cake: cakeReducer, icecream: iceCreamReducer})
// here we pass second args
const store = createStore(rootReducer, applyMiddlerware(logger)); /// GOOD!
console.log('Initial State', store.getState());

const unsubscribe = store.subscribe(() => {});

const actions = bindActionCreators({orderCake, restockCake, orderIceCream, restockIceCream}, store.dispatch);
actions.orderCake();
actions.orderCake();
actions.restockCake(2);
actions.orderIceCream(5);
// cause icecream is in high demand's during summer season here in india...
actions.restockIceCream(10);

unsubscribe();
