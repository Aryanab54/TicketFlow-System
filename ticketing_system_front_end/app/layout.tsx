import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";
import Navbar from "@/components/Navbar";
import ConnectionStatus from "@/components/ConnectionStatus";
import ConditionalLayout from "@/components/ConditionalLayout";

export const metadata: Metadata = {
  title: "TicketFlow - Modern Support System",
  description: "Beautiful and efficient IT support ticketing system",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased" suppressHydrationWarning={true}>
        <AuthProvider>
          <ConditionalLayout>
            {children}
          </ConditionalLayout>
        </AuthProvider>
      </body>
    </html>
  );
}