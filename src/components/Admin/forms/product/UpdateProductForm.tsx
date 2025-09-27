import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import {
	type Control,
	Controller,
	type UseFormResetField,
	useForm,
	useWatch,
} from "react-hook-form";
import toast from "react-hot-toast";
import { FilePicker } from "@/components/FilePicker";
import { FilePreview } from "@/components/FilePreview/FilePreview";
import { MultiStepFormButtons } from "@/components/MultiStepFormButtons";
import { Steps } from "@/components/Steps";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
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
	ProductAssemblyInstructionMaxSize,
	ProductDescriptionMaxLength,
	ProductMaterialAndCareMaxLength,
	ProductNameMaxLength,
	ProductShortDescriptionMaxLength,
} from "@/const/schema";
import { useHandleError } from "@/hooks/useHandleError";
import { cn } from "@/lib/utils";
import {
	type UpdateProductSchema,
	updateProductSchema,
} from "@/schemas/api/products/updateProduct.schema";
import {
	useDeleteProductAssemblyInstructionMutation,
	useUpdateProductMutation,
} from "@/store/admin/adminApi";
import { adminSelectors } from "@/store/admin/adminSlice";
import { categorySelectors } from "@/store/category/categorySlice";
import { useAppSelector } from "@/store/store";
import type { ProductAdmin } from "@/types/product";

type Props = {
	className?: string;
	onSuccess?: () => void;
	product: ProductAdmin;
};

export const UpdateProductForm = ({ className, onSuccess, product }: Props) => {
	const categories = useAppSelector(categorySelectors.getGroupedCategories);
	const manufacturers = useAppSelector(adminSelectors.getManufactories);

	const {
		handleSubmit,
		formState: { errors },
		reset,
		resetField,
		control,
	} = useForm<UpdateProductSchema>({
		resolver: zodResolver(updateProductSchema),
		defaultValues: {
			productId: product.id,
			name: product.name,
			description: product.description,
			shortDescription: product.shortDescription,
			materialsAndCare: product.materialsAndCare,
			categoryId: product.categoryId ?? undefined,
			manufacturerId: product.manufacturerId,
		},
	});

	const [updateProduct, { isLoading, error }] = useUpdateProductMutation();

	const [step, setStep] = useState(1);
	const { apiValidationErrors, clearError } = useHandleError<
		(keyof UpdateProductSchema)[]
	>(error, {
		validationErrorCb: (err) => {
			if (
				err.name ||
				err.description ||
				err.shortDescription ||
				err.materialsAndCare ||
				err.categoryId ||
				err.manufacturerId
			) {
				setStep(1);
			}

			if (err.assemblyInstruction) {
				setStep(2);
			}
		},
	});

	const onSubmit = async (data: UpdateProductSchema) => {
		clearError();
		const { data: updatedProduct } = await updateProduct(data).unwrap();

		reset({
			name: updatedProduct.name,
			description: updatedProduct.description,
			shortDescription: updatedProduct.shortDescription,
			materialsAndCare: updatedProduct.materialsAndCare,
			categoryId: updatedProduct.categoryId,
			manufacturerId: updatedProduct.manufacturerId,
			assemblyInstruction: undefined,
		});

		setStep(1);
		onSuccess?.();
	};

	return (
		<>
			<Steps
				className="mb-12"
				steps={["Информация продукта", "Медиа"]}
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
						{step === 1 ? "Информация продукта" : "Инструкция сборки"}
					</h1>
					{step === 1 && (
						<div className="mb-9 grid grid-cols-2 gap-8">
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
												error={
													errors.name?.message || apiValidationErrors.name!
												}
											/>
										)}
									</div>
								)}
							/>
							<Controller
								name="description"
								control={control}
								render={({ field: { onChange, value } }) => (
									<div className="flex flex-col gap-y-1">
										{/** biome-ignore lint/a11y/noLabelWithoutControl: <explanation> */}
										<label className="flex flex-col gap-y-3">
											<span className="text-xl">Описание</span>
											<Input
												className="border-[1px] border-[#dbdcde] text-[#89868d] !text-2xl py-8 px-6 rounded-md bg-[#f4f5f9] focus:border-[1px] focus-visible:ring-0 "
												required
												onChange={onChange}
												value={value}
											/>
										</label>

										{(errors.description?.message ||
											apiValidationErrors.description) && (
											<FieldErrors
												error={
													errors.description?.message ||
													apiValidationErrors.description!
												}
											/>
										)}
									</div>
								)}
							/>
							<Controller
								name="shortDescription"
								control={control}
								render={({ field: { onChange, value } }) => (
									<div className="flex flex-col gap-y-1">
										{/** biome-ignore lint/a11y/noLabelWithoutControl: <explanation> */}
										<label className="flex flex-col gap-y-3">
											<span className="text-xl">Короткое описание</span>
											<Input
												className="border-[1px] border-[#dbdcde] text-[#89868d] !text-2xl py-8 px-6 rounded-md bg-[#f4f5f9] focus:border-[1px] focus-visible:ring-0 "
												required
												onChange={onChange}
												value={value}
											/>
										</label>

										{(errors.shortDescription?.message ||
											apiValidationErrors.shortDescription) && (
											<FieldErrors
												error={
													errors.shortDescription?.message ||
													apiValidationErrors.shortDescription!
												}
											/>
										)}
									</div>
								)}
							/>

							<Controller
								name="materialsAndCare"
								control={control}
								render={({ field: { onChange, value } }) => (
									<div className="flex flex-col gap-y-1">
										{/** biome-ignore lint/a11y/noLabelWithoutControl: <explanation> */}
										<label className="flex flex-col gap-y-3">
											<span className="text-xl">Материал и уход</span>
											<Input
												className="border-[1px] border-[#dbdcde] text-[#89868d] !text-2xl py-8 px-6 rounded-md bg-[#f4f5f9] focus:border-[1px] focus-visible:ring-0 "
												required
												onChange={onChange}
												value={value}
											/>
										</label>

										{(errors.materialsAndCare?.message ||
											apiValidationErrors.materialsAndCare) && (
											<FieldErrors
												error={
													errors.materialsAndCare?.message ||
													apiValidationErrors.materialsAndCare!
												}
											/>
										)}
									</div>
								)}
							/>

							<Controller
								name="categoryId"
								control={control}
								render={({ field: { onChange, value } }) => (
									<div className="flex flex-col gap-y-1">
										{/** biome-ignore lint/a11y/noLabelWithoutControl: <explanation> */}
										<label className="flex flex-col gap-y-3">
											<span className="text-xl">Категория</span>
											<Select
												onValueChange={(val) =>
													onChange(val ? Number(val) : undefined)
												}
												value={value ? String(value) : ""}
											>
												<SelectTrigger className="w-full cursor-pointer py-8 px-6  text-2xl text-[#89868d] bg-[#f4f5f9]">
													<SelectValue placeholder="Выберите категорию" />
												</SelectTrigger>
												<SelectContent>
													{Object.values(categories).map((value) =>
														value.map((v) => (
															<SelectItem
																className="text-2xl"
																key={v.path}
																value={String(v.id)}
															>
																{v.path}
															</SelectItem>
														)),
													)}
												</SelectContent>
											</Select>
										</label>
										{(errors.categoryId?.message ||
											apiValidationErrors.categoryId) && (
											<FieldErrors
												error={
													errors.categoryId?.message ||
													apiValidationErrors.categoryId!
												}
											/>
										)}
									</div>
								)}
							/>

							<Controller
								name="manufacturerId"
								control={control}
								render={({ field: { onChange, value } }) => (
									<div className="flex flex-col gap-y-1">
										{/** biome-ignore lint/a11y/noLabelWithoutControl: <explanation> */}
										<label className="flex flex-col gap-y-3">
											<span className="text-xl">Производитель</span>
											<Select
												onValueChange={(val) =>
													onChange(val ? Number(val) : undefined)
												}
												value={value ? String(value) : ""}
											>
												<SelectTrigger className="w-full cursor-pointer py-8 px-6  text-2xl text-[#89868d] bg-[#f4f5f9]">
													<SelectValue placeholder="Выберите производителя" />
												</SelectTrigger>
												<SelectContent>
													{manufacturers?.map((v) => (
														<SelectItem
															className="text-2xl"
															key={v.id}
															value={String(v.id)}
														>
															{v.name}
														</SelectItem>
													))}
												</SelectContent>
											</Select>
										</label>
										{(errors.manufacturerId?.message ||
											apiValidationErrors.manufacturerId) && (
											<FieldErrors
												error={
													errors.manufacturerId?.message ||
													apiValidationErrors.manufacturerId!
												}
											/>
										)}
									</div>
								)}
							/>
						</div>
					)}
					{step === 2 && (
						<PickFile
							control={control}
							product={product}
							resetField={resetField}
							error={
								errors.assemblyInstruction?.message ||
								apiValidationErrors.assemblyInstruction
							}
						/>
					)}

					<MultiStepFormButtons
						step={step}
						maxStep={2}
						setStep={setStep}
						control={control}
						getDisabled={(val) => {
							if (step === 1) {
								return (
									!val.name ||
									val.name.length > ProductNameMaxLength ||
									!val.description ||
									val.description.length > ProductDescriptionMaxLength ||
									!val.shortDescription ||
									val.shortDescription.length >
										ProductShortDescriptionMaxLength ||
									!val.materialsAndCare ||
									val.materialsAndCare.length >
										ProductMaterialAndCareMaxLength ||
									!val.manufacturerId ||
									!val.categoryId
								);
							}

							const noChanges =
								val.name === product.name &&
								val.description === product.description &&
								val.shortDescription === product.shortDescription &&
								val.materialsAndCare === product.materialsAndCare &&
								val.categoryId === product.categoryId &&
								val.manufacturerId === product.manufacturerId;

							return (
								(noChanges && !val.assemblyInstruction) ||
								(val.assemblyInstruction?.size || 0) >
									ProductAssemblyInstructionMaxSize
							);
						}}
						finalLabel="Обновить продукт"
						onFinalClick={handleSubmit(onSubmit)}
					/>
				</fieldset>
			</form>
		</>
	);
};

const PickFile = ({
	control,
	product,
	resetField,
	error,
}: {
	control: Control<UpdateProductSchema>;
	resetField: UseFormResetField<UpdateProductSchema>;
	product: ProductAdmin;
	error?: string;
}) => {
	const { assemblyInstruction } = useWatch({ control });
	const [file, setFile] = useState(product.assemblyInstructionFileUrl);
	const [deleteInstruction, { isLoading, error: err }] =
		useDeleteProductAssemblyInstructionMutation();
	useHandleError(err);
	const [open, setOpen] = useState(false);

	if (file && product.assemblyInstructionFileId) {
		return (
			<div className="flex flex-col gap-y-4 items-center">
				<a
					href={file}
					target="_blank"
					rel="noopener noreferrer"
					className="text-blue-600 underline text-xl"
				>
					📄 Открыть текущую инструкцию
				</a>

				<div className="flex gap-4">
					<Button
						type="button"
						className="px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300 cursor-pointer"
						onClick={() => setFile(null)}
					>
						Заменить
					</Button>
					<Dialog open={open} onOpenChange={setOpen}>
						<DialogTrigger asChild>
							<Button
								type="button"
								className="px-4 py-2 rounded-md bg-red-500 text-white hover:bg-red-600 cursor-pointer"
							>
								Удалить
							</Button>
						</DialogTrigger>
						<DialogContent>
							<DialogHeader>
								<DialogTitle>Удалить инструкцию?</DialogTitle>
								<DialogDescription>
									Это действие нельзя отменить. Файл с инструкцией для продукта
									<strong className="px-1">{product.name}</strong> будет удалён.
								</DialogDescription>
							</DialogHeader>
							<div className="flex justify-end gap-x-2 mt-4">
								<Button
									variant="outline"
									onClick={() => {
										setOpen(false);
									}}
									className="cursor-pointer"
								>
									Отмена
								</Button>
								<Button
									variant="destructive"
									onClick={async () => {
										await deleteInstruction({
											productId: product.id,
											fileId: product.assemblyInstructionFileId!,
										}).unwrap();
										toast.success("Файл с инструкциями успешно удален");
										setFile(null);
										setOpen(false);
									}}
									disabled={isLoading}
									className="cursor-pointer"
								>
									Удалить
								</Button>
							</div>
						</DialogContent>
					</Dialog>
				</div>
			</div>
		);
	}

	return assemblyInstruction ? (
		<div className="flex flex-col gap-y-2">
			<FilePreview
				file={assemblyInstruction}
				onDeleteClick={() => {
					resetField("assemblyInstruction");
				}}
			/>
			{error && <FieldErrors error={error} />}
		</div>
	) : (
		<Controller
			name="assemblyInstruction"
			control={control}
			render={({ field: { onChange } }) => (
				<FilePicker
					className="shadow-none pt-0 mx-auto"
					accept=".pdf,.txt,.html"
					max={ProductAssemblyInstructionMaxSize}
					onChange={(e) => {
						if (!e.target.files) return;
						onChange(e.target.files[0]);
					}}
				/>
			)}
		/>
	);
};
