import { createRouter, RouterProvider } from "@tanstack/react-router";
import { Toaster } from "react-hot-toast";
import { Spinner } from "./components/ui/Spinner";
import { routeTree } from "./routeTree.gen";
import { authSelectors } from "./store/auth/authSlice";
import { useGetCategoriesQuery } from "./store/category/categoryApi";
import { useAppSelector } from "./store/store";
import { useGetMeQuery } from "./store/user/userApi";

const router = createRouter({
	routeTree,
	context: { user: null },
});

declare module "@tanstack/react-router" {
	interface Register {
		router: typeof router;
	}
}

function App() {
	const user = useAppSelector(authSelectors.getUser);
	useGetCategoriesQuery(null);
	const { isLoading } = useGetMeQuery(null);

	if (isLoading)
		return (
			<div className="min-h-screen flex items-center justify-center backdrop-blur-3xl">
				<Spinner size="lg" />
			</div>
		);

	return (
		<>
			<RouterProvider router={router} context={{ user }} />
			<Toaster position="top-right" />
		</>
	);
}

export default App;
