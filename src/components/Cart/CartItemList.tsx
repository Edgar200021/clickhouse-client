import toast from "react-hot-toast";
import cartImg from "@/assets/images/cart.jpg";
import { useHandleError } from "@/hooks/useHandleError";
import { cn } from "@/lib/utils";
import { useGetCartQuery } from "@/store/cart/cartApi";
import { Spinner } from "../ui/Spinner";
import { AddCartPromocode } from "./AddCartPromocode";
import { CartItem } from "./CartItem";
import { ClearCart } from "./ClearCart";

type Props = {
	className?: string;
};

export const CartItemList = ({ className }: Props) => {
	const { data, isLoading, error } = useGetCartQuery(null);
	useHandleError(error);

	if (isLoading)
		return (
			<div className="flex items-center justify-center mt-80">
				<Spinner size="lg" />
			</div>
		);

	if (error || !data) return;

	if (!data.data.cartItems.length)
		return (
			<div className="flex flex-col gap-y-5">
				<p className="text-xs lg:text-lg">
					Добавьте товары в корзину, чтобы оформить заказ
				</p>
				<img
					src={cartImg}
					alt="Empty Cart"
					className="w-full h-full object-cover max-w-[750px]"
				/>
			</div>
		);

	return (
		<div className="flex flex-col gap-y-8">
			{!!data.data.cartItems.length && (
				<>
					<ul
						className={cn(
							"flex flex-col max-h-[1000px] overflow-y-auto",
							className,
						)}
					>
						{data.data.cartItems.map((c) => (
							<li
								className="py-[18px] border-b-[2px] border-b-[#e9e5e5] w-full"
								key={c.id}
							>
								<CartItem className="max-w-full" cartItem={c} />
							</li>
						))}
					</ul>
					<div className=" border-b-[2px] border-b-[#e9e5e5] pb-8">
						<AddCartPromocode
							promocode={data.data.promocode ?? undefined}
							className="ml-auto "
						/>
					</div>

					<div className="flex items-center gap-x-4 justify-between max-w-[400px] ml-auto font-bold">
						<span className="text-lg lg:text-[30px]">Общая сумма:&nbsp;</span>
						<span>
							<span className="text-lg lg:text-[30px]">
								{data.data.totalPrice}
							</span>
							&nbsp;
							{data.data.cartItems[0]?.currency.slice(0, 1)}
							{data.data.cartItems[0]?.currency.slice(1).toLowerCase()}
						</span>
					</div>
					<ClearCart
						className="ml-auto justify-end"
						onSuccess={() => toast.success("Корзина успешно очищена")}
					/>
				</>
			)}
		</div>
	);
};
