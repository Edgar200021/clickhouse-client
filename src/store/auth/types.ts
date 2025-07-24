import type { ForgotPasswordSchema } from "@/schemas/auth/forgotPassword.schema";
import type { ResetPasswordSchema } from "@/schemas/auth/resetPassword.schema";
import type { SignInSchema } from "@/schemas/auth/signIn.schema";
import type { SignUpSchema } from "@/schemas/auth/signUp.schema";
import type { User } from "@/types/user";
import type { ApiSuccessResponse } from "../types";

export type SignUpRequest = Pick<SignUpSchema, "email" | "password">;
export type SignUpResponse = ApiSuccessResponse<string>;

export type SignInRequest = SignInSchema;
export type SignInResponse = ApiSuccessResponse<User>;

export type ForgotPasswordRequest = ForgotPasswordSchema;
export type ForgotPasswordResponse = ApiSuccessResponse<string>;

export type ResetPasswordRequest = ResetPasswordSchema;
export type ResetPasswordResponse = ApiSuccessResponse<string>;
