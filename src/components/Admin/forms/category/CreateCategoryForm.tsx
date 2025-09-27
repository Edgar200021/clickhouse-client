import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
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
	type CreateCategorySchema,
	createCategorySchema,
} from "@/schemas/api/category/createCategory.schema";
import { useCreateCategoryMutation } from "@/store/admin/adminApi";
import { categorySelectors } from "@/store/category/categorySlice";
import { useAppSelector } from "@/store/store";

type Props = {
	className?: string;
	onSuccess?: () => void;
};

export const CreateCategoryForm = ({ className, onSuccess }: Props) => {
	const categories = useAppSelector(categorySelectors.getGroupedCategories);
	const {
		handleSubmit,
		formState: { errors },
		resetField,
		reset,
		control,
		watch,
	} = useForm<CreateCategorySchema>({
		resolver: zodResolver(createCategorySchema),
		defaultValues: {
			name: "",
			path: "",
			predefinedPath: undefined,
		},
	});

	const [createCategory, { isLoading, error }] = useCreateCategoryMutation();

	const [step, setStep] = useState(1);
	const [image, setImage] = useState<string | null>(null);
	const { apiValidationErrors, clearError } = useHandleError<
		(keyof CreateCategorySchema)[]
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

	const file = watch("image");

	const onSubmit = async (data: CreateCategorySchema) => {
		clearError();
		await createCategory({
			...{
				path: data.path,
				name: data.name,
				image: data.image,
			},
			...(data.predefinedPath && data.predefinedPath !== "null"
				? { predefinedPath: data.predefinedPath }
				: {}),
		}).unwrap();
		reset({ image: undefined, name: "", path: "", predefinedPath: undefined });

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
					{step === 2 &&
						(file ? (
							<div className="flex flex-col gap-y-2">
								<ImageFilePreview
									file={file}
									onDeleteClick={() => {
										resetField("image");
									}}
								/>
								{(errors.image?.message || apiValidationErrors.image) && (
									<FieldErrors
										error={errors.image?.message || apiValidationErrors.image!}
									/>
								)}
							</div>
						) : (
							<Controller
								name="image"
								control={control}
								render={({ field: { onChange } }) => (
									<FilePicker
										className="shadow-none pt-0 mx-auto"
										accept=".jpg,.jpeg,.png,.webp"
										max={CategoryImageMaxSize}
										onChange={(e) => {
											if (!e.target.files) return;
											onChange(e.target.files[0]);

											if (image) {
												URL.revokeObjectURL(image);
											}

											setImage(URL.createObjectURL(e.target.files[0]));
										}}
									/>
								)}
							/>
						))}

					<MultiStepFormButtons
						step={step}
						maxStep={2}
						setStep={setStep}
						control={control}
						getDisabled={(val) =>
							step === 1 ? !val.name || !val.path : !val.image
						}
						finalLabel="Создать категорию"
						onFinalClick={handleSubmit(onSubmit)}
					/>
				</fieldset>
			</form>
		</>
	);
};
