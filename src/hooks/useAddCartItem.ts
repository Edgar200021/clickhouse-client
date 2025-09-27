import toast from "react-hot-toast";
import { addCartItemSchema } from "@/schemas/api/cart/addCartItem.schema";
import { useAddCartItemMutation } from "@/store/cart/cartApi";
import type { AddCartItemRequest } from "@/store/cart/types";
import { useHandleError } from "./useHandleError";

export const useAddCartItem = () => {
	const [addCartItem, { isLoading, error }] = useAddCartItemMutation();
	useHandleError(error);

	const onAddCartItem = async (data: AddCartItemRequest) => {
		const { data: payload, error } =
			await addCartItemSchema.safeParseAsync(data);

		if (error) {
			return toast.error("Не валидные данные");
		}

		addCartItem(payload);
	};

	return {
		addCartItem: onAddCartItem,
		isLoading,
		error,
	};
};
