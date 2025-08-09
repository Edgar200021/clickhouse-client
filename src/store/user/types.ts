import type { ApiSuccessResponse } from "@/types/api";
import type { User } from "@/types/user";

export type GetMeRequest = null;
export type GetMeResponse = ApiSuccessResponse<User>;
