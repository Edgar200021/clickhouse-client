import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { FieldErrors } from "@/components/ui/FieldErrors";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import {
	type ResetPasswordSchema,
	resetPasswordSchema,
} from "@/schemas/api/auth/resetPassword.schema";
import { useResetPasswordMutation } from "@/store/auth/authApi";

type Props = {
	className?: string;
	onSuccess?: () => void;
	token: string;
};

export const ResetPasswordForm = ({ className, onSuccess, token }: Props) => {
	const {
		handleSubmit,
		formState: { errors, isValid },
		control,
	} = useForm<ResetPasswordSchema>({
		resolver: zodResolver(resetPasswordSchema),
		defaultValues: {
			newPassword: "",
			newPasswordConfirm: "",
			token,
		},
	});

	const [resetPassword, { isLoading }] = useResetPasswordMutation();

	const onSubmit = async (data: ResetPasswordSchema) => {
		await resetPassword({
			newPassword: data.newPassword,
			token: data.token,
		}).unwrap();
		onSuccess?.();
	};

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className={cn("p-5 max-w-[600px] w-full mx-auto", className)}
		>
			<h1 className="text-4xl font-bold mb-10">Сброс пароля</h1>
			<fieldset disabled={isLoading} className="m-0 p-0">
				<div className="mb-9 flex flex-col gap-y-3">
					<Controller
						name="newPassword"
						control={control}
						render={({ field: { onChange, value } }) => (
							<div className="flex flex-col gap-y-1">
								<Input
									className="border-0 placeholder:text-[#5a5a5a] py-5 px-4 rounded-3xl focus:border-[1px] focus-visible:ring-0 "
									placeholder="Пароль"
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
								{errors.newPassword?.message && (
									<FieldErrors error={errors.newPassword.message} />
								)}
							</div>
						)}
					/>

					<Controller
						name="newPasswordConfirm"
						control={control}
						render={({ field: { onChange, value } }) => (
							<div className="flex flex-col gap-y-1">
								<Input
									className="border-0 placeholder:text-[#5a5a5a] py-5 px-4 rounded-3xl focus:border-[1px] focus-visible:ring-0 "
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
								{errors.newPasswordConfirm?.message && (
									<FieldErrors error={errors.newPasswordConfirm.message} />
								)}
							</div>
						)}
					/>
				</div>

				<Button
					disabled={isLoading || !isValid}
					className="bg-orange-400 text-white rounded-3xl cursor-pointer px-5 py-6 w-full disabled:bg-black/30"
				>
					Сбросить пароль
				</Button>
			</fieldset>
		</form>
	);
};
