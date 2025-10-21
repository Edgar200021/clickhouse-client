import { useRef } from "react";
import toast from "react-hot-toast";
import { Currencies } from "@/const/currencies";
import { useHandleError } from "@/hooks/useHandleError";
import { cn } from "@/lib/utils";
import { addCartPromocdeSchema } from "@/schemas/api/cart/addCartPromocode.schema";
import {
	useAddCartPromocodeMutation,
	useDeleteCartPromocodeMutation,
} from "@/store/cart/cartApi";
import type { GetCartResponse } from "@/store/cart/types";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

type Props = {
	className?: string;
	cart?: Pick<GetCartResponse["data"], "promocode" | "currency">;
};

export const AddCartPromocode = ({ className, cart }: Props) => {
	const [addPromocode, { isLoading, error }] = useAddCartPromocodeMutation();
	const [deletePromocode, { isLoading: isDeleteLoading, error: deleteError }] =
		useDeleteCartPromocodeMutation();
	const inputRef = useRef<HTMLInputElement | null>(null);

	useHandleError(error || deleteError);

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
				{ "max-w-fit": !!cart?.promocode },
				className,
			)}
		>
			{cart?.promocode ? (
				<div className="flex justify-between rounded-[30px] bg-orange-50 p-4 shadow-md gap-x-4">
					<div className="flex items-center gap-3">
						<div className="flex flex-col">
							<span className="text-xs text-orange-500 uppercase tracking-wide mb-1">
								Промокод
							</span>
							<span className="font-bold text-orange-400 text-sm lg:text-base tracking-wide">
								{cart.promocode.code.toUpperCase()}
							</span>
							<span className="text-xs text-orange-400 bg-orange-100 px-2 py-0.5 rounded-full w-max mt-1">
								{cart.promocode.type === "percent"
									? `${cart.promocode.discountValue}%`
									: `${cart.promocode.discountValue}${Currencies[cart.currency]}`}
							</span>
							<span className="text-[11px] text-gray-500 mt-1">
								Действует до:&nbsp;
								{new Date(cart.promocode.validTo).toLocaleString("ru-RU", {
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
						disabled={isLoading || isDeleteLoading}
						onClick={() => deletePromocode(null)}
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
						disabled={isLoading || isDeleteLoading}
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
