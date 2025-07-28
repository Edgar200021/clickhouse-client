import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "@tanstack/react-router";
import { Controller, useForm } from "react-hook-form";
import { Routes } from "@/const/routes";
import { cn } from "@/lib/utils";
import {
	type SignInSchema,
	signInSchema,
} from "@/schemas/api/auth/signIn.schema";
import { useSignInMutation } from "@/store/auth/authApi";
import { Button } from "../ui/button";
import { FieldErrors } from "../ui/FieldErrors";
import { Input } from "../ui/input";

type Props = {
	className?: string;
	onSuccess?: () => void;
};

export const SignInForm = ({ className, onSuccess }: Props) => {
	const {
		handleSubmit,
		formState: { errors, isValid },
		control,
	} = useForm<SignInSchema>({
		resolver: zodResolver(signInSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const [signIn, { isLoading }] = useSignInMutation();

	const onSubmit = async (data: SignInSchema) => {
		await signIn(data).unwrap();
		onSuccess?.();
	};

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className={cn("p-5 max-w-[600px] w-full mx-auto", className)}
		>
			<h1 className="text-4xl font-bold mb-10">Вход</h1>
			<fieldset disabled={isLoading} className="m-0 p-0">
				<div className="mb-9 flex flex-col gap-y-3">
					<Controller
						name="email"
						control={control}
						render={({ field: { onChange, value } }) => (
							<div className="flex flex-col gap-y-1">
								<Input
									className="border-0 placeholder:text-[#5a5a5a] py-5 px-4 rounded-3xl focus:border-[1px] focus-visible:ring-0 "
									placeholder="Email"
									type="email"
									required
									onChange={onChange}
									value={value}
								/>
								{errors.email?.message && (
									<FieldErrors error={errors.email.message} />
								)}
							</div>
						)}
					/>

					<Controller
						name="password"
						control={control}
						render={({ field: { onChange, value, ...rest } }) => (
							<div className="flex flex-col gap">
								<Input
									className="border-0 placeholder:text-[#5a5a5a] py-5 px-4 rounded-3xl focus:border-[1px] focus-visible:ring-0"
									placeholder="Пароль"
									type="password"
									required
									{...rest}
									onChange={onChange}
									value={value}
								/>

								{errors.password?.message && (
									<FieldErrors error={errors.password.message} />
								)}
							</div>
						)}
					/>
				</div>

				<Button
					disabled={isLoading || !isValid}
					className="bg-orange-400 text-white rounded-3xl cursor-pointer px-5 py-6 w-full disabled:bg-black/30"
				>
					Войти
				</Button>
			</fieldset>
		</form>
	);
};
