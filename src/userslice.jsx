// usersSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate delay
  const res = await fetch('https://jsonplaceholder.typicode.com/users');
  return await res.json();
});

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    items: [],
    loading: false,
  },
  reducers: {
    deleteUser: (state, action) => {
      state.items = state.items.filter((user) => user.id !== action.payload);
    },
    addUser: (state, action) => {
      const newUser = {
        id: Date.now(),
        ...action.payload,
      };
      state.items.push(newUser);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      });
  },
});

export const { deleteUser, addUser } = usersSlice.actions;
export default usersSlice.reducer;
