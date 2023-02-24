import { createReducer } from '@reduxjs/toolkit';

import { addContact, deleteContact } from './contacts-actions';

const contactsReducer = createReducer([], {
  [addContact]: (state, action) => state.push(action.payload),
  [deleteContact]: (state, { payload }) =>
    state.filter(item => item.id !== payload),
});

export default contactsReducer;
