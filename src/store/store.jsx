import { configureStore } from '@reduxjs/toolkit'
import { categories } from './service/category/categoryService'
import { users } from './service/user/userService'

export const store = configureStore({
  reducer: {
    [categories.reducerPath]: categories.reducer,
    [users.reducerPath]: users.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(categories.middleware)
      .concat(users.middleware),
})