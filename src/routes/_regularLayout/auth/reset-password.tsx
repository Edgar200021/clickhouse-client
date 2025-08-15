import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ResetPasswordForm } from "@/components/forms/auth/ResetPasswordForm";
import { Notification } from "@/components/Notification";
import { Routes } from "@/const/routes";
import { resetPasswordSearchParams } from "@/schemas/searchParams/resetPasswordSearchParams.schema";

export const Route = createFileRoute(
	`/_regularLayout${Routes.Auth.ResetPassword}`,
)({
	component: RouteComponent,
	validateSearch: resetPasswordSearchParams,
});

function RouteComponent() {
	const { token } = Route.useSearch();
	const [isFinished, setIsFinished] = useState(false);

	return (
		<div className="flex h-full items-center pt-48 flex-col gap-y-5 max-w-[600px] mx-auto  max-[800px]:pt-32">
			{!isFinished && (
				<ResetPasswordForm
					onSuccess={() => setIsFinished(true)}
					token={token}
				/>
			)}
			{isFinished && (
				<Notification
					pretty
					variant={{
						type: "resetPasswordSuccess",
					}}
				/>
			)}
		</div>
	);
}
