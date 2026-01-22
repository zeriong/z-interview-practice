import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import SideBar from "@/widgets/side-bar/SideBar";

const RootLayout = () => (
  <>
    <main className="flex">
      <SideBar />
      <Outlet />
    </main>

    <TanStackRouterDevtools />
  </>
);

export const Route = createRootRoute({ component: RootLayout });
