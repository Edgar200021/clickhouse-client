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
	type UpdateProductSkuSchema,
	updateProductSkuSchema,
} from "@/schemas/api/productSku/updateProductSku.schema";
import {
	useDeleteProductSkuImageMutation,
	useUpdateProductSkuMutation,
} from "@/store/admin/adminApi";
import { Currency } from "@/types/currency.enum";
import type { ProductSkuAdmin } from "@/types/product";
import { AdminCreateProductSkuPackage } from "../../ProductSku/AdminCreateProductSkuPackage";
import { AdminProductSkuPackageList } from "../../ProductSku/AdminProductSkuPackageList";

type Props = {
	className?: string;
	onSuccess?: () => void;
	productSkuAdmin: ProductSkuAdmin;
};

export const UpdateProductSkuForm = ({
	className,
	onSuccess,
	productSkuAdmin,
}: Props) => {
	const {
		handleSubmit,
		formState: { errors },
		setValue,
		reset,
		control,
	} = useForm<UpdateProductSkuSchema>({
		resolver: zodResolver(updateProductSkuSchema),
		defaultValues: {
			productSkuId: productSkuAdmin.id,
			quantity: productSkuAdmin.quantity,
			width: Number(productSkuAdmin.attributes.width),
			height: Number(productSkuAdmin.attributes.height),
			length: Number(productSkuAdmin.attributes.length),
			weight: Number(productSkuAdmin.attributes.weight) || undefined,
			price: productSkuAdmin.price,
			salePrice: productSkuAdmin.salePrice ?? undefined,
			currency: productSkuAdmin.currency,
			color: productSkuAdmin.attributes.color,
		},
	});

	const [updateProductSku, { isLoading, error }] =
		useUpdateProductSkuMutation();

	const [step, setStep] = useState(1);
	const { apiValidationErrors, clearError } = useHandleError<
		(keyof UpdateProductSkuSchema)[]
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

			if (err.price || err.salePrice || err.currency) {
				setStep(2);
			}

			if (err.images) {
				setStep(3);
			}
		},
	});

	const onSubmit = async (data: UpdateProductSkuSchema) => {
		clearError();

		const updateData: UpdateProductSkuSchema = Object.entries(data)
			.filter(
				([key]) =>
					![
						"color",
						"width",
						"height",
						"length",
						"weight",
						"images",
						"packages",
					].includes(key),
			)
			.reduce((acc, [key, val]) => {
				if (productSkuAdmin[key as keyof typeof productSkuAdmin] !== val) {
					acc[key as keyof UpdateProductSkuSchema] = val as any;
				}
				return acc;
			}, {} as UpdateProductSkuSchema);

		for (const key of Object.keys(productSkuAdmin.attributes)) {
			if (data[key] && data[key] != productSkuAdmin.attributes[key]) {
				updateData[key] = data[key];
			}
		}

		if (data.images) {
			updateData.images = data.images;
		}

		if (data.packages) {
			updateData.packages = data.packages;
		}

		const { data: productSku } = await updateProductSku(updateData).unwrap();

		reset({
			quantity: productSku.quantity,
			color: productSku.attributes.color,
			width: Number(productSku.attributes.width),
			height: Number(productSku.attributes.height),
			length: Number(productSku.attributes.length),
			weight: Number(productSku.attributes.weight) || undefined,
			price: productSku.price,
			salePrice: productSku.salePrice ?? undefined,
			currency: productSku.currency,
			images: undefined,
			packages: undefined,
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
						<CreatePackage
							productSkuAdmin={productSkuAdmin}
							control={control}
							setValue={setValue}
						/>
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
							<Controller
								name="currency"
								control={control}
								render={({ field: { onChange, value } }) => (
									<div className="flex flex-col gap-y-1">
										{/** biome-ignore lint/a11y/noLabelWithoutControl: <explanation> */}
										<label className="flex flex-col gap-y-3">
											<span className="text-xl">Валюта</span>
											<Select onValueChange={onChange} value={value ?? ""}>
												<SelectTrigger className="w-full cursor-pointer py-8 px-6 text-2xl text-[#89868d] bg-[#f4f5f9]">
													<SelectValue placeholder="Выберите валюту" />
												</SelectTrigger>
												<SelectContent>
													{Object.values(Currency).map((cur) => (
														<SelectItem
															key={cur}
															value={cur}
															className="text-2xl"
														>
															{cur}
														</SelectItem>
													))}
												</SelectContent>
											</Select>
										</label>

										{(errors.currency?.message ||
											apiValidationErrors.currency) && (
											<FieldErrors
												error={
													errors.currency?.message ||
													apiValidationErrors.currency!
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
							<PickImage
								productSkuAdmin={productSkuAdmin}
								control={control}
								setValue={setValue}
							/>
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
							const {
								quantity,
								attributes: { color, width, height, length, weight },
								price,
								salePrice,
								currency,
							} = productSkuAdmin;

							const noChanges =
								quantity === val.quantity &&
								color === val.color &&
								Number(width) === val.width &&
								Number(height) === val.height &&
								Number(length) === val.length &&
								weight === val.weight &&
								!val.packages &&
								val.price === price &&
								(salePrice ?? null) === (val.salePrice ?? null) &&
								val.currency === currency &&
								!val.images;

							return step === 4 && noChanges;
						}}
						finalLabel="Обновить вариант продукта"
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
	productSkuAdmin,
}: {
	control: Control<UpdateProductSkuSchema>;
	setValue: UseFormSetValue<UpdateProductSkuSchema>;
	productSkuAdmin: ProductSkuAdmin;
}) => {
	const { images } = useWatch({ control });
	const maxLength = ProductSkuImagesMaxLength - productSkuAdmin.images.length;
	const [deleteProductSkuImage, { isLoading, error }] =
		useDeleteProductSkuImageMutation();

	useHandleError(error);

	return (
		<>
			{(!images || images.length < maxLength) && (
				<Controller
					name="images"
					control={control}
					render={({ field: { onChange } }) => (
						<FilePicker
							disabled={isLoading}
							className="shadow-none pt-0 mx-auto"
							accept=".jpeg,.png,.webp,.jpg"
							multiple
							onChange={(e) => {
								if (!e.target.files) return;
								const arr = Array.from(e.target.files)
									.filter((file) => file.size <= ProductSkuImageMaxSize)
									.map((file) => ({ id: crypto.randomUUID(), file }));
								onChange(
									!images
										? arr.slice(0, maxLength)
										: [...images, ...arr.slice(0, maxLength - images.length)],
								);
							}}
						/>
					)}
				/>
			)}
			<ul className="flex items-center gap-4 flex-wrap">
				{images?.map(({ id, file }) => {
					return (
						<li className={isLoading ? "opacity-70" : ""} key={id}>
							<ImageFilePreview
								className="h-[250px]"
								file={file}
								onDeleteClick={() => {
									setValue(
										"images",
										images.length === 1
											? undefined
											: images.filter(({ id: ID }) => ID !== id),
										{ shouldDirty: true },
									);
								}}
							></ImageFilePreview>
						</li>
					);
				})}
				{productSkuAdmin.images.map((image) => (
					<li className={isLoading ? "opacity-70" : ""} key={image.imageId}>
						<ImageFilePreview
							className="h-[250px]"
							imageUrl={image.imageUrl}
							onDeleteClick={async () => {
								await deleteProductSkuImage({
									imageId: image.id,
									productSkuId: productSkuAdmin.id,
								}).unwrap();
							}}
						></ImageFilePreview>
					</li>
				))}
			</ul>
		</>
	);
};

const CreatePackage = ({
	control,
	setValue,
	productSkuAdmin,
}: {
	control: Control<UpdateProductSkuSchema>;
	setValue: UseFormSetValue<UpdateProductSkuSchema>;
	productSkuAdmin: ProductSkuAdmin;
}) => {
	const { packages } = useWatch({ control });

	const fullLength = productSkuAdmin.packages.length + (packages?.length ?? 0);

	return (
		<div className="flex flex-col gap-y-10">
			{fullLength < ProductSkuPackagesMaxLength && (
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
						!!packages &&
						(packages.length < ProductSkuPackagesMinLength ||
							fullLength >= ProductSkuPackagesMaxLength)
					}
				/>
			)}
			{(packages?.length || productSkuAdmin.packages.length) > 0 && (
				<AdminProductSkuPackageList
					packages={[
						...(packages ?? []).map((pkg) => ({
							package: pkg,
							onDelete: () =>
								setValue(
									"packages",
									packages.length === 1
										? undefined
										: packages.filter((p) => p.id !== pkg.id),
								),
						})),
						...productSkuAdmin.packages.map((p) => ({
							productSkuId: productSkuAdmin.id,
							package: p,
						})),
					]}
				/>
			)}
		</div>
	);
};
