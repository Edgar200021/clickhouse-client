import { ChevronDownIcon } from "lucide-react";
import { useId, useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

type Props = {
	className?: string;
	date: Date | undefined;
	setDate: (date: Date | undefined) => void;
};

export const FullCalendar = ({ className, date, setDate }: Props) => {
	const [open, setOpen] = useState(false);
	const datePickerId = useId();
	const timePickerId = useId();

	return (
		<div className={cn("flex gap-4", className)}>
			<div className="flex flex-col gap-3">
				<Label htmlFor={datePickerId} className="px-1">
					Дата
				</Label>
				<Popover open={open} onOpenChange={setOpen}>
					<PopoverTrigger asChild>
						<Button
							variant="outline"
							id={datePickerId}
							className="max-w-[40] w-full justify-between font-normal"
						>
							{date ? date.toLocaleDateString() : "Выберите дату"}
							<ChevronDownIcon />
						</Button>
					</PopoverTrigger>
					<PopoverContent className="w-auto overflow-hidden p-0" align="start">
						<Calendar
							mode="single"
							selected={date}
							captionLayout="dropdown"
							onSelect={(date) => {
								setDate(date);
								setOpen(false);
							}}
						/>
					</PopoverContent>
				</Popover>
			</div>
			<div className="flex flex-col gap-3">
				<Label htmlFor={timePickerId} className="px-1">
					Время
				</Label>
				<Input
					defaultValue={
						date
							? `${date.getHours().toString().padStart(2, "0")}:${date
									.getMinutes()
									.toString()
									.padStart(2, "0")}:${date
									.getSeconds()
									.toString()
									.padStart(2, "0")}`
							: ""
					}
					disabled={!date}
					onChange={(e) => {
						if (!date) return;

						const [hours, minutes, seconds] = e.target.value.split(":");

						const newDate = date.setHours(
							Number(hours),
							Number(minutes),
							Number(seconds),
						);

						setDate(new Date(newDate));
					}}
					type="time"
					id={timePickerId}
					step="1"
					className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
				/>
			</div>
		</div>
	);
};
