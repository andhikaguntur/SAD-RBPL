"use client";

import { useAuth } from "../../hooks/useAuth";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";

export default function HomePage() {
  const { isAuthenticated } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const locale = pathname?.split('/')[1] || 'id';

  useEffect(() => {
    if (isAuthenticated) {
      router.push(`/${locale}/dashboard`);
    } else {
      router.push(`/${locale}/login`);
    }
  }, [isAuthenticated, locale, router]);

  return null;
}
