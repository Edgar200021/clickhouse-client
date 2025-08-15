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
	errors: Partial<Record<T[number], string>>;
};

export type WithCountResponse<T, K extends string> = {
	totalCount: number;
} & Record<K, T>;
