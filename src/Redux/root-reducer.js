import { combineReducers } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import contactsReducer from './contacts/contacts-reducer';
import filterReducer from './filter/filter-reducer';
import storage from 'redux-persist/lib/storage';

const rootReducer = combineReducers({
  contacts: contactsReducer,
  filter: filterReducer,
});

const persistConfig = {
  key: 'my-phonebook',
  storage,
  blacklist: ['filter'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default persistedReducer;
