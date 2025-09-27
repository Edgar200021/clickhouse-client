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

export type WithPageCountResponse<T, K extends string> = {
	pageCount: number;
} & Record<K, T>;

export type Combined<O extends Record<string, unknown>, T, K extends string> = {
	[key in keyof O]: O[key];
} & Record<K, T>;
