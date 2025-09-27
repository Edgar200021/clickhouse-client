import { useEffect, useState } from "react";
import htmlIcon from "@/assets/icons/html.svg";
import pdfIcon from "@/assets/icons/pdf.svg";
import txtIcon from "@/assets/icons/txt.svg";
import { cn } from "@/lib/utils";
import type { Nullable } from "@/types/base";
import { Button } from "../ui/button";

type Props = {
	className?: string;
	file?: Nullable<File>;
	onDeleteClick: () => Promise<void> | void;
};

export const FilePreview = ({ className, file, onDeleteClick }: Props) => {
	if (!file) return null;

	return (
		<div
			className={cn(
				"flex items-center gap-x-4 p-3 rounded-2xl bg-[#f9fafb] shadow-sm border",
				className,
			)}
		>
			<img
				width={40}
				height={40}
				src={
					file.type.includes("pdf")
						? pdfIcon
						: file.type.includes("html")
							? htmlIcon
							: txtIcon
				}
				alt="Иконка"
				className="shrink-0"
			/>

			<div className="flex-1 min-w-0">
				<p className="text-sm font-medium text-gray-900 mb-2 ">{file.name}</p>
				<p className="text-xs text-gray-500">
					{(file.size / 1024).toFixed(1)} KB
				</p>
			</div>

			<Button
				type="button"
				variant="ghost"
				size="icon"
				className="ml-auto w-7 h-7 rounded-full text-gray-500 hover:text-red-500 cursor-pointer hover:bg-red-50 self-start"
				onClick={() => onDeleteClick()}
			>
				&#x2715;
			</Button>
		</div>
	);
};

export const ImageFilePreview = ({
	className,
	file,
	onDeleteClick,
	imageUrl,
	hasPreview,
}: Props & { imageUrl?: string; hasPreview?: (arg: boolean) => void }) => {
	const [image, setImage] = useState<null | string>(imageUrl ?? null);

	useEffect(() => {
		if (!file) return;

		if (image?.startsWith("blob")) {
			URL.revokeObjectURL(image);
		}

		const newImage = URL.createObjectURL(file);
		setImage(newImage);

		return () => {
			URL.revokeObjectURL(newImage);
		};
	}, [file]);

	useEffect(() => {
		hasPreview?.(image !== null);
	}, [image, hasPreview]);

	if (!image) return null;

	return (
		<div
			className={cn(
				"h-[400px] w-full rounded-md overflow-hidden relative",
				className,
			)}
		>
			<img className="w-full h-full" src={image} alt="file" />
			<Button
				type="button"
				variant="ghost"
				className="p-0 w-10 h-10 bg-black text-white rounded-full absolute right-3 top-3 cursor-pointer font-black"
				onClick={async () => {
					const result = onDeleteClick();

					if (result instanceof Promise) {
						await result;
					}
					if (image.startsWith("blob")) URL.revokeObjectURL(image);

					setImage(file && imageUrl ? imageUrl : null);
				}}
			>
				&#x2715;
			</Button>
		</div>
	);
};
