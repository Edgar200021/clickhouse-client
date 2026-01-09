import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useMediaQuery } from "usehooks-ts";
import closeIcon from "@/assets/icons/close.svg";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import {
	Drawer,
	DrawerContent,
	DrawerDescription,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from "@/components/ui/drawer";
import { FieldErrors } from "@/components/ui/FieldErrors";
import { Input } from "@/components/ui/input";
import { Routes } from "@/const/routes";
import { useHandleError } from "@/hooks/useHandleError";
import { cn } from "@/lib/utils";
import {
	type CreateOrderSchema,
	createOrderSchema,
} from "@/schemas/api/order/createOrder.schema";
import { useCreateOrderMutation } from "@/store/order/orderApi";
import type { FieldPaths } from "@/types/base";
import type { Currency } from "@/types/currency.enum";
import { Order } from "../../Order/Order";

interface Props {
	className?: string;
	currency: Currency;
	total: number;
}

export const CreateOrderForm = ({ className, currency, total }: Props) => {
	const {
		handleSubmit,
		formState: { errors, isValid },
		control,
	} = useForm<CreateOrderSchema>({
		resolver: zodResolver(createOrderSchema),
		defaultValues: {
			currency,
			phoneNumber: "",
			email: "",
			name: "",
			billingAddress: {
				city: "",
				street: "",
				home: "",
				apartment: "",
			},
			deliveryAddress: {
				city: "",
				street: "",
				home: "",
				apartment: "",
			},
		},
	});
	const [dialogOpen, setDialogOpen] = useState(false);
	const [drawerOpen, setDrawerOpen] = useState(false);
	const [createOrder, { isLoading, error }] = useCreateOrderMutation();
	const { apiValidationErrors } =
		useHandleError<FieldPaths<CreateOrderSchema>[]>(error);
	const matches = useMediaQuery("(max-width: 799px)");
	const navigate = useNavigate();

	const onSubmit = async (data: CreateOrderSchema) => {
		const {
			data: { orderNumber },
		} = await createOrder(data).unwrap();
		navigate({
			to: Routes.Orders.SpecificOrder,
			params: { orderNumber },
		});
	};

	if (matches) {
		return (
			<Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
				<DialogTrigger asChild>
					<Button
						disabled={isLoading}
						className="py-3 px-8 rounded-[115px] cursor-pointer text-xs hover:bg-orange-500 bg-orange-400 text-white sm:w-2/3 lg:text-lg lg:py-6"
					>
						Оформить заказ
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
						<DialogTitle className="text-4xl font-bold text-start ">
							Оформление заказа
						</DialogTitle>
						<DialogDescription className="hidden"></DialogDescription>
					</DialogHeader>

					<form onSubmit={handleSubmit(onSubmit)} className={cn("", className)}>
						<fieldset disabled={isLoading}></fieldset>
					</form>
				</DialogContent>
			</Dialog>
		);
	}

	return (
		<Drawer direction="right" open={drawerOpen} onOpenChange={setDrawerOpen}>
			<DrawerTrigger asChild>
				<Button
					disabled={isLoading}
					className="py-3 px-8 rounded-[115px] cursor-pointer text-xs hover:bg-orange-500 bg-orange-400 text-white sm:w-2/3 lg:text-lg lg:py-6"
				>
					Оформить заказ
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
					<DrawerTitle className="text-4xl font-bold">
						Оформление заказа
					</DrawerTitle>
				</DrawerHeader>
				<DrawerDescription className="hidden" />
				<form onSubmit={handleSubmit(onSubmit)} className={cn("", className)}>
					<fieldset disabled={isLoading}>
						<div className="flex flex-col gap-y-10 mb-10">
							<div>
								<span className="text-xs mb-8 block">
									Контактная информация
								</span>
								<div className="flex flex-col gap-y-4">
									<Controller
										name="phoneNumber"
										control={control}
										render={({ field: { onChange, value } }) => (
											<div className="flex flex-col gap-y-1">
												<Input
													className="border-0 placeholder:text-[#5a5a5a] py-5 px-4 rounded-3xl focus:border-[1px] focus-visible:ring-0 "
													placeholder="Телефон*"
													type="tel"
													required
													onChange={onChange}
													value={value}
												/>
												{(errors.phoneNumber?.message ||
													apiValidationErrors.phoneNumber) && (
													<FieldErrors
														error={
															errors.phoneNumber?.message ||
															apiValidationErrors.phoneNumber!
														}
													/>
												)}
											</div>
										)}
									/>

									<Controller
										name="email"
										control={control}
										render={({ field: { onChange, value } }) => (
											<div className="flex flex-col gap-y-1">
												<Input
													className="border-0 placeholder:text-[#5a5a5a] py-5 px-4 rounded-3xl focus:border-[1px] focus-visible:ring-0 "
													placeholder="Email*"
													type="email"
													required
													onChange={onChange}
													value={value}
												/>
												{(errors.email?.message ||
													apiValidationErrors.email) && (
													<FieldErrors
														error={
															errors.email?.message ||
															apiValidationErrors.email!
														}
													/>
												)}
											</div>
										)}
									/>

									<Controller
										name="name"
										control={control}
										render={({ field: { onChange, value } }) => (
											<div className="flex flex-col gap-y-1">
												<Input
													className="border-0 placeholder:text-[#5a5a5a] py-5 px-4 rounded-3xl focus:border-[1px] focus-visible:ring-0 "
													placeholder="Имя*"
													type="text"
													required
													onChange={onChange}
													value={value}
												/>
												{(errors.name?.message || apiValidationErrors.name) && (
													<FieldErrors
														error={
															errors.name?.message || apiValidationErrors.name!
														}
													/>
												)}
											</div>
										)}
									/>
								</div>
							</div>

							<div>
								<span className="text-xs mb-8 block">Адрес заказа</span>
								<div className="flex flex-col gap-y-4">
									<Controller
										name="billingAddress.city"
										control={control}
										render={({ field: { onChange, value } }) => (
											<div className="flex flex-col gap-y-1">
												<Input
													className="border-0 placeholder:text-[#5a5a5a] py-5 px-4 rounded-3xl focus:border-[1px] focus-visible:ring-0 "
													placeholder="Город*"
													type="text"
													required
													onChange={onChange}
													value={value}
												/>
												{(errors.billingAddress?.city ||
													apiValidationErrors["billingAddress/city"]) && (
													<FieldErrors
														error={
															errors.billingAddress?.city?.message ||
															apiValidationErrors["billingAddress/city"]!
														}
													/>
												)}
											</div>
										)}
									/>
									<Controller
										name="billingAddress.street"
										control={control}
										render={({ field: { onChange, value } }) => (
											<div className="flex flex-col gap-y-1">
												<Input
													className="border-0 placeholder:text-[#5a5a5a] py-5 px-4 rounded-3xl focus:border-[1px] focus-visible:ring-0 "
													placeholder="Улица*"
													type="text"
													required
													onChange={onChange}
													value={value}
												/>
												{(errors.billingAddress?.street ||
													apiValidationErrors["billingAddress/street"]) && (
													<FieldErrors
														error={
															errors.billingAddress?.street?.message ||
															apiValidationErrors["billingAddress/street"]!
														}
													/>
												)}
											</div>
										)}
									/>
									<div className="flex items-center gap-x-5">
										<Controller
											name="billingAddress.home"
											control={control}
											render={({ field: { onChange, value } }) => (
												<div className="flex flex-col gap-y-1">
													<Input
														className="border-0 placeholder:text-[#5a5a5a] py-5 px-4 rounded-3xl focus:border-[1px] focus-visible:ring-0 "
														placeholder="Дом*"
														type="text"
														required
														onChange={onChange}
														value={value}
													/>
													{(errors.billingAddress?.home ||
														apiValidationErrors["billingAddress/home"]) && (
														<FieldErrors
															error={
																errors.billingAddress?.home?.message ||
																apiValidationErrors["billingAddress/home"]!
															}
														/>
													)}
												</div>
											)}
										/>

										<Controller
											name="billingAddress.apartment"
											control={control}
											render={({ field: { onChange, value } }) => (
												<div className="flex flex-col gap-y-1">
													<Input
														className="border-0 placeholder:text-[#5a5a5a] py-5 px-4 rounded-3xl focus:border-[1px] focus-visible:ring-0 "
														placeholder="Подьезд*"
														type="text"
														required
														onChange={onChange}
														value={value}
													/>
													{(errors.billingAddress?.apartment ||
														apiValidationErrors[
															"billingAddress/apartment"
														]) && (
														<FieldErrors
															error={
																errors.billingAddress?.apartment?.message ||
																apiValidationErrors["billingAddress/apartment"]!
															}
														/>
													)}
												</div>
											)}
										/>
									</div>
								</div>
							</div>

							<div>
								<span className="text-xs mb-8 block">Адрес доставки</span>
								<div className="flex flex-col gap-y-4">
									<Controller
										name="deliveryAddress.city"
										control={control}
										render={({ field: { onChange, value } }) => (
											<div className="flex flex-col gap-y-1">
												<Input
													className="border-0 placeholder:text-[#5a5a5a] py-5 px-4 rounded-3xl focus:border-[1px] focus-visible:ring-0 "
													placeholder="Город*"
													type="text"
													required
													onChange={onChange}
													value={value}
												/>
												{(errors.deliveryAddress?.city ||
													apiValidationErrors["deliveryAddress/city"]) && (
													<FieldErrors
														error={
															errors.deliveryAddress?.city?.message ||
															apiValidationErrors["deliveryAddress/city"]!
														}
													/>
												)}
											</div>
										)}
									/>
									<Controller
										name="deliveryAddress.street"
										control={control}
										render={({ field: { onChange, value } }) => (
											<div className="flex flex-col gap-y-1">
												<Input
													className="border-0 placeholder:text-[#5a5a5a] py-5 px-4 rounded-3xl focus:border-[1px] focus-visible:ring-0 "
													placeholder="Улица*"
													type="text"
													required
													onChange={onChange}
													value={value}
												/>
												{(errors.deliveryAddress?.street ||
													apiValidationErrors["deliveryAddress/street"]) && (
													<FieldErrors
														error={
															errors.deliveryAddress?.street?.message ||
															apiValidationErrors["deliveryAddress/street"]!
														}
													/>
												)}
											</div>
										)}
									/>
									<div className="flex items-center gap-x-5">
										<Controller
											name="deliveryAddress.home"
											control={control}
											render={({ field: { onChange, value } }) => (
												<div className="flex flex-col gap-y-1">
													<Input
														className="border-0 placeholder:text-[#5a5a5a] py-5 px-4 rounded-3xl focus:border-[1px] focus-visible:ring-0 "
														placeholder="Дом*"
														type="text"
														required
														onChange={onChange}
														value={value}
													/>
													{(errors.deliveryAddress?.home ||
														apiValidationErrors["deliveryAddress/home"]) && (
														<FieldErrors
															error={
																errors.deliveryAddress?.home?.message ||
																apiValidationErrors["deliveryAddress/home"]!
															}
														/>
													)}
												</div>
											)}
										/>

										<Controller
											name="deliveryAddress.apartment"
											control={control}
											render={({ field: { onChange, value } }) => (
												<div className="flex flex-col gap-y-1">
													<Input
														className="border-0 placeholder:text-[#5a5a5a] py-5 px-4 rounded-3xl focus:border-[1px] focus-visible:ring-0 "
														placeholder="Подьезд*"
														type="text"
														required
														onChange={onChange}
														value={value}
													/>
													{(errors.deliveryAddress?.apartment ||
														apiValidationErrors[
															"deliveryAddress/apartment"
														]) && (
														<FieldErrors
															error={
																errors.deliveryAddress?.apartment?.message ||
																apiValidationErrors[
																	"deliveryAddress/apartment"
																]!
															}
														/>
													)}
												</div>
											)}
										/>
									</div>
								</div>
							</div>
						</div>
						<div className="flex items-center justify-between gap-x-3 font-bold text-2xl mb-8">
							<span>Итого:</span>
							<span className="flex items-end gap-x-1">
								<span>{total}</span>
								<span className="text-sm">{currency}</span>
							</span>
						</div>
						<label className="max-w-full ml-auto flex gap-x-3 cursor-pointer mb-8">
							<Checkbox
								className="mt-2 data-[state=checked]:bg-orange-400 data-[state=checked]:border-orange-400 data-[state=checked]:text-white cursor-pointer"
								required
							/>
							<p className="text-lg text-[#5a5a5a] underline ">
								Я подтверждаю, что ознакомилися и согласен с условиями Доставки
								и Оплаты
							</p>
						</label>
						<Button
							className="max-w-full w-full rounded-4xl py-6 !bg-orange-500 cursor-pointer"
							disabled={isLoading}
						>
							Заказать
						</Button>
					</fieldset>
				</form>
			</DrawerContent>
		</Drawer>
	);
};
