import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDebounceValue, useMediaQuery } from "usehooks-ts";
import closeIcon from "@/assets/icons/close.svg";
import { Routes } from "@/const/routes";
import { CartItemMaxQuantityPerProduct } from "@/const/schema";
import { useHandleError } from "@/hooks/useHandleError";
import { calculateDiscount, cn } from "@/lib/utils";
import { updateCartItemSchema } from "@/schemas/api/cart/updateCartItem.schema";
import {
	useDeleteCartItemMutation,
	useUpdateCartItemMutation,
} from "@/store/cart/cartApi";
import type { CartItemCombined } from "@/types/cart";
import { Button } from "../ui/button";
import { Counter } from "../ui/Counter";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "../ui/dialog";
import {
	Drawer,
	DrawerContent,
	DrawerDescription,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from "../ui/drawer";

type Props = {
	className?: string;
	cartItem: CartItemCombined;
};

const DeleteCartItem = ({ id }: Pick<Props["cartItem"], "id">) => {
	const [dialogOpen, setDialogOpen] = useState(false);
	const [drawerOpen, setDrawerOpen] = useState(false);
	const matches = useMediaQuery("(max-width: 500px)");

	const [deleteCartItem, { isLoading, error }] = useDeleteCartItemMutation();

	useHandleError(error);

	if (matches) {
		return (
			<Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
				<DialogTrigger asChild>
					<Button
						disabled={isLoading}
						variant="ghost"
						className="cursor-pointer text-xs text-[#7d7d7d] hover:bg-transparent z-10"
					>
						Удалить
					</Button>
				</DialogTrigger>

				<DialogContent
					showCloseButton={false}
					showOverlay={false}
					className="top-[10%] bg-transparent shadow-none border-none items-start pt-5  !max-w-[500px] "
				>
					<DialogHeader className="items-start mb-6">
						<Button
							onClick={() => setDialogOpen(false)}
							disabled={isLoading}
							variant="ghost"
							className="p-0 cursor-pointer justify-self-start hover:!bg-transparent"
						>
							<img src={closeIcon} alt="Close" />
						</Button>
						<DialogTitle className="text-2xl font-bold text-start ">
							Удалить товар?
						</DialogTitle>
						<DialogDescription className="hidden"></DialogDescription>
					</DialogHeader>

					<div className="flex items-center justify-between gap-x-3">
						<Button
							onClick={() => deleteCartItem({ cartItemId: id })}
							disabled={isLoading}
							className="py-3 px-8 rounded-[115px] cursor-pointer text-xs hover:bg-orange-500 bg-orange-400 text-white sm:w-2/3 lg:text-lg lg:py-6"
						>
							Удалить
						</Button>
						<Button
							disabled={isLoading}
							className="cursor-pointer p-0 text-xs underline hover:bg-transparent"
							variant="ghost"
							onClick={() => setDialogOpen(false)}
						>
							Отменить
						</Button>
					</div>
				</DialogContent>
			</Dialog>
		);
	}

	return (
		<Drawer direction="right" open={drawerOpen} onOpenChange={setDrawerOpen}>
			<DrawerTrigger asChild>
				<Button
					disabled={isLoading}
					variant="ghost"
					className="cursor-pointer text-xs text-[#7d7d7d] hover:bg-transparent z-10"
				>
					Удалить
				</Button>
			</DrawerTrigger>

			<DrawerContent className="px-4 pt-10 !max-w-[454px]">
				<DrawerHeader className="mb-8 p-0">
					<Button
						onClick={() => setDrawerOpen(false)}
						disabled={isLoading}
						variant="ghost"
						className="p-0 cursor-pointer ml-auto mb-12 hover:!bg-transparent"
					>
						<img src={closeIcon} alt="Close" />
					</Button>
					<DrawerTitle className="text-4xl font-bold p-0">
						Удалить товар?
					</DrawerTitle>
				</DrawerHeader>
				<DrawerDescription className="hidden" />

				<div className="flex items-center justify-between gap-x-3">
					<Button
						onClick={() => deleteCartItem({ cartItemId: id })}
						disabled={isLoading}
						className="py-3 px-8 rounded-[115px] cursor-pointer text-xs hover:bg-orange-500 bg-orange-400 text-white sm:w-2/3 lg:text-lg lg:py-6"
					>
						Удалить
					</Button>
					<Button
						disabled={isLoading}
						className="cursor-pointer p-0 text-xs underline hover:bg-transparent"
						variant="ghost"
						onClick={() => setDrawerOpen(false)}
					>
						Отмена
					</Button>
				</div>
			</DrawerContent>
		</Drawer>
	);
};

const Actions = ({ cartItem }: Pick<Props, "cartItem">) => {
	const [quantity, setQuantity] = useState(cartItem.quantity);
	const debounced = useDebounceValue(quantity, 400);
	const [updateCartItem, { isLoading, error }] = useUpdateCartItemMutation();
	useHandleError(error);

	useEffect(() => {
		if (debounced[0] === cartItem.quantity) return;

		(async () => {
			try {
				const { error, data } = await updateCartItemSchema.safeParseAsync({
					cartItemId: cartItem.id,
					quantity: debounced[0],
				});

				if (error) {
					return toast.error("Не валидные данные");
				}

				updateCartItem(data).unwrap();
			} catch (_) {
				setQuantity(cartItem.quantity);
			}
		})();
	}, [debounced[0], cartItem.quantity, cartItem.id]);

	return (
		<div className="flex gap-x-4 items-center justify-between md:flex-col md:gap-x-0 md:gap-y-4 md:justify-between">
			<Counter
				className={
					cartItem.productSkuQuantity === 0 ? "pointer-events-none" : "z-10"
				}
				value={quantity}
				setValue={setQuantity}
				disabled={
					quantity >= cartItem.productSkuQuantity ||
					quantity === CartItemMaxQuantityPerProduct ||
					isLoading
				}
			/>
			<DeleteCartItem id={cartItem.id} />
		</div>
	);
};

export const CartItem = ({ className, cartItem }: Props) => {
	return (
		<div
			className={cn(
				"max-w-[628px] w-full flex gap-x-6 relative",
				cartItem.productSkuQuantity === 0 && "opacity-50 grayscale",
				className,
			)}
		>
			<Link
				className="w-full h-full absolute left-0 top-0"
				to={Routes.Product}
				params={{
					productSkuId: cartItem.productSkuId.toString(),
				}}
			/>
			<div className="relative">
				<img
					className="w-[100px] h-[100px] md:w-[140px] md:h-[140px] xl:w-[194px] xl:h-[194px] object-cover"
					src={cartItem.images[0].imageUrl}
					alt={cartItem.product.name}
				/>
				{cartItem.productSkuQuantity === 0 && (
					<span className="absolute inset-0 flex items-center justify-center bg-black/50 text-white text-sm font-bold">
						Нет в наличии
					</span>
				)}
			</div>

			<div className="flex flex-col gap-y-6 md:flex-row md:gap-y-0 md:gap-x-[38px] justify-between w-full">
				<div className="flex flex-col gap-y-2 text-xs md:text-lg">
					<span className="font-bold"> {cartItem.product.name}</span>
					<span className="break-word z-10">Арт.&nbsp;{cartItem.sku}</span>
					<span className="text-[#7d7d7d]">
						{cartItem.product.shortDescription}
					</span>
					<span className="text-[#7d7d7d] text-sm text-nowrap mb-8">
						{cartItem.productSkuQuantity > 0
							? `В наличии ${cartItem.productSkuQuantity}шт.`
							: "Нет в наличии"}
					</span>

					{cartItem.salePrice && (
						<span className="flex items-center gap-x-2 leading-[100%]">
							<span className="text-red-500">
								-{calculateDiscount(cartItem.price, cartItem.salePrice)}%
							</span>
							<span className="line-through text-[#7d7d7d] text-sm">
								{cartItem.price} {cartItem.currency.slice(0, 1)}
								{cartItem.currency.slice(1).toLowerCase()}
							</span>
						</span>
					)}

					<span className="text-lg md:text-2xl font-bold mb-2 leading-[100%]">
						{cartItem.salePrice ?? cartItem.price}
						<span className="text-sm pl-1">
							{cartItem.currency.slice(0, 1)}
							{cartItem.currency.slice(1).toLowerCase()}
						</span>
					</span>
				</div>
				<Actions cartItem={cartItem} />
			</div>
		</div>
	);
};
