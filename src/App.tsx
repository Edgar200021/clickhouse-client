import { createRouter, RouterProvider } from "@tanstack/react-router";
import { Loader, LoaderCircle } from "lucide-react";
import { Spinner } from "./components/ui/Spinner";
import { routeTree } from "./routeTree.gen";
import { authSelectors } from "./store/auth/authSlice";
import { useAppSelector } from "./store/store";
import { useGetMeQuery } from "./store/user/userApi";

const router = createRouter({
	routeTree,
	context: { user: null, isLoadingGettingUser: false },
});

declare module "@tanstack/react-router" {
	interface Register {
		router: typeof router;
	}
}

function App() {
	const user = useAppSelector(authSelectors.getUser);
	const { isLoading } = useGetMeQuery(null);

	if (isLoading)
		return (
			<div className="min-h-screen flex items-center justify-center backdrop-blur-3xl">
				<Spinner size="lg" />
			</div>
		);

	return (
		<RouterProvider
			router={router}
			context={{ user, isLoadingGettingUser: true }}
		/>
	);
}

export default App;
