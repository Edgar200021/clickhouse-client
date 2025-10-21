import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import {
	type Control,
	Controller,
	type UseFormSetValue,
	useForm,
	useWatch,
} from "react-hook-form";
import toast from "react-hot-toast";
import { FilePicker } from "@/components/FilePicker";
import { ImageFilePreview } from "@/components/FilePreview/FilePreview";
import { MultiStepFormButtons } from "@/components/MultiStepFormButtons";
import { Steps } from "@/components/Steps";
import { FieldErrors } from "@/components/ui/FieldErrors";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	ProductSkuImageMaxSize,
	ProductSkuImagesMaxLength,
	ProductSkuPackagesMaxLength,
	ProductSkuPackagesMinLength,
} from "@/const/schema";
import { useHandleError } from "@/hooks/useHandleError";
import { cn } from "@/lib/utils";
import {
	type CreateProductSkuSchema,
	createProductSkuSchema,
} from "@/schemas/api/productSku/createProductSku.schema";
import { useCreateProductSkuMutation } from "@/store/admin/adminApi";
import { Currency } from "@/types/currency.enum";
import type { ProductAdmin } from "@/types/product";
import { AdminCreateProductSkuPackage } from "../../ProductSku/AdminCreateProductSkuPackage";
import { AdminProductSkuPackageList } from "../../ProductSku/AdminProductSkuPackageList";

type Props = {
	className?: string;
	onSuccess?: () => void;
	productAdmin: ProductAdmin;
};

export const CreateProductSkuForm = ({
	className,
	onSuccess,
	productAdmin,
}: Props) => {
	const {
		handleSubmit,
		formState: { errors },
		setValue,
		reset,
		control,
	} = useForm<CreateProductSkuSchema>({
		resolver: zodResolver(createProductSkuSchema),
		defaultValues: {
			productId: productAdmin.id,
			quantity: 0,
			width: 0,
			height: 0,
			length: 0,
			price: 0,
			salePrice: 0,
			weight: 0,
			currency: Currency.Rub,
			color: "",
			images: [],
		},
	});

	const [createProductSku, { isLoading, error }] =
		useCreateProductSkuMutation();

	const [step, setStep] = useState(1);
	const { apiValidationErrors, clearError } = useHandleError<
		(keyof CreateProductSkuSchema)[]
	>(error, {
		validationErrorCb: (err) => {
			if (
				err.quantity ||
				err.color ||
				err.width ||
				err.height ||
				err.length ||
				err.weight
			) {
				setStep(1);
			}

			if (err.price || err.salePrice) {
				setStep(2);
			}

			if (err.images) {
				setStep(3);
			}
		},
	});

	const onSubmit = async (data: CreateProductSkuSchema) => {
		clearError();
		await createProductSku(data).unwrap();

		reset({
			productId: productAdmin.id,
			quantity: 0,
			width: 0,
			height: 0,
			length: 0,
			price: 0,
			salePrice: 0,
			weight: 0,
			currency: Currency.Rub,
			color: "",
			images: undefined,
		});

		setStep(1);
		onSuccess?.();
	};

	return (
		<>
			<Steps
				className="mb-12"
				steps={["Информация продукта", "Упаковки", "Цена", "Медиа"]}
				currentStep={step}
			/>
			<form
				className={cn(
					"p-8 max-w-[1050px] w-full mx-auto rounded-xl shadow-md bg-white",
					className,
				)}
			>
				<fieldset
					disabled={isLoading}
					className="m-0 p-0 flex flex-col gap-y-10"
				>
					<h1 className="text-center font-medium text-3xl">
						{step === 1
							? "Информация продукта"
							: step === 2
								? "Упаковки"
								: step === 3
									? "Цена"
									: "Картинки продукта"}
					</h1>
					{step === 1 && (
						<div className="mb-9 grid grid-cols-2 gap-8">
							<Controller
								name="quantity"
								control={control}
								render={({ field: { onChange, value } }) => (
									<div className="flex flex-col gap-y-1">
										{/** biome-ignore lint/a11y/noLabelWithoutControl: <explanation> */}
										<label className="flex flex-col gap-y-3">
											<span className="text-xl">Количество</span>
											<Input
												className="border-[1px] border-[#dbdcde] text-[#89868d] !text-2xl py-8 px-6 rounded-md bg-[#f4f5f9] focus:border-[1px] focus-visible:ring-0 "
												required
												type="number"
												value={value}
												onChange={(e) =>
													onChange(
														e.target.value === ""
															? undefined
															: Number(e.target.value),
													)
												}
											/>
										</label>

										{(errors.quantity?.message ||
											apiValidationErrors.quantity) && (
											<FieldErrors
												error={
													errors.quantity?.message ||
													apiValidationErrors.quantity!
												}
											/>
										)}
									</div>
								)}
							/>

							<Controller
								name="color"
								control={control}
								render={({ field: { onChange, value } }) => (
									<div className="flex flex-col gap-y-1">
										{/** biome-ignore lint/a11y/noLabelWithoutControl: <explanation> */}
										<label className="flex flex-col gap-y-3">
											<span className="text-xl">Цвет</span>
											<Input
												className="border-[1px] border-[#dbdcde] text-[#89868d] !text-2xl py-8 px-6 rounded-md bg-[#f4f5f9] focus:border-[1px] focus-visible:ring-0 "
												required
												value={value}
												onChange={(e) =>
													onChange(
														e.target.value === "" ? undefined : e.target.value,
													)
												}
											/>
										</label>

										{(errors.color?.message || apiValidationErrors.color) && (
											<FieldErrors
												error={
													errors.color?.message || apiValidationErrors.color!
												}
											/>
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
										{(errors.width?.message || apiValidationErrors.width) && (
											<FieldErrors
												error={
													errors.width?.message || apiValidationErrors.width!
												}
											/>
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
										{(errors.height?.message || apiValidationErrors.height) && (
											<FieldErrors
												error={
													errors.height?.message || apiValidationErrors.height!
												}
											/>
										)}
									</div>
								)}
							/>

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
										{(errors.length?.message || apiValidationErrors.length) && (
											<FieldErrors
												error={
													errors.length?.message || apiValidationErrors.length!
												}
											/>
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
											<span className="text-xl">Вес (Опционально)</span>
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
										{(errors.weight?.message || apiValidationErrors.weight) && (
											<FieldErrors
												error={
													errors.weight?.message || apiValidationErrors.weight!
												}
											/>
										)}
									</div>
								)}
							/>
						</div>
					)}
					{step === 2 && (
						<CreatePackage control={control} setValue={setValue} />
					)}
					{step === 3 && (
						<div className="mb-9 grid grid-cols-2 gap-8">
							<Controller
								name="price"
								control={control}
								render={({ field }) => (
									<div className="flex flex-col gap-y-1">
										{/** biome-ignore lint/a11y/noLabelWithoutControl: <explanation> */}
										<label className="flex flex-col gap-y-3">
											<span className="text-xl">Цена</span>
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
										{(errors.price?.message || apiValidationErrors.price) && (
											<FieldErrors
												error={
													errors.price?.message || apiValidationErrors.price!
												}
											/>
										)}
									</div>
								)}
							/>
							<Controller
								name="salePrice"
								control={control}
								render={({ field }) => (
									<div className="flex flex-col gap-y-1">
										{/** biome-ignore lint/a11y/noLabelWithoutControl: <explanation> */}
										<label className="flex flex-col gap-y-3">
											<span className="text-xl">Скидочная цена</span>
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
										{(errors.salePrice?.message ||
											apiValidationErrors.salePrice) && (
											<FieldErrors
												error={
													errors.salePrice?.message ||
													apiValidationErrors.salePrice!
												}
											/>
										)}
									</div>
								)}
							/>
						</div>
					)}
					{step === 4 && (
						<div className="flex flex-col gap-y-4">
							<PickImage control={control} setValue={setValue} />
							{(errors.images?.message || apiValidationErrors.images) && (
								<FieldErrors
									error={errors.images?.message || apiValidationErrors.images!}
								/>
							)}
						</div>
					)}

					<MultiStepFormButtons
						step={step}
						maxStep={4}
						setStep={setStep}
						control={control}
						getDisabled={(val) => {
							return step === 1
								? !val.quantity ||
										!val.color ||
										!val.width ||
										!val.height ||
										!val.length
								: step === 2
									? !val.packages
										? false
										: val.packages.length < ProductSkuPackagesMinLength ||
											val.packages.length > ProductSkuPackagesMaxLength ||
											val.packages.some((pkg) =>
												val
													.packages!.filter((p) => p.id !== pkg.id)
													.some(
														(p) =>
															pkg.height === p.height &&
															pkg.length === p.length &&
															pkg.weight === p.weight &&
															pkg.width === p.width,
													),
											)
									: step === 3
										? !val.price ||
											(val.salePrice && val.salePrice >= val.price)
										: !val.images ||
											!val.images.length ||
											val.images.length > ProductSkuImagesMaxLength ||
											val.images.some(
												({ file }) => file!.size > ProductSkuImageMaxSize,
											);
						}}
						finalLabel="Создать продукт"
						onFinalClick={handleSubmit(onSubmit)}
					/>
				</fieldset>
			</form>
		</>
	);
};

const PickImage = ({
	control,
	setValue,
}: {
	control: Control<CreateProductSkuSchema>;
	setValue: UseFormSetValue<CreateProductSkuSchema>;
}) => {
	const { images } = useWatch({ control });

	return (
		<>
			{(!images || images.length < ProductSkuImagesMaxLength) && (
				<Controller
					name="images"
					control={control}
					render={({ field: { onChange } }) => (
						<FilePicker
							className="shadow-none pt-0 mx-auto"
							accept=".jpeg,.png,.webp"
							multiple
							onChange={(e) => {
								if (!e.target.files) return;
								const arr = Array.from(e.target.files)
									.filter((file) => file.size <= ProductSkuImageMaxSize)
									.map((file) => ({ id: crypto.randomUUID(), file }));
								onChange(
									!images
										? arr.slice(0, ProductSkuImagesMaxLength)
										: [
												...images,
												...arr.slice(
													0,
													ProductSkuImagesMaxLength - images.length,
												),
											],
								);
							}}
						/>
					)}
				/>
			)}
			<ul className="flex items-center gap-4 flex-wrap">
				{images?.map(({ id, file }) => {
					return (
						<li key={id}>
							<ImageFilePreview
								className="h-[250px]"
								file={file}
								onDeleteClick={() => {
									setValue(
										"images",
										images.filter(({ id: ID }) => ID !== id),
										{ shouldDirty: true },
									);
								}}
							></ImageFilePreview>
						</li>
					);
				})}
			</ul>
		</>
	);
};

const CreatePackage = ({
	control,
	setValue,
}: {
	control: Control<CreateProductSkuSchema>;
	setValue: UseFormSetValue<CreateProductSkuSchema>;
}) => {
	const { packages } = useWatch({ control });

	return (
		<div className="flex flex-col gap-y-10">
			{(!packages || packages.length < ProductSkuPackagesMaxLength) && (
				<AdminCreateProductSkuPackage
					onCreate={(pkg) => {
						if (
							packages?.some(
								(p) =>
									pkg.height === p.height &&
									pkg.length === p.length &&
									pkg.weight === p.weight &&
									pkg.width === p.width,
							)
						) {
							return toast.error(
								"Упаковка с такими параметрами уже существует",
							);
						}
						setValue("packages", packages ? [...packages, pkg] : [pkg]);
					}}
					disabled={
						!packages
							? false
							: packages.length < ProductSkuPackagesMinLength ||
								packages.length > ProductSkuPackagesMaxLength
					}
				/>
			)}
			{packages && (
				<AdminProductSkuPackageList
					packages={packages.map((pkg) => ({
						package: pkg,
						onDelete: () =>
							setValue(
								"packages",
								packages.length === 1
									? undefined
									: packages.filter((p) => p.id !== pkg.id),
							),
					}))}
				/>
			)}
		</div>
	);
};
