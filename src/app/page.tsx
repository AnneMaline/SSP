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
  const [topTaskPageTitle, setTopTaskPageTitle] = useState([
    "Entitlements",
    "Onboarding",
  ]);
  const topTaskTitle = ["SELF-SERVICE PORTAL", "GET STARTED", "PLATFORM TEAM"];
  const topTaskDescription = [
    "List and create access",
    "We'll take you through!",
    "Handle requests",
  ];
  const topTaskIcon = [
    "/icons/world.svg",
    "/icons/world.svg",
    "/icons/world.svg",
  ];

  useEffect(() => {
    if (status !== "loading" && (!session || !session.accessToken)) {
      signIn("azure-ad", { callbackUrl: "/entitlements" });
      return;
    }
    if (session && session.accessToken) {
      checkRole(session.accessToken, "bootcamp").then((hasRole) => {
        if (hasRole) {
          setTopTaskPageTitle(["Entitlements", "Onboarding", "Requests"]);
        }
      });
    }
  }, [session]);

  const description =
    "Misson statement text: OSDU Selv-service portal enables you to find, collect and read relevant information for the xx and x This page contains all relevant documentation and provides you with the right tools to share, collect and save data. The self-service portal is under construction and we appreciate eedback for further improvements.";

  return (
    <main className="bg-[var(--homepage-background)] flex flex-col gap-10 w-full sm:items-start">
      {/* Title */}
      <TitleBanner
        title="OSDU Self-service Portal"
        description={description}
        back={false}
      />
      {/* TopTasks */}
      <ul className="flex flex-row flex-wrap gap-3 pl-10">
        {topTaskPageTitle.map((title, index) => (
          <li key={index}>
            <TopTask
              targetUrl={`/${title.toLowerCase()}`}
              title={topTaskTitle[index]}
              pageTitle={title}
              description={topTaskDescription[index]}
              icon={topTaskIcon[index]}
            />
          </li>
        ))}
      </ul>

      {/* Further documentation - OSDU documentation */}
      <p className="pl-10 pb-4">
        If you are interested in further documentation.{" "}
        <a href="https://docs.osdu.equinor.com/" className="text-blue-700">
          Go to OSDU Documentation.
        </a>
      </p>
    </main>
  );
}
