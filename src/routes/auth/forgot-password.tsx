import { Routes } from "@/const/routes";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(Routes.Auth.ForgotPassword)({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div className="flex h-full items-center justify-center">
			Forgot password
		</div>
	);
}
