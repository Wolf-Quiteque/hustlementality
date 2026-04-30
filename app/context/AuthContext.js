"use client";

import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { useRouter, usePathname } from "next/navigation";
import api, { setTokens, clearTokens, getTokens } from "../lib/client-api";
import { supabase } from "../lib/supabase";

const AuthContext = createContext(null);

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  // Check for existing session on mount.
  // Retries on transient errors (cold-start on Render free tier can take 30-50s)
  // so users don't get logged out just because the API was sleeping.
  useEffect(() => {
    let cancelled = false;
    const { accessToken } = getTokens();
    if (!accessToken) {
      setLoading(false);
      return;
    }

    const delays = [0, 5000, 10000];

    const loadUser = async () => {
      for (let i = 0; i < delays.length; i++) {
        if (delays[i]) await new Promise((r) => setTimeout(r, delays[i]));
        if (cancelled) return;
        try {
          const data = await api.get("/users/me");
          if (!cancelled) setUser(data);
          return;
        } catch (err) {
          // 401 means auth is genuinely invalid — client-api already cleared
          // tokens and redirected to /login, so we just stop here.
          if (err?.status === 401) return;
          // Other errors (network / 5xx / timeout) are likely transient.
          // Keep tokens; on the final attempt, leave user null so the page
          // can show login UI but the next reload may succeed.
          if (i === delays.length - 1 && !cancelled) {
            setUser(null);
          }
        }
      }
    };

    loadUser().finally(() => {
      if (!cancelled) setLoading(false);
    });

    return () => {
      cancelled = true;
    };
  }, []);

  const login = useCallback(
    async (email, password, remember = false) => {
      const data = await api.post("/auth/login", { email, password, remember });
      setTokens(data.accessToken, data.refreshToken);

      // Ensure we have the full user with profile
      let fullUser = data.user;
      if (!fullUser?.profile) {
        try {
          fullUser = await api.get("/users/me");
        } catch {
          fullUser = data.user;
        }
      }
      setUser(fullUser);

      // Route based on onboarding status
      if (fullUser?.profile?.onboardingComplete) {
        router.push("/dashboard");
      } else {
        router.push("/onboarding");
      }
      return fullUser;
    },
    [router]
  );

  const signup = useCallback(
    async ({ firstName, lastName, email, phone, password, agreeTerms }) => {
      const data = await api.post("/auth/register", {
        firstName,
        lastName,
        email,
        phone: phone || undefined,
        password,
        agreeTerms,
      });
      setTokens(data.accessToken, data.refreshToken);
      setUser(data.user);
      router.push("/onboarding");
      return data.user;
    },
    [router]
  );

  const loginWithGoogle = useCallback(async () => {
    const redirectTo = `${window.location.origin}/auth/callback`;
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo },
    });
    if (error) throw error;
  }, []);

  const logout = useCallback(async () => {
    const { refreshToken } = getTokens();
    try {
      if (refreshToken) {
        await api.post("/auth/logout", { refreshToken });
      }
    } catch {
      // Ignore logout API errors — clear locally anyway
    }
    clearTokens();
    setUser(null);
    router.push("/login");
  }, [router]);

  const refreshUser = useCallback(async () => {
    try {
      const data = await api.get("/users/me");
      setUser(data);
      return data;
    } catch {
      return null;
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, loginWithGoogle, logout, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
}
