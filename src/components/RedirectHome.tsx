"use client";

import { useState, useEffect } from "react";
import { checkRole } from "@/utils/checkRole";
import { signIn, useSession } from "next-auth/react";

type Props = {
  children?: React.ReactNode;
  data_partition_id: string;
};

export const RedirectHome = ({
  children,
  data_partition_id = "bootcamp",
}: Props) => {
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const validateRole = async () => {
      if (status === "loading") return; // Wait for `useSession` to load

      // Redirect to login if user is not authenticated
      if ((!session || !session.accessToken) && status !== "authenticated") {
        signIn("azure-ad", { callbackUrl: "/" });
        return;
      }

      // Redirect to home if user is not authorized
      if (session && session.accessToken) {
        // TASK: loop over environments to get all the environments
        // TASK: add as a parameter to the function
        const hasRole = await checkRole(
          session.accessToken,
          data_partition_id,
          "development"
        );
        if (!hasRole) {
          window.location.href = "/";
          return;
        }
      }

      // If authenticated and authorized, stop loading
      setLoading(false);
    };

    validateRole();
  }, [session, status, data_partition_id]);

  if (loading || status === "loading") {
    return <p>Loading...</p>;
  }

  return <>{children}</>;
};
