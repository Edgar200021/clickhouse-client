import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { cn } from "@/lib/utils";
import { type SignUpSchema, signUpSchema } from "@/schemas/auth/signUp.schema";
import { useSignUpMutation } from "@/store/auth/authApi";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { FieldErrors } from "../ui/FieldErrors";
import { Input } from "../ui/input";

type Props = {
	className?: string;
};

export const SignUpForm = ({ className }: Props) => {
	const {
		handleSubmit,
		formState: { errors, isValid },
		control,
	} = useForm<SignUpSchema>({
		resolver: zodResolver(signUpSchema),
		defaultValues: {
			email: "",
			password: "",
			passwordConfirm: "",
			personalDataConsent: undefined,
		},
	});

	const [signUp, { isLoading }] = useSignUpMutation();

	const onSubmit = (data: SignUpSchema) => {
		signUp({ email: data.email, password: data.password });
	};

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className={cn("p-5 max-w-[600px] w-full mx-auto", className)}
		>
			<h1 className="text-4xl font-bold mb-10">Регистрация</h1>
			<fieldset className="m-0 p-0">
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

					<Controller
						name="passwordConfirm"
						control={control}
						render={({ field: { onChange, value } }) => (
							<div className="flex flex-col gap-y-1">
								<Input
									className="border-0 placeholder:text-[#5a5a5a] py-5 px-4 rounded-3xl focus:border-[1px] focus-visible:ring-0"
									placeholder="Повторите пароль"
									type="password"
									required
									onChange={onChange}
									value={value}
								/>

								{errors.passwordConfirm?.message && (
									<FieldErrors error={errors.passwordConfirm.message} />
								)}
							</div>
						)}
					/>
				</div>

				<Controller
					name="personalDataConsent"
					control={control}
					render={({ field: { onChange, value } }) => (
						<label className="flex gap-x-2 mb-9 w-2/3 items-start cursor-pointer">
							<Checkbox
								className="border-4 w-4 h-4 rounded-[4px] cursor-pointer"
								checked={value}
								onCheckedChange={onChange}
								required
							/>
							<span className="text-sm text-[#5a5a5a]">
								Я даю согласие на обработку персональных данных
							</span>
						</label>
					)}
				/>
				<Button
					disabled={isLoading || !isValid}
					className="bg-orange-400 text-white rounded-3xl cursor-pointer px-5 py-6 w-full disabled:bg-black/30"
				>
					Регистрация
				</Button>
			</fieldset>
		</form>
	);
};
