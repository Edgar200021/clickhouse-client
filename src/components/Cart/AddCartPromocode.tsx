import { useRef } from "react";
import toast from "react-hot-toast";
import { useHandleError } from "@/hooks/useHandleError";
import { cn } from "@/lib/utils";
import { addCartPromocdeSchema } from "@/schemas/api/cart/addCartPromocode.schema";
import { useAddCartPromocodeMutation } from "@/store/cart/cartApi";
import type { Promocode } from "@/types/promocode";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

type Props = {
	className?: string;
	promocode?: Promocode;
};

export const AddCartPromocode = ({ className, promocode }: Props) => {
	const [addPromocode, { isLoading, error }] = useAddCartPromocodeMutation();
	const inputRef = useRef<HTMLInputElement | null>(null);

	useHandleError(error);

	const onPromocodeAdd = async () => {
		const promocode = inputRef.current?.value;
		if (!promocode) return;

		const { data, error } = await addCartPromocdeSchema.safeParseAsync({
			promocode,
		});

		if (error) {
			return toast.error("Не валидные данные");
		}

		addPromocode(data);
	};

	return (
		<div
			className={cn(
				"flex flex-col gap-2 w-full max-w-[400px]",
				{ "max-w-fit": !!promocode },
				className,
			)}
		>
			{promocode ? (
				<div className="flex justify-between rounded-[30px] bg-orange-50 p-4 shadow-md gap-x-4">
					<div className="flex items-center gap-3">
						<div className="flex flex-col">
							<span className="text-xs text-orange-500 uppercase tracking-wide mb-1">
								Промокод
							</span>
							<span className="font-bold text-orange-400 text-sm lg:text-base tracking-wide">
								{promocode.code.toUpperCase()}
							</span>
							<span className="text-xs text-orange-400 bg-orange-100 px-2 py-0.5 rounded-full w-max mt-1">
								{promocode.type === "percent"
									? `${promocode.discountValue}%`
									: `${promocode.discountValue}₽`}
							</span>
							<span className="text-[11px] text-gray-500 mt-1">
								Действует до:&nbsp;
								{new Date(promocode.validTo).toLocaleString("ru-RU", {
									day: "2-digit",
									month: "long",
									year: "numeric",
									hour: "2-digit",
									minute: "2-digit",
								})}
							</span>
						</div>
					</div>
					<Button
						onClick={() => toast.success("Промокод удалён")}
						variant="ghost"
						className="p-2 rounded-full hover:bg-transparent cursor-pointer"
					>
						✕
					</Button>
				</div>
			) : (
				<div className="flex items-center gap-x-3 w-full">
					<span className="uppercase text-xs font-bold lg:text-lg">
						промокод
					</span>
					<Input
						ref={inputRef}
						className="rounded-[30px] shadow-sm focus-visible:ring-0 focus:ring-0 flex-1"
					/>
					<Button
						disabled={isLoading}
						onClick={async () => await onPromocodeAdd()}
						variant="ghost"
						className="p-0 cursor-pointer text-xs text-orange-400 lg:text-lg hover:bg-transparent hover:text-orange-500"
					>
						Применить
					</Button>
				</div>
			)}
		</div>
	);
};
