import { Outlet, redirect, createFileRoute } from "@tanstack/react-router";
import { Routes } from "@/const/routes";

export const Route = createFileRoute("/_regularLayout/auth")({
	beforeLoad: ({ context }) => {
		const { user } = context;

		if (user)
			return redirect({
				to: Routes.Main,
			})
	},
	component: () => <Outlet />,
});
