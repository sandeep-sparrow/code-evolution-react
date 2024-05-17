// when working with more complex state in redux react
// it is not a good idea to use spread operator and target a specific
// property in the state..
// in order to make this simplified there is immer library
// which help make things easy to work with complex state in
// react redux app..
// let's import it above the reducer's definition...
const prducer = require('immer').produce;
// let's say we have a complex state as shown below
const initialState = {
    name: 'Sandeep',
    address: {
        street: 'Western Express Highway',
        city: 'Mumbai',
        state: 'MH',
        zipCode: '400097', 
    },
}

// now let's say the user want's to update the 
// street details 
// we will need to create action, reducers and store to dispatch 
// streetChange action...

// action type
const STREET_UPDATED = 'STREET_UPDATED';
// action creator
const updateStreet = (street) => {
    return {
        type: STREET_UPDATED,
        payload: street,
    }
};
// state reducer
const reducer = (state = initialState, action) => {
    switch(action.type){
        case STREET_UPDATED:
            // return{ // see, this is very complex....
            //     ...state, // spread current state
            //     address: {
            //         ...state.address, // spread state.address
            //         street: action.payload, // finally we update the street value...
            //     }
            // }
            return produce(state, (draft) => {
                draft.address.street = action.payload; // much simpler using immer
                // THANK YOU!
            })
        default: {
            return state;
        }
    }
}
const { produce } = require('immer');
// create the store
const redux = require('redux');
const store = redux.createStore(reducer);
console.log('initial state: ', store.getState())

// subs
const unSubscribe = store.subscribe(() => console.log('update state: ', store.getState()));

// dispatch
store.dispatch(updateStreet('Vastral'));

// unsubs
unSubscribe();

// yes, success! the value of street is changed as expected
// but as a developer it would have struck it becomes difficult
// as the state our application grows and nested object are added
// thus here comes a helper library immer to rescue..

// we will look at it's implementation in next part...
// Thank you! :)

// now, let' see how immer simplifies the state change process

// STEP1: install immer
// STEP2: import the require library...

// now let's test this...
// success, we can see the state changes as per required!