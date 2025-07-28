import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { cn } from "@/lib/utils";
import {
	type ForgotPasswordSchema,
	forgotPassowrdSchema,
} from "@/schemas/api/auth/forgotPassword.schema";
import { useForgotPasswordMutation } from "@/store/auth/authApi";
import { Button } from "../ui/button";
import { FieldErrors } from "../ui/FieldErrors";
import { Input } from "../ui/input";

type Props = {
	className?: string;
	onSuccess?: (email: string) => void;
};

export const ForgotPasswordForm = ({ className, onSuccess }: Props) => {
	const {
		handleSubmit,
		formState: { errors, isValid },
		control,
	} = useForm<ForgotPasswordSchema>({
		resolver: zodResolver(forgotPassowrdSchema),
		defaultValues: {
			email: "",
		},
	});

	const [forgotPassword, { isLoading }] = useForgotPasswordMutation();

	const onSubmit = async (data: ForgotPasswordSchema) => {
		await forgotPassword(data).unwrap();
		onSuccess?.(data.email);
	};

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className={cn("p-5 max-w-[600px] w-full mx-auto", className)}
		>
			<h1 className="text-4xl font-bold mb-10">Восстановление пароля</h1>
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
				</div>

				<Button
					disabled={isLoading || !isValid}
					className="bg-orange-400 text-white rounded-3xl cursor-pointer px-5 py-6 w-full disabled:bg-black/30"
				>
					Восстановить пароль
				</Button>
			</fieldset>
		</form>
	);
};
