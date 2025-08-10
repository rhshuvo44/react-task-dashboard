// store/baseApi.ts
import { createApi } from "@reduxjs/toolkit/query/react";

let mockArticles = [
    {
        id: 1,
        title: "Mock Article 1",
        author: "Alice",
        publishedDate: "2025-08-01",
        views: 100,
        likes: 10,
        comments: 3,
    },
    {
        id: 2,
        title: "Mock Article 2",
        author: "Bob",
        publishedDate: "2025-07-25",
        views: 200,
        likes: 20,
        comments: 5,
    },
];

// Simulate delay
const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

export const baseApi = createApi({
    reducerPath: "baseApi",
    baseQuery: async ({ url, method, body }) => {
        await delay(300);

        // LOGIN
        if (method === "POST" && url === "/auth/login") {
            const { username, password } = body;
            if (username === "admin" && password === "password") {
                return {
                    data: {
                        token: "mock-token-admin",
                        user: { userId: "1", role: "admin", iat: Date.now(), exp: Date.now() + 3600 * 1000 },
                    },
                };
            }
            return { error: { status: 401, data: { message: "Invalid credentials" } } };
        }

        // GET ARTICLES
        if (method === "GET" && url === "/articles") {
            return { data: mockArticles };
        }

        // UPDATE ARTICLE
        if (method === "PUT" && url.startsWith("/articles/")) {
            const id = Number(url.split("/")[2]);
            mockArticles = mockArticles.map((a) => (a.id === id ? { ...a, ...body } : a));
            return { data: mockArticles.find((a) => a.id === id) };
        }

        return { error: { status: 404, data: { message: "Not Found" } } };
    },
    tagTypes: ["Articles"],
    endpoints: (build) => ({
        login: build.mutation({
            query: (credentials) => ({ url: "/auth/login", method: "POST", body: credentials }),
        }),
        getArticles: build.query({
            query: () => ({ url: "/articles", method: "GET" }),
            providesTags: ["Articles"],
        }),
        updateArticle: build.mutation({
            query: ({ id, ...update }) => ({
                url: `/articles/${id}`,
                method: "PUT",
                body: update,
            }),
            invalidatesTags: ["Articles"],
        }),
    }),
});

export const { useLoginMutation, useGetArticlesQuery, useUpdateArticleMutation } = baseApi;
