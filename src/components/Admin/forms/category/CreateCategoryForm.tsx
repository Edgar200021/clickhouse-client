import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { type Control, Controller, useForm, useWatch } from "react-hook-form";
import { ImagePicker } from "@/components/ImagePicker";
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
	const {
		handleSubmit,
		formState: { errors },
		resetField,
		reset,
		control,
	} = useForm<CreateCategorySchema>({
		resolver: zodResolver(createCategorySchema),
		defaultValues: {
			name: "",
			path: "",
			predefinedPath: "",
		},
	});

	const [createCategory, { isLoading, error }] = useCreateCategoryMutation();
	const categories = useAppSelector(categorySelectors.getGroupedCategories);
	const [step, setStep] = useState<1 | 2>(1);
	const [image, setImage] = useState<string | null>(null);
	const { apiValidationErrors, clearError } = useHandleError<
		(keyof CreateCategorySchema)[]
	>(error, {
		validationErrorCb: (err) => {
			if (err.name || err.predefinedPath || err.path) {
				setStep(1);
			}

			if (err.file) {
				setStep(2);
			}
		},
	});

	const onSubmit = async (data: CreateCategorySchema) => {
		clearError();
		await createCategory(data).unwrap();
		reset({ file: undefined, name: "", path: "", predefinedPath: "" });

		if (image) {
			URL.revokeObjectURL(image);
			setImage(null);
		}

		setStep(1);
		onSuccess?.();
	};

	useEffect(() => {
		return () => {
			if (!image) return;
			URL.revokeObjectURL(image);
		};
	}, []);

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
					{step === 1 ? "Создать категорию" : "Медиа"}
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
										<span className=" text-xltext-xl">Название</span>
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

						<Controller
							name="path"
							control={control}
							render={({ field: { onChange, value } }) => (
								<div className="flex flex-col gap-y-1">
									{/** biome-ignore lint/a11y/noLabelWithoutControl: <explanation> */}
									<label className="flex flex-col gap-y-3">
										<span className=" text-xltext-xl">Путь</span>
										<Input
											className="border-[1px] border-[#dbdcde] text-[#89868d] !text-2xl py-8 px-6 rounded-md bg-[#f4f5f9] focus:border-[1px] focus-visible:ring-0 "
											required
											onChange={onChange}
											value={value}
										/>
									</label>

									{(errors.path?.message || apiValidationErrors.path) && (
										<FieldErrors
											error={errors.path?.message || apiValidationErrors.path!}
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
										<span className=" text-xltext-xl">
											Базовый путь (опционально)
										</span>
										<Select onValueChange={onChange} value={value}>
											<SelectTrigger className="w-full cursor-pointer py-8 px-6  text-2xl text-[#89868d] bg-[#f4f5f9]">
												<SelectValue />
											</SelectTrigger>
											<SelectContent>
												{Object.values(categories).map((value) =>
													value.map((v) => (
														<SelectItem
															className=" text-2xl"
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
					(image ? (
						<div className="flex flex-col gap-y-2">
							<div className="h-[400px] w-full rounded-md overflow-hidden relative">
								<img className="w-full h-full" src={image} alt="file" />
								<Button
									variant="ghost"
									className="p-0 w-10 h-10 bg-black text-white rounded-full absolute right-3 top-3 cursor-pointer font-black"
									onClick={() => {
										resetField("file");
										URL.revokeObjectURL(image);
										setImage(null);
									}}
								>
									&#x2715;
								</Button>
							</div>
							{(errors.file?.message || apiValidationErrors.file) && (
								<FieldErrors
									error={errors.file?.message || apiValidationErrors.file!}
								/>
							)}
						</div>
					) : (
						<Controller
							name="file"
							control={control}
							render={({ field: { onChange } }) => (
								<ImagePicker
									className="shadow-none pt-0 mx-auto"
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

				<Buttons step={step} setStep={setStep} control={control} />
			</fieldset>
		</form>
	);
};

const Buttons = ({
	control,
	setStep,
	step,
}: {
	control: Control<CreateCategorySchema>;
	step: number;
	setStep: React.Dispatch<React.SetStateAction<1 | 2>>;
}) => {
	const { name, path, file } = useWatch({ control });

	const disabled = step === 1 ? !name || !path : !file;

	return (
		<div className="flex items-center justify-between">
			{step > 1 && (
				<Button
					onClick={() => setStep((prev) => (prev - 1) as 1 | 2)}
					type={"button"}
					disabled={step === 1}
					variant="default"
					className="block bg-orange-400 hover:bg-orange-500 cursor-pointer w-[150px] py-2 h-fit text-xl"
				>
					Назад
				</Button>
			)}
			<Button
				disabled={disabled}
				onClick={step === 1 ? () => setStep(2) : undefined}
				type={step === 1 ? "button" : "submit"}
				variant="default"
				className="block bg-orange-400 hover:bg-orange-500 cursor-pointer w-full !min-w-[150px] max-w-fit py-2 h-fit ml-auto text-xl"
			>
				{step === 1 ? "Далее" : "Создать категорию"}
			</Button>
		</div>
	);
};
