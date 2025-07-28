import { cn } from "@/lib/utils";

export type NotificationVariants =
	| {
			type: "signUpSuccess" | "forgotPasswordSuccess";
			email: string;
	  }
	| {
			type: "resetPasswordSuccess";
	  }
	| {
			type: "accountVerificationSuccess";
	  };

type Props = {
	className?: string;
	pretty?: boolean;
	variant: NotificationVariants;
};

const getMessages = (
	variant: NotificationVariants,
): { heading: string; messages: string[] } => {
	switch (variant.type) {
		case "signUpSuccess":
		case "forgotPasswordSuccess": {
			const isSignUp = variant.type === "signUpSuccess";
			return {
				heading: `${isSignUp ? "Регистрация" : "Восстановление пароля"} практически завершена`,
				messages: [
					`Мы отправили письмо на указанный почтовый ящик ${variant.email}`,
					`Пройдите по ссылке из письма для ${isSignUp ? "завершения регистрации." : "сброса пароля."}`,
				],
			};
		}
		case "resetPasswordSuccess":
			return {
				heading: "Сброс пароля завершена",
				messages: ["Теперь вы можете войти в аккаунт, используя новый пароль."],
			};

		case "accountVerificationSuccess":
			return {
				heading: "Аккаунт успешно подтвержден",
				messages: [
					"Теперь вы можете пользоваться всеми функциями платформы.",
					"Войдите в аккаунт и начните пользоваться сервисом.",
				],
			};
		default: {
			const _exhaustiveCheck: never = variant;
			return _exhaustiveCheck;
		}
	}
};

export const Notification = ({ className, variant, pretty = false }: Props) => {
	const { heading, messages } = getMessages(variant);

	if (pretty)
		return (
			<div
				className={cn(
					"flex flex-col gap-y-8 max-w-[600px] mx-auto shadow-2xl rounded-2xl text-center p-10",
					className,
				)}
			>
				<p className="text-4xl font-bold text-[#1bb40d]">{heading}</p>
				{messages.map((m, i) => (
					<p key={i} className="text-lg text-[#5a5a5a]">
						{m}
					</p>
				))}
			</div>
		);

	return (
		<div
			className={cn("flex flex-col gap-y-8 max-w-[460px] mx-auto", className)}
		>
			<p className="text-4xl font-bold text-[#1bb40d]">{heading}</p>
			{messages.map((m, i) => (
				<p key={i} className="text-lg text-[#5a5a5a]">
					{m}
				</p>
			))}
		</div>
	);
};
