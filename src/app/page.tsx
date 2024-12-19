"use client";
import { signIn, useSession } from "next-auth/react";
import Authentication from "../components/Authentication";
import TopTask from "../components/TopTask";
import { useEffect, useState } from "react";
import { checkRole } from "@/utils/checkRole";
import TitleBanner from "@/components/TitleBanner";

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

  const description =
    "Misson statement text: OSDU Selv-service portal enables you to find, collect and read relevant information for the xx and x This page contains all relevant documentation and provides you with the right tools to share, collect and save data. The self-service portal is under construction and we appreciate eedback for further improvements.";

  return (
    <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
      {/* Title */}
      <TitleBanner
        title="OSDU Self-service Portal"
        description={description}
        back={false}
      />

      {/* Login */}
      <Authentication />

      {/* TopTasks */}
      <ul className="flex justify-end space-x-4">
        {topTaskTitle.map((text, index) => (
          <li key={index}>
            <TopTask targetUrl={`/${topTaskRoutes[index]}`} text={`${text}`} />
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
  );
}
