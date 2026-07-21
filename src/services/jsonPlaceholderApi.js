// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


// Define a service using a base URL and expected endpoints
export const jsonPlaceholderApi = createApi({
  reducerPath: 'jsonPlaceholderApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://jsonplaceholder.typicode.com/' }),
  refetchOnFocus: true,
  tagTypes: ['Posts'],
  endpoints: (builder) => ({
    getSimplePosts: builder.query({
      query: () => `posts`,
    }),
    getAdvancePostsWithPagination: builder.query({
      query: ({ page = 1, limit = 10, search = '', sort = '', order = '' }) => {
        const skip = (page - 1) * limit;
        let url = `https://dummyjson.com/posts/search?q=${search}&limit=${limit}&skip=${skip}`;
        if (sort) {
          url += `&sortBy=${sort}&order=${order}`;
        }
        return url;
      },
      transformResponse(apiResponse) {
        return {
          data: apiResponse.posts || [],
          totalCount: apiResponse.total || 0
        };
      },
      providesTags: (result) =>
        result && result.data
          ? [
              ...result.data.map(({ id }) => ({ type: 'Posts', id })),
              { type: 'Posts', id: 'PARTIAL-LIST' },
            ]
          : [{ type: 'Posts', id: 'PARTIAL-LIST' }],
    }),
    addPost: builder.mutation({
      query: (body) => ({
        url: `https://dummyjson.com/posts/add`,
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'Posts', id: 'PARTIAL-LIST' }],
    }),
    updatePost: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `https://dummyjson.com/posts/${id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Posts', id }],
    }),
    deletePost: builder.mutation({
      query: (id) => ({
        url: `https://dummyjson.com/posts/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, id) => [{ type: 'Posts', id }, { type: 'Posts', id: 'PARTIAL-LIST' }],
    }),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { 
  useGetSimplePostsQuery, 
  useGetAdvancePostsWithPaginationQuery,
  useAddPostMutation,
  useUpdatePostMutation,
  useDeletePostMutation
} = jsonPlaceholderApi