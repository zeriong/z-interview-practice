import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import SideBar from "@/widgets/side-bar/SideBar";

const RootLayout = () => (
  <>
    <main className="flex h-screen w-full overflow-hidden bg-white">
      <SideBar />
      <div className="min-w-0 flex-1 overflow-auto">
        <Outlet />
      </div>
    </main>

    <TanStackRouterDevtools />
  </>
);

export const Route = createRootRoute({ component: RootLayout });
