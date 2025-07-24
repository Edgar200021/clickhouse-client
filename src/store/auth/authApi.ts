import { baseApi } from "../baseApi";
import { authActions } from "./authSlice";

import type {
	ForgotPasswordRequest,
	ForgotPasswordResponse,
	ResetPasswordRequest,
	ResetPasswordResponse,
	SignInRequest,
	SignInResponse,
	SignUpRequest,
	SignUpResponse,
} from "./types";
export const authApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		signUp: builder.mutation<SignUpResponse, SignUpRequest>({
			query: (body) => ({
				url: "/auth/sign-up",
				method: "POST",
				body: {
					email: body.email,
					password: body.password,
				},
			}),
		}),

		signIn: builder.mutation<SignInResponse, SignInRequest>({
			query: (body) => ({
				url: "/auth/sign-in",
				method: "POST",
				body,
			}),
			onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
				const { data } = await queryFulfilled;

				dispatch(authActions.setUser(data.data));
			},
		}),

		forgotPassword: builder.mutation<
			ForgotPasswordResponse,
			ForgotPasswordRequest
		>({
			query: (body) => ({
				url: "/auth/forgot-password",
				method: "POST",
				body,
			}),
		}),

		resetPassword: builder.mutation<
			ResetPasswordResponse,
			ResetPasswordRequest
		>({
			query: (body) => ({
				url: "/auth/reset-password",
				method: "PATCH",
				body,
			}),
		}),
	}),
});

export const {
	useSignUpMutation,
	useSignInMutation,
	useForgotPasswordMutation,
	useResetPasswordMutation,
} = authApi;
