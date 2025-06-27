import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { cookies } from "next/headers";

export default function RegisterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isLoggedIn = !!cookies().get('auth-token')?.value;

  return (
    <div className="flex flex-col min-h-screen">
      <Header isLoggedIn={isLoggedIn} />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
}
