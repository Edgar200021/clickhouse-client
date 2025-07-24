import { createLazyFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { SignInForm } from "@/components/forms/SignInForm";
import { Routes } from "@/const/routes";

export const Route = createLazyFileRoute(Routes.Auth.SignIn)({
	component: RouteComponent,
});

function RouteComponent() {
	const { redirect } = Route.useSearch();
	const navigate = useNavigate();

	return (
		<div className="flex h-full items-center pt-48 flex-col gap-y-5 max-w-[600px] mx-auto">
			<SignInForm
				onSuccess={() =>
					navigate({
						to: redirect ? redirect : Routes.Profile,
						replace: !!redirect,
						...(redirect
							? { search: (prev) => ({ ...prev, redirect: undefined }) }
							: {}),
					})
				}
				className="px-0"
			/>

			<div className="flex items-center justify-between gap-x-5 w-full">
				<Link
					to={Routes.Auth.SignUp}
					className="cursor-pointer p-0 text-[#5a5a5a]"
				>
					Регистрация
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
