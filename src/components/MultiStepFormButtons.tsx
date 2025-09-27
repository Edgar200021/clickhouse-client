import { useEffect, useState } from "react";
import {
	type Control,
	type DeepPartialSkipArrayKey,
	type FieldValues,
	useWatch,
} from "react-hook-form";
import { Button } from "./ui/button";

type Props<T extends FieldValues> = {
	control: Control<T>;
	step: number;
	maxStep: number;
	setStep: React.Dispatch<React.SetStateAction<number>>;
	getDisabled: (val: DeepPartialSkipArrayKey<T>) => boolean;
	finalLabel: string;
	onFinalClick: () => void;
};

export const MultiStepFormButtons = <T extends FieldValues>({
	control,
	step,
	maxStep,
	setStep,
	getDisabled,
	finalLabel,
	onFinalClick,
}: Props<T>) => {
	const [disabled, setDisabled] = useState(false);
	const values = useWatch({ control });

	useEffect(() => {
		setDisabled(getDisabled(values));
	}, [values, getDisabled]);

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
				type={"button"}
				onClick={() => {
					if (step < maxStep) {
						setStep((prev) => prev + 1);
					} else {
						onFinalClick();
					}
				}}
				// onClick={step < maxStep ? () => setStep((prev) => prev + 1) : undefined}
				disabled={disabled}
				variant="default"
				className="block bg-orange-400 hover:bg-orange-500 cursor-pointer w-full !min-w-[150px] max-w-fit py-2 h-fit ml-auto text-xl"
			>
				{step < maxStep ? "Далее" : finalLabel}
			</Button>
		</div>
	);
};
