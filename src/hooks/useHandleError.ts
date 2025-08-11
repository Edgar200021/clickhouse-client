import { useCallback, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import type { ApiValidationErrorResponse } from "@/types/api";
import { isApiError, isApiValidationError, isRtkError } from "@/types/guards";

export const useHandleError = <T extends string[]>(
	error?: unknown,
	options?: {
		disabled?: boolean;
		validationErrorCb?: (err: ApiValidationErrorResponse<T>["errors"]) => void;
	},
) => {
	const [apiValidationErrors, setApiValidationErrors] = useState<
		ApiValidationErrorResponse<T>["errors"]
	>({});

	useEffect(() => {
		if ((!error || options?.disabled) ?? false) return;
		const rtkError = isRtkError(error);

		if (rtkError && error.originalStatus === 429) {
			toast.error("Слишком много запросов");
			return;
		}

		const err = rtkError ? error.data : error;

		if (isApiValidationError(err)) {
			setApiValidationErrors(err.errors);
			options?.validationErrorCb?.(err.errors);
			return;
		}

		toast.error(
			isApiError(err)
				? err.error
				: err instanceof Error
					? err.message
					: "Что-то пошло не так",
		);
	}, [error, options?.disabled]);

	const setValidationError = useCallback((key: T[number], message: string) => {
		setApiValidationErrors((prev) => ({ ...prev, [key]: message }));
	}, []);

	const clearError = useCallback(() => {
		setApiValidationErrors({});
	}, []);

	return { apiValidationErrors, setValidationError, clearError };
};
