"use client";

import CompanyProfile from "../../components/CompanyProfile";
import NavBar from "../../components/NavBar";
import { useAuth } from "../../hooks/useAuth";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";

export default function HomePage() {
  const { isAuthenticated } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    // if authenticated, user should go to their dashboard
    if (isAuthenticated) {
      const locale = pathname?.split('/')[1] || 'id';
      router.push(`/${locale}/dashboard`);
    }
  }, [isAuthenticated, pathname, router]);

  // If not authenticated yet, show landing
  if (!isAuthenticated) {
    return (
      <>
        <NavBar />
        <CompanyProfile />
      </>
    );
  }

  return null;

}
