import { createApi } from '@reduxjs/toolkit/query/react';

// Helper delay to simulate async
const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

export const baseApi = createApi({
    reducerPath: 'baseApi',
    baseQuery: async ({ url, method, body }) => {
        await delay(300);
        // Mock login endpoint
        if (method === 'POST' && url === '/auth/login') {
            const { username, password } = body as { username: string; password: string };

            if (username === 'admin' && password === 'password') {
                return {
                    data: {
                        token: 'mock-token-admin',
                        user: { userId: '1', role: 'admin', iat: Date.now(), exp: Date.now() + 3600 * 1000 },
                    },
                };
            }
            if (username === 'editor' && password === 'password') {
                return {
                    data: {
                        token: 'mock-token-editor',
                        user: { userId: '2', role: 'editor', iat: Date.now(), exp: Date.now() + 3600 * 1000 },
                    },
                };
            }

            return {
                error: { status: 401, data: { message: 'Invalid credentials' } },
            };
        }

        // Mock get articles endpoint
        if (method === 'GET' && url === '/articles') {
            return {
                data: [
                    {
                        id: 1,
                        title: 'Mock Article 1',
                        author: 'Alice',
                        publishedDate: '2025-08-01',
                        views: 100,
                        likes: 10,
                        comments: 3,
                    },
                    {
                        id: 2,
                        title: 'Mock Article 2',
                        author: 'Bob',
                        publishedDate: '2025-07-25',
                        views: 200,
                        likes: 20,
                        comments: 5,
                    },
                ],
            };
        }

        return {
            error: { status: 404, data: { message: 'Not Found' } },
        };
    },
    tagTypes: ['User', 'Articles'],
    endpoints: (build) => ({
        login: build.mutation<
            { token: string; user: { userId: string; role: string; iat: number; exp: number } },
            { username: string; password: string }
        >({
            query: (credentials) => ({ url: '/auth/login', method: 'POST', body: credentials }),
        }),
        getArticles: build.query<
            {
                id: number;
                title: string;
                author: string;
                publishedDate: string;
                views: number;
                likes: number;
                comments: number;
            }[],
            void
        >({
            query: () => ({ url: '/articles', method: 'GET' }),
            providesTags: ['Articles'],
        }),
    }),
});

export const { useLoginMutation, useGetArticlesQuery } = baseApi;
