import { zodResolver } from "@hookform/resolvers/zod";
import { type Control, Controller, useForm, useWatch } from "react-hook-form";
import { FullCalendar } from "@/components/FullCalendar";
import { Button } from "@/components/ui/button";
import { FieldErrors } from "@/components/ui/FieldErrors";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { useHandleError } from "@/hooks/useHandleError";
import { cn, getTimezoneOffset } from "@/lib/utils";
import { useCreatePromocodeMutation } from "@/store/admin/adminApi";
import { PromocodeType } from "@/types/promocode";
import {
	type CreatePromocodeSchema,
	createPromocodeSchema,
} from "../../../../schemas/api/promocode/createPromocode.schema";

type Props = {
	className?: string;
	onSuccess?: () => void;
};

export const CreatePromocodeForm = ({ className, onSuccess }: Props) => {
	const {
		handleSubmit,
		formState: { errors, isValid },
		reset,
		control,
	} = useForm<CreatePromocodeSchema>({
		resolver: zodResolver(createPromocodeSchema),
		defaultValues: {
			code: "",
			type: PromocodeType.Fixed,
			discountValue: 0,
			usageLimit: 0,
		},
	});

	const [createPromocode, { isLoading, error }] = useCreatePromocodeMutation();

	const { apiValidationErrors, clearError } =
		useHandleError<(keyof CreatePromocodeSchema)[]>(error);

	const onSubmit = async (data: CreatePromocodeSchema) => {
		clearError();
		await createPromocode(data).unwrap();
		reset({
			code: "",
			type: PromocodeType.Fixed,
			discountValue: 0,
			usageLimit: 0,
		});

		onSuccess?.();
	};

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className={cn(
				"p-8 max-w-[1050px] w-full mx-auto rounded-xl shadow-md bg-white",
				className,
			)}
		>
			<fieldset disabled={isLoading} className="m-0 p-0 flex flex-col gap-y-10">
				<h1 className="text-center font-medium text-3xl">Создание промокода</h1>
				<div className="mb-9 grid grid-cols-2 gap-8">
					<Controller
						name="code"
						control={control}
						render={({ field: { onChange, value } }) => (
							<div className="flex flex-col gap-y-1">
								{/** biome-ignore lint/a11y/noLabelWithoutControl: <explanation> */}
								<label className="flex flex-col gap-y-3">
									<span className="text-xl">Код</span>
									<Input
										className="border-[1px] border-[#dbdcde] !text-2xl text-[#89868d] py-8 px-6 rounded-md bg-[#f4f5f9] focus:border-[1px] focus-visible:ring-0 "
										required
										onChange={onChange}
										value={value}
									/>
								</label>
								{(errors.code?.message || apiValidationErrors.code) && (
									<FieldErrors
										error={errors.code?.message || apiValidationErrors.code!}
									/>
								)}
							</div>
						)}
					/>

					<Controller
						name="discountValue"
						control={control}
						render={({ field }) => (
							<div className="flex flex-col gap-y-1">
								{/** biome-ignore lint/a11y/noLabelWithoutControl: <explanation> */}
								<label className="flex flex-col gap-y-3">
									<span className="text-xl">Скидка</span>
									<Input
										type="number"
										className="border-[1px] border-[#dbdcde] text-[#89868d] !text-2xl py-8 px-6 rounded-md bg-[#f4f5f9]"
										value={field.value ?? ""}
										onChange={(e) =>
											field.onChange(
												e.target.value === ""
													? undefined
													: e.target.valueAsNumber,
											)
										}
									/>
								</label>
								{(errors.discountValue?.message ||
									apiValidationErrors.discountValue) && (
									<FieldErrors
										error={
											errors.discountValue?.message ||
											apiValidationErrors.discountValue!
										}
									/>
								)}
							</div>
						)}
					/>

					<Controller
						name="usageLimit"
						control={control}
						render={({ field }) => (
							<div className="flex flex-col gap-y-1">
								{/** biome-ignore lint/a11y/noLabelWithoutControl: <explanation> */}
								<label className="flex flex-col gap-y-3">
									<span className="text-xl">Количество использований</span>
									<Input
										type="number"
										className="border-[1px] border-[#dbdcde] text-[#89868d] !text-2xl py-8 px-6 rounded-md bg-[#f4f5f9]"
										value={field.value ?? ""}
										onChange={(e) =>
											field.onChange(
												e.target.value === ""
													? undefined
													: e.target.valueAsNumber,
											)
										}
									/>
								</label>
								{(errors.usageLimit?.message ||
									apiValidationErrors.usageLimit) && (
									<FieldErrors
										error={
											errors.usageLimit?.message ||
											apiValidationErrors.usageLimit!
										}
									/>
								)}
							</div>
						)}
					/>

					<Controller
						name="type"
						control={control}
						render={({ field: { onChange, value } }) => (
							<div className="flex flex-col gap-y-1">
								{/** biome-ignore lint/a11y/noLabelWithoutControl: <explanation> */}
								<label className="flex flex-col gap-y-3">
									<span className="text-xl">Тип</span>
									<Select
										onValueChange={onChange}
										value={value}
										defaultValue="null"
									>
										<SelectTrigger className="w-full cursor-pointer py-8 px-6  text-2xl text-[#89868d] bg-[#f4f5f9]">
											<SelectValue />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="null" className="text-2xl">
												Выберите тип
											</SelectItem>
											<SelectItem
												className="text-2xl"
												value={PromocodeType.Fixed}
											>
												Фиксированная
											</SelectItem>
											<SelectItem
												className="text-2xl"
												value={PromocodeType.Percent}
											>
												Процентная
											</SelectItem>
										</SelectContent>
									</Select>
								</label>
								{(errors.type?.message || apiValidationErrors.type) && (
									<FieldErrors
										error={errors.type?.message || apiValidationErrors.type!}
									/>
								)}
							</div>
						)}
					/>

					<SelectDate control={control} />
				</div>
			</fieldset>

			<Button
				disabled={!isValid || isLoading}
				type={"submit"}
				variant="default"
				className="block bg-orange-400 hover:bg-orange-500 cursor-pointer w-full !min-w-[150px] max-w-fit py-2 h-fit ml-auto text-xl"
			>
				Добавить промокод
			</Button>
		</form>
	);
};

const SelectDate = ({
	control,
}: {
	control: Control<CreatePromocodeSchema>;
}) => {
	const { validFrom, validTo } = useWatch({ control });

	return (
		<>
			<Controller
				name="validFrom"
				control={control}
				render={({ field }) => {
					return (
						<div className="flex flex-col gap-y-5">
							<span className="text-xl">Дата начала действия</span>
							<FullCalendar
								date={field.value ? new Date(field.value) : undefined}
								setDate={(date) => {
									if (!date) return;
									if (validTo && date.getTime() > new Date(validTo).getTime())
										return;

									field.onChange(date.toISOString());
								}}
							/>
						</div>
					);
				}}
			/>

			<Controller
				name="validTo"
				control={control}
				render={({ field }) => {
					return (
						<div className="flex flex-col gap-y-5">
							<span className="text-xl">Дата окончания действия</span>
							<FullCalendar
								date={field.value ? new Date(field.value) : undefined}
								setDate={(date) => {
									if (!date) return;
									if (
										validFrom &&
										date.getTime() < new Date(validFrom).getTime()
									)
										return;

									field.onChange(date.toISOString());
								}}
							/>
						</div>
					);
				}}
			/>
		</>
	);
};
