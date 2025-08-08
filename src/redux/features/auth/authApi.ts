import { baseApi } from "../../api/api";

interface LoginRequest {
    username: string;
    password: string;
}

interface User {
    userId: string;
    role: string;
}

interface LoginResponse {
    token: string;
    user: User;
}

interface LoginError {
    status: number;
    data: {
        message: string;
    };
}

const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        // Mock login mutation (does NOT call backend)
        login: builder.mutation<LoginResponse, LoginRequest>({
            queryFn: async (userInfo: LoginRequest): Promise<
                | { data: LoginResponse }
                | { error: LoginError }
            > => {
                // Simulate delay
                await new Promise((r) => setTimeout(r, 500));

                // Simple mock login validation
                if (userInfo.username === "admin" && userInfo.password === "password") {
                    return {
                        data: {
                            token: "mock-jwt-token-123",
                            user: { userId: "1", role: "admin" },
                        },
                    };
                } else if (userInfo.username === "editor" && userInfo.password === "password") {
                    return {
                        data: {
                            token: "mock-jwt-token-456",
                            user: { userId: "2", role: "editor" },
                        },
                    };
                }

                return { error: { status: 401, data: { message: "Invalid credentials" } } };
            },
        }),
    }),
});

export const { useLoginMutation } = authApi;
