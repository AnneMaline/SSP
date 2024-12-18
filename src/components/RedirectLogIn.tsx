"use client";

import { jwtDecode } from "jwt-decode";
import { signIn, useSession } from "next-auth/react";

type Props = {
  children?: React.ReactNode | ((session: any, status: any) => React.ReactNode);
};

type DecodedToken = {
  exp: number;
  oid: string;
  given_name: string;
  family_name: string;
};

// checks if the auth token is valid
export const decodedToken = (token: string) => {
  try {
    const decoded: DecodedToken = jwtDecode(token);
    return decoded;
  } catch (error) {
    console.error("Invalid token:", error);
    return;
  }
};

export const RedirectLogIn = ({ children }: Props) => {
  const { data: session, status } = useSession();
  const currentTime = Date.now() / 1000;

  // Show a loading state while session information is being fetched
  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (session?.accessToken) {
    console.log("decoding");
    const decoded = decodedToken(session.accessToken);
    if (decoded && decoded.exp < currentTime) {
      signIn("azure-ad", { callbackUrl: "/" });
      console.log(decoded ? decoded.exp > currentTime : false);
      console.log(session.accessToken);
      return null;
    }
  }

  // Redirect to login if user is not authenticated
  if ((!session || !session.accessToken) && status !== "authenticated") {
    signIn("azure-ad", { callbackUrl: "/" });
    return null; // Prevent further rendering until redirect
  }

  return (
    <>{typeof children === "function" ? children(session, status) : children}</>
  );
};
