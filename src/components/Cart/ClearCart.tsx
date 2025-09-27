import { useState } from "react";
import { useMediaQuery } from "usehooks-ts";
import closeIcon from "@/assets/icons/close.svg";
import { useHandleError } from "@/hooks/useHandleError";
import { cn } from "@/lib/utils";
import { useClearCartMutation } from "@/store/cart/cartApi";
import { Button } from "../ui/button";
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
	onSuccess?: () => void;
};

export const ClearCart = ({ className, onSuccess }: Props) => {
	const [dialogOpen, setDialogOpen] = useState(false);
	const [drawerOpen, setDrawerOpen] = useState(false);
	const [clearCart, { isLoading, error }] = useClearCartMutation();
	useHandleError(error);

	const matches = useMediaQuery("(max-width: 500px)");

	const onClearCart = async () => {
		await clearCart(null).unwrap();
		onSuccess?.();
		setDialogOpen(false);
		setDrawerOpen(false);
	};

	if (matches) {
		return (
			<Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
				<div
					className={cn(
						"flex items-center gap-x-8 max-w-[550px] w-full",
						className,
					)}
				>
					<DialogTrigger asChild>
						<Button
							variant="ghost"
							className="cursor-pointer p-0 underline text-xs hover:bg-transparent lg:text-lg"
						>
							Очистить корзину
						</Button>
					</DialogTrigger>
					<Button className="py-3 px-8 rounded-[115px] cursor-pointer text-xs hover:bg-orange-500 bg-orange-400 text-white sm:w-2/3 lg:text-lg lg:py-6">
						Оформить заказ
					</Button>
				</div>

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
							Очистить корзину?
						</DialogTitle>
						<DialogDescription className="hidden"></DialogDescription>
					</DialogHeader>

					<div className="flex items-center justify-between gap-x-3">
						<Button
							onClick={async () => await onClearCart()}
							disabled={isLoading}
							className="py-3 px-8 rounded-[115px] cursor-pointer text-xs hover:bg-orange-500 bg-orange-400 text-white sm:w-2/3 lg:text-lg lg:py-6"
						>
							Очистить
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
			<div
				className={cn(
					"flex items-center gap-x-8 max-w-[550px] w-full",
					className,
				)}
			>
				<DrawerTrigger asChild>
					<Button
						variant="ghost"
						className="cursor-pointer p-0 underline text-xs hover:bg-transparent lg:text-lg"
					>
						Очистить корзину
					</Button>
				</DrawerTrigger>
				<Button className="py-3 px-8 rounded-[115px] cursor-pointer text-xs hover:bg-orange-500 bg-orange-400 text-white sm:w-2/3 lg:text-lg lg:py-6">
					Оформить заказ
				</Button>
			</div>

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
						Очистить корзину?
					</DrawerTitle>
				</DrawerHeader>
				<DrawerDescription className="hidden" />

				<div className="flex items-center justify-between gap-x-3">
					<Button
						onClick={async () => await onClearCart()}
						disabled={isLoading}
						className="py-3 px-8 rounded-[115px] cursor-pointer text-xs hover:bg-orange-500 bg-orange-400 text-white sm:w-2/3 lg:text-lg lg:py-6"
					>
						Очистить
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
