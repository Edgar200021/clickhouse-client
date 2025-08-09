import type { ApiErrorResponse, ApiValidationErrorResponse } from "@/types/api";

export const isRtkError = (
	error: unknown,
): error is {
	data: unknown;
	status: number | string;
	originalStatus?: number;
} => {
	const err = error as {
		data: unknown;
		status: string;
		originalStatus: number;
	};
	return (
		err.status !== undefined &&
		err.data !== undefined &&
		(typeof err.originalStatus === "number" || err.originalStatus === undefined)
	);
};

export const isApiError = (error: unknown): error is ApiErrorResponse => {
	const err = error as ApiErrorResponse;

	return err.status === "error" && err.error !== undefined;
};

export const isApiValidationError = <T extends string[]>(
	error: unknown,
): error is ApiValidationErrorResponse<T> => {
	const err = error as ApiValidationErrorResponse<T>;

	return err.errors !== undefined;
};
