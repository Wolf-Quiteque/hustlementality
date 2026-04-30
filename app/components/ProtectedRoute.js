"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children, requireOnboarding = true }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;
    if (!user) {
      router.replace("/login");
      return;
    }
    if (requireOnboarding && !user.profile?.onboardingComplete) {
      router.replace("/onboarding");
    }
  }, [user, loading, router, requireOnboarding]);

  if (loading) {
    return (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "60vh" }}>
        <div style={{ textAlign: "center" }}>
          <i className="fa-solid fa-spinner fa-spin fa-2x" style={{ color: "var(--theme-color3)", marginBottom: "15px" }}></i>
          <p style={{ color: "var(--text-color)" }}>Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) return null;
  if (requireOnboarding && !user.profile?.onboardingComplete) return null;

  return children;
}
