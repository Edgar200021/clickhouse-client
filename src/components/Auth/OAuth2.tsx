import facebookIcon from "@/assets/icons/facebook.svg";
import googleIcon from "@/assets/icons/google.svg";
import { API_BASE_URL } from "@/const/api";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";

const providers = [
	{
		name: "facebook",
		icon: facebookIcon,
		authPath: "facebook",
		alt: "facebook",
	},
	{ name: "google", icon: googleIcon, authPath: "google", alt: "google" },
];

type Props = {
	className?: string;
	from?: string;
};

export const OAuth2 = ({ className, from }: Props) => {
	return (
		<div className={cn("flex flex-col gap-y-12 ", className)}>
			<span className="font-bold text-sm">Войти с помощью социальной сети</span>
			<div className="flex items-center gap-x-4 max-w-[400px] justify-start ">
				{providers.map(({ authPath, icon, alt }) => (
					<form
						key={authPath}
						action={`${API_BASE_URL}/auth/${authPath}`}
						method="GET"
					>
						{from && <input type="hidden" name="from" value={from} />}
						<Button variant="ghost" className="cursor-pointer p-0">
							<img className="object-contain !h-10 w-10" src={icon} alt={alt} />
						</Button>
					</form>
				))}
			</div>
		</div>
	);
};
