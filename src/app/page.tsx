"use client";

import { Feed } from "@/components/feed/Feed";
import { LandingPage } from "@/components/landing/LandingPage";
import { useSupabaseAuth } from "@/hooks/useSupabaseAuth";

export default function Home() {
  const { user, loading } = useSupabaseAuth();

  if (loading) return null;

  if (!user) {
    return <LandingPage />;
  }

  // Community Feed - shows all public posts from everyone
  return <Feed />;
}

