const createSlice = require('@reduxjs/toolkit').createSlice

const initialState = {
    numOfCake: 20,
};

const cakeSlice = createSlice({ // auto generate's action creators with same names as reducers function we have written
    name: 'cake', // String from slice name
    initialState,
    reducers: {
        ordered: (state) => { // reducer function name -> cake/ordered (reducer)
            state.numOfCake--; // uses immer library under the hood!
        },
        restocked: (state, action) => { // -> cake/restocked (reducer)
            state.numOfCake += action.payload;
        },
    },
});


module.exports = cakeSlice.reducer; // autogenerated
module.exports.cakeActions = cakeSlice.actions; // autogenerated 