import { createLazyFileRoute, Link } from "@tanstack/react-router";
import { ForgotPasswordForm } from "@/components/forms/ForgotPasswordForm";
import { Routes } from "@/const/routes";

export const Route = createLazyFileRoute(Routes.Auth.ForgotPassword)({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div className="flex h-full items-center pt-48 flex-col gap-y-5 max-w-[600px] mx-auto">
			<ForgotPasswordForm className="px-0" />

			<div className="flex items-center justify-between gap-x-5 w-full">
				<Link
					to={Routes.Auth.SignIn}
					className="cursor-pointer p-0 text-[#5a5a5a]"
				>
					Вход
				</Link>
				<Link
					to={Routes.Auth.SignUp}
					className="cursor-pointer p-0 text-[#5a5a5a]"
				>
					Регистрация
				</Link>
			</div>
		</div>
	);
}
