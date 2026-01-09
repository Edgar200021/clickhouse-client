import type { CapturePaymentSchema } from "@/schemas/api/payment/capturePayment.schema";
import type { CreatePaymentSchema } from "@/schemas/api/payment/createPayment.schema";
import type { ApiSuccessResponse } from "@/types/api";
import type {CancelPaymentSchema} from "@/schemas/api/payment/cancelPayment.schema.ts";

export type CreatePaymentRequest = CreatePaymentSchema;
export type CreatePaymentResponse = ApiSuccessResponse<{ redirectUrl: string }>;

export type CapturePaymentRequest = CapturePaymentSchema;
export type CapturePaymentResponse = ApiSuccessResponse<null>;

export type CancelPaymentRequest = CancelPaymentSchema;
export type CancelPaymentResponse = ApiSuccessResponse<null>;