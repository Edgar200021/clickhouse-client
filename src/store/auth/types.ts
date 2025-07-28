import type { AccountVerificationSchema } from "@/schemas/api/auth/accountVerification.schema";
import type { ForgotPasswordSchema } from "@/schemas/api/auth/forgotPassword.schema";
import type { ResetPasswordSchema } from "@/schemas/api/auth/resetPassword.schema";
import type { SignInSchema } from "@/schemas/api/auth/signIn.schema";
import type { SignUpSchema } from "@/schemas/api/auth/signUp.schema";
import type { User } from "@/types/user";
import type { ApiSuccessResponse } from "../types";

export type SignUpRequest = Pick<SignUpSchema, "email" | "password">;
export type SignUpResponse = ApiSuccessResponse<string>;

export type SignInRequest = SignInSchema;
export type SignInResponse = ApiSuccessResponse<User>;

export type GoogleSignInRequest = null;
export type GoogleSignInResponse = ApiSuccessResponse<null>;

export type AccountVerificationRequest = AccountVerificationSchema;
export type AccountVerificationResponse = ApiSuccessResponse<string>;

export type ForgotPasswordRequest = ForgotPasswordSchema;
export type ForgotPasswordResponse = ApiSuccessResponse<string>;

export type ResetPasswordRequest = Omit<
	ResetPasswordSchema,
	"newPasswordConfirm"
>;
export type ResetPasswordResponse = ApiSuccessResponse<string>;

export type LogoutRequest = null;
export type LogoutResponse = ApiSuccessResponse<string>;
