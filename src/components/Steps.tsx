import { Fragment } from "react/jsx-runtime";
import { cn } from "@/lib/utils";

type Props = {
	className?: string;
	steps: string[];
	currentStep: number;
};

export const Steps = ({ className, steps, currentStep }: Props) => {
	return (
		<div
			className={cn(
				"flex items-center flex-wrap justify-center gap-8",
				className,
			)}
		>
			{steps.map((s, i) => (
				<Fragment key={i}>
					<div
						className={cn(
							"flex items-center gap-x-4 text-4xl font-bold text-orange-400",
							{
								"opacity-70": currentStep < i + 1,
							},
						)}
					>
						<span className="w-12 h-12 rounded-full text-white bg-orange-400 flex items-center justify-center">
							{i + 1}
						</span>
						<span>{s}</span>
					</div>
					{steps.length > 1 && i !== steps.length - 1 && (
						<span className="block w-[140px] h-[1px] border-solid border-[1px] bg-[#f4f5f9]" />
					)}
				</Fragment>
			))}
		</div>
	);
};
