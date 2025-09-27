import { useRef, useState } from "react";
import { useMediaQuery } from "usehooks-ts";
import closeIcon from "@/assets/icons/close.svg";
import searchIcon from "@/assets/icons/search.svg";
import { cn } from "@/lib/utils";
import { ProductSkuList } from "../ProductSku/ProductSkuList";
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
import { Input } from "../ui/input";

type Props = {
	className?: string;
};
export const AddCartItemBySku = ({ className }: Props) => {
	const [sku, setSku] = useState<string | undefined>(undefined);
	const [dialogOpen, setDialogOpen] = useState(false);
	const [drawerOpen, setDrawerOpen] = useState(false);

	const matches = useMediaQuery("(max-width: 799px)");
	const inputRef = useRef<HTMLInputElement | null>(null);

	if (matches) {
		return (
			<Dialog
				open={dialogOpen}
				onOpenChange={(val) => {
					if (val) return setDialogOpen(true);

					setSku(undefined);
					setDialogOpen(false);
				}}
			>
				<DialogTrigger asChild>
					<Button
						variant="ghost"
						className={cn(
							"p-0 cursor-pointer text-xs text-orange-400 hover:!bg-transparent hover:text-orange-500",
							className,
						)}
					>
						Добавить товар по артикулу
					</Button>
				</DialogTrigger>
				<DialogContent
					showCloseButton={false}
					showOverlay={false}
					className="top-[17%] bg-transparent shadow-none border-none items-start pt-5 px-2 !max-w-[500px] "
				>
					<DialogHeader className="items-start mb-6">
						<Button
							onClick={() => {
								setSku(undefined);
								setDialogOpen(false);
							}}
							variant="ghost"
							className="p-0 cursor-pointer justify-self-start hover:!bg-transparent"
						>
							<img src={closeIcon} alt="Close" />
						</Button>
						<DialogTitle className="text-3xl font-bold text-start">
							Добавить товар по артикулу
						</DialogTitle>
						<DialogDescription className="hidden"></DialogDescription>
					</DialogHeader>

					<div className="flex items-center justify-between rounded-[30px] py-2 px-5 focus-within:ring-1 gap-x-2 shadow-md mb-5 ">
						{/** biome-ignore lint/a11y/noLabelWithoutControl: <explanation> */}
						<label className={cn("flex items-center w-full ", className)}>
							<span className="text-xs text-nowrap">Введите артикул</span>
							<Input
								ref={inputRef}
								placeholder="/550e8400-e29b-41d4-a716-446655440000"
								className="placeholder:text-[#7d7d7d] placeholder:text-xs border-none focus:ring-0 focus-visible:ring-0 shadow-none"
							/>
						</label>
						<Button
							className="cursor-pointer p-0 w-6 h-6"
							variant="ghost"
							onClick={() => {
								const value = inputRef?.current?.value;
								if (!value?.trim()) return;

								setSku(value.trim());
							}}
						>
							<img
								className="w-full h-full object-cover"
								src={searchIcon}
								alt="Search"
							/>
						</Button>
					</div>

					{dialogOpen && (
						<ProductSkuList
							renderElement={{
								fn: (len) =>
									len > 0 ? (
										<span className="text-xs text-[#7d7d7d] block mb-2">
											Выберите нужный товар:
										</span>
									) : sku ? (
										<span className="text-lg block mb-2">
											Товар по артикулу ${sku} не найден
										</span>
									) : null,
								position: "top",
							}}
							baseFilters={{
								sku,
							}}
							className="flex flex-col gap-y-4 [&>li]:border-b-2 [&>li]:border-gray-200 mb-0 max-h-[600px] overflow-y-auto"
							type="cart"
							withPagination={false}
							showWhenKeysProvided={["sku"]}
						/>
					)}
				</DialogContent>
			</Dialog>
		);
	}

	return (
		<Drawer
			direction="right"
			open={drawerOpen}
			onOpenChange={(open) => {
				if (open) return setDrawerOpen(true);
				setSku(undefined);
				setDrawerOpen(false);
			}}
		>
			<DrawerTrigger asChild>
				<Button
					variant="ghost"
					className={cn(
						"p-0 cursor-pointer text-xs text-orange-400 hover:!bg-transparent hover:text-orange-500 lg:text-lg",
						className,
					)}
				>
					Добавить товар по артикулу
				</Button>
			</DrawerTrigger>
			<DrawerContent className="px-4 pt-20 !max-w-[454px]">
				<DrawerHeader className="mb-8">
					<DrawerTitle className="text-4xl font-bold p-0">
						Добавить товар по артикулу
					</DrawerTitle>
				</DrawerHeader>
				<DrawerDescription className="hidden" />

				<div className="flex items-center justify-between rounded-[30px] py-2 px-5 focus-within:ring-1 gap-x-2 shadow-md mb-10 ">
					{/** biome-ignore lint/a11y/noLabelWithoutControl: <explanation> */}
					<label className={cn("flex items-center w-full ", className)}>
						<span className="text-xs text-nowrap">Введите артикул</span>
						<Input
							ref={inputRef}
							placeholder="/550e8400-e29b-41d4-a716-446655440000"
							className="placeholder:text-[#7d7d7d] placeholder:text-xs border-none focus:ring-0 focus-visible:ring-0 shadow-none"
						/>
					</label>
					<Button
						className="cursor-pointer p-0 w-6 h-6"
						variant="ghost"
						onClick={() => {
							const value = inputRef?.current?.value;
							if (!value?.trim()) return;

							setSku(value.trim());
						}}
					>
						<img
							className="w-full h-full object-cover"
							src={searchIcon}
							alt="Search"
						/>
					</Button>
				</div>

				{drawerOpen && (
					<ProductSkuList
						renderElement={{
							fn: (len) =>
								len > 0 ? (
									<span className="text-xs text-[#7d7d7d] block mb-2">
										Выберите нужный товар:
									</span>
								) : sku ? (
									<span className="text-lg block mb-2">
										Товар по артикулу ${sku} не найден
									</span>
								) : null,
							position: "top",
						}}
						baseFilters={{
							sku,
						}}
						className="flex flex-col gap-y-4 [&>li]:border-b-2 [&>li]:border-gray-200 mb-0 max-h-[600px] overflow-y-auto"
						type="cart"
						withPagination={false}
						showWhenKeysProvided={["sku"]}
					/>
				)}
			</DrawerContent>
		</Drawer>
	);
};
