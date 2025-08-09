import type { Nullable } from "./base";

export type Category = {
	id: number;
	name: string;
	path: string;
	imageId: Nullable<string>;
	imageUrl: Nullable<string>;
};
