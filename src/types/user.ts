import type { Nullable } from "./base";

export enum UserRole {
	Regular = "regular",
	Admin = "admin",
}

export type User = {
	id: string;
	createdAt: string;
	updatetAt: string;
	role: UserRole;
	isVerified: boolean;
	email: Nullable<string>;
};
