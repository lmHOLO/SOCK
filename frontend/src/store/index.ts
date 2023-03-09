import { combineReducers } from 'redux';
import member from './member';

const rootReducer = combineReducers({
  member,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
