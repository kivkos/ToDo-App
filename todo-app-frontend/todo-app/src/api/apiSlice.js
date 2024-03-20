import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000' }),
    tagTypes: ['Todos'],
    endpoints: (builder) => ({
        getTodos: builder.query({
            query: () => 'api/todos',
            providesTags: ['Todos'],
        }),
        addTodo: builder.mutation({
            query: (todo) => ({
                url: '/api/todos/',
                method: 'POST',
                body: todo
            }),
            invalidatesTags: ['Todos']
        }),
        updateTodo: builder.mutation({
            query: ({todo}) => ({
                url: `/api/todos/${todo.id}/edit`,
                method: 'PUT',
                body: todo
            }),
            invalidatesTags: ['Todos']
        }),
        deleteTodo: builder.mutation({
            query: ({ id }) => ({
                url: `/api/todos/${id}/delete`,
                method: 'DELETE',
                body: id
            }),
            invalidatesTags: ['Todos']
        }),
    }),
  })

  export const {
     useGetTodosQuery,
     useAddTodoMutation,
     useUpdateTodoMutation,
     useDeleteTodoMutation
  } = apiSlice

