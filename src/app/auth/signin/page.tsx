"use client";
import { signIn } from "next-auth/react";
import { useEffect } from "react";

const SignInPage = () => {
  useEffect(() => {
    signIn("azure-ad", { callbackUrl: "/" });
  }, []);

  return (
    <div>
      <p>Redirecting to Microsoft login...</p>
    </div>
  );
};

export default SignInPage;
