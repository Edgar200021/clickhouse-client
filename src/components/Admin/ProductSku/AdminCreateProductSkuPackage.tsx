import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { FieldErrors } from "@/components/ui/FieldErrors";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import {
	type ProductSkuPackageSchema,
	productSkuPackageSchema,
} from "@/schemas/api/productSku/createProductSku.schema";

type Props = {
	className?: string;
	onCreate: (productSkuPackage: ProductSkuPackageSchema) => void;
	disabled?: boolean;
};

export const AdminCreateProductSkuPackage = ({
	className,
	onCreate,
	disabled,
}: Props) => {
	const {
		control,
		handleSubmit,
		formState: { isLoading, errors, isValid },
		reset,
	} = useForm({
		resolver: zodResolver(productSkuPackageSchema),
		defaultValues: {
			id: crypto.randomUUID(),
		},
	});

	const onSubmit = (data: ProductSkuPackageSchema) => {
		onCreate(data);
		reset({
			id: crypto.randomUUID(),
			height: 0,
			length: 0,
			quantity: 0,
			weight: 0,
			width: 0,
		});
	};

	return (
		<>
			<div className={cn("mb-2 grid grid-cols-2 gap-8", className)}>
				<Controller
					name="length"
					control={control}
					render={({ field }) => (
						<div className="flex flex-col gap-y-1">
							{/** biome-ignore lint/a11y/noLabelWithoutControl: <explanation> */}
							<label className="flex flex-col gap-y-3">
								<span className="text-xl">Длина</span>
								<Input
									type="number"
									className="border-[1px] border-[#dbdcde] !text-2xl text-[#89868d] py-8 px-6 rounded-md bg-[#f4f5f9]"
									required
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
							{errors.length?.message && (
								<FieldErrors error={errors.length.message} />
							)}
						</div>
					)}
				/>
				<Controller
					name="height"
					control={control}
					render={({ field }) => (
						<div className="flex flex-col gap-y-1">
							{/** biome-ignore lint/a11y/noLabelWithoutControl: <explanation> */}
							<label className="flex flex-col gap-y-3">
								<span className="text-xl">Высота</span>
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
							{errors.height?.message && (
								<FieldErrors error={errors.height.message} />
							)}
						</div>
					)}
				/>
				<Controller
					name="width"
					control={control}
					render={({ field }) => (
						<div className="flex flex-col gap-y-1">
							{/** biome-ignore lint/a11y/noLabelWithoutControl: <explanation> */}
							<label className="flex flex-col gap-y-3">
								<span className="text-xl">Ширина</span>
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

							{errors.width?.message && (
								<FieldErrors error={errors.width.message} />
							)}
						</div>
					)}
				/>

				<Controller
					name="weight"
					control={control}
					render={({ field }) => (
						<div className="flex flex-col gap-y-1">
							{/** biome-ignore lint/a11y/noLabelWithoutControl: <explanation> */}
							<label className="flex flex-col gap-y-3">
								<span className="text-xl">Вес</span>
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

							{errors.weight?.message && (
								<FieldErrors error={errors.weight.message} />
							)}
						</div>
					)}
				/>
				<Controller
					name="quantity"
					control={control}
					render={({ field }) => (
						<div className="flex flex-col gap-y-1">
							{/** biome-ignore lint/a11y/noLabelWithoutControl: <explanation> */}
							<label className="flex flex-col gap-y-3">
								<span className="text-xl">Количество</span>
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

							{errors.quantity?.message && (
								<FieldErrors error={errors.quantity.message} />
							)}
						</div>
					)}
				/>
			</div>
			<Button
				type="button"
				onClick={handleSubmit(onSubmit)}
				disabled={!isValid || isLoading || disabled}
				variant="default"
				className="block bg-orange-400 hover:bg-orange-500 cursor-pointer w-full !min-w-[150px] max-w-fit py-2 h-fit text-xl"
			>
				Создать упаковку
			</Button>
		</>
	);
};
