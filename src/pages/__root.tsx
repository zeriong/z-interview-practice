import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import SideBar from "@/widgets/side-bar/SideBar";

const RootLayout = () => (
  <>
    <main className="flex h-screen w-full overflow-hidden bg-white">
      <SideBar />
      <div className="flex justify-center grow overflow-auto [scrollbar-gutter:stable]">
        <div className="min-w-0 flex-1 pt-16 md:pt-0 max-w-[900px] flex justify-center grow">
          <Outlet />
        </div>
      </div>
    </main>

    <TanStackRouterDevtools />
  </>
);

export const Route = createRootRoute({ component: RootLayout });
