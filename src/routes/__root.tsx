import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header/Header";
import { baseSearchParams } from "@/schemas/searchParams/baseSearchParams.schema";
import type { AuthState } from "@/store/auth/authSlice";

export const Route = createRootRouteWithContext<{
	user: AuthState["user"];
	isLoadingGettingUser: boolean;
}>()({
	component: () => (
		<div className="main-container box">
			<Header />
			<main>
				<Outlet />
			</main>
			<Footer /> <TanStackRouterDevtools />
		</div>
	),
	validateSearch: baseSearchParams,
});
