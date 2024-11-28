//import Authentication from "./components/Authentication";
// import { Suspense } from "react";
import FeedbackForm from "../components/FeedbackForm";
import TopTask from "../components/TopTask";
import CreateGroupForm from "../components/CreateGroupForm";
import AddIDtoGroupForm from "../components/AddIDtoGroupForm";
import Card from "../components/StepCard";
import LinkItem from "../components/LinkItem";

export default function Home() {
  // TopTask titles and routes
  const topTaskTitle = [
    "General Information",
    "Entitlements",
    "Onboarding",
    "Self-service",
  ];
  const topTaskRoutes = [
    "General-information",
    "Entitlements",
    "Onboarding",
    "Self-service",
  ];

  const cardsData = [
    {
      title: "React Documentation",
      information:
        "Learn more about React and its features on the official documentation.",
      link: "https://reactjs.org",
    },
    {
      title: "Next.js",
      information:
        "Next.js provides the best developer experience for building React applications.",
      link: "https://nextjs.org",
    },
    {
      title: "Playwright",
      information: "Automate tests for your web applications with Playwright.",
      link: "https://playwright.dev",
    },
  ];

  const listData = [
    {
      title: "React Documentation",
      information: "Learn about React's features, hooks, and components.",
      tags: ["React", "JavaScript", "Frontend"],
      link: "https://reactjs.org",
    },
    {
      title: "Next.js",
      information: "Discover the power of server-side rendering with Next.js.",
      tags: ["Next.js", "React", "SSR"],
      link: "https://nextjs.org",
    },
    {
      title: "Playwright",
      information: "Automate testing for web applications using Playwright.",
      tags: ["Testing", "Automation", "Playwright"],
      link: "https://playwright.dev",
    },
  ];

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        {/*<Authentication />*/}

        {/* TopTasks */}
        <ul className="flex justify-end space-x-4">
          {topTaskTitle.map((text, index) => (
            <li key={index}>
              {/* <Suspense> */}
              <TopTask
                targetUrl={`/${topTaskRoutes[index]}`}
                text={`${text}`}
              />
              {/* </Suspense> */}
            </li>
          ))}
        </ul>

        {/* Mission statement */}
        <h1>Mission statement</h1>
        <p>
          OSDU Selv-service portal enables you to find, collect and read
          relevant information for the xx and xx. This page contains all
          relevant documentation and provides you with the right tools to share,
          collect and save data. The self-service portal is under construction
          and we appreciate feedback for further improvements.
        </p>

        {/* Further documentation - OSDU documentation */}
        <h1>Further documentation</h1>
        <a
          href="https://docs.osdu.equinor.com/"
          className={`px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600`}
        >
          OSDU Documentation
        </a>

        {/* Feedback or questions about the SSP */}
        <h1>Feedback or questions</h1>
        <p>
          We would love to hear your thoughts, suggestions, concerns or problems
          with anything we can improve.
        </p>
        <FeedbackForm />

        {/* Create new group */}
        <h1>Create new group</h1>
        <CreateGroupForm />

        {/* Add member to a group */}
        <h1>Add member to a group</h1>
        <AddIDtoGroupForm />

        {/* List of StepCards */}
        <div className="bg-gray-100">
          <h1 className="text-2xl font-bold text-center my-6">
            Step-by-step-guides
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-4">
            {cardsData.map((card, index) => (
              <Card
                key={index}
                title={card.title}
                information={card.information}
                link={card.link}
              />
            ))}
          </div>
        </div>

        {/* List of LinkItems */}
        <div className="bg-white p-6 max-w-3xl mx-auto">
          <h1 className="text-2xl font-bold text-center my-6">Links</h1>
          {listData.map((item, index) => (
            <LinkItem
              key={index}
              title={item.title}
              information={item.information}
              tags={item.tags}
              link={item.link}
            />
          ))}
        </div>
      </main>
    </div>
  );
}
