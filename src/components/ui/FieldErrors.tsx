import { cn } from "@/lib/utils";

type Props = {
	className?: string;
	error: string[] | string;
};

export const FieldErrors = ({ className, error }: Props) => {
	return (
		<div className={cn("flex flex-col gap-y-1 items-start", className)}>
			{Array.isArray(error) ? (
				error.map((error, index) => (
					<span key={index} className="text-sm text-red-500">
						*{error}
					</span>
				))
			) : (
				<span className="text-sm text-red-500">*{error}</span>
			)}
		</div>
	);
};
