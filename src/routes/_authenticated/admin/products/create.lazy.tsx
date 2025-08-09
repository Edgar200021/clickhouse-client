import { createLazyFileRoute } from "@tanstack/react-router";
import { Routes } from "@/const/routes";

export const Route = createLazyFileRoute(
	`/_authenticated${Routes.Admin.ProductsCreate}`,
)({
	component: RouteComponent,
});

function RouteComponent() {
	return <div>Hello "/_authenticated/admin/products/create"!</div>;
}
