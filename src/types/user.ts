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
	email: string;
};

export type AdminUser = {
	id: string;
	createdAt: string;
	updatetAt: string;
	isVerified: boolean;
	isBanned: boolean;
	email: string;
	googleId: Nullable<string>;
	facebookId: Nullable<string>;
};
