import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
    tagTypes: ['Website', 'Category', 'Tag'],
    endpoints: (builder) => ({
        getWebsites: builder.query({
            query: () => '/websites',
            providesTags: (result = [], error, arg) => [
                'Website',
                ...result.map(({ id }) => ({ type: 'Website', id })),
            ]
        }),
        updateWebsite: builder.mutation({
            query: website => ({
                url: `/websites/${website.id}`,
                method: "PUT",
                body: website
            }),
            invalidatesTags: (result, error, arg) => [{ type: 'Website', id: arg.id }]
        }),
        createWebsite: builder.mutation({
            query: website => ({
                url: `/websites`,
                method: "POST",
                body: website
            }),
            invalidatesTags: ['Website']
        }),
        deleteWebsite: builder.mutation({
            query: website => ({
                url: `/websites/${website.id}`,
                method: "DELETE",
            }),
            invalidatesTags: (result, error, arg) => [{ type: 'Website', id: arg.id }]
        }),
        getCategories: builder.query({
            query: () => '/categories'
        }),
        createCategory: builder.mutation({
            query: category => ({
                url: '/categories',
                method: 'POST',
                body: category
            }),
            invalidatesTags: ['Category']
        }),
        deleteCategory: builder.mutation({
            query: category => ({
                url: `/categories/${category.id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Category']
        }),

        getTags: builder.query({
            query: () => '/tags'
        }),
        getUser: builder.query({
            query: () => '/login'
        }),
        createTag: builder.mutation({
            query: tag => ({
                url: '/tags',
                method: 'POST',
                body: tag
            }),
            invalidatesTags: ['Tag']
        }),
        deleteTag: builder.mutation({
            query: tag => ({
                url: `/tags/${tag.id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Tag']
        }),
        createUser: builder.mutation({
            query: (user) => ({
                url: '/login',
                method: 'POST',
                body: user
            })
        }),
        loginUser: builder.mutation({
            query: (user) => ({
                url: '/login',
                method: 'PUT',
                body: user
            })
        }),
        logoutUser: builder.mutation({
            query: () => ({
                url: '/login',
                method: 'DELETE'
            })
        }),

    })
})

export const {
    useGetWebsitesQuery,
    useCreateWebsiteMutation,
    useUpdateWebsiteMutation,
    useDeleteWebsiteMutation,
    useGetCategoriesQuery,
    useCreateCategoryMutation,
    useDeleteCategoryMutation,
    useGetTagsQuery,
    useCreateTagMutation,
    useDeleteTagMutation,
    useGetUserQuery,
    useCreateUserMutation,
    useLoginUserMutation,
    useLogoutUserMutation,
    useGe
} = apiSlice
