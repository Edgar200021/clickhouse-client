export enum PromocodeType {
	Fixed = "fixed",
	Percent = "percent",
}

export type PromocodeAdmin = {
	id: number;
	code: string;
	createdAt: string;
	updatedAt: string;
	discountValue: string;
	type: PromocodeType;
	usageCount: number;
	usageLimit: number;
	validFrom: string;
	validTo: string;
};

export type Promocode = Pick<
	PromocodeAdmin,
	"code" | "type" | "discountValue" | "validTo"
>;
