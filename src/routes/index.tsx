import { createFileRoute } from "@tanstack/react-router";
import { Routes } from "@/const/routes";

export const Route = createFileRoute(Routes.Main)({
	component: Index,
});

function Index() {
	return <h3>Welcome Home!</h3>;
}
