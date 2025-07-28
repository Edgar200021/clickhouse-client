import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { Notification } from "@/components/Notification";
import { Spinner } from "@/components/ui/Spinner";
import { Routes } from "@/const/routes";
import { accountverificationSearchParams } from "@/schemas/searchParams/accountVerificationSearchParams";
import { useAccountVerificationMutation } from "@/store/auth/authApi";

export const Route = createFileRoute(Routes.Auth.AccountVerification)({
	component: RouteComponent,
	validateSearch: accountverificationSearchParams,
});

function RouteComponent() {
	const { token } = Route.useSearch();
	const [veirfyAccount, { isLoading }] = useAccountVerificationMutation();

	useEffect(() => {
		veirfyAccount({ token });
	}, [token]);

	if (isLoading)
		return (
			<div className="min-h-screen flex items-center justify-center backdrop-blur-3xl">
				<Spinner size="lg" />
			</div>
		);

	return (
		<div className="flex h-full items-center pt-48 flex-col gap-y-5 max-w-[600px] mx-auto max-[800px]:pt-32">
			<Notification pretty variant={{ type: "accountVerificationSuccess" }} />
		</div>
	);
}
