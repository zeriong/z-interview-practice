import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { twMerge } from "tailwind-merge";
import { Header } from "@/widgets/header";
import SideBar from "@/widgets/side-bar";

const RootLayout = () => (
  <>
    <main className="flex h-screen w-full overflow-hidden bg-white">
      {/* 데스크톱 슬라이드 패널 + 모바일 오버레이 */}
      <SideBar />

      <div className="flex min-w-0 grow flex-col">
        <Header />
        <div
          className={twMerge(
            "flex-1 overflow-auto w-full",
            "flex justify-center",
            "[scrollbar-gutter:stable]",
          )}
        >
          <div className="w-full max-w-[900px]">
            <Outlet />
          </div>
        </div>
      </div>
    </main>

    <TanStackRouterDevtools />
  </>
);

export const Route = createRootRoute({ component: RootLayout });
