import { type ComponentProps, useRef } from "react";
import imagePickerIcon from "@/assets/icons/imagePicker.svg";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

type Props = {
	className?: string;
} & ComponentProps<"input">;

export const FilePicker = ({ className, ...rest }: Props) => {
	const inputRef = useRef<HTMLInputElement | null>(null);

	return (
		<div
			className={cn(
				"max-w-[850px] w-full shadow rounded-xl px-8 py-12 flex flex-col items-center gap-y-8 bg-white",
				className,
			)}
		>
			<div className="rounded-[10px] border-dashed border-[1px] border-orange-400 max-w-[700px] w-full p-11 flex flex-col justify-center items-center">
				<img
					src={imagePickerIcon}
					className="mb-[18px]"
					alt="picer"
					width={64}
					height={48}
				/>
				<p className="font-medium text-xl">
					Перетащите {rest.multiple ? "файлы" : "файл"} сюда или
					<Button
						onClick={() => inputRef.current?.click()}
						className="p-0 pl-2 text-orange-400 cursor-pointer text-xl"
						variant="ghost"
						type="button"
					>
						Выберите {rest.multiple ? "файлы" : "файл"}
					</Button>
				</p>
				{rest.accept && (
					<p className="text-lg text-[#89868d]">
						Поддерживаются форматы:{" "}
						{rest.accept
							.split(",")
							.map((v) => v.slice(1).toUpperCase())
							.join(", ")}
					</p>
				)}

				<Input ref={inputRef} {...rest} className="hidden" type="file" />
			</div>
		</div>
	);
};
