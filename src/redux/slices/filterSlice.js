import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  currentPage: 1,
  categoryId: 0, 
  sort: { name: 'популярности', sortType: 'rating' }
}

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
setCategoryId(state,action) {
      state.categoryId = action.payload
    },
    setSort(state,action){
      state.sort = action.payload
    },
    setCurrentPage(state,action){
      state.currentPage = action.payload
    },
    
  },
})


export const { setCategoryId,setSort,setCurrentPage } = filterSlice.actions

export default filterSlice.reducer