import { createLazyFileRoute } from "@tanstack/react-router";
import { Routes } from "@/const/routes";

export const Route = createLazyFileRoute(
	`/_authenticated${Routes.Admin.Base}/`,
)({
	component: RouteComponent,
});

function RouteComponent() {
	return <div>Hello from root admin </div>;
}
