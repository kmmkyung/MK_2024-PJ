import { atom } from "recoil";

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

interface UserData {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
}

// 로그인정보
export const userDataState = atom<UserData | null>({
  key: 'userData',
  default: null
})