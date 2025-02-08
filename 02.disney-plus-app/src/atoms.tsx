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