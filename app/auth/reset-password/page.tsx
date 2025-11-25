"use client";
import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Settings } from "@/modules/settings";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { supabaseClient } from "@/lib/supabase-auth-client";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";
import Logo from "@/components/logo";
import { Lock, Eye, EyeOff, CheckCircle2, XCircle } from "lucide-react";

function ResetPasswordContent() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isValidSession, setIsValidSession] = useState<boolean | null>(null);
  const [passwordStrength, setPasswordStrength] = useState({
    hasMinLength: false,
    hasUpperCase: false,
    hasLowerCase: false,
    hasNumber: false,
    hasSpecialChar: false,
  });
  const router = useRouter();
  const searchParams = useSearchParams();
  const { settings } = useAuth();

  // Check if user has valid session from reset email
  useEffect(() => {
    const checkSession = async () => {
      try {
        // Wait a bit for Supabase to process the redirect
        await new Promise((resolve) => setTimeout(resolve, 500));

        // Method 1: Check for hash fragment (access_token in URL)
        if (window.location.hash) {
          console.log("Found hash in URL, processing...");
          const hashParams = new URLSearchParams(
            window.location.hash.substring(1)
          );
          const accessToken = hashParams.get("access_token");
          const refreshToken = hashParams.get("refresh_token");
          const type = hashParams.get("type");

          if (type === "recovery" && accessToken) {
            console.log("Setting session with recovery token...");
            const { data, error } = await supabaseClient.auth.setSession({
              access_token: accessToken,
              refresh_token: refreshToken || "",
            });

            if (error) {
              console.error("Session set error:", error);
              setIsValidSession(false);
              toast.error(
                "Invalid or expired reset link. Please request a new one."
              );
              return;
            }

            if (data.session) {
              console.log("Session set successfully!");
              setIsValidSession(true);
              window.history.replaceState(null, "", window.location.pathname);
              return;
            }
          }
        }

        // Method 2: Check for query parameters (token_hash and type)
        const tokenHash = searchParams.get("token_hash");
        const type = searchParams.get("type");

        console.log("Query params:", { hasTokenHash: !!tokenHash, type });

        if (type === "recovery" && tokenHash) {
          console.log("Found token_hash in query, verifying...");

          // Exchange the token_hash for a session
          const { data, error } = await supabaseClient.auth.verifyOtp({
            token_hash: tokenHash,
            type: "recovery",
          });

          if (error) {
            console.error("Token verification error:", error);
            setIsValidSession(false);
            toast.error(
              "Invalid or expired reset link. Please request a new one."
            );
            return;
          }

          if (data.session) {
            console.log("Token verified, session created!");
            setIsValidSession(true);
            // Clean URL
            window.history.replaceState(null, "", window.location.pathname);
            return;
          }
        }
      } catch (err) {
        console.error("Session check error:", err);
        setIsValidSession(false);
        toast.error("Something went wrong. Please try again.");
      }
    };

    checkSession();
  }, [searchParams]);

  // Password strength validation
  useEffect(() => {
    setPasswordStrength({
      hasMinLength: password.length >= 8,
      hasUpperCase: /[A-Z]/.test(password),
      hasLowerCase: /[a-z]/.test(password),
      hasNumber: /[0-9]/.test(password),
      hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    });
  }, [password]);

  const isPasswordStrong =
    passwordStrength.hasMinLength &&
    passwordStrength.hasUpperCase &&
    passwordStrength.hasLowerCase &&
    passwordStrength.hasNumber;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (!isPasswordStrong) {
      toast.error("Please meet all password requirements");
      return;
    }

    setIsLoading(true);

    try {
      console.log("Attempting to update password...");
      const { error } = await supabaseClient.auth.updateUser({
        password: password,
      });

      if (error) {
        console.error("Password update error:", error);
        toast.error(error.message || "Failed to reset password");
      } else {
        console.log("Password updated successfully!");
        toast.success("Password reset successfully!");

        // Sign out user after password reset
        await supabaseClient.auth.signOut();

        // Redirect to login
        setTimeout(() => {
          router.push("/auth/login?reset=success");
        }, 1500);
      }
    } catch (err) {
      console.error("Password reset error:", err);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isValidSession === null) {
    return (
      <div className="min-h-screen flex items-center justify-center py-12 px-4 bg-muted/30">
        <Card className="max-w-md w-full">
          <CardContent className="pt-6">
            <div className="flex justify-center">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
            </div>
            <p className="text-center mt-4 text-muted-foreground">
              Verifying reset link...
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isValidSession === false) {
    return (
      <div className="min-h-screen flex items-center justify-center py-12 px-4 bg-muted/30">
        <Card className="max-w-md w-full">
          <CardHeader className="text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10 mb-4">
              <XCircle className="h-8 w-8 text-destructive" />
            </div>
            <CardTitle className="text-2xl font-bold">
              Invalid Reset Link
            </CardTitle>
            <CardDescription>
              This password reset link is invalid or has expired.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Button className="w-full" size="lg" asChild>
                <Link href="/auth/forgot-password">Request New Reset Link</Link>
              </Button>
              <div className="text-center">
                <Link
                  href="/auth/login"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Back to Sign In
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 bg-muted/30">
      <Card className="max-w-md w-full">
        <CardHeader className="space-y-4 text-center">
          <div className="flex justify-center">
            <Logo settings={settings as Settings} />
          </div>
          <CardTitle className="text-3xl font-bold">
            Create New Password
          </CardTitle>
          <CardDescription>
            Your new password must be different from previously used passwords.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <Label htmlFor="password">New Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                <Input
                  id="password"
                  placeholder="Enter new password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="pl-10 pr-10"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                <Input
                  id="confirmPassword"
                  placeholder="Confirm new password"
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="pl-10 pr-10"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Password Requirements */}
            <Alert>
              <AlertDescription>
                <p className="text-sm font-semibold mb-2">
                  Password must contain:
                </p>
                <ul className="space-y-1 text-sm">
                  <li
                    className={`flex items-center gap-2 ${
                      passwordStrength.hasMinLength
                        ? "text-secondary"
                        : "text-muted-foreground"
                    }`}
                  >
                    {passwordStrength.hasMinLength ? (
                      <CheckCircle2 className="h-4 w-4" />
                    ) : (
                      <div className="h-4 w-4 rounded-full border-2" />
                    )}
                    At least 8 characters
                  </li>
                  <li
                    className={`flex items-center gap-2 ${
                      passwordStrength.hasUpperCase
                        ? "text-secondary"
                        : "text-muted-foreground"
                    }`}
                  >
                    {passwordStrength.hasUpperCase ? (
                      <CheckCircle2 className="h-4 w-4" />
                    ) : (
                      <div className="h-4 w-4 rounded-full border-2" />
                    )}
                    One uppercase letter
                  </li>
                  <li
                    className={`flex items-center gap-2 ${
                      passwordStrength.hasLowerCase
                        ? "text-secondary"
                        : "text-muted-foreground"
                    }`}
                  >
                    {passwordStrength.hasLowerCase ? (
                      <CheckCircle2 className="h-4 w-4" />
                    ) : (
                      <div className="h-4 w-4 rounded-full border-2" />
                    )}
                    One lowercase letter
                  </li>
                  <li
                    className={`flex items-center gap-2 ${
                      passwordStrength.hasNumber
                        ? "text-secondary"
                        : "text-muted-foreground"
                    }`}
                  >
                    {passwordStrength.hasNumber ? (
                      <CheckCircle2 className="h-4 w-4" />
                    ) : (
                      <div className="h-4 w-4 rounded-full border-2" />
                    )}
                    One number
                  </li>
                </ul>
              </AlertDescription>
            </Alert>

            <Button
              type="submit"
              className="w-full text-white p-2 rounded-md cursor-pointer transition-colors hover:shadow-sm hover:opacity-90"
              size="lg"
              disabled={isLoading || !isPasswordStrong}
              style={{
                backgroundColor: settings?.primary_color || "#ec4899",
              }}
            >
              {isLoading ? "Resetting Password..." : "Reset Password"}
            </Button>

            <div className="text-center">
              <Link
                href="/auth/login"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Back to Sign In
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default function ResetPassword() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
        </div>
      }
    >
      <ResetPasswordContent />
    </Suspense>
  );
}
