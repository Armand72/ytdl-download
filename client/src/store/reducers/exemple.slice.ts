import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  mutation: '',
};

const exempleSlice = createSlice({
  name: 'mutation',
  initialState,
  reducers: {
    exempleMutation(state, action: PayloadAction<string>) {
      console.log(action.payload);

      state.mutation = 'state changés';
    },
  },
});

export const { exempleMutation } = exempleSlice.actions;

export default exempleSlice.reducer;
