import { createFileRoute } from "@tanstack/react-router";
import { Routes } from "@/const/routes";
import { resetPasswordSearchParams } from "@/schemas/searchParams/resetPasswordSearchParams.schema";

export const Route = createFileRoute(Routes.Auth.ResetPassword)({
	component: RouteComponent,

	validateSearch: resetPasswordSearchParams,
});

function RouteComponent() {
	const { token } = Route.useSearch();

	return (
		<div className="flex h-full items-center justify-center">
			Reset password
		</div>
	);
}
