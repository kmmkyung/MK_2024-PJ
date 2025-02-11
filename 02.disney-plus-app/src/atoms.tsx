import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
const { persistAtom } = recoilPersist();
// 검색여부
export const isSearchIngState = atom({
  key: 'searching',
  default: false
})

// 검색어
export const searchKeywordState = atom({
  key:'searchKeyword',
  default: ''
})

// 검색결과
export const searchKeyWordResultsState = atom<string | null>({
  key: 'searchResults',
  default: null
})

// 로그인정보
export const userDataState = atom<{ displayName: string, photoURL: string } | null >({
  key: 'userData',
  default: null,
  effects_UNSTABLE:[persistAtom]
})