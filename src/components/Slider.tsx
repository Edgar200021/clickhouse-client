import { type ReactElement, useEffect, useState } from "react";
import {
	Carousel,
	type CarouselApi,
	CarouselContent,
	CarouselItem,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";

type Props = {
	className?: string;
	items: ReactElement[];
};

export const Slider = ({ className, items }: Props) => {
	const [api, setApi] = useState<CarouselApi>();
	const [current, setCurrent] = useState(0);

	useEffect(() => {
		if (!api) return;

		const handleSelect = () => {
			const selectedIndex = api.selectedScrollSnap();
			setCurrent(selectedIndex);
		};

		api.on("select", handleSelect);

		return () => {
			api.off("select", handleSelect);
		};
	}, [api]);

	return (
		<div
			className={cn(
				"flex flex-col gap-y-2 items-center relative max-w-[400px]",
				className,
			)}
		>
			<div
				onMouseMove={(e) => {
					if (!api || items.length === 0) return;

					const rect = (
						e.currentTarget as HTMLDivElement
					).getBoundingClientRect();
					const x = e.clientX - rect.left;
					const width = rect.width;

					const index = Math.min(
						items.length - 1,
						Math.max(0, Math.floor((x / width) * items.length)),
					);

					api.scrollTo(index);
				}}
			>
				<Carousel setApi={setApi}>
					<CarouselContent>
						{items.map((item, i) => (
							<CarouselItem key={i}>{item}</CarouselItem>
						))}
					</CarouselContent>
				</Carousel>
			</div>

			<ul className="h-2 w-full flex items-center justify-center gap-x-2">
				{Array.from({ length: items.length }).map((_, i) => (
					<li
						key={i}
						className={cn("w-1 h-1 border-black border-[1px] rounded-[1px]", {
							"bg-black border-[2px] w-2 h-2 rounded-[3px]": i === current,
						})}
					></li>
				))}
			</ul>
		</div>
	);
};
