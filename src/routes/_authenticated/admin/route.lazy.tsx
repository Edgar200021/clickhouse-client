import { createLazyFileRoute, Outlet } from "@tanstack/react-router";
import { Navbar } from "@/components/Admin/Navbar";

export const Route = createLazyFileRoute("/_authenticated/admin")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div className="flex gap-x-20 bg-[#f4f5f9] min-h-screen">
			<Navbar className="w-[400px]" />
			<div className="w-full py-20 pr-10">
				<Outlet />
			</div>
		</div>
	);
}
