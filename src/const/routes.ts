export const Routes = {
	Main: "/",
	Auth: {
		SignUp: "/auth/sign-up",
		SignIn: "/auth/sign-in",
		ForgotPassword: "/auth/forgot-password",
		ResetPassword: "/auth/reset-password",
		AccountVerification: "/auth/account-verification",
	},
	Catalog: "/catalog",
	Delivery: "/delivery",
	Payment: "/payment",
	Conditions: "/conditions",
	Contacts: "/contacts",
	Favorite: "/favorite",
	Basket: "/basket",
	Profile: "/profile",
} as const;
