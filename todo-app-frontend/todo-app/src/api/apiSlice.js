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
        getTodoById: builder.query({
            query: (id) => `api/todos/${id}/edit`,
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
            query: ({id, title, description, completed}) => ({
                url: `/api/todos/${id}/edit`,
                method: 'PUT',
                body: {title, description, completed}
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
     useDeleteTodoMutation,
     useGetTodoByIdQuery
  } = apiSlice

