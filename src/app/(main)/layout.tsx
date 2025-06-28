
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { cookies } from "next/headers";

export const dynamic = 'force-dynamic';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const authToken = cookies().get('auth-token')?.value;
  const isLoggedIn = !!authToken;
  let userType: string | undefined = undefined;
  
  if (authToken) {
      if (authToken.includes('participant')) {
          userType = 'participant';
      } else if (authToken.includes('artist')) {
          userType = 'artist';
      } else if (authToken.includes('volunteer')) {
          userType = 'volunteer';
      } else if (authToken.includes('jury')) {
          userType = 'jury';
      } else if (authToken.includes('vendor')) {
          userType = 'vendor';
      } else if (authToken.includes('audience')) {
          userType = 'audience';
      }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header isLoggedIn={isLoggedIn} userType={userType} />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
}
