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
    {
        id: 3,
        title: "Exploring React Hooks",
        author: "Charlie",
        publishedDate: "2025-06-15",
        views: 350,
        likes: 45,
        comments: 12,
    },
    {
        id: 4,
        title: "Understanding Redux Toolkit",
        author: "Diana",
        publishedDate: "2025-06-20",
        views: 275,
        likes: 30,
        comments: 7,
    },
    {
        id: 5,
        title: "TypeScript Basics",
        author: "Alice",
        publishedDate: "2025-07-01",
        views: 400,
        likes: 50,
        comments: 15,
    },
    {
        id: 6,
        title: "Advanced JavaScript Concepts",
        author: "Ethan",
        publishedDate: "2025-05-22",
        views: 225,
        likes: 25,
        comments: 8,
    },
    {
        id: 7,
        title: "Styling in React with CSS Modules",
        author: "Fiona",
        publishedDate: "2025-07-18",
        views: 320,
        likes: 40,
        comments: 10,
    },
    {
        id: 8,
        title: "Building a REST API with Node.js",
        author: "George",
        publishedDate: "2025-06-10",
        views: 500,
        likes: 65,
        comments: 20,
    },
    {
        id: 9,
        title: "React Router Deep Dive",
        author: "Hannah",
        publishedDate: "2025-07-03",
        views: 280,
        likes: 35,
        comments: 9,
    },
    {
        id: 10,
        title: "Introduction to GraphQL",
        author: "Ivan",
        publishedDate: "2025-06-28",
        views: 310,
        likes: 38,
        comments: 11,
    },
    {
        id: 11,
        title: "State Management with MobX",
        author: "Julia",
        publishedDate: "2025-05-30",
        views: 180,
        likes: 20,
        comments: 6,
    },
    {
        id: 12,
        title: "Deploying React Apps to Netlify",
        author: "Kevin",
        publishedDate: "2025-07-07",
        views: 260,
        likes: 33,
        comments: 8,
    },
    {
        id: 13,
        title: "Testing React Components",
        author: "Laura",
        publishedDate: "2025-06-18",
        views: 290,
        likes: 37,
        comments: 10,
    },
    {
        id: 14,
        title: "Accessibility in Web Design",
        author: "Michael",
        publishedDate: "2025-07-12",
        views: 350,
        likes: 42,
        comments: 13,
    },
    {
        id: 15,
        title: "CSS Grid vs Flexbox",
        author: "Nina",
        publishedDate: "2025-05-25",
        views: 230,
        likes: 27,
        comments: 7,
    },
    {
        id: 16,
        title: "Progressive Web Apps",
        author: "Oliver",
        publishedDate: "2025-06-22",
        views: 375,
        likes: 48,
        comments: 14,
    },
    {
        id: 17,
        title: "Next.js for Beginners",
        author: "Paula",
        publishedDate: "2025-07-08",
        views: 420,
        likes: 55,
        comments: 16,
    },
    {
        id: 18,
        title: "Optimizing Web Performance",
        author: "Quentin",
        publishedDate: "2025-06-05",
        views: 300,
        likes: 36,
        comments: 12,
    },
    {
        id: 19,
        title: "Understanding REST vs GraphQL",
        author: "Rachel",
        publishedDate: "2025-07-20",
        views: 340,
        likes: 44,
        comments: 15,
    },
    {
        id: 20,
        title: "JavaScript ES2025 Features",
        author: "Steve",
        publishedDate: "2025-06-12",
        views: 210,
        likes: 24,
        comments: 7,
    },
    {
        id: 21,
        title: "Responsive Design Techniques",
        author: "Tina",
        publishedDate: "2025-07-16",
        views: 380,
        likes: 50,
        comments: 18,
    },
    {
        id: 22,
        title: "Debugging React Applications",
        author: "Uma",
        publishedDate: "2025-07-02",
        views: 270,
        likes: 34,
        comments: 9,
    },
];


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
                        user: {
                            userId: "1",
                            role: "admin",
                            iat: Date.now(),
                            exp: Date.now() + 3600 * 1000,
                        },
                    },
                };
            }

            if (username === "editor" && password === "password") {
                return {
                    data: {
                        token: "mock-token-editor",
                        user: {
                            userId: "2",
                            role: "editor",
                            iat: Date.now(),
                            exp: Date.now() + 3600 * 1000,
                        },
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
