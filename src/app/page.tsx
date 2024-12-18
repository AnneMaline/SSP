"use client";
import { signIn, useSession } from "next-auth/react";
import Authentication from "../components/Authentication";
import TopTask from "../components/TopTask";
import { useEffect, useState } from "react";
import { checkRole } from "@/utils/checkRole";

export default function Home() {
  const { data: session, status } = useSession();
  // TopTask titles and routes
  const [topTaskTitle, setTopTaskTitle] = useState([
    "Entitlements",
    "Onboarding",
  ]);
  const [topTaskRoutes, setTopTaskRoutes] = useState([
    "entitlements",
    "onboarding",
  ]);

  useEffect(() => {
    if (status !== "loading" && (!session || !session.accessToken)) {
      signIn("azure-ad", { callbackUrl: "/entitlements" });
      return;
    }
    if (session && session.accessToken) {
      checkRole(session.accessToken, "bootcamp").then((hasRole) => {
        if (hasRole) {
          setTopTaskTitle(["Entitlements", "Onboarding", "Requests"]);
          setTopTaskRoutes(["entitlements", "onboarding", "requests"]);
        }
      });
    }
  }, [session]);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        {/* Login */}
        <Authentication />

        {/* TopTasks */}
        <ul className="flex justify-end space-x-4">
          {topTaskTitle.map((text, index) => (
            <li key={index}>
              <TopTask
                targetUrl={`/${topTaskRoutes[index]}`}
                text={`${text}`}
              />
            </li>
          ))}
        </ul>

        {/* Further documentation - OSDU documentation */}
        <h1>Further documentation</h1>
        <a
          href="https://docs.osdu.equinor.com/"
          className={`px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600`}
        >
          OSDU Documentation
        </a>
      </main>
    </div>
  );
}
