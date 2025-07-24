import { createRoute, RouterProvider } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import { authSelectors } from "./store/auth/authSlice";
import { useAppSelector } from "./store/store";

const router = createRoute({ routeTree, context: { user: null } });

declare module "@tanstack/react-router" {
	interface Register {
		router: typeof router;
	}
}

function App() {
	const user = useAppSelector(authSelectors.getUser);

	return <RouterProvider router={router} context={{ user }} />;
}

export default App;
