import { createLazyFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { OAuth2 } from "@/components/Auth/OAuth2";
import { SignUpForm } from "@/components/forms/auth/SignUpForm";
import { Notification } from "@/components/Notification";
import { Routes } from "@/const/routes";

export const Route = createLazyFileRoute(
	`/_regularLayout${Routes.Auth.SignUp}`,
)({
	component: RouteComponent,
});

function RouteComponent() {
	const [email, setEmail] = useState<null | string>(null);

	return (
		<div className="flex h-full items-center pt-48  flex-col gap-y-5 max-w-[600px] mx-auto  max-[800px]:pt-32">
			{email && (
				<Notification
					pretty
					variant={{
						type: "signUpSuccess",
						email,
					}}
				/>
			)}

			{!email && (
				<>
					<SignUpForm onSuccess={setEmail} className="px-0" />

					<div className="flex items-center justify-between gap-x-5 w-full mb-8">
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

					<OAuth2 className="w-full gap-y-5" />
				</>
			)}
		</div>
	);
}
