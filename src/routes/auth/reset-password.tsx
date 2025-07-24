import { Routes } from "@/const/routes";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(Routes.Auth.ResetPassword)({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div className="flex h-full items-center justify-center">
			Reset password
		</div>
	);
}
