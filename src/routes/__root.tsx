import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header/Header";
import type { AuthState } from "@/store/auth/authSlice";

interface MyRouterContext {
	user: AuthState["user"];
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
	component: () => (
		<div className="main-container box">
			<Header />
			<main>
				<Outlet />
			</main>
			<Footer /> <TanStackRouterDevtools />
		</div>
	),
});
