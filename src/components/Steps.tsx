import { cn } from "@/lib/utils";

type Props = {
	className?: string;
	steps: string[];
	currentStep: number;
};

export const Steps = ({ className, steps, currentStep }: Props) => {
	return (
		<div className={cn("flex items-center justify-center gap-x-8", className)}>
			{steps.map((s, i) => (
				<>
					<div className={cn("flex items-center gap-x-4 text-[22px] font-bold text-orange-400", {
						"opacity-70": currentStep !== i + 1
					})}>
						<span className="w-8 h-8 rounded-full text-white bg-orange-400">
							{i + 1}
						</span>
						<span>{s}</span>
					</div>
					{steps.length > 1 && i !== steps.length - 1 && <span className="block w-[110px] h-[1px] border-solid border-[1px] bg-[#f4f5f9]"></>}
				</>
			))}
		</div>
	);
};
