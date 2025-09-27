import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { FieldErrors } from "@/components/ui/FieldErrors";
import { Input } from "@/components/ui/input";
import { useHandleError } from "@/hooks/useHandleError";
import { cn } from "@/lib/utils";

import {
	type UpdateManufacturerSchema,
	updateManufacturerSchema,
} from "@/schemas/api/manufacturer/updateManufacturer.schema";
import { useUpdateManufacturerMutation } from "@/store/admin/adminApi";
import type { Manufacturer } from "@/types/manufacturer";

type Props = {
	className?: string;
	onSuccess?: () => void;
	manufacturer: Manufacturer;
};

export const UpdateManufacturerForm = ({
	className,
	onSuccess,
	manufacturer,
}: Props) => {
	const {
		handleSubmit,
		formState: { errors, isValid },
		control,
	} = useForm<UpdateManufacturerSchema>({
		resolver: zodResolver(updateManufacturerSchema),
		defaultValues: {
			manufacturerId: manufacturer.id,
			name: manufacturer.name,
		},
	});

	const [updateManufacturer, { isLoading, error }] =
		useUpdateManufacturerMutation();
	const { apiValidationErrors, clearError } =
		useHandleError<(keyof UpdateManufacturerSchema)[]>(error);

	const onSubmit = async (data: UpdateManufacturerSchema) => {
		clearError();
		await updateManufacturer(data).unwrap();

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
				<h1 className="text-center font-medium text-3xl">
					Обновить производителя
				</h1>
				<Controller
					name="name"
					control={control}
					render={({ field: { onChange, value } }) => (
						<div className="flex flex-col gap-y-1">
							{/** biome-ignore lint/a11y/noLabelWithoutControl: <explanation> */}
							<label className="flex flex-col gap-y-3">
								<span className="text-xl">Название</span>
								<Input
									className="border-[1px] border-[#dbdcde] !text-2xl text-[#89868d] py-8 px-6 rounded-md bg-[#f4f5f9] focus:border-[1px] focus-visible:ring-0 "
									required
									onChange={onChange}
									value={value}
								/>
							</label>
							{(errors.name?.message || apiValidationErrors.name) && (
								<FieldErrors
									error={errors.name?.message || apiValidationErrors.name!}
								/>
							)}
						</div>
					)}
				/>

				<Button
					disabled={!isValid}
					type={"submit"}
					variant="default"
					className="block bg-orange-400 hover:bg-orange-500 cursor-pointer w-full !min-w-[150px] max-w-fit py-2 h-fit ml-auto text-xl"
				>
					Обновить производителя
				</Button>
			</fieldset>
		</form>
	);
};
