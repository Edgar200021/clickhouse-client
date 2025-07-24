import { createLazyFileRoute, Link } from "@tanstack/react-router";
import { SignUpForm } from "@/components/forms/SignUpForm";
import { Routes } from "@/const/routes";

export const Route = createLazyFileRoute(Routes.Auth.SignUp)({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div className="flex h-full items-center pt-48  flex-col gap-y-5 max-w-[600px] mx-auto">
			<SignUpForm className="px-0" />

			<div className="flex items-center justify-between gap-x-5 w-full">
				<Link
					to={Routes.Auth.SignIn}
					className="cursor-pointer p-0 text-[#5a5a5a]"
				>
					Вход
				</Link>
				<Link
					to={Routes.Auth.ForgotPassword}
					className="cursor-pointer p-0 text-[#5a5a5a]"
				>
					Восстановление пароля
				</Link>
			</div>
		</div>
	);
}
