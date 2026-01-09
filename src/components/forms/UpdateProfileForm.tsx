import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "@tanstack/react-router";
import { Controller, useForm } from "react-hook-form";
import { Routes } from "@/const/routes";
import { useHandleError } from "@/hooks/useHandleError";
import { cn } from "@/lib/utils";
import {
	type UpdateProfileSchema,
	updateProfileSchema,
} from "@/schemas/api/user/updateProfile.schema";
import { useLogoutMutation } from "@/store/auth/authApi";
import { Button } from "../ui/button";
import { FieldErrors } from "../ui/FieldErrors";
import { Input } from "../ui/input";

type Props = {
	className?: string;
};

export const UpdateProfileForm = ({ className }: Props) => {
	const {
		handleSubmit,
		formState: { errors, isValid },
		control,
	} = useForm<UpdateProfileSchema>({
		resolver: zodResolver(updateProfileSchema),
		defaultValues: {
			email: "",
			password: "",
			passwordConfirm: "",
		},
	});

	const [logout, { isLoading, error }] = useLogoutMutation();
	const navigate = useNavigate();

	useHandleError(error);

	const handleLogout = async () => {
		await logout(null).unwrap();
		navigate({
			to: Routes.Main,
		});
	};

	const onSubmit = (data: UpdateProfileSchema) => {};

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className={cn("p-5 max-w-[600px] w-full mx-auto", className)}
		>
			<h1 className="text-4xl font-bold mb-10 capitalize">Личный Кабинет</h1>
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

				<Button
					// disabled={isLoading || !isValid}
					disabled={!isValid}
					className="bg-orange-400 text-white rounded-3xl cursor-pointer mb-5 px-5 py-6 w-full disabled:bg-black/30"
				>
					Сохранить
				</Button>

				<div className="flex items-center justify-between gap-x-4">
					<Link
						to={Routes.Orders.Base}
						className="cursor-pointer text-[#5a5a5a] hover:text-orange-400"
						// variant="ghost"
					>
						Мои заказы
					</Link>
					<Button
						onClick={handleLogout}
						className="cursor-pointer text-[#5a5a5a] hover:text-orange-400"
						variant="ghost"
					>
						Выход
					</Button>
				</div>
			</fieldset>
		</form>
	);
};
