import { createLazyFileRoute } from "@tanstack/react-router";
import { Routes } from "@/const/routes";

export const Route = createLazyFileRoute(Routes.Contacts)({
	component: RouteComponent,
});

function RouteComponent() {
	return <div>Hello "/contacts"!</div>;
}
