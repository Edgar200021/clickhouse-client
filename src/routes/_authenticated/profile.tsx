import { createFileRoute } from "@tanstack/react-router";
import { Routes } from "@/const/routes";

export const Route = createFileRoute(`/_authenticated${Routes.Profile}`)({
	component: RouteComponent,
});

function RouteComponent() {
	return <div>Hello "/_authenticated/profile"!</div>;
}
