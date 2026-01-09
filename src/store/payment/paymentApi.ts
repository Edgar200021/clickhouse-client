import { baseApi } from "../baseApi";
import type {
	CancelPaymentRequest,
	CancelPaymentResponse,
	CapturePaymentRequest,
	CapturePaymentResponse,
	CreatePaymentRequest,
	CreatePaymentResponse,
} from "./types.js";

export const paymentApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		createPayment: builder.mutation<
			CreatePaymentResponse,
			CreatePaymentRequest
		>({
			query: (body) => {
				return { url: "/payment", method: "POST", body };
			},
		}),

		capturePayment: builder.mutation<
			CapturePaymentResponse,
			CapturePaymentRequest
		>({
			query: (body) => {
				return { url: "/payment/capture", method: "POST", body };
			},
		}),

		cancelPayment: builder.mutation<
			CancelPaymentResponse,
			CancelPaymentRequest
		>({
			query: (body) => {
				return { url: "/payment/cancel", method: "POST", body };
			},
		}),
	}),
});

export const { useCreatePaymentMutation, useCapturePaymentMutation, useCancelPaymentMutation } =
	paymentApi;