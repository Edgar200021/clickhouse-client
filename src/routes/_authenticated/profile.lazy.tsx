import { createLazyFileRoute } from "@tanstack/react-router";
import { UpdateProfileForm } from "@/components/forms/UpdateProfileForm";
import { Routes } from "@/const/routes";

export const Route = createLazyFileRoute(`/_authenticated${Routes.Profile}`)({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div className="flex h-full items-center pt-48 flex-col gap-y-5 max-w-[600px] mx-auto  max-[800px]:pt-32">
			<UpdateProfileForm />
		</div>
	);
}
