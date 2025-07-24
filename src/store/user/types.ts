import type { User } from "@/types/user";
import type { ApiSuccessResponse } from "../types";

export type GetMeRequest = null;
export type GetMeResponse = ApiSuccessResponse<User>;
