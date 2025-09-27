import { Link } from "@tanstack/react-router";
import { useState } from "react";
import basketIcon from "@/assets/icons/basket.svg";
import { Routes } from "@/const/routes";
import { CartItemMaxQuantityPerProduct } from "@/const/schema";
import { useAddCartItem } from "@/hooks/useAddCartItem";
import { calculateDiscount, cn } from "@/lib/utils";
import type { Combined } from "@/types/api";
import type { Product, ProductSku as PS } from "@/types/product";
import { Slider } from "../Slider";
import { Button } from "../ui/button";
import { Counter } from "../ui/Counter";

type Props = {
	className?: string;
	productSku: Combined<PS, Product, "product">;
	type?: "cart" | "base";
};

const AddToCart = ({
	type = "base",
	productSku: { id, quantity: productSkuQiantity },
	className,
}: Props) => {
	const [quantity, setQuantity] = useState(1);
	const { addCartItem, isLoading } = useAddCartItem();

	if (type === "base")
		return (
			<div
				className={cn("flex items-center justify-between gap-x-2", className)}
			>
				<Counter
					value={quantity}
					setValue={setQuantity}
					disabled={
						quantity >= productSkuQiantity ||
						quantity >= CartItemMaxQuantityPerProduct
					}
				/>
				<Button
					onClick={async () =>
						await addCartItem({ quantity, productSkuId: id })
					}
					disabled={isLoading}
					className="cursor-pointer p-0 rounded-full bg-orange-400 w-12 h-10 hover:bg-orange-500 relative z-20"
				>
					<img className="object-cover" src={basketIcon} alt="Basket" />
				</Button>
			</div>
		);

	return (
		<Button
			onClick={async () => await addCartItem({ quantity, productSkuId: id })}
			disabled={isLoading}
			className={cn(
				"cursor-pointer p-0 rounded-full bg-orange-400 w-[38px] h-[38px] hover:bg-orange-500 relative z-20",
				className,
			)}
		>
			<img
				className="w-[22px] h-[18px] object-contain"
				src={basketIcon}
				alt="Basket"
			/>
		</Button>
	);
};

export const ProductSku = ({ className, productSku, type = "base" }: Props) => {
	return (
		<div
			className={cn(
				"flex flex-col gap-y-5 py-4 px-3 hover:rounded-md hover:shadow-lg max-w-[290px] w-full relative",
				{
					"max-lg:flex-row max-lg:gap-y-0 gap-x-6 max-w-[600px] hover:rounded-none hover:shadow-none max-sm:px-0":
						type === "cart",
				},
				className,
			)}
		>
			<Link
				className="w-full h-full absolute left-0 top-0"
				to={Routes.Product}
				params={{
					productSkuId: productSku.id.toString(),
				}}
			/>
			{productSku.images.length &&
				(type === "base" ? (
					<Slider
						items={productSku.images.map((image) => (
							<img
								key={image.imageId}
								src={image.imageUrl}
								alt={productSku.product.name}
								className="object-cover h-[300px] w-full"
							/>
						))}
					/>
				) : (
					<img
						className="md:w-20 md:h-20 w-[67px] h-[67px] object-cover"
						src={productSku.images[0].imageUrl}
						alt={productSku.product.name}
					/>
				))}
			<div
				className={
					type === "cart" ? "flex items-center justify-between gap-x-3" : ""
				}
			>
				<div className={cn("flex flex-col")}>
					<span className="text-lg">{productSku.product.name}</span>
					{type === "cart" && (
						<span className="text-sm flex items-center gap-x-1">
							<span className=" mb-1 z-20 break-word">
								Арт.&nbsp;{productSku.sku}
							</span>
							<span className="text-[#dcdcdc]">/</span>
							<span className="text-[#7d7d7d] ">
								{productSku.quantity > 0 ? "В наличии" : "Нет в наличии"}
							</span>
						</span>
					)}
					<span
						className={cn("text-lg mb-2", {
							"text-sm text-[#7d7d7d] mb-1": type === "cart",
						})}
					>
						{productSku.product.shortDescription}
					</span>
					{type === "cart" && (
						<span className="text-sm text-[#7d7d7d] mb-1">
							{productSku.attributes.width}x{productSku.attributes.height}x
							{productSku.attributes.length}
						</span>
					)}
					{type === "base" ? (
						<>
							{productSku.salePrice && (
								<span className="text-sm text-[#7d7d7d] line-through">
									{productSku.price}
									{productSku.currency.slice(0, 1)}
									{productSku.currency.slice(1).toLowerCase()}
								</span>
							)}
							<div className="flex items-center justify-between gap-x-5 mb-2">
								<span className="text-[30px] font-bold leading-[100%]">
									{productSku.salePrice || productSku.price}
									<span className="text-sm pl-1">
										{productSku.currency.slice(0, 1)}
										{productSku.currency.slice(1).toLowerCase()}
									</span>
								</span>

								{productSku.salePrice && (
									<span className="font-bold text-lg text-red-500">
										-{calculateDiscount(productSku.price, productSku.salePrice)}
										%
									</span>
								)}
							</div>
						</>
					) : (
						<div className="flex gap-x-1 items-end">
							{productSku.salePrice && (
								<span className="font-bold text-xs text-red-500">
									-{calculateDiscount(productSku.price, productSku.salePrice)}%
								</span>
							)}
							<span className="font-bold text-lg leading-[100%]">
								{productSku.salePrice ?? productSku.price}&nbsp;
								{productSku.currency.slice(0, 1)}
								{productSku.currency.slice(1).toLowerCase()}
							</span>
							{productSku.salePrice && (
								<span className="text-xs text-[#7d7d7d] line-through">
									{productSku.price}
									{productSku.currency.slice(0, 1)}
									{productSku.currency.slice(1).toLowerCase()}
								</span>
							)}
						</div>
					)}

					{type === "base" && <AddToCart type="base" productSku={productSku} />}
				</div>
				{type === "cart" && (
					<AddToCart
						type="cart"
						productSku={productSku}
						className="max-lg:hidden self-end"
					/>
				)}
			</div>
			{type === "cart" && (
				<AddToCart
					type="cart"
					productSku={productSku}
					className="lg:hidden self-end"
				/>
			)}
		</div>
	);
};
