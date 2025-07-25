import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { Routes } from "@/const/routes";

export const Route = createFileRoute("/auth")({
	beforeLoad: ({ context }) => {
		const { user } = context;

		if (user)
			return redirect({
				to: Routes.Main,
			});
	},
	component: () => <Outlet />,
});
