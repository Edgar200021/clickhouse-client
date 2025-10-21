export type Nullable<T> = null | T;

export type FlattenValues<T> = T extends string
	? T
	: T extends Record<string, unknown>
		? FlattenValues<T[keyof T]>
		: never;

export type FieldPaths<T> = T extends object
	? {
			[K in Extract<keyof T, string>]: NonNullable<T[K]> extends infer V
				? V extends Array<infer U>
					? K | `${K}/${FieldPaths<U>}`
					: V extends object
						? K | `${K}/${FieldPaths<V>}`
						: K
				: never;
		}[Extract<keyof T, string>]
	: never;
