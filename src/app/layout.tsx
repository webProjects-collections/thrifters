import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";

import { TRPCReactProvider } from "~/trpc/react";
import Navbar from "~/components/navbar";
import Footer from "~/components/footer";

export const metadata: Metadata = {
  title: "Create T3 App",
  description: "Generated by create-t3-app",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body>
        <TRPCReactProvider>
          <div className="flex min-h-dvh flex-col">
            <Navbar />
            <section className="from-primary to-primary/90 w-full bg-gradient-to-r py-6 md:pt-12 lg:py-24">
              <div className="container space-y-8 px-4 md:space-y-12 md:px-6">
                <div className="mx-auto max-w-3xl space-y-4 text-center">
                  <h1 className="text-primary-foreground text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
                    Unlock the Power of Accounts
                  </h1>
                </div>
              </div>
            </section>
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
