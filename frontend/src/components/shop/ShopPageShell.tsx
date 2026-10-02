import type { ReactNode } from "react";
import Footer from "../layout/Footer";
import Header from "../layout/Header";

type ShopPageShellProps = {
  children: ReactNode;
  /** Solid header from first paint (inner pages) */
  solidHeader?: boolean;
};

/**
 * Shared ivory page chrome for story + shop routes.
 * Header still handles its own scroll solid state.
 */
export default function ShopPageShell({ children }: ShopPageShellProps) {
  return (
    <div className="min-h-screen bg-ivory text-ink">
      <Header forceSolid />
      <main className="pt-[72px] md:pt-[84px]">{children}</main>
      <Footer />
    </div>
  );
}
