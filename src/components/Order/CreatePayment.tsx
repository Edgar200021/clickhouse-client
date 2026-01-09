import { CreditCard } from "lucide-react";
import type { ComponentProps } from "react";
import toast from "react-hot-toast";
import z from "zod";
import { useHandleError } from "@/hooks/useHandleError";
import { createPaymentSchema } from "@/schemas/api/payment/createPayment.schema";
import { useCreatePaymentMutation } from "@/store/payment/paymentApi";
import type { Order } from "@/types/order";
import { Button } from "../ui/button";

interface Props extends ComponentProps<"button"> {
	className?: string;
	orderNumber: Order["number"];
	orderStatus: Order["status"];
}

export const CreatePayment = ({
	className,
	orderNumber,
	orderStatus,
	...rest
}: Props) => {
	const [createPayment, { isLoading, error }] = useCreatePaymentMutation();
	useHandleError(error);

	const onClick = async () => {
		const { data, error } = await createPaymentSchema.safeParseAsync({
			orderNumber,
		});
		if (error) {
			return toast.error(z.treeifyError(error).errors[0]);
		}

		const {
			data: { redirectUrl },
		} = await createPayment(data).unwrap();

		window.location.href = redirectUrl;
	};

	return (
		<Button
			className="w-full flex items-center justify-center gap-2 bg-orange-400 cursor-pointer py-5 rounded-3xl hover:bg-orange-500"
			disabled={isLoading || rest.disabled}
			{...rest}
			onClick={onClick}
		>
			<CreditCard className="w-4 h-4" />
			{orderStatus === "pending" ? "Оплатить" : "Оплата недоступна"}
		</Button>
	);
};
