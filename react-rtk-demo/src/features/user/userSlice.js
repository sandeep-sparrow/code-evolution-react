import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    loading: false,
    users: [],
    error: '',
}

// generates, PENDING, REJECTED & FULFILLED actions types by default...
export const fetchUsers = createAsyncThunk(
    'users/fetchUsers',
    async () => {
        return await axios.get('https://jsonplaceholder.typicode.com/users')
        .then(response => response.data.map((user) => user))
    }
)
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(fetchUsers.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(fetchUsers.fulfilled, (state, action) => {
            state.loading = false
            state.users = action.payload
            state.error = ''
        })
        builder.addCase(fetchUsers.rejected, (state, action) => {
            state.loading = false
            state.users = []
            state.error =  action.error.message
        })
    },
});

export default userSlice.reducer;