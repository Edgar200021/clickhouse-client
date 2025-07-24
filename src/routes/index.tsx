import { Routes } from "@/const/routes";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(Routes.Main)({
	component: Index,
});

function Index() {
	return <h3>Welcome Home!</h3>;
}
