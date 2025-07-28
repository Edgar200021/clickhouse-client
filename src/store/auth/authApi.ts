import { baseApi } from "../baseApi";
import { authActions } from "./authSlice";

import type {
	AccountVerificationRequest,
	AccountVerificationResponse,
	ForgotPasswordRequest,
	ForgotPasswordResponse,
	GoogleSignInRequest,
	GoogleSignInResponse,
	LogoutRequest,
	LogoutResponse,
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

		accountVerification: builder.mutation<
			AccountVerificationResponse,
			AccountVerificationRequest
		>({
			query: (body) => ({
				url: "/auth/verify-account",
				method: "POST",
				body,
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

		googleSignIn: builder.query<GoogleSignInResponse, GoogleSignInRequest>({
			query: () => ({
				url: "/auth/google",
			}),
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

		logout: builder.mutation<LogoutResponse, LogoutRequest>({
			query: () => ({
				url: "/auth/logout",
				method: "POST",
			}),
			onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
				await queryFulfilled;
				dispatch(authActions.setUser(null));
			},
		}),
	}),
});

export const {
	useSignUpMutation,
	useSignInMutation,
	useLazyGoogleSignInQuery,
	useAccountVerificationMutation,
	useForgotPasswordMutation,
	useResetPasswordMutation,
	useLogoutMutation,
} = authApi;
