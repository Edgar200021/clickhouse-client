import { createFileRoute, redirect } from "@tanstack/react-router";
import { Routes } from "@/const/routes";

export const Route = createFileRoute("/_authenticated")({
	beforeLoad: ({ context, location }) => {
		const { user } = context;
		if (!user) {
			return redirect({
				to: window.innerWidth <= 768 ? Routes.Auth.SignIn : Routes.Main,
				search: {
					redirect: location.pathname,
				},
			});
		}
	},
});
