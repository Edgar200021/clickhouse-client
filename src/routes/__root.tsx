import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { baseSearchParams } from "@/schemas/searchParams/baseSearchParams.schema";
import type { AuthState } from "@/store/auth/authSlice";

export const Route = createRootRouteWithContext<{
	user: AuthState["user"];
}>()({
	validateSearch: baseSearchParams,
	component: () => (
		<>
			<Outlet />
			<TanStackRouterDevtools />
		</>
	),
});
