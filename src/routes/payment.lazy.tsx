import { createLazyFileRoute } from "@tanstack/react-router";
import { Routes } from "@/const/routes";

export const Route = createLazyFileRoute(Routes.Payment)({
	component: RouteComponent,
});

function RouteComponent() {
	return <div>Hello "/payment"!</div>;
}
