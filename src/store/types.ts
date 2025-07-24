export type ApiSuccessResponse<T> = {
	status: "success";
	data: T;
};

export type ApiErrorResponse = {
	status: "error";
	error: string;
};

export type ApiValidationErrorResponse<T extends string[]> = {
	status: "error";
	errors: Partial<Record<T[number], string[]>>;
};
