import { useState } from "react";
import arrowIcon from "@/assets/icons/arrow.svg";
import { CartItemMaxQuantityPerProduct } from "@/const/schema";
import { useAddCartItem } from "@/hooks/useAddCartItem";
import { calculateDiscount, cn } from "@/lib/utils";
import type { Combined } from "@/types/api";
import type { Product, ProductSku as PS } from "@/types/product";
import { Button } from "../ui/button";
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "../ui/collapsible";
import {
	Drawer,
	DrawerContent,
	DrawerDescription,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from "../ui/drawer";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../ui/select";

type Props = {
	className?: string;
	productSku: Combined<PS, Product, "product">;
};

const AddToCart = ({ productSku, className }: Props) => {
	const [quantity, setQuantity] = useState(1);
	const { addCartItem, isLoading } = useAddCartItem();

	const length = Math.min(productSku.quantity, CartItemMaxQuantityPerProduct);

	return (
		<div
			className={cn("flex flex-col gap-y-1 max-w-[361px] w-full", className)}
		>
			{productSku.salePrice && (
				<span className="flex items-center gap-x-2">
					<span className="text-red-500">
						-{calculateDiscount(productSku.price, productSku.salePrice)}%
					</span>
					<span className="line-through text-[#7d7d7d] text-sm">
						{productSku.price} {productSku.currency.slice(0, 1)}
						{productSku.currency.slice(1).toLowerCase()}
					</span>
				</span>
			)}
			<div className="flex items-center justify-between gap-x-3 mb-1">
				<span className="text-[30px] font-bold mb-2">
					{productSku.salePrice ?? productSku.price}
					<span className="text-sm pl-1">
						{productSku.currency.slice(0, 1)}
						{productSku.currency.slice(1).toLowerCase()}
					</span>
				</span>
				<Select
					onValueChange={(v) => setQuantity(Number(v))}
					value={quantity.toString()}
					defaultValue={quantity.toString()}
				>
					<SelectTrigger className="w-[90px] border-black rounded-[36px] cursor-pointer !focus:ring-0 !focus-visible:ring-0">
						<SelectValue placeholder="Количество" />
					</SelectTrigger>
					<SelectContent>
						{Array.from({ length }).map((_, i) => (
							<SelectItem key={i} value={(i + 1).toString()}>
								{i + 1}&nbsp;шт.
							</SelectItem>
						))}
					</SelectContent>
				</Select>
			</div>
			<Button
				disabled={isLoading}
				onClick={async () =>
					await addCartItem({ quantity, productSkuId: productSku.id })
				}
				className="text-white bg-orange-400 rounded-4xl py-6 w-full cursor-pointer hover:bg-orange-500 font-bold"
			>
				Добавить в корзину +
			</Button>
		</div>
	);
};

const Images = ({
	images,
	product,
	className,
}: Pick<Props["productSku"], "images" | "product"> &
	Pick<Props, "className">) => {
	const [image, setImage] = useState(images[0]);

	return (
		<div
			className={cn("flex flex-col gap-y-6 max-w-[733px] w-full", className)}
		>
			<img
				className="w-full h-[533px] object-cover md:h-[733px]"
				src={image.imageUrl}
				alt={product.name}
			/>
			{images.length > 1 && (
				<div className="relative">
					<ul
						className="
									flex items-center gap-[22px]
									overflow-x-auto md:overflow-x-visible
									scroll-smooth snap-x snap-mandatory
									py-2 md:py-0 scrollbar
								"
					>
						{images
							.filter((i) => i.id !== image.id)
							.map((i) => (
								<li key={i.id} className="flex-shrink-0 snap-start">
									<button
										type="button"
										onClick={() => setImage(i)}
										className="focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md cursor-pointer"
									>
										<img
											className="w-40 h-40 object-cover "
											src={i.imageUrl}
											alt={product.name}
										/>
									</button>
								</li>
							))}
					</ul>
				</div>
			)}
		</div>
	);
};

export const ProductDescription = ({
	product,
}: Pick<Props["productSku"], "product">) => {
	const [showMore, setShowMore] = useState<boolean | null>(
		product.description.length > 100 ? false : null,
	);
	return (
		<>
			<DrawerDescription className="text-[#5a5a5a] text-lg mb-8 px-4">
				{showMore === null || showMore
					? product.description
					: product.description.slice(0, 100)}
			</DrawerDescription>
			{showMore !== null && (
				<Button
					onClick={() => setShowMore((prev) => !prev)}
					variant="ghost"
					className="text-lg underline"
				>
					Читать далее
				</Button>
			)}
		</>
	);
};

export const ProductSkuDetail = ({ className, productSku }: Props) => {
	return (
		<div
			className={cn(
				"flex flex-col gap-x-0 gap-y-14 items-center min-[1060px]:flex-row min-[1060px]:gap-x-8 min-[1060px]:gap-y-0 min-[1060px]:items-start",
				className,
			)}
		>
			<Images images={productSku.images} product={productSku.product} />
			<div className="flex flex-col gap-y-2 max-w-[520px]">
				<h2 className="text-lg font-bold uppercase">
					{productSku.product.name}
				</h2>
				<div className="flex items-center gap-x-3">
					<span className="block text-lg font-normal">
						Арт. {productSku.sku}
					</span>
					<span className="text-[#dcdcdc]">/</span>
					<span className="text-sm text-[#7d7d7d]">
						{productSku.quantity > 0
							? `В наличии ${productSku.quantity}шт.`
							: "Нет в наличии"}
					</span>
				</div>
				<p className="text-[#7d7d7d] mb-9 text-lg">
					{productSku.product.shortDescription}
				</p>
				<AddToCart productSku={productSku} className="mb 9" />
				<p className="text-lg text-[#7d7d7d] mb-5">
					{productSku.product.description}
				</p>
				<hr className="h-[1px] border-[1px] border-[#e9e5e5]" />
				<Drawer direction="right">
					<DrawerTrigger asChild>
						<Button
							variant="ghost"
							className="p-0 cursor-pointer hover:bg-transparent justify-between gap-x-2 px-2"
						>
							<span>Подробнее о товаре</span>
							<img
								src={arrowIcon}
								alt="arrow"
								className="-rotate-90"
								width={10}
							/>
						</Button>
					</DrawerTrigger>
					<DrawerContent className="!max-w-[500px] py-10">
						<DrawerHeader>
							<DrawerTitle className="text-4xl font-bold">
								Подробнее о товаре
							</DrawerTitle>
						</DrawerHeader>
						<ProductDescription product={productSku.product} />
						<div className="flex flex-col divide-y gap divide-gray-300 border-t border-b border-gray-300">
							<Collapsible>
								<CollapsibleTrigger asChild>
									<Button
										variant="ghost"
										className={cn(
											"cursor-pointer group  rounded-[8px] px-3 py-8 flex gap-x-2 hover:bg-orange-200  w-full justify-start text-lg ",
										)}
									>
										<span>Материалы и уход</span>
										<img
											className="transition-transform duration-300 ease group-data-[state=open]:-rotate-180 ml-auto"
											width={14}
											height={8}
											src={arrowIcon}
											alt="arrow"
										/>
									</Button>
								</CollapsibleTrigger>
								<CollapsibleContent
									className={cn(
										"overflow-hidden data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down py-2 px-4",
									)}
								>
									{productSku.product.materialsAndCare}
								</CollapsibleContent>
							</Collapsible>

							{!!productSku.packages.length && (
								<Collapsible>
									<CollapsibleTrigger asChild>
										<Button
											variant="ghost"
											className={cn(
												"cursor-pointer group  rounded-[8px] px-3 py-8 flex gap-x-2 hover:bg-orange-200  w-full justify-start text-lg",
											)}
										>
											<span>Информация об упаковке</span>
											<img
												className="transition-transform duration-300 ease group-data-[state=open]:-rotate-180 ml-auto"
												width={14}
												height={8}
												src={arrowIcon}
												alt="arrow"
											/>
										</Button>
									</CollapsibleTrigger>
									<CollapsibleContent
										className={cn(
											"overflow-hidden data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down py-2 px-4",
										)}
									>
										<p className="text-[#7d7d7d] mb-2">
											Этот товар состоит из {productSku.packages.length}
											упаковок
										</p>
										<ul className="flex flex-col gap-y-3">
											{productSku.packages.map((p) => (
												<li key={p.id}>
													<dl className="space-y-1">
														<div className="flex">
															<dt className="w-40 text-[#7d7d7d] font-medium">
																Количество:
															</dt>
															<dd className=" text-[#7d7d7d]/70">
																{p.quantity}
															</dd>
														</div>
														<div className="flex">
															<dt className="w-40 text-[#7d7d7d] font-medium">
																Ширина, см:
															</dt>
															<dd className="text-[#7d7d7d]/70">{p.width}</dd>
														</div>
														<div className="flex">
															<dt className="w-40 text-[#7d7d7d] font-medium">
																Высота, см:
															</dt>
															<dd className="text-[#7d7d7d]/70">{p.height}</dd>
														</div>
														<div className="flex">
															<dt className="w-40 text-[#7d7d7d] font-medium">
																Длина, см:
															</dt>
															<dd className="text-[#7d7d7d]/70">{p.length}</dd>
														</div>
														<div className="flex">
															<dt className="w-40 text-[#7d7d7d] font-medium">
																Вес, кг:
															</dt>
															<dd className="text-[#7d7d7d]/70">{p.weight}</dd>
														</div>
													</dl>
												</li>
											))}
										</ul>
									</CollapsibleContent>
								</Collapsible>
							)}

							{!!productSku.product.assemblyInstructionFileUrl && (
								<Collapsible>
									<CollapsibleTrigger asChild>
										<Button
											variant="ghost"
											className={cn(
												"cursor-pointer group  rounded-[8px] px-3 py-8 flex gap-x-2 hover:bg-orange-200  w-full justify-start text-lg",
											)}
										>
											<span>Инструкция по сборке и документы</span>
											<img
												className="transition-transform duration-300 ease group-data-[state=open]:-rotate-180 ml-auto"
												width={14}
												height={8}
												src={arrowIcon}
												alt="arrow"
											/>
										</Button>
									</CollapsibleTrigger>
									<CollapsibleContent
										className={cn(
											"overflow-hidden data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down py-2 px-4",
										)}
									></CollapsibleContent>
								</Collapsible>
							)}

							<Collapsible>
								<CollapsibleTrigger asChild>
									<Button
										variant="ghost"
										className={cn(
											"cursor-pointer group  rounded-[8px] px-3 py-8 flex gap-x-2 hover:bg-orange-200  w-full justify-start text-lg",
										)}
									>
										<span>Прочие характеристики</span>
										<img
											className="transition-transform duration-300 ease group-data-[state=open]:-rotate-180 ml-auto"
											width={14}
											height={8}
											src={arrowIcon}
											alt="arrow"
										/>
									</Button>
								</CollapsibleTrigger>
								<CollapsibleContent
									className={cn(
										"overflow-hidden data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down py-2 px-4",
									)}
								>
									<dl className="space-y-1">
										<div className="flex">
											<dt className="w-40 text-[#7d7d7d] font-medium">Цвет:</dt>
											<dd className="text-[#7d7d7d]/70">
												{productSku.attributes.color}
											</dd>
										</div>
										<div className="flex">
											<dt className="w-40 text-[#7d7d7d] font-medium">
												Ширина, см:
											</dt>
											<dd className="text-[#7d7d7d]/70">
												{productSku.attributes.width}
											</dd>
										</div>
										<div className="flex">
											<dt className="w-40 text-[#7d7d7d] font-medium">
												Высота, см:
											</dt>
											<dd className="text-[#7d7d7d]/70">
												{productSku.attributes.height}
											</dd>
										</div>
										<div className="flex">
											<dt className="w-40 text-[#7d7d7d] font-medium">
												Длина, см:
											</dt>
											<dd className="text-[#7d7d7d]/70">
												{productSku.attributes.length}
											</dd>
										</div>

										{/*<div className="flex">
											<dt className="w-40 text-[#7d7d7d] font-medium">
												Производитель:
											</dt>
											<dd className="text-[#7d7d7d]/70">Swed House</dd>
										</div>*/}
									</dl>
								</CollapsibleContent>
							</Collapsible>
						</div>
					</DrawerContent>
				</Drawer>
				<hr className="h-[1px] border-[1px] border-[#e9e5e5]" />
			</div>
		</div>
	);
};
