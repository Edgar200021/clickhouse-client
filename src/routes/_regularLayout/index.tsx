import { createFileRoute } from "@tanstack/react-router";
import { Routes } from "@/const/routes";

export const Route = createFileRoute(`/_regularLayout${Routes.Main}`)({
	component: Index,
});

function Index() {
	return <div className="flex items-center justify-center"></div>;
}
