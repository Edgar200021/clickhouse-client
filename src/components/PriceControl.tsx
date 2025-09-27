import { useState } from "react";
import { Slider } from "./ui/slider";

type PriceControlProps = {
	min?: number;
	max?: number;
	defaultValues?: [number, number];
	minStepsBetweenThumbs?: number;
	step?: number;
	onChange?: (values: [number, number]) => void;
	className?: string;
};

export const PriceControl = ({
	min = 0,
	max = 1_000_000,
	defaultValues,
	minStepsBetweenThumbs = 0,
	step = 1,
	onChange,
	className = "",
}: PriceControlProps) => {
	const [values, setValues] = useState<[number, number]>(
		defaultValues ?? [min, max],
	);

	const handleSliderChange = (newValues: number[]) => {
		const fixed: [number, number] = [newValues[0], newValues[1]];
		setValues(fixed);
		onChange?.(fixed);
	};

	const handleInputChange = (index: 0 | 1, val: string) => {
		if (!/^\d*$/.test(val)) return;

		const newValues: [number, number] = [...values] as [number, number];

		if (val === "") {
			return;
		}

		newValues[index] = parseInt(val);

		if (newValues[0] > newValues[1]) {
			if (index === 0) newValues[1] = newValues[0];
			else newValues[0] = newValues[1];
		}

		setValues(newValues);
		onChange?.(newValues);
	};

	return (
		<div
			className={`grid gap-4 p-4 w-full max-w-80 bg-white border border-[#14424C]/20 rounded-[12px] ${className}`}
		>
			<Slider
				min={min}
				max={max}
				step={step}
				defaultValue={values}
				minStepsBetweenThumbs={minStepsBetweenThumbs}
				onValueChange={handleSliderChange}
				className="w-full"
				trackClassName="bg-orange-200 h-2 rounded"
				rangeClassName="bg-orange-500 h-2 rounded"
				thumbClassName="w-4 h-4 bg-orange-500 border-2 border-white rounded-full ring-orange-600 "
			/>
			<div className="flex gap-2 flex-wrap">
				{values.map((val, index) => (
					<div
						key={index}
						className="flex items-center justify-between w-full border px-3 h-10 rounded-md"
					>
						<span>{index === 0 ? "Мин" : "Макс"}</span>
						<input
							type="text"
							value={val.toString()}
							onChange={(e) =>
								handleInputChange(index as 0 | 1, e.target.value)
							}
							className="w-24 bg-transparent text-right outline-none border-none"
						/>
					</div>
				))}
			</div>
		</div>
	);
};
