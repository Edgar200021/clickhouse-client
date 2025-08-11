import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { FieldErrors } from "@/components/ui/FieldErrors";
import { Input } from "@/components/ui/input";
import { useHandleError } from "@/hooks/useHandleError";
import { cn } from "@/lib/utils";
import {
	type SignUpSchema,
	signUpSchema,
} from "@/schemas/api/auth/signUp.schema";
import { useSignUpMutation } from "@/store/auth/authApi";

type Props = {
	className?: string;
	onSuccess?: (email: string) => void;
};

export const SignUpForm = ({ className, onSuccess }: Props) => {
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

	const [signUp, { isLoading, error }] = useSignUpMutation();
	const { apiValidationErrors } =
		useHandleError<
			(keyof Omit<SignUpSchema, "passwordConfirm" | "personalDataConsent">)[]
		>(error);

	const onSubmit = async (data: SignUpSchema) => {
		await signUp({ email: data.email, password: data.password }).unwrap();
		onSuccess?.(data.email);
	};

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className={cn("p-5 max-w-[600px] w-full mx-auto", className)}
		>
			<h1 className="text-4xl font-bold mb-10">Регистрация</h1>
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
								{(errors.email?.message || apiValidationErrors.email) && (
									<FieldErrors
										error={errors.email?.message || apiValidationErrors.email!}
									/>
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
									onPaste={(e) => {
										e.preventDefault();
										return false;
									}}
									onCopy={(e) => {
										e.preventDefault();
										return false;
									}}
									value={value}
								/>

								{(errors.password?.message || apiValidationErrors.password) && (
									<FieldErrors
										error={
											errors.password?.message || apiValidationErrors.password!
										}
									/>
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
									onPaste={(e) => {
										e.preventDefault();
										return false;
									}}
									onCopy={(e) => {
										e.preventDefault();
										return false;
									}}
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
						// biome-ignore lint/a11y/noLabelWithoutControl: <explanation>
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
