import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import member from './member';

const persistConfig = {
  key: 'root',
  // localStorage에 저장합니다.
  storage,
  // member reducer만 localstorage에 저장합니다.
  whitelist: ['member'],
  // blacklist -> 그것만 제외합니다
};

// 루트 리듀서
const rootReducer = combineReducers({ member });

// export default rootReducer;
export default persistReducer(persistConfig, rootReducer);
// 루트 리듀서의 반환값를 유추해줍니다
// 추후 이 타입을 컨테이너 컴포넌트에서 불러와서 사용해야 하므로 내보내줍니다.
export type RootState = ReturnType<typeof rootReducer>;
