"use client";

import "./globals.css";
import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import localFont from "next/font/local";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";
import "@rainbow-me/rainbowkit/styles.css";

import {
  getDefaultWallets,
  RainbowKitProvider,
  Chain,
} from "@rainbow-me/rainbowkit";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { polygonMumbai, avalancheFuji, bscTestnet } from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//const inter = Inter({ subsets: ["latin"] });
const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

// Font files can be colocated inside of `pages`
const fontHeading = localFont({
  src: "../assets/fonts/CalSans-SemiBold.woff2",
  variable: "--font-heading",
});

const toronet: Chain = {
  id: 54321,
  name: "Toronet",
  network: "toronet",
  iconUrl: "https://example.com/icon.svg",
  iconBackground: "#fff",
  nativeCurrency: {
    decimals: 18,
    name: "Toronet",
    symbol: "TORO",
  },
  rpcUrls: {
    public: { http: ["https://testnet.toronet.org/rpc/"] },
    default: { http: ["https://testnet.toronet.org/rpc/"] },
  },
  blockExplorers: {
    default: { name: "SnowTrace", url: "https://testnet.toronet.org/" },
    etherscan: { name: "SnowTrace", url: "https://testnet.toronet.org/" },
  },
  testnet: true,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { chains, publicClient } = configureChains(
    [toronet],
    [alchemyProvider({ apiKey: "" }), publicProvider()]
  );

  const { connectors } = getDefaultWallets({
    appName: "My RainbowKit App",
    projectId: "2b59a50447305d116602bfcbc02b5bd6",
    chains,
  });

  const wagmiConfig = createConfig({
    autoConnect: true,
    connectors,
    publicClient,
  });
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable,
          fontHeading.variable
        )}
        //className={inter.className}
      >
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <WagmiConfig config={wagmiConfig}>
            <RainbowKitProvider chains={chains}>{children}</RainbowKitProvider>
          </WagmiConfig>
          <ToastContainer autoClose={15000} />
        </ThemeProvider>
      </body>
    </html>
  );
}
