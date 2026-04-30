"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabase";
import { useAuth } from "../../context/AuthContext";
import api, { setTokens } from "../../lib/client-api";

export default function AuthCallbackPage() {
  const router = useRouter();
  const { refreshUser } = useAuth();
  const [error, setError] = useState("");

  useEffect(() => {
    const exchange = async () => {
      try {
        // Supabase parses the redirect URL hash and stores the session
        const { data, error: sessionError } = await supabase.auth.getSession();
        if (sessionError) throw sessionError;
        if (!data.session) throw new Error("No session returned from Google");

        const supabaseAccessToken = data.session.access_token;

        // Exchange the Supabase token for our own JWT pair
        const result = await api.post("/auth/supabase-exchange", {
          supabaseAccessToken,
        });

        setTokens(result.accessToken, result.refreshToken);

        // Load the full user into our auth context
        const fullUser = await refreshUser();

        // Sign out of Supabase — we only needed it for the OAuth handshake
        await supabase.auth.signOut();

        // Route based on onboarding state
        if (fullUser?.profile?.onboardingComplete) {
          router.replace("/dashboard");
        } else {
          router.replace("/onboarding");
        }
      } catch (err) {
        setError(err?.message || "Google sign-in failed. Please try again.");
        setTimeout(() => router.replace("/login"), 2500);
      }
    };
    exchange();
  }, [router, refreshUser]);

  return (
    <section style={{ minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 20px" }}>
      <div style={{ textAlign: "center" }}>
        {error ? (
          <>
            <i className="fa-solid fa-circle-exclamation fa-3x" style={{ color: "#dc3545", marginBottom: "15px" }}></i>
            <h4>{error}</h4>
            <p style={{ color: "var(--text-color)" }}>Redirecting to login…</p>
          </>
        ) : (
          <>
            <i className="fa-solid fa-spinner fa-spin fa-3x" style={{ color: "var(--theme-color3)", marginBottom: "15px" }}></i>
            <h4>Finishing sign-in…</h4>
          </>
        )}
      </div>
    </section>
  );
}
