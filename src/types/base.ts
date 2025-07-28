export type Nullable<T> = null | T;

export type FlattenValues<T> = T extends string
	? T
	: T extends Record<string, unknown>
		? FlattenValues<T[keyof T]>
		: never;
