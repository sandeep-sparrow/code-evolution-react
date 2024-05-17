const store = require("./app/store");
const { cakeActions } = require("./features/cake/cakeSlice");
const { icecreamActions } = require("./features/icecream/icecreamSlice");
const { fetchUsers } = require("./features/user/userSlice");

console.log('Initial State: ', store.getState());

const unsubscribe = store.subscribe(() => {});

store.dispatch(fetchUsers());

