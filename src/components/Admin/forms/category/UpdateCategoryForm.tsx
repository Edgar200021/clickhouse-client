import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import {
	type Control,
	Controller,
	type UseFormResetField,
	useForm,
	useWatch,
} from "react-hook-form";
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
import { CategoryImageMaxSize } from "@/const/schema";
import { useHandleError } from "@/hooks/useHandleError";
import { cn } from "@/lib/utils";
import {
	type UpdateCategorySchema,
	updateCategorySchema,
} from "@/schemas/api/category/updateCategory.schema";
import { useUpdateCategoryMutation } from "@/store/admin/adminApi";
import { categorySelectors } from "@/store/category/categorySlice";
import { useAppSelector } from "@/store/store";
import type { Category } from "@/types/category";

type Props = {
	className?: string;
	onSuccess?: () => void;
	category: Category;
};

export const UpdateCategoryForm = ({
	className,
	onSuccess,
	category,
}: Props) => {
	const categories = useAppSelector(categorySelectors.getGroupedCategories);
	const path = category.path.includes(".")
		? category.path.slice(category.path.lastIndexOf(".") + 1)
		: category.path;

	const predefinedPath = category.path.includes(".")
		? category.path.slice(0, category.path.lastIndexOf("."))
		: undefined;

	const {
		handleSubmit,
		formState: { errors },
		resetField,
		reset,
		control,
	} = useForm<UpdateCategorySchema>({
		resolver: zodResolver(updateCategorySchema),
		defaultValues: {
			categoryId: category.id,
			name: category.name,
			path,
			predefinedPath,
		},
	});

	const [updateCategory, { isLoading, error }] = useUpdateCategoryMutation();
	const [step, setStep] = useState(1);
	const { apiValidationErrors, clearError } = useHandleError<
		(keyof UpdateCategorySchema)[]
	>(error, {
		validationErrorCb: (err) => {
			if (err.name || err.predefinedPath || err.path) {
				setStep(1);
			}

			if (err.image) {
				setStep(2);
			}
		},
	});

	const onSubmit = async (data: UpdateCategorySchema) => {
		clearError();

		const { data: updatedCategory } = await updateCategory({
			categoryId: data.categoryId,
			...(data.name && data.name !== category.name ? { name: data.name } : {}),
			...(data.image ? { image: data.image } : {}),
			...(data.path && data.path !== path ? { path: data.path } : {}),
			...(data.predefinedPath &&
			data.predefinedPath !== predefinedPath &&
			data.predefinedPath !== "null"
				? { predefinedPath: data.predefinedPath }
				: {}),
		}).unwrap();

		reset({
			categoryId: category.id,
			image: undefined,
			name: updatedCategory.name,
			path: updatedCategory.path.includes(".")
				? updatedCategory.path.slice(updatedCategory.path.lastIndexOf(".") + 1)
				: updatedCategory.path,
			predefinedPath: updatedCategory.path.includes(".")
				? updatedCategory.path.slice(0, updatedCategory.path.lastIndexOf("."))
				: undefined,
		});

		setStep(1);
		onSuccess?.();
	};

	return (
		<>
			<Steps
				className="mb-12"
				steps={["Информация категории", "Медиа"]}
				currentStep={step}
			/>
			<form
				// onSubmit={handleSubmit(onSubmit)}
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
						{step === 1 ? "Информация категории" : "Медиа"}
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
								name="path"
								control={control}
								render={({ field: { onChange, value } }) => (
									<div className="flex flex-col gap-y-1">
										{/** biome-ignore lint/a11y/noLabelWithoutControl: <explanation> */}
										<label className="flex flex-col gap-y-3">
											<span className="text-xl">Путь</span>
											<Input
												className="border-[1px] border-[#dbdcde] text-[#89868d] !text-2xl py-8 px-6 rounded-md bg-[#f4f5f9] focus:border-[1px] focus-visible:ring-0 "
												required
												onChange={onChange}
												value={value}
											/>
										</label>

										{(errors.path?.message || apiValidationErrors.path) && (
											<FieldErrors
												error={
													errors.path?.message || apiValidationErrors.path!
												}
											/>
										)}
									</div>
								)}
							/>

							<Controller
								name="predefinedPath"
								control={control}
								render={({ field: { onChange, value } }) => (
									<div className="flex flex-col gap-y-1">
										{/** biome-ignore lint/a11y/noLabelWithoutControl: <explanation> */}
										<label className="flex flex-col gap-y-3">
											<span className="text-xl">
												Базовый путь (опционально)
											</span>
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
														Выберите категорию
													</SelectItem>
													{Object.values(categories).map((value) =>
														value.map((v) => (
															<SelectItem
																className="text-2xl"
																key={v.path}
																value={v.path}
															>
																{v.path}
															</SelectItem>
														)),
													)}
												</SelectContent>
											</Select>
										</label>
										{(errors.predefinedPath?.message ||
											apiValidationErrors.predefinedPath) && (
											<FieldErrors
												error={
													errors.predefinedPath?.message ||
													apiValidationErrors.predefinedPath!
												}
											/>
										)}
									</div>
								)}
							/>
						</div>
					)}
					{step === 2 && (
						<ImagePicker
							control={control}
							error={errors.image?.message || apiValidationErrors.image}
							imageUrl={category.imageUrl}
							resetField={resetField}
						/>
					)}

					<MultiStepFormButtons
						step={step}
						maxStep={2}
						setStep={setStep}
						control={control}
						getDisabled={(val) => {
							const fullPath = `${val.predefinedPath ? `${val.predefinedPath}.` : ""}${val.path}`;
							return (
								step === 2 &&
								!val.image &&
								val.name === category.name &&
								fullPath === category.path
							);
						}}
						finalLabel="Обновить категорию"
						onFinalClick={handleSubmit(onSubmit)}
					/>
				</fieldset>
			</form>
		</>
	);
};

const ImagePicker = ({
	control,
	imageUrl,
	resetField,
	error,
}: {
	control: Control<UpdateCategorySchema>;
	resetField: UseFormResetField<UpdateCategorySchema>;
	imageUrl: Category["imageUrl"];
	error?: string;
}) => {
	const { image: file } = useWatch({ control });
	const [hasPreview, setHasPreview] = useState(imageUrl !== null);

	return file || hasPreview ? (
		<div className="flex flex-col gap-y-2">
			<ImageFilePreview
				file={file}
				imageUrl={imageUrl || undefined}
				onDeleteClick={() => {
					resetField("image");
				}}
				hasPreview={(val) => setHasPreview(val)}
			/>
			{error && <FieldErrors error={error} />}
		</div>
	) : (
		<Controller
			name="image"
			control={control}
			render={({ field: { onChange } }) => (
				<FilePicker
					className="shadow-none pt-0 mx-auto"
					max={CategoryImageMaxSize}
					accept=".jpg,.jpeg,.png,.webp"
					onChange={(e) => {
						if (!e.target.files) return;
						onChange(e.target.files[0]);
					}}
				/>
			)}
		/>
	);
};
