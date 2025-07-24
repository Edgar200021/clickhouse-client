import { useState } from "react";
import closeIcon from "@/assets/icons/close.svg";
import userIcon from "@/assets/icons/user.svg";

import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from "@/components/ui/drawer";
import { cn } from "@/lib/utils";
import { ForgotPasswordForm } from "./forms/ForgotPasswordForm";
import { SignInForm } from "./forms/SignInForm";
import { SignUpForm } from "./forms/SignUpForm";
import { Button } from "./ui/button";

type Props = {
	className?: string;
};

export const AuthDirection = ({ className }: Props) => {
	const [open, setOpen] = useState(false);
	const [type, setType] = useState<"signUp" | "signIn" | "forgotPassword">(
		"signIn",
	);

	return (
		<Drawer open={open} onOpenChange={setOpen} direction="right">
			<DrawerTrigger asChild>
				<Button
					className={cn("w-6 h-6 p-0 cursor-pointer", className)}
					variant="ghost"
				>
					<img src={userIcon} className="w-full h-full" alt="UserIcon" />
				</Button>
			</DrawerTrigger>
			<DrawerContent className="!max-w-[550px] px-12 py-14">
				<DrawerHeader className=" mb-[60px] items-end">
					<DrawerClose asChild>
						<Button className="w-4 h-4 p-0 cursor-pointer" variant="ghost">
							<img
								width={24}
								height={24}
								className="object-cover"
								src={closeIcon}
								alt="close"
							/>
						</Button>
					</DrawerClose>
					<DrawerTitle className="hidden"></DrawerTitle>
					<DrawerDescription className="hidden"></DrawerDescription>
				</DrawerHeader>

				{type === "signUp" && <SignUpForm className="px-0" />}
				{type === "signIn" && <SignInForm className="px-0" />}
				{type === "forgotPassword" && <ForgotPasswordForm className="px-0" />}
				<div className="flex items-center justify-between gap-x-5">
					<Button
						onClick={() => setType(type === "signIn" ? "signUp" : "signIn")}
						variant="ghost"
						className="cursor-pointer p-0 text-[#5a5a5a]"
					>
						{type === "signIn" ? "Регистрация" : "Вход"}
					</Button>
					<Button
						onClick={() =>
							setType(
								type === "signIn" || type === "signUp"
									? "forgotPassword"
									: "signUp",
							)
						}
						variant="ghost"
						className="cursor-pointer p-0 text-[#5a5a5a]"
					>
						{type === "signIn" || type === "signUp"
							? "Восстановление пароля"
							: "Регистрация"}
					</Button>
				</div>
			</DrawerContent>
		</Drawer>
	);
};
