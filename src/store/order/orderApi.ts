import { baseApi } from "../baseApi";
import type {
	CreateOrderRequest,
	CreateOrderResponse,
	GetOrderRequest,
	GetOrderResponse,
	GetOrdersRequest,
	GetOrdersResponse,
} from "./types";

export const cartApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		createOrder: builder.mutation<CreateOrderResponse, CreateOrderRequest>({
			query: (body) => {
				return { url: "/order", method: "POST", body };
			},
			invalidatesTags: ["cart"],
		}),

		getOrders: builder.query<GetOrdersResponse, GetOrdersRequest>({
			query: () => {
				return { url: `/order` };
			},
			// providesTags: ["cart"],
		}),
		getOrder: builder.query<GetOrderResponse, GetOrderRequest>({
			query: ({ orderNumber }) => {
				return { url: `/order/${orderNumber}` };
			},
			// providesTags: ["cart"],
		}),
	}),
});

export const { useCreateOrderMutation, useGetOrdersQuery, useGetOrderQuery } =
	cartApi;
