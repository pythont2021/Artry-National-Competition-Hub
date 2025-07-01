
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { getDashboardLink } from "@/lib/utils";
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
  
  const dashboardLink = getDashboardLink(authToken);

  if (authToken) {
      if (dashboardLink.includes('participant')) {
          userType = 'participant';
      } else if (dashboardLink.includes('artist')) {
          userType = 'artist';
      } else if (dashboardLink.includes('volunteer')) {
          userType = 'volunteer';
      } else if (dashboardLink.includes('jury')) {
          userType = 'jury';
      } else if (dashboardLink.includes('vendor')) {
          userType = 'vendor';
      } else if (dashboardLink.includes('audience')) {
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
