import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header/Header";
import { Routes } from "@/const/routes";
import { UserRole } from "@/types/user";

export const Route = createFileRoute("/_regularLayout")({
	beforeLoad: ({ context: { user } }) => {
		if (user && user.role === UserRole.Admin) {
			return redirect({
				to: Routes.Admin.Base,
			});
		}
	},
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div className="main-container box">
			<Header />
			<main>
				<Outlet />
			</main>
			<Footer />
		</div>
	);
}
